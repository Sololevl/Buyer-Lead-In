import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Schema for updating buyer (all fields optional except those needed for business logic)
const updateBuyerSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must be at most 80 characters')
    .optional(),
  
  email: z.string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  
  phone: z.string()
    .regex(/^\d{10,15}$/, 'Phone must be 10-15 digits only')
    .optional(),
  
  city: z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']).optional(),
  
  propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']).optional(),
  
  bhk: z.enum(['Studio', 'One', 'Two', 'Three', 'Four']).optional(),
  
  purpose: z.enum(['Buy', 'Rent']).optional(),
  
  budgetMin: z.number()
    .positive('Budget min must be positive')
    .optional(),
  
  budgetMax: z.number()
    .positive('Budget max must be positive')
    .optional(),
  
  timeline: z.enum(['ZeroTo3m', 'ThreeTo6m', 'MoreThan6m', 'Exploring']).optional(),
  
  source: z.enum(['Website', 'Referral', 'WalkIn', 'Call', 'Other']).optional(),
  
  status: z.enum(['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped']).optional(),
  
  notes: z.string()
    .max(1000, 'Notes must be at most 1000 characters')
    .optional(),
  
  tags: z.array(z.string()).optional()
}).refine((data) => {
  // BHK required for Apartment and Villa if propertyType is being updated
  if (data.propertyType && ['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk) {
    return false
  }
  return true
}, {
  message: "BHK is required for Apartment and Villa",
  path: ["bhk"]
}).refine((data) => {
  // Budget max should be >= budget min if both are provided
  if (data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin) {
    return false
  }
  return true
}, {
  message: "Budget max must be greater than or equal to budget min",
  path: ["budgetMax"]
})

// GET - Retrieve a specific buyer by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid buyer ID format' },
        { status: 400 }
      )
    }

    // Get buyer with history
    const buyer = await prisma.buyer.findUnique({
      where: { id },
      include: {
        history: {
          orderBy: { changedAt: 'desc' },
          take: 10 // Get last 10 history records
        }
      }
    })

    if (!buyer) {
      return NextResponse.json(
        { error: 'Buyer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: buyer
    })

  } catch (error) {
    console.error('Error fetching buyer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT/PATCH - Update a specific buyer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const loggedInUser= body.loggedInUser;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid buyer ID format' },
        { status: 400 }
      )
    }

    // Check if buyer exists
    const existingBuyer = await prisma.buyer.findUnique({
      where: { id }
    })
     
    if (!existingBuyer) {
      return NextResponse.json(
        { error: 'Buyer not found' },
        { status: 404 }
      )
    }
    console.log("owner id",existingBuyer.ownerId);
    console.log("loggedInuser",loggedInUser)
    if(existingBuyer.ownerId!=loggedInUser){
     return NextResponse.json(
        { error: 'only owner can edit' },
        { status: 404 }
      )
    }

    // Prepare data for validation
    const dataToValidate = {
      ...body,
      budgetMin: body.budgetMin ? Number(body.budgetMin) : undefined,
      budgetMax: body.budgetMax ? Number(body.budgetMax) : undefined,
    }

    // Validate request body
    const validatedData = updateBuyerSchema.parse(dataToValidate)

    // Remove undefined values
    const updateData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, value]) => value !== undefined)
    )

    // Update buyer using transaction to also create history
    const result = await prisma.$transaction(async (tx) => {
      // Update the buyer
      const updatedBuyer = await tx.buyer.update({
        where: { id },
        data: updateData,
        include: {
          history: {
            orderBy: { changedAt: 'desc' },
            take: 5
          }
        }
      })

      // Create history record
      const changes: Record<string, { from: any; to: any }> = {}
      for (const [key, value] of Object.entries(updateData)) {
        if (existingBuyer[key as keyof typeof existingBuyer] !== value) {
          changes[key] = {
            from: existingBuyer[key as keyof typeof existingBuyer],
            to: value
          }
        }
      }

      if (Object.keys(changes).length > 0) {
        await tx.buyerHistory.create({
          data: {
            buyerId: id,
            changedBy: body.updatedBy || 'system', // You might want to get this from auth
            diff: changes
          }
        })
      }

      return updatedBuyer
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Buyer updated successfully'
    })

  } catch (error) {
    console.error('Error updating buyer:', error)

    if (error instanceof z.ZodError) {
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

// DELETE - Delete a specific buyer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const loggedInUser=request.headers.get("loggedInUser");
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid buyer ID format' },
        { status: 400 }
      )
    }

    // Check if buyer exists
    const existingBuyer = await prisma.buyer.findUnique({
      where: { id }
    })
     
    if (!existingBuyer) {
      return NextResponse.json(
        { error: 'Buyer not found' },
        { status: 404 }
      )
    }
    if(existingBuyer.ownerId!=loggedInUser){
     return NextResponse.json(
        { error: 'only owner can edit' },
        { status: 404 }
      )
    }
    // Delete buyer (this will cascade delete history due to onDelete: Cascade)
    await prisma.buyer.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: `Buyer "${existingBuyer.fullName}" deleted successfully`
    })

  } catch (error) {
    console.error('Error deleting buyer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Partial update (same as PUT in this case)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return PUT(request, { params })
}