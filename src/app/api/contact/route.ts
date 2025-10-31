import { NextRequest, NextResponse } from 'next/server'

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: string
  status: 'new' | 'read' | 'replied'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Create submission object
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    // In a real application, you would save this to a database
    // For now, we'll return success and let the frontend handle storage
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submissionId: submission.id,
      submission: submission
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // This endpoint can be used by admin to fetch all submissions
  return NextResponse.json({
    success: true,
    message: 'Contact API is working'
  })
}