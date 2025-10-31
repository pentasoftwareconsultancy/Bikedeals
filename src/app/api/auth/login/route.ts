import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'BikesDeal2024!@#'
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    // Validate credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Create authentication token
    const token = btoa(`${username}:${Date.now()}`)
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
    
    // Set secure HTTP-only cookies
    const response = NextResponse.json(
      { message: 'Authentication successful' },
      { status: 200 }
    )
    
    // Set cookies with security flags
    response.cookies.set('adminAuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
      path: '/'
    })
    
    response.cookies.set('adminAuthExpiry', expiry.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
      path: '/'
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    )
  }
}