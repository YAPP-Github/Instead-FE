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
    description: '피드 생성부터 업로드까지 완전 자동화의 시작',
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
    // 라이트모드/다크모드 각각 다른 파비콘 적용
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    // 브라우저 단축 아이콘 (shortcut icon)도 동일하게 적용 가능
    shortcut: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    // iOS 터치 아이콘 (애플 아이콘)
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
