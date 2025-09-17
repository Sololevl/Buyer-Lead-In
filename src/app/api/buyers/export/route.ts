// app/api/buyers/export/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // adjust
import { CSV_HEADERS, timelinePrismaToCsv, bhkPrismaToCsv } from '../../../../../lib/csvHelpers';

function buildWhereFromQuery(q: URLSearchParams) {
  const where: any = {};
  if (q.get('city')) where.city = q.get('city');
  if (q.get('propertyType')) where.propertyType = q.get('propertyType');
  if (q.get('status')) where.status = q.get('status');
  if (q.get('timeline')) {
    // frontend might pass CSV label (e.g. "0-3m") or Prisma key - handle both
    const t = q.get('timeline')!;
    const mapped = Object.entries(timelinePrismaToCsv).find(([,v]) => v === t) ? t : t;
    
    where.timeline = t;
  }
  const search = q.get('search');
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams;

    const page = Number(q.get('page') ?? 1);
    const pageSize = Number(q.get('pageSize') ?? 1000); // export all filtered rows by default
    const skip = (page - 1) * pageSize;

    const where = buildWhereFromQuery(q);

    const buyers = await prisma.buyer.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip,
      take: pageSize,
      select: {
        fullName: true,
        email: true,
        phone: true,
        city: true,
        propertyType: true,
        bhk: true,
        purpose: true,
        budgetMin: true,
        budgetMax: true,
        timeline: true,
        source: true,
        notes: true,
        tags: true,
        status: true,
      }
    });

    // map Prisma enum keys to CSV-friendly labels
    const rows = buyers.map(b => {
      return [
        b.fullName ?? '',
        b.email ?? '',
        b.phone ?? '',
        b.city ?? '',
        b.propertyType ?? '',
        b.bhk ? (bhkPrismaToCsv[b.bhk] ?? b.bhk) : '',
        b.purpose ?? '',
        b.budgetMin ?? '',
        b.budgetMax ?? '',
        b.timeline ? (timelinePrismaToCsv[b.timeline] ?? b.timeline) : '',
        b.source ?? '',
        b.notes ?? '',
        Array.isArray(b.tags) ? b.tags.join(',') : (b.tags ?? ''),
        b.status ?? ''
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });

    const csv = [
      CSV_HEADERS.join(','),
      ...rows
    ].join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="buyers_export.csv"',
      }
    });

  } catch (err: any) {
    console.error('Export error', err);
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 });
  }
}
