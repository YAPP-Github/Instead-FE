import {
  queryOptions,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { useEffect } from 'react';

export interface NewsCategory {
  /**
   * 서버로 넘겨줄 카테고리명 (예: "INVESTING", "COOK")
   */
  category: string;
  /**
   * 화면에 표시될 카테고리명 (예: "투자", "요리")
   */
  name: string;
}

type NewsCategoriesQuery = NewsCategory[];

export function newsCategoriesQueryOptions(tokens?: Tokens) {
  return queryOptions({
    queryKey: queryKeys.news.categories,
    queryFn: () =>
      GET<NewsCategoriesQuery>(`v1/news-categories`, undefined, tokens),
    // NOTE: 항상 fresh 상태로 유지
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useNewsCategoriesQuery() {
  return useSuspenseQuery(newsCategoriesQueryOptions());
}

export function usePrefetchNewsCategories() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.news.categories,
      queryFn: () => GET<NewsCategoriesQuery>('news-categories'),
    });
  }, [queryClient]);
}
