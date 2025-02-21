import { ApiResponse, STATUS, Tokens } from './types';
import { api } from './api';
import { HTTPError } from 'ky';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { ROUTES } from '@web/routes';

type FetchMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type FetchOptions = {
  method: FetchMethod;
  json?: unknown;
  searchParams?: Record<string, string>;
};

async function fetchWrapperWithTokenHandler<Data>(
  uri: string,
  options?: FetchOptions,
  tokens?: Tokens,
  hasRetried = false
): Promise<ApiResponse<Data>> {
  const method = options?.method ?? 'get';

  if (!tokens && typeof window !== 'undefined') {
    tokens = getClientSideTokens();
  }

  try {
    const response = await api[method](uri, {
      json: options?.json,
      searchParams: options?.searchParams,
      headers: {
        Authorization: tokens ? `Bearer ${tokens.accessToken}` : '',
      },
    }).json<ApiResponse<Data>>();

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const { status } = error.response;

      // 인증 실패(401)인 경우
      if (status === STATUS.UNAUTHORIZED && tokens) {
        if (!hasRetried && tokens) {
          return await fetchWrapperWithTokenHandler<Data>(
            uri,
            options,
            tokens,
            true
          );
        } else {
          if (typeof window !== 'undefined') {
            window.location.replace(`${ROUTES.JOIN}?=401`);
          }

          throw new Error('로그인이 필요해요!');
        }
      }
    }

    // 기타 예상치 못한 오류 처리
    throw new Error(
      `API 요청 실패: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요.'}`
    );
  }
}

export function POST<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    {
      method: 'post',
      json: body,
    },
    tokens
  );
}

export function GET<Data>(
  uri: string,
  params?: Record<string, string>,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    {
      method: 'get',
      searchParams: params,
    },
    tokens
  );
}

export function PUT<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    {
      method: 'put',
      json: body,
    },
    tokens
  );
}

export function DELETE<Data>(
  uri: string,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(uri, { method: 'delete' }, tokens);
}

export function PATCH<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'patch', json: body },
    tokens
  );
}
