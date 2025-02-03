'use client';

import {
  TextField,
  Label,
  Spacing,
  RadioCards,
  Breadcrumb,
  Icon,
  Button,
  Modal,
} from '@repo/ui';
import { ImageManager, MainBreadcrumbItem } from '@web/components/common';
import { KeywordChipGroup } from './_components/KeywordChip/KeywordChipGroup';
import { GradientAnimatedTitle } from './_components/GradientAnimatedTitle/GradientAnimatedTitle';
import { AnimatedContainer } from './_components/AnimatedContainer/AnimatedContainer';
import { useForm, Controller } from 'react-hook-form';
import { isEmptyStringOrNil } from '@web/utils';
import { CreateFormValues } from './types';
import {
  REFERENCE_TYPE,
  PURPOSE_OPTIONS,
  REFERENCE_OPTIONS,
  LENGTH_OPTIONS,
} from './constants';
import * as styles from './pageStyle.css';
import { useModal } from '@repo/ui/hooks';
import { useRouter } from 'next/navigation';
import { useNewsCategoriesQuery } from '@web/store/query/useNewsCategoriesQuery';
import { isNotNil } from '@repo/ui/utils';
import { uploadImages } from '@web/shared/image-upload/ImageUpload';

const REQUIRED_FIELDS = {
  TOPIC: 'topic',
} as const;

export default function Create() {
  const { data: newsCategories } = useNewsCategoriesQuery();
  const modal = useModal();
  const router = useRouter();
  const { watch, control, handleSubmit } = useForm<CreateFormValues>({
    defaultValues: {
      topic: '',
      purpose: 'INFORMATION',
      reference: 'NONE',
      newsCategory: isNotNil(newsCategories.data[0]?.category)
        ? newsCategories.data[0].category
        : undefined,
      imageUrls: [], // TODO: presigned url 받아서 첨부
      length: 'SHORT',
      content: '',
    },
    mode: 'onChange',
  });

  const topic = watch(REQUIRED_FIELDS.TOPIC);
  const reference = watch('reference');

  const onSubmit = async (data: CreateFormValues) => {
    try {
      let uploadedImageUrls: string[] = [];

      // 이미지 참조 타입이고 이미지가 있는 경우에만 업로드
      if (
        data.reference === REFERENCE_TYPE.IMAGE &&
        data.imageUrls &&
        data.imageUrls.length > 0
      ) {
        uploadedImageUrls = await uploadImages(data.imageUrls);
      }

      const requestData = {
        ...data,
        newsCategory:
          data.reference === REFERENCE_TYPE.NEWS ? data.newsCategory : null,
        imageUrls:
          data.reference === REFERENCE_TYPE.IMAGE ? uploadedImageUrls : null,
      };

      console.log('폼 데이터:', requestData);
      // TODO: API 요청 구현
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      // TODO: 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  const handleHomeBreadcrumbClick = () => {
    modal.confirm({
      title: '정말 나가시겠어요?',
      description: '이 페이지를 나가면\n작성한 내용은 저장되지 않아요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '나가기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          router.push('/');
        },
      },
    });
  };

  const isSubmitDisabled = isEmptyStringOrNil(topic);

  return (
    <div className={styles.mainStyle}>
      <div className={styles.headerStyle}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem
              href="/"
              onClick={
                !isEmptyStringOrNil(topic)
                  ? handleHomeBreadcrumbClick
                  : undefined
              }
            />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="submit"
          size="large"
          variant="primary"
          leftAddon={<Icon name="twinkle" />}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitDisabled}
        >
          생성하기
        </Button>
      </div>

      <Spacing size={80} />

      <GradientAnimatedTitle>어떤 글을 생성할까요?</GradientAnimatedTitle>

      <AnimatedContainer>
        <form className={styles.contentStyle}>
          {/* 주제 */}
          <section className={styles.sectionStyle}>
            <TextField id="topic">
              <TextField.Label variant="required">주제</TextField.Label>
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <TextField.Input
                    {...field}
                    placeholder="주제를 적어주세요"
                    maxLength={5000}
                  />
                )}
              />
            </TextField>
          </section>

          {/* 목적 */}
          <section className={styles.sectionStyle}>
            <Label variant="default">목적</Label>
            <Controller
              name="purpose"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioCards value={value} onChange={onChange} columns={4}>
                  {PURPOSE_OPTIONS.map(({ value, icon, label }) => (
                    <RadioCards.Item
                      key={value}
                      value={value}
                      leftAddon={<RadioCards.Icon name={icon} size={24} />}
                    >
                      <RadioCards.Label>{label}</RadioCards.Label>
                    </RadioCards.Item>
                  ))}
                </RadioCards>
              )}
            />
          </section>

          {/* 생성 방식 */}
          <section className={styles.sectionStyle}>
            <Label>생성 방식</Label>
            <Controller
              name="reference"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioCards value={value} onChange={onChange} columns={3}>
                  {REFERENCE_OPTIONS.map(
                    ({ value, icon, label, description }) => (
                      <RadioCards.Item
                        key={value}
                        value={value}
                        leftAddon={<RadioCards.Icon name={icon} size={24} />}
                      >
                        <RadioCards.Label>{label}</RadioCards.Label>
                        <RadioCards.Description>
                          {description}
                        </RadioCards.Description>
                      </RadioCards.Item>
                    )
                  )}
                </RadioCards>
              )}
            />
            {reference === REFERENCE_TYPE.IMAGE && (
              <Controller
                name="imageUrls"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ImageManager.TypeA value={value} onChange={onChange} />
                )}
              />
            )}
          </section>

          {/* 조건부 렌더링 섹션들 */}
          {reference === REFERENCE_TYPE.NEWS && (
            <section className={styles.sectionStyle}>
              <Label variant="required">뉴스 카테고리</Label>
              <Controller
                name="newsCategory"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <KeywordChipGroup
                    items={newsCategories.data.map((category) => ({
                      key: category.category,
                      label: category.name,
                    }))}
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </section>
          )}

          {/* 본문 길이 */}
          <section className={styles.sectionStyle}>
            <Label>본문 길이</Label>
            <Controller
              name="length"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioCards value={value} onChange={onChange} columns={3}>
                  {LENGTH_OPTIONS.map(
                    ({ value, label, description, badge }) => (
                      <RadioCards.Item key={value} value={value}>
                        <RadioCards.Badge>{badge}</RadioCards.Badge>
                        <RadioCards.Label>{label}</RadioCards.Label>
                        <RadioCards.Description>
                          {description}
                        </RadioCards.Description>
                      </RadioCards.Item>
                    )
                  )}
                </RadioCards>
              )}
            />
          </section>

          {/* 핵심 내용 */}
          <section className={styles.sectionStyle}>
            <TextField id="content">
              <TextField.Label variant="optional">핵심 내용</TextField.Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextField.Input
                    {...field}
                    placeholder="본문에 꼭 포함되어야 하는 문구나 요구 사항을 적어주세요"
                    maxLength={5000}
                  />
                )}
              />
            </TextField>
          </section>
        </form>
      </AnimatedContainer>
    </div>
  );
}
