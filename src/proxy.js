import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export async function proxy(request) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    const pathname = request?.nextUrl?.pathname;
    if (!pathname) return NextResponse.next();

    const isPrivatePath = 
      pathname.startsWith('/services') || 
      pathname.startsWith('/add-product');

    if (isPrivatePath && !token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/services/:path*',   
    '/add-product/:path*' 
  ],
};