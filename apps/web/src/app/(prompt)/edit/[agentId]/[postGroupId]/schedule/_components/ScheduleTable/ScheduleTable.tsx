'use client';

import { DndController, useDndController } from '@web/components/common';
import * as style from './ScheduleTable.css';
import { Post } from '@web/types';
import { SchedulePageProps } from '../../type';
import { useRouter } from 'next/navigation';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { Modal } from '@repo/ui';
import { useModal } from '@repo/ui/hooks';
import { POST_STATUS } from '@web/types/post';
import { DndTableRow } from '../DndTableRow/DndTableRow';
import { Column } from './types';

export type ScheduleTableProps = {
  columns: Column[];
} & SchedulePageProps;

export function ScheduleTable({ params, columns }: ScheduleTableProps) {
  const router = useRouter();
  const modal = useModal();
  const { getItemsByStatus } = useDndController();
  const data = getItemsByStatus(POST_STATUS.READY_TO_UPLOAD);

  const { mutate: deletePost } = useDeletePostMutation(params);

  const handleModify = (postId: Post['id']) => {
    router.push(
      `/edit/${params.agentId}/${params.postGroupId}/detail?postId=${postId}`
    );
  };

  const handleDeletePost = (postId: Post['id']) => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          deletePost(postId);
        },
      },
    });
  };

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr className={style.headerRow}>
            {columns.map((column) => (
              <th
                key={column.id}
                className={style.headerCell}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
        <div className={style.itemsContainer}>
          <DndController.SortableList items={data.map((item) => item.id)}>
            {data.map((item) => (
              <DndTableRow
                key={item.id}
                columns={columns}
                onModify={() => handleModify(item.id)}
                onRemove={() => handleDeletePost(item.id)}
                {...item}
              />
            ))}
          </DndController.SortableList>
        </div>
      </DndController.Droppable>
    </div>
  );
}
