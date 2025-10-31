import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin credentials for token verification
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'BikesDeal2024!@#'
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get('adminAuthToken')?.value
    const authExpiry = cookieStore.get('adminAuthExpiry')?.value
    
    if (!authToken || !authExpiry) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    // Check if token is expired
    const now = new Date().getTime()
    const expiryTime = parseInt(authExpiry)
    
    if (now >= expiryTime) {
      return NextResponse.json(
        { message: 'Token expired' },
        { status: 401 }
      )
    }
    
    // Verify token format and content
    try {
      const decoded = atob(authToken)
      if (!decoded.includes(ADMIN_CREDENTIALS.username)) {
        return NextResponse.json(
          { message: 'Invalid token' },
          { status: 401 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 401 }
      )
    }
    
    // Token is valid
    return NextResponse.json(
      { 
        message: 'Authenticated',
        user: { username: ADMIN_CREDENTIALS.username },
        expiresAt: expiryTime
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 500 }
    )
  }
}