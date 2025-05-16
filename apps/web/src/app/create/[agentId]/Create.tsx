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
  FixedBottomCTA,
} from '@repo/ui';
import { AnimatedTitle } from './_components/AnimatedTitle/AnimatedTitle';
import { ImageManager, MainBreadcrumbItem } from '@web/components/common';
import { KeywordChipGroup } from './_components/KeywordChip/KeywordChipGroup';
import { AnimatedContainer } from './_components/AnimatedContainer/AnimatedContainer';
import { useForm, Controller } from 'react-hook-form';
import { isEmptyStringOrNil } from '@web/utils';
import { CreateFormValues, CreatePageProps } from './types';
import {
  REFERENCE_TYPE,
  PURPOSE_OPTIONS,
  REFERENCE_OPTIONS,
} from './constants';
import * as styles from './pageStyle.css';
import { useModal } from '@repo/ui/hooks';
import { useRouter } from 'next/navigation';
import { useNewsCategoriesQuery } from '@web/store/query/useNewsCategoriesQuery';
import { isNotNil } from '@repo/ui/utils';
import { NavBar } from '@web/components/common';
import { useScroll } from '@web/hooks';
import { useCreatePostsMutation } from '@web/store/mutation/useCreatePostsMutation';
import { uploadImages } from '@web/shared/image-upload/ImageUpload';
import { ROUTES } from '@web/routes';

const REQUIRED_FIELDS = {
  TOPIC: 'topic',
} as const;

export default function Create({ params }: CreatePageProps) {
  const { data: newsCategories } = useNewsCategoriesQuery();
  const { mutate: createPosts, isPending } = useCreatePostsMutation({
    agentId: params.agentId,
  });
  const modal = useModal();
  const router = useRouter();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const { watch, control, handleSubmit, setValue } = useForm<CreateFormValues>({
    defaultValues: {
      topic: '',
      purpose: 'INFORMATION',
      reference: 'NONE',
      newsCategory: newsCategories.data[0]?.category ?? undefined,
      imageUrls: [],
      length: 'SHORT',
      content: '',
    },
    mode: 'onChange',
  });

  const topic = watch(REQUIRED_FIELDS.TOPIC);
  const reference = watch('reference');
  const imageUrls = watch('imageUrls');

  const onSubmit = async (data: CreateFormValues) => {
    const requestData: CreateFormValues = {
      ...data,
      newsCategory:
        data.reference === REFERENCE_TYPE.NEWS ? data.newsCategory : undefined,
      imageUrls: data.reference === REFERENCE_TYPE.IMAGE ? data.imageUrls : [],
    };

    createPosts(requestData);
  };

  const isSubmitDisabled = isEmptyStringOrNil(topic);

  const handleImageUpload = async (files: File[]) => {
    const uploadedUrls = await uploadImages(files);
    setValue('imageUrls', uploadedUrls);
  };

  const handleImageRemove = (url: string) => {
    setValue(
      'imageUrls',
      isNotNil(imageUrls) ? imageUrls.filter((prevUrl) => prevUrl !== url) : []
    );
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
          router.push(ROUTES.HOME.DETAIL(params.agentId));
        },
      },
    });
  };

  return (
    <>
      <div className={styles.mainStyle} ref={scrollRef}>
        <NavBar
          leftAddon={
            <Breadcrumb>
              <Breadcrumb.Item>
                <MainBreadcrumbItem
                  href={ROUTES.HOME.DETAIL(params.agentId)}
                  onClick={
                    !isEmptyStringOrNil(topic)
                      ? handleHomeBreadcrumbClick
                      : undefined
                  }
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          }
          isScrolled={isScrolled}
        />

        <Spacing size={80} />

        <AnimatedTitle>어떤 글을 생성할까요?</AnimatedTitle>

        <AnimatedContainer>
          <form className={styles.contentStyle}>
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
                  render={({ field: { value } }) => (
                    <ImageManager
                      value={value}
                      onUpload={handleImageUpload}
                      onRemove={handleImageRemove}
                    />
                  )}
                />
              )}
            </section>

            {/* 뉴스 카테고리 */}
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
                  <RadioCards
                    value={value}
                    onChange={onChange}
                    columns={PURPOSE_OPTIONS.length}
                  >
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
      <FixedBottomCTA
        type="submit"
        leftAddon={<Icon name="twinkle" />}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitDisabled}
        isLoading={isPending}
      >
        생성하기
      </FixedBottomCTA>
    </>
  );
}
