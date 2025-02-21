import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@repo/theme/styles';
import '@repo/ui/styles';
import { Providers } from '../components/providers/Providers';
import { AccessRestriction } from '@web/components/common/AccessRestriction/AccessRestriction';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = {
  title: 'instead',
  description: '피드 생성부터 업로드까지 완전 자동화의 시작',
  openGraph: {
    title: 'instead',
    description:
      'SNS 글 자동 생성 및 업로드. 원하는 주제만 입력하면 최신 뉴스와 트렌드를 반영해 SNS 글을 한 번에 최대 25개까지 자동 생성해요. 생성된 글을 원하는 스타일로 수정 및 업그레이드할 수 있으며, 최적의 시간에 자동 업로드까지 지원해요.',
    url: 'https://instd.io',
    siteName: 'instead.io',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <Providers>
          <AccessRestriction>{children}</AccessRestriction>
        </Providers>
      </body>
    </html>
  );
}
