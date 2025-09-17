// app/api/buyers/import/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../../../lib/prisma'; // adjust path to your prisma client
import {
  CSV_HEADERS,
 
  toNumberOrNull,
} from '../../../../../lib/csvHelpers';


const rowSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must be at most 80 characters'),

  email: z.string()
    .email('Invalid email format')
    .optional(),

  phone: z.string()
    .regex(/^\d{10,15}$/, 'Phone must be 10-15 digits only'),

  city: z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']),

  propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']),

  bhk: z.enum(['Studio', 'One', 'Two', 'Three', 'Four']).optional(),

  purpose: z.enum(['Buy', 'Rent']),

  budgetMin: z.number().positive('Budget min must be positive').optional(),
  budgetMax: z.number().positive('Budget max must be positive').optional(),

  timeline: z.enum(['ZeroTo3m', 'ThreeTo6m', 'MoreThan6m', 'Exploring']),

  source: z.enum(['Website', 'Referral', 'WalkIn', 'Call', 'Other']),

  notes: z.string().max(1000, 'Notes must be at most 1000 characters').optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),

  status: z.enum([
    'New',
    'Qualified',
    'Contacted',
    'Visited',
    'Negotiation',
    'Converted',
    'Dropped'
  ]).default('New'),

  ownerId: z.string()
}).refine((data) => {
  if (['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk) {
    return false;
  }
  return true;
}, {
  message: "BHK is required for Apartment and Villa",
  path: ["bhk"]
}).refine((data) => {
  if (data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin) {
    return false;
  }
  return true;
}, {
  message: "Budget max must be greater than or equal to budget min",
  path: ["budgetMax"]
});


// -------- API Handler ----------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rows = body.rows;
    if (!body.ownerId || typeof body.ownerId !== 'string' || body.ownerId.length < 1) {
  return NextResponse.json({ error: 'Missing ownerId in request body' }, { status: 400 });
}
    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: 'Invalid payload, expected { rows: [...] }' }, { status: 400 });
    }
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No rows provided' }, { status: 400 });
    }
    if (rows.length > 200) {
      return NextResponse.json({ error: 'Max 200 rows allowed' }, { status: 400 });
    }

    const errors: Array<{ row: number; messages: string[] }> = [];
    const toInsert: any[] = [];
      console.log(rows);
    rows.forEach((rawRow: any, idx: number) => {
      const rowNo = idx + 1;
      const rowErrors: string[] = [];

       
      const normalized: any = {};
      CSV_HEADERS.forEach(h => {
        normalized[h] = rawRow[h] ?? rawRow[h.toLowerCase()] ?? rawRow[h.trim()] ?? "";
      });
       const budgetMin = toNumberOrNull(normalized.budgetMin);
      const budgetMax = toNumberOrNull(normalized.budgetMax);
      
      const parseResult = rowSchema.safeParse({
        ...normalized,
        ownerId: body.ownerId,     // always enforce ownerId from request
        fullName: normalized.fullName?.trim() || undefined,
        email: normalized.email?.trim() || undefined,
        phone: normalized.phone?.trim() || undefined,
        city: normalized.city?.trim() || undefined,
        propertyType: normalized.propertyType?.trim() || undefined,
        bhk: normalized.bhk?.trim() || undefined,
        purpose: normalized.purpose?.trim() || undefined,
        budgetMin: budgetMin ? Number(budgetMin) : undefined,
        budgetMax: budgetMax ? Number(budgetMax) : undefined,
        timeline: normalized.timeline?.trim() || undefined,
        source: normalized.source?.trim() || undefined,
        notes: normalized.notes?.trim() || undefined,
        tags: Array.isArray(normalized.tags)
       ? normalized.tags.map((t: string) => t.trim())
       : normalized.tags
       ? normalized.tags.split(",").map((t: string) => t.trim())
       : [],
        status: normalized.status?.trim() || "New",
      });

      if (!parseResult.success) {
        const messages = parseResult.error.issues.map(
        e => `${e.path.length ? String(e.path[0]) : 'field'}: ${e.message}`
          );
        errors.push({ row: rowNo, messages });
        return;
      }

      const row = parseResult.data;

    

      // --- Tags ---
      const tagsArr = Array.isArray(row.tags)
        ? row.tags
        : row.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || [];

      // --- Accumulate errors if any ---
      if (rowErrors.length) {
        errors.push({ row: rowNo, messages: rowErrors });
        return;
      }

   toInsert.push({
  fullName: row.fullName,
  email: row.email ?? null,
  phone: row.phone,
  city: row.city,
  propertyType: row.propertyType,
  bhk: row.bhk ?? null,     // ✅ fix casing + null fallback
  purpose: row.purpose,
  budgetMin,
  budgetMax,
  timeline: row.timeline,
  source: row.source,
  notes: row.notes ?? null,
  tags: tagsArr,
  status: row.status,
  ownerId: row.ownerId,
});
    });

    // --- If validation errors, return immediately ---
    if (errors.length) {
      return NextResponse.json({ inserted: 0, errors }, { status: 400 });
    }

    // --- Insert transaction ---
    const insertedResult = await prisma.$transaction(async (tx) => {
      const res = await tx.buyer.createMany({
        data: toInsert,
        skipDuplicates: false,
      });
      return res;
    });

    return NextResponse.json({
      inserted: (insertedResult as any)?.count ?? toInsert.length,
      errors: []
    }, { status: 200 });

  } catch (err: any) {
    console.error('Import error', err);
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 });
  }
}


