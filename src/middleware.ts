import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/account', '/checkout', '/orders'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('po_token')?.value;

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*', '/orders/:path*', '/auth/:path*'],
};
