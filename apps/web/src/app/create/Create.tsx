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
import * as styles from './pageStyle.css';
import { KeywordChipGroup } from './_components/KeywordChip/KeywordChipGroup';
import { AnimatedTitle } from './_components/AnimatedTitle/AnimatedTitle';
import { AnimatedContainer } from './_components/AnimatedContainer/AnimatedContainer';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { isNil } from '@repo/ui/utils';

interface CreateFormValues {
  topic: string;
  purpose: 'INFORMATION' | 'OPINION' | 'HUMOR' | 'MARKETING';
  reference: 'NONE' | 'NEWS' | 'IMAGE';
  newsCategory?: string;
  imageUrls?: string[];
  length: 'SHORT' | 'MEDIUM' | 'LONG';
  content: string;
}

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
    const requestData = {
      ...data,
      newsCategory: data.reference === 'NEWS' ? data.newsCategory : null,
      imageUrls: data.reference === 'IMAGE' ? data.imageUrls : null,
    };

    console.log('폼 데이터:', requestData);
  };

  const isSubmitDisabled = isEmptyStringOrNil(topic);

  return (
    <div className={styles.mainStyle}>
      <div className={styles.headerStyle}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/create">
              <Icon name="stack" size={32} color="grey900" />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
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
      <AnimatedTitle />
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
                  <RadioCards.Item
                    value="INFORMATION"
                    leftAddon={<RadioCards.Icon name="document" size={24} />}
                  >
                    <RadioCards.Label>정보 제공</RadioCards.Label>
                  </RadioCards.Item>

                  <RadioCards.Item
                    value="OPINION"
                    leftAddon={<RadioCards.Icon name="chat" size={24} />}
                  >
                    <RadioCards.Label>의견 표출</RadioCards.Label>
                  </RadioCards.Item>

                  <RadioCards.Item
                    value="HUMOR"
                    leftAddon={<RadioCards.Icon name="smile" size={24} />}
                  >
                    <RadioCards.Label>공감/유머</RadioCards.Label>
                  </RadioCards.Item>

                  <RadioCards.Item
                    value="MARKETING"
                    leftAddon={<RadioCards.Icon name="shopping" size={24} />}
                  >
                    <RadioCards.Label>홍보/마케팅</RadioCards.Label>
                  </RadioCards.Item>
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
                  <RadioCards.Item
                    value="NONE"
                    leftAddon={<RadioCards.Icon name="pencil" size={24} />}
                  >
                    <RadioCards.Label>입력된 주제로만 생성</RadioCards.Label>
                    <RadioCards.Description>
                      주제에 맞는 글을 간단히 생성
                    </RadioCards.Description>
                  </RadioCards.Item>

                  <RadioCards.Item
                    value="NEWS"
                    leftAddon={<RadioCards.Icon name="stack" size={24} />}
                  >
                    <RadioCards.Label>최근 뉴스로 글 생성</RadioCards.Label>
                    <RadioCards.Description>
                      최근 소식/뉴스 기반
                    </RadioCards.Description>
                  </RadioCards.Item>

                  <RadioCards.Item
                    value="IMAGE"
                    leftAddon={<RadioCards.Icon name="picture" size={24} />}
                  >
                    <RadioCards.Label>이미지를 참고해 글 생성</RadioCards.Label>
                    <RadioCards.Description>
                      첨부한 이미지 기반
                    </RadioCards.Description>
                  </RadioCards.Item>
                </RadioCards>
              )}
            />
          </section>

          {/* 조건부 렌더링 섹션들 */}
          {reference === 'NEWS' && (
            <section className={styles.sectionStyle}>
              <Label variant="required">뉴스 카테고리</Label>
              <KeywordChipGroup defaultValue="투자">
                {['투자', '패션', '피트니스', '헬스케어']}
              </KeywordChipGroup>
            </section>
          )}

          {reference === 'IMAGE' && <>ImageManager</>}

          {/* 본문 길이 */}
          <section className={styles.sectionStyle}>
            <Label>본문 길이</Label>
            <Controller
              name="length"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioCards value={value} onChange={onChange} columns={3}>
                  <RadioCards.Item value="SHORT">
                    <RadioCards.Badge>누구나 이용 가능</RadioCards.Badge>
                    <RadioCards.Label>짧은 게시물</RadioCards.Label>
                    <RadioCards.Description>
                      약 1~2문장, 최대 140자
                    </RadioCards.Description>
                  </RadioCards.Item>
                  <RadioCards.Item value="MEDIUM">
                    <RadioCards.Badge>X 유료 구독 전용</RadioCards.Badge>
                    <RadioCards.Label>보통 게시물</RadioCards.Label>
                    <RadioCards.Description>
                      약 3~4문장, 최대 300자
                    </RadioCards.Description>
                  </RadioCards.Item>
                  <RadioCards.Item value="LONG">
                    <RadioCards.Badge>X 유료 구독 전용</RadioCards.Badge>
                    <RadioCards.Label>긴 게시물</RadioCards.Label>
                    <RadioCards.Description>
                      약 7~8문장, 최대 1000자
                    </RadioCards.Description>
                  </RadioCards.Item>
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

type NullableString = string | null | undefined;

function isEmptyStringOrNil(value: NullableString): boolean {
  return isNil(value) || value.trim() === '';
}
