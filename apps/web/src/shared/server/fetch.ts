import { ApiResponse, STATUS, Tokens } from './types';
import { api } from './api';
import { isNotNil } from '@repo/ui/utils';

type FetchMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type FetchOptions = {
  method: FetchMethod;
  json?: unknown;
  searchParams?: Record<string, string>;
};

async function fetchWrapperWithTokenHandler<Data>(
  uri: string,
  options?: FetchOptions,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  const method = isNotNil(options?.method) ? options.method : 'get';

  try {
    const response = await api[method](uri, {
      json: options?.json,
      searchParams: options?.searchParams,
    }).json<ApiResponse<Data>>();
    return response;
  } catch (error) {
    // error가 HTTPError인지 확인 후 처리
    if (error instanceof Response) {
      if (error.status === STATUS.UNAUTHORIZED && tokens) {
        return await fetchWrapperWithTokenHandler<Data>(uri, options, tokens);
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
