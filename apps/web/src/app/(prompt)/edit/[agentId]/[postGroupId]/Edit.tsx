'use client';

import React, { RefObject } from 'react';
import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { NavBar, MainBreadcrumbItem } from '@web/components/common';
import { Breadcrumb, Button, Chip, Icon, Accordion } from '@repo/ui';
import { POST_STATUS } from '@web/types/post';
import { INITIAL_CONTENT_ITEMS } from './constants';
import {
  DndControler,
  useDndControler,
} from '@web/components/common/DND/DndControler';
import { EditPageParams } from './types';
import { DragGuide } from './_components/DragGuide/DragGuide';

type EditContentProps = {
  scrollRef: RefObject<HTMLDivElement>;
  isScrolled: boolean;
  agentId: EditPageParams['agentId'];
  postGroupId: EditPageParams['postGroupId'];
};

function EditContent({
  scrollRef,
  isScrolled,
  agentId,
  postGroupId,
}: EditContentProps) {
  const { getItemsByStatus, handleRemove } = useDndControler();

  return (
    <div className={style.mainStyle} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <MainBreadcrumbItem href="/" />
            <Breadcrumb.Item active>기초 경제 지식</Breadcrumb.Item>
          </Breadcrumb>
        }
        rightAddon={
          <Button
            type="submit"
            size="large"
            variant="primary"
            leftAddon={<Icon name="checkCalendar" size={20} />}
            onClick={() => {}}
            disabled={false}
            isLoading={false}
            className={style.submitButtonStyle}
          >
            예약하러 가기
          </Button>
        }
        isScrolled={isScrolled}
      />
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
              <Chip variant="grey">생성된 글</Chip>
            </Accordion.Trigger>
            <Accordion.Content>
              <DndControler.Droppable id={POST_STATUS.GENERATED}>
                <DndControler.SortableList
                  items={getItemsByStatus(POST_STATUS.GENERATED).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.GENERATED).map((item) => (
                    <DndControler.Item
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      updatedAt={item.updatedAt}
                      onRemove={() => handleRemove(item.id)}
                      onModify={() => {}}
                    />
                  ))}
                </DndControler.SortableList>
              </DndControler.Droppable>
            </Accordion.Content>
          </Accordion.Item>

          {/* 수정 중인 글 영역 */}
          <Accordion.Item
            value={POST_STATUS.EDITING}
            className={style.accordionItemStyle}
          >
            <Accordion.Trigger className={style.accordionTriggerStyle}>
              <Chip variant="purple">수정 중인 글</Chip>
            </Accordion.Trigger>
            <Accordion.Content id={POST_STATUS.EDITING}>
              <DndControler.Droppable id={POST_STATUS.EDITING}>
                <DndControler.SortableList
                  items={getItemsByStatus(POST_STATUS.EDITING).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.EDITING).length > 0 ? (
                    getItemsByStatus(POST_STATUS.EDITING).map((item) => (
                      <DndControler.Item
                        key={item.id}
                        id={item.id}
                        summary={item.summary}
                        updatedAt={item.updatedAt}
                        onRemove={() => handleRemove(item.id)}
                        onModify={() => {}}
                      />
                    ))
                  ) : (
                    <DragGuide description="수정 중인 글을 끌어서 여기에 놓아주세요" />
                  )}
                </DndControler.SortableList>
              </DndControler.Droppable>
            </Accordion.Content>
          </Accordion.Item>

          {/* 업로드할 글 영역 */}
          <Accordion.Item
            value={POST_STATUS.READY_TO_UPLOAD}
            className={style.accordionItemStyle}
          >
            <Accordion.Trigger className={style.accordionTriggerStyle}>
              <Chip variant="green">업로드할 글</Chip>
            </Accordion.Trigger>
            <Accordion.Content id={POST_STATUS.READY_TO_UPLOAD}>
              <DndControler.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
                <DndControler.SortableList
                  items={getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                    (item) => item.id
                  )}
                >
                  {getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).length > 0 ? (
                    getItemsByStatus(POST_STATUS.READY_TO_UPLOAD).map(
                      (item) => (
                        <DndControler.Item
                          key={item.id}
                          id={item.id}
                          summary={item.summary}
                          updatedAt={item.updatedAt}
                          onRemove={() => handleRemove(item.id)}
                          onModify={() => {}}
                        />
                      )
                    )
                  ) : (
                    <DragGuide description="업로드가 준비된 글을 끌어서 여기에 놓아주세요" />
                  )}
                </DndControler.SortableList>
              </DndControler.Droppable>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default function Edit({ agentId, postGroupId }: EditPageParams) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });

  return (
    <DndControler
      initialItems={INITIAL_CONTENT_ITEMS}
      onDragEnd={(items) => {
        console.log('=== Current Items Status ===');
        const itemsByStatus = {
          GENERATED: items.filter((item) => item.status === 'GENERATED'),
          EDITING: items.filter((item) => item.status === 'EDITING'),
          READY_TO_UPLOAD: items.filter(
            (item) => item.status === 'READY_TO_UPLOAD'
          ),
        };
        console.log('GENERATED:', itemsByStatus.GENERATED);
        console.log('EDITING:', itemsByStatus.EDITING);
        console.log('READY_TO_UPLOAD:', itemsByStatus.READY_TO_UPLOAD);
        console.log('========================');
      }}
    >
      <EditContent
        scrollRef={scrollRef}
        isScrolled={isScrolled}
        agentId={agentId}
        postGroupId={postGroupId}
      />
    </DndControler>
  );
}
