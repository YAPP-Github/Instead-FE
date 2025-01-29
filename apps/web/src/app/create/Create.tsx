'use client';

import { TextField, Label, Spacing, RadioCards } from '@repo/ui';
import * as styles from './pageStyle.css';
import { KeywordChipGroup } from './_components/KeywordChip/KeywordChipGroup';
import { useState } from 'react';
import { ImageManager } from './_components/ImageManager/ImageManager';
import { Header } from './_components/Header/Header';
import { AnimatedTitle } from './_components/AnimatedTitle/AnimatedTitle';
import { AnimatedContainer } from './_components/AnimatedContainer/AnimatedContainer';

export default function Create() {
  const [generationType, setGenerationType] = useState('1');

  return (
    <div className={styles.mainStyle}>
      <Header />
      <Spacing size={80} />
      <AnimatedTitle />
      <AnimatedContainer>
        <section className={styles.sectionStyle}>
          {/* 주제 */}
          <TextField id="basic-field">
            <TextField.Label variant="required">주제</TextField.Label>
            <TextField.Input placeholder="주제를 적어주세요" maxLength={5000} />
          </TextField>
        </section>

        {/* 목적 */}
        <section className={styles.sectionStyle}>
          <Label variant="default">목적</Label>
          <RadioCards defaultValue="1" columns={4}>
            <RadioCards.Item
              value="1"
              leftAddon={<RadioCards.Icon name="document" size={24} />}
            >
              <RadioCards.Label>정보 제공</RadioCards.Label>
            </RadioCards.Item>

            <RadioCards.Item
              value="2"
              leftAddon={<RadioCards.Icon name="chat" size={24} />}
            >
              <RadioCards.Label>의견 표출</RadioCards.Label>
            </RadioCards.Item>

            <RadioCards.Item
              value="3"
              leftAddon={<RadioCards.Icon name="smile" size={24} />}
            >
              <RadioCards.Label>공감/유머</RadioCards.Label>
            </RadioCards.Item>

            <RadioCards.Item
              value="4"
              leftAddon={<RadioCards.Icon name="shopping" size={24} />}
            >
              <RadioCards.Label>홍보/마케팅</RadioCards.Label>
            </RadioCards.Item>
          </RadioCards>
        </section>

        {/* 생성 방식 */}
        <section className={styles.sectionStyle}>
          <Label>생성 방식</Label>
          <RadioCards
            defaultValue="1"
            columns={3}
            onChange={(value) => setGenerationType(value)}
          >
            <RadioCards.Item
              value="1"
              leftAddon={<RadioCards.Icon name="pencil" size={24} />}
            >
              <RadioCards.Label>입력된 주제로만 생성</RadioCards.Label>
              <RadioCards.Description>
                주제에 맞는 글을 간단히 생성
              </RadioCards.Description>
            </RadioCards.Item>

            <RadioCards.Item
              value="2"
              leftAddon={<RadioCards.Icon name="stack" size={24} />}
            >
              <RadioCards.Label>최근 뉴스로 글 생성</RadioCards.Label>
              <RadioCards.Description>
                최근 소식/뉴스 기반
              </RadioCards.Description>
            </RadioCards.Item>

            <RadioCards.Item
              value="3"
              leftAddon={<RadioCards.Icon name="picture" size={24} />}
            >
              <RadioCards.Label>이미지를 참고해 글 생성</RadioCards.Label>
              <RadioCards.Description>
                첨부한 이미지 기반
              </RadioCards.Description>
            </RadioCards.Item>
          </RadioCards>
        </section>

        {/* 뉴스 카테고리 - 생성 방식이 '최근 뉴스로 글 생성'일 때만 표시 */}
        {generationType === '2' && (
          <section className={styles.sectionStyle}>
            <Label variant="required">뉴스 카테고리</Label>
            <KeywordChipGroup defaultValue="투자">
              {['투자', '패션', '피트니스', '헬스케어']}
            </KeywordChipGroup>
          </section>
        )}

        {/* 이미지 업로더 - 생성 방식이 '이미지를 참고해 글 생성'일 때만 표시 */}
        {generationType === '3' && (
          <ImageManager maxFileSize={10} maxFiles={5} />
        )}

        {/* 본문 길이 */}
        <section className={styles.sectionStyle}>
          <Label>본문 길이</Label>
          <RadioCards defaultValue="1" columns={3}>
            <RadioCards.Item value="1">
              <RadioCards.Badge>누구나 이용 가능</RadioCards.Badge>
              <RadioCards.Label>짧은 게시물</RadioCards.Label>
              <RadioCards.Description>
                약 1~2문장, 최대 140자
              </RadioCards.Description>
            </RadioCards.Item>
            <RadioCards.Item value="2">
              <RadioCards.Badge>X 유료 구독 전용</RadioCards.Badge>
              <RadioCards.Label>보통 게시물</RadioCards.Label>
              <RadioCards.Description>
                약 3~4문장, 최대 300자
              </RadioCards.Description>
            </RadioCards.Item>
            <RadioCards.Item value="3">
              <RadioCards.Badge>X 유료 구독 전용</RadioCards.Badge>
              <RadioCards.Label>긴 게시물</RadioCards.Label>
              <RadioCards.Description>
                약 7~8문장, 최대 1000자
              </RadioCards.Description>
            </RadioCards.Item>
          </RadioCards>
        </section>

        {/* 핵심 내용 */}
        <section className={styles.sectionStyle}>
          <TextField id="basic-field">
            <TextField.Label variant="optional">핵심 내용</TextField.Label>
            <TextField.Input placeholder="주제를 적어주세요" maxLength={5000} />
          </TextField>
        </section>
      </AnimatedContainer>
    </div>
  );
}
