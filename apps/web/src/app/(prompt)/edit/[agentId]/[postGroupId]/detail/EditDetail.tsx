'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import { EditPost } from './_components/EditPost/EditPost';
import { EditSidebar } from './_components/EditSidebar/EditSidebar';
import { editDetailPage, flexColumn } from './page.css';
import { useState } from 'react';
import { Post } from '@web/types';

// TODO 추후 Jotai, 또는 react-query 사용으로 수정할 예정
interface DetailPageContextType {
  loadingPosts: Post['id'][];
  setLoadingPosts: Dispatch<SetStateAction<Post['id'][]>>;
}

const defaultContextValue: DetailPageContextType = {
  loadingPosts: [],
  setLoadingPosts: () => {},
};

export const DetailPageContext =
  createContext<DetailPageContextType>(defaultContextValue);

export function EditDetail() {
  const [loadingPosts, setLoadingPosts] = useState<Post['id'][] | []>([]);

  return (
    <DetailPageContext.Provider value={{ loadingPosts, setLoadingPosts }}>
      <div className={editDetailPage}>
        <EditSidebar />
        <div className={flexColumn}>
          <EditPost />
        </div>
      </div>
    </DetailPageContext.Provider>
  );
}
