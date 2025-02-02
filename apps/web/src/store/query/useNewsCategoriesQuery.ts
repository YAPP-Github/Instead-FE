import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/features/server/fetch';
import { Tokens } from '@web/features/server/types';

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
    queryKey: ['news', 'categories'],
    queryFn: () =>
      GET<NewsCategoriesQuery>(`news-categories`, undefined, tokens),
    // NOTE: 항상 fresh 상태로 유지
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useNewsCategoriesQuery() {
  return useSuspenseQuery(newsCategoriesQueryOptions());
}
