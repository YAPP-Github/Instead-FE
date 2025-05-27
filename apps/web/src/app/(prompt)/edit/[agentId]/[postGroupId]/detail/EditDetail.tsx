'use client';

import { EditPost } from './_components/EditPost/EditPost';
import { EditSidebar } from './_components/EditSidebar/EditSidebar';
import { editDetailPage, flexColumn } from './page.css';
import { Suspense } from 'react';
import { EditDetailPageProvider } from './_providers/EditDetailPageProvider';

export function EditDetail() {
  return (
    <EditDetailPageProvider>
      <div className={editDetailPage}>
        <Suspense>
          <EditSidebar />
        </Suspense>
        <div className={flexColumn}>
          <Suspense>
            <EditPost />
          </Suspense>
        </div>
      </div>
    </EditDetailPageProvider>
  );
}
