import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 요청은 미들웨어를 건너뛰도록 함
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith(ROUTES.JOIN) ||
    pathname.startsWith(ROUTES.GOOGLE.CALLBACK)
  ) {
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
  matcher: [
    // 정적 파일과 API 라우트는 제외
    '/((?!_next/|api/|.*\\..*).*)',
    // join 페이지 제외
    '/((?!join).*)',
  ],
};
