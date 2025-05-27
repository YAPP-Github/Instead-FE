import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { Post } from '@web/types';

interface EditDetailPageContextType {
  loadingPosts: Post['id'][];
  setLoadingPosts: Dispatch<SetStateAction<Post['id'][]>>;
}

const defaultContextValue: EditDetailPageContextType = {
  loadingPosts: [],
  setLoadingPosts: () => {},
};

export const EditDetailPageContext =
  createContext<EditDetailPageContextType>(defaultContextValue);

interface EditDetailPageProviderProps {
  children: ReactNode;
}

export function EditDetailPageProvider({
  children,
}: EditDetailPageProviderProps) {
  const [loadingPosts, setLoadingPosts] = useState<Post['id'][] | []>([]);

  return (
    <EditDetailPageContext.Provider value={{ loadingPosts, setLoadingPosts }}>
      {children}
    </EditDetailPageContext.Provider>
  );
}
