'use client';
import { MainBreadcrumbItem } from '@web/components/common';
import { image, nav, wrapper } from './not-found/page.css';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import EmptyImage from '@web/assets/images/uploadEmptyImage.png';
import Image from 'next/image';
import { Text } from '@repo/ui/Text';
import { Spacing } from '@repo/ui/Spacing';
import { Button } from '@repo/ui/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={wrapper}>
      <nav className={nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem />
          </Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <Image
        className={image}
        src={EmptyImage}
        alt="access restriction image"
      />
      <Spacing size={48} />
      <Text.H1 fontWeight="bold" fontSize={36} color="grey600">
        요청하신 페이지를 찾지 못했어요
      </Text.H1>
      <Spacing size={8} />
      <Text fontWeight="medium" fontSize={24} color="grey500">
        페이지 주소가 정확한지 확인해주세요
      </Text>
      <Spacing size={32} />
      <Button
        variant="primary"
        size="large"
        onClick={() => router.push(ROUTES.HOME.ROOT)}
      >
        홈으로 가기
      </Button>
    </div>
  );
}
