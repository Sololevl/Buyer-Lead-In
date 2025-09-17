import { prisma } from "../../../../lib/prisma"
import { NextResponse, NextRequest } from "next/server";
import { z } from 'zod'



// Validation schema matching your Prisma enums
const buyerSchema = z.object({
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
  
  budgetMin: z.number()
    .positive('Budget min must be positive')
    .optional(),
  
  budgetMax: z.number()
    .positive('Budget max must be positive')
    .optional(),
  
  timeline: z.enum(['ZeroTo3m', 'ThreeTo6m', 'MoreThan6m', 'Exploring']),
  
  source: z.enum(['Website', 'Referral', 'WalkIn', 'Call', 'Other']),
  
  notes: z.string()
    .max(1000, 'Notes must be at most 1000 characters')
    .optional(),
  
  tags: z.array(z.string()).optional(),
    
  // Add ownerId to the schema since you'll pass it from frontend
  ownerId: z.string()
}).refine((data) => {
  // BHK required for Apartment and Villa
  if (['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk) {
    return false
  }
  return true
}, {
  message: "BHK is required for Apartment and Villa",
  path: ["bhk"]
}).refine((data) => {
  // Budget max should be >= budget min
  if (data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin) {
    return false
  }
  return true
}, {
  message: "Budget max must be greater than or equal to budget min",
  path: ["budgetMax"]
})

// GET - List buyers with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = 10
    const skip = (page - 1) * pageSize

    //console.log('search params log', searchParams)
    const where: any = {}
    
    if (searchParams.get('city')) {
      where.city = searchParams.get('city')
    }
    
    if (searchParams.get('propertyType')) {
      where.propertyType = searchParams.get('propertyType')
    }
    
    if (searchParams.get('status')) {
      where.status = searchParams.get('status')
    }
    
    if (searchParams.get('timeline')) {
      where.timeline = searchParams.get('timeline')
    }

    // Search functionality
    const search = searchParams.get('search')
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }
   //  console.log("search",searchParams.get('search'))
    // Get total count for pagination
    const totalCount = await prisma.buyer.count({ where })

    // Get buyers with pagination
    const buyers = await prisma.buyer.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        city: true,
        propertyType: true,
        bhk: true,
        purpose: true,
        budgetMin: true,
        budgetMax: true,
        timeline: true,
        status: true,
        updatedAt: true,
        ownerId: true
      }
    })

    return NextResponse.json({
      buyers,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    })

  } catch (error) {
    console.error('Error fetching buyers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new buyer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = buyerSchema.parse(body)

    // Create buyer using Prisma transaction
    const result = await prisma.$transaction(async (tx:any) => {
      // Create the buyer
      const buyer = await tx.buyer.create({
        data: {
          ...validatedData,
          status: 'New', // Default status
          updatedAt: new Date()
        }
      })

      // Create history entry
      await tx.buyerHistory.create({
        data: {
          buyerId: buyer.id,
          changedBy: validatedData.ownerId,
          changedAt: new Date(),
          diff: {
            action: 'created',
            changes: validatedData
          }
        }
      })

      return buyer
    })

    return NextResponse.json(result, { status: 201 })

  } catch (error) {
    console.error('Error creating buyer:', error)
    
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return NextResponse.json(
        { 
          
          error: 'Validation failed',
          details: error.issues
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}