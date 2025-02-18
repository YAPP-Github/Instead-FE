// app/api/auth/google/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // .env에서 읽어오기
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;

  // Google OAuth 인증 URL
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI, // -> http://localhost:3000/api/auth/google/callback
    response_type: 'code',
    prompt: 'consent', // 매번 동의 화면을 띄우고 싶다면 "consent"
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'].join(' '),
  };

  // 쿼리스트링 만들기
  const qs = new URLSearchParams(options).toString();
  const loginUrl = `${rootUrl}?${qs}`;

  // 구글 로그인 페이지로 리다이렉트
  return NextResponse.redirect(loginUrl);
}
