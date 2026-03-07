import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const isPrivatePath = 
    pathname?.startsWith('/services') || 
    pathname?.startsWith('/add-product');

  if (isPrivatePath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/services/:path*',   
    '/add-product/:path*' 
  ],
};