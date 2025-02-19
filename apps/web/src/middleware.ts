import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 요청은 미들웨어를 건너뛰도록 함
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('/api/') ||
    pathname.includes('.') // 파일 확장자를 가진 요청 제외
  ) {
    return NextResponse.next();
  }

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
  matcher: [
    // 정적 파일과 API 라우트는 제외
    '/((?!_next/|api/|.*\\..*).*)',
    // join 페이지 제외
    '/((?!join).*)',
  ],
};
