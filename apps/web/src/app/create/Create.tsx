'use client';

import {
  TextField,
  Label,
  Spacing,
  RadioCards,
  Breadcrumb,
  Icon,
  Button,
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

export default function Create() {
  const { watch, control, handleSubmit } = useForm<CreateFormValues>({
    defaultValues: {
      topic: '',
      purpose: 'INFORMATION',
      reference: 'NONE',
      newsCategory: undefined, // TODO: 백엔드로부터 받는 데이터 타입으로 수정
      imageUrls: [], // TODO: presigned url 받아서 첨부
      length: 'SHORT',
      content: '',
    },
    mode: 'onChange',
  });

  const topic = watch('topic');
  const reference = watch('reference');

  const onSubmit = (data: CreateFormValues) => {
    //TODO: 임시 로직. 이런 식으로 요청해야 함
    // // 1. presigned URL 요청
    // const presignedUrls = await fetchPresignedUrls(data.imageUrls); // 🔹 presigned URL 요청

    // // 2. 파일을 presigned URL로 업로드
    // await Promise.all(
    //   data.imageUrls.map((file, index) =>
    //     uploadFileToPresignedUrl(presignedUrls[index], file)
    //   )
    // );

    const presignedUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ];

    const requestData = {
      ...data,
      newsCategory: data.reference === 'NEWS' ? data.newsCategory : null,
      imageUrls: data.reference === 'IMAGE' ? presignedUrls : null,
    };

    console.log('폼 데이터:', requestData);
  };

  const isSubmitDisabled = isEmptyStringOrNil(topic);

  return (
    <div className={styles.mainStyle}>
      <div className={styles.headerStyle}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <MainBreadcrumbItem href="/create" />
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
                  <ImageManager.TypeA value={value || []} onChange={onChange} />
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
                  <KeywordChipGroup onChange={onChange} defaultValue={value}>
                    {['투자', '패션', '피트니스', '헬스케어']}
                  </KeywordChipGroup>
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
                    placeholder="주제를 적어주세요"
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
