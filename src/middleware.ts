import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected admin routes
const ADMIN_ROUTES = [
  '/admin',
  '/secret-admin-portal-x9k2m'
]

// Admin credentials (in production, this should be in environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'BikesDeal2024!@#'
}

// Function to verify admin authentication token
function verifyAdminToken(request: NextRequest): boolean {
  const authToken = request.cookies.get('adminAuthToken')?.value
  const authExpiry = request.cookies.get('adminAuthExpiry')?.value
  
  if (!authToken || !authExpiry) {
    return false
  }
  
  const now = new Date().getTime()
  const expiryTime = parseInt(authExpiry)
  
  if (now >= expiryTime) {
    return false
  }
  
  // Verify token format (basic validation)
  try {
    const decoded = atob(authToken)
    return decoded.includes(ADMIN_CREDENTIALS.username)
  } catch {
    return false
  }
}

// Function to check if route is protected
function isProtectedRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(route => pathname.startsWith(route))
}

// Function to check if it's the login page
function isLoginPage(pathname: string): boolean {
  return pathname === '/secret-admin-portal-x9k2m'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // Handle admin routes
  if (isProtectedRoute(pathname)) {
    const isAuthenticated = verifyAdminToken(request)
    
    // If accessing login page and already authenticated, redirect to admin dashboard
    if (isLoginPage(pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    // If accessing admin routes without authentication, redirect to login
    if (pathname.startsWith('/admin') && !isAuthenticated) {
      return NextResponse.redirect(new URL('/secret-admin-portal-x9k2m', request.url))
    }
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers for admin routes
  if (isProtectedRoute(pathname)) {
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; media-src 'self' blob:;"
    )
  }
  
  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}