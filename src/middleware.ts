import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/AboutMe') && !isLoggedIn) {
    const loginUrl = new URL('/Login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/AboutMe/:path*'], // ✅ Now includes dynamic subroutes
}
