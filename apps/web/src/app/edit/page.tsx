import { ContentItem } from './components/ContentItem/ContentItem';
import { SkeletonContentItem } from './components/SkeletonContentItem/SkeletonContentItem';

export default function EditPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ContentItem
        image=""
        title="네이버 웨일, 본사로 이전하는 이유"
        updatedAt={'2025-02-01T02:00:00+09:00'}
        onRemove={() => {}}
        onModify={() => {}}
        onDrag={() => {}}
      />
      <ContentItem
        image=""
        title="네이버 웨일, 본사로 이전하는 이유네이버 웨일, 본사로 이전하는 이유네이버 웨일, 본사로 이전하는 이유네이버 웨일, 본사로 이전하는 이유네이버 웨일, 본사로 이전하는 이유"
        updatedAt={'2025-02-01T02:00:00+09:00'}
        onRemove={() => {}}
        onModify={() => {}}
        onDrag={() => {}}
      />
      <SkeletonContentItem />
    </div>
  );
}
