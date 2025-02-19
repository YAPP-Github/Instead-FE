import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ROUTES.JOIN)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken');

  if (!token) {
    const joinUrl = new URL(ROUTES.JOIN, request.url);
    joinUrl.searchParams.set('toast', '401');
    return NextResponse.redirect(joinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!join).*)'],
};
