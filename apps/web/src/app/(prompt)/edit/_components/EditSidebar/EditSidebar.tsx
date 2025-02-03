'use client';

import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { ContentItem } from '../ContentItem/ContentItem';
import {
  accordionTrigger,
  breadcrumbWrapper,
  contentWrapper,
  sidebarWrapper,
} from './EditSidebar.css';
import { MainBreadcrumbItem } from '@web/components/common';
import { Text } from '@repo/ui/Text';
import { Accordion } from '@repo/ui/Accordion';
import { Chip } from '@repo/ui/Chip';

export function EditSidebar() {
  return (
    <div className={sidebarWrapper}>
      <div className={breadcrumbWrapper}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem href="/create" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Text fontSize={22} fontWeight="bold" color="grey900">
              기초 경제 지식
            </Text>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className={contentWrapper}>
        <Accordion type="single" defaultValue="item-2">
          <Accordion.Item value="item-1">
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="grey"
                leftAddon={<Chip.Icon variant="grey" name="circle" />}
              >
                생성된 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                3
              </Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="purple"
                leftAddon={<Chip.Icon variant="purple" name="circle" />}
              >
                수정 중인 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                3
              </Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger className={accordionTrigger}>
              <Chip
                variant="green"
                leftAddon={<Chip.Icon variant="green" name="circle" />}
              >
                업로드할 글
              </Chip>
              <Text color="grey300" fontSize={16} fontWeight="semibold">
                3
              </Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
              <ContentItem
                image=""
                title="네이버 웨일, 본사로 이전하는 이유"
                updatedAt={'2025-02-03T02:00:00+09:00'}
                onRemove={() => {}}
                onModify={() => {}}
                onDrag={() => {}}
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
