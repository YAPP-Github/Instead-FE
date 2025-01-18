'use client';

import { Breadcrumb, TextField, Button, Label, Icon, Text } from '@repo/ui';
import Link from 'next/link';
import * as styles from './pageStyle.css';

export default function Home() {
  return (
    <main className={styles.mainStyle}>
      {/* 헤더 */}
      <div className={styles.headerStyle}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/home">
              <Icon name="stack" size={32} color="grey900" />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
          size="large"
          variant="primary"
          leftAddon={<Icon name="twinkle" />}
        >
          생성하기
        </Button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={styles.contentStyle}>
        <Text.H1 className={styles.titleStyle}>어떤 글을 생성할까요?</Text.H1>

        {/* 주제 */}
        <div className={styles.sectionStyle}>
          <TextField id="basic-field">
            <TextField.Label variant="required">주제</TextField.Label>
            <TextField.Input placeholder="주제를 적어주세요" maxLength={5000} />
          </TextField>
        </div>

        {/* 생성 방식 */}
        <div className={styles.sectionStyle}>
          <Label>생성 방식</Label>
        </div>

        {/* 본문 길이 */}
        <div className={styles.sectionStyle}>
          <Label>본문 길이</Label>
        </div>

        {/* 핵심 내용 */}
        <div className={styles.sectionStyle}>
          <TextField id="basic-field">
            <TextField.Label variant="required">주제</TextField.Label>
            <TextField.Input placeholder="주제를 적어주세요" maxLength={5000} />
          </TextField>
        </div>
      </div>
    </main>
  );
}
