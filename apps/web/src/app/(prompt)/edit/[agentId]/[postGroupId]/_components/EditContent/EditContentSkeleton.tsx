'use client';

import { Chip, Accordion } from '@repo/ui';
import { POST_STATUS } from '@web/types/post';
import * as style from './EditContent.css';
import { SkeletonContentItem } from '../SkeletonContentItem/SkeletonContentItem';

export function EditContentSkeleton() {
  return (
    <div className={style.contentStyle}>
      <Accordion
        type="multiple"
        defaultValue={[
          POST_STATUS.GENERATED,
          POST_STATUS.EDITING,
          POST_STATUS.READY_TO_UPLOAD,
        ]}
        className={style.accordionStyle}
      >
        {/* 생성된 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.GENERATED}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip
              variant="grey"
              leftAddon={
                <Chip.Icon variant="grey" name="circle" size={'1.2rem'} />
              }
            >
              생성된 글
            </Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.GENERATED}>
            <div className={style.contentInnerWrapper}>
              <SkeletonContentItem length={5} />
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* 수정 중인 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.EDITING}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip
              variant="purple"
              leftAddon={
                <Chip.Icon variant="purple" name="circle" size={'1.2rem'} />
              }
            >
              수정 중인 글
            </Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.EDITING}>
            <SkeletonContentItem length={5} />
          </Accordion.Content>
        </Accordion.Item>

        {/* 업로드할 글 영역 */}
        <Accordion.Item
          value={POST_STATUS.READY_TO_UPLOAD}
          className={style.accordionItemStyle}
        >
          <Accordion.Trigger className={style.accordionTriggerStyle}>
            <Chip
              variant="orange"
              leftAddon={
                <Chip.Icon variant="orange" name="circle" size={'1.2rem'} />
              }
            >
              업로드할 글
            </Chip>
          </Accordion.Trigger>
          <Accordion.Content id={POST_STATUS.READY_TO_UPLOAD}>
            <SkeletonContentItem length={5} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
