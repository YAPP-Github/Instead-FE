import { NextRequest, NextResponse } from 'next/server';
import { GET as get } from '@web/shared/server';
import { ApiResponse } from '@web/shared/server/types';
import { Agent } from '@web/types';

interface GetAgentResponse {
  agents: Agent[];
}

export async function GET(request: NextRequest) {
  // 1) 쿼리 파라미터에서 token 추출
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    // 토큰이 없으면 홈으로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2) /agents API 호출
  let agentResponse: ApiResponse<GetAgentResponse>;
  try {
    agentResponse = await get<GetAgentResponse>(`agents`, undefined, {
      accessToken: token,
    });
  } catch (error) {
    return NextResponse.redirect(new URL(`/join`, request.url));
  }

  // 3) API 응답에서 id 추출
  const agentData = agentResponse.data.agents;

  const agentId = agentData[0]?.id;

  // 4) 쿠키 세팅 & /[id]로 리다이렉트
  const redirectUrl = agentData[0]?.id
    ? new URL(`/${agentId}`, request.url)
    : new URL('/', request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set('accessToken', token, {
    // httpOnly: true,
    path: '/',
  });

  return response;
}
