'use client';

import { EditPost } from '../_components/EditPost/EditPost';
import { EditSidebar } from '../_components/EditSidebar/EditSidebar';
import { editDetailPage, flexColumn } from './EditDetail.css';

export function EditDetail() {
  return (
    <div className={editDetailPage}>
      <EditSidebar />
      <div className={flexColumn}>
        <EditPost />
      </div>
    </div>
  );
}
