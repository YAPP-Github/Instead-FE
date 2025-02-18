// app/api/auth/google/callback/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  // (1) 구글이 보낸 code 받아오기
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code received' }, { status: 400 });
  }

  try {
    // (2) 이미 만들어둔 서버에 code 전달 (POST or GET, 서버 스펙에 맞게)
    const serverEndpoint =
      'https://hong-nuri.shop/yapp/oauth2/authorization/google';
    // 예: code를 JSON 바디로 넘긴다고 가정
    const response = await fetch(serverEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      // 쿠키/세션을 사용한다면 credentials 관련 설정 필요할 수 있음
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to exchange code' },
        { status: 500 }
      );
    }

    // (3) 서버가 준 응답 (예: 사용자 정보 + JWT 등)
    const data = await response.json();
    // data 안에 { token, user, ... } 등의 정보가 있다고 가정

    // (4) 여기서 Next.js에서 쿠키를 직접 설정할 수도 있음
    //     - 예: JWT를 `Set-Cookie`로 설정
    //     - NextResponse 쿠키 사용: NextResponse.cookies.set(...)
    // 예시:
    const redirectResponse = NextResponse.redirect(new URL('/', req.url));
    redirectResponse.cookies.set({
      name: 'my_auth_token',
      value: data.token, // 서버가 준 JWT
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return redirectResponse;
  } catch (error) {
    console.error('Callback Error: ', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
