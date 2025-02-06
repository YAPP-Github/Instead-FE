import { EditPost } from './_components/EditPost/EditPost';
import { EditSidebar } from './_components/EditSidebar/EditSidebar';
import { editDetailPage, flexColumn } from './page.css';

export default function EditDetailPage() {
  return (
    <div className={editDetailPage}>
      <EditSidebar />
      <div className={flexColumn}>
        <EditPost />
      </div>
    </div>
  );
}
