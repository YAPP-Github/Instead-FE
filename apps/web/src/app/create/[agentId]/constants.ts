export const PURPOSE_TYPE = {
  INFORMATION: 'INFORMATION',
  OPINION: 'OPINION',
  HUMOR: 'HUMOR',
  MARKETING: 'MARKETING',
} as const;

export const REFERENCE_TYPE = {
  NONE: 'NONE',
  NEWS: 'NEWS',
  IMAGE: 'IMAGE',
} as const;

export const LENGTH_TYPE = {
  SHORT: 'SHORT',
  MEDIUM: 'MEDIUM',
  LONG: 'LONG',
} as const;

export const PURPOSE_OPTIONS = [
  {
    value: PURPOSE_TYPE.INFORMATION,
    icon: 'document',
    label: '정보 제공',
  },
  {
    value: PURPOSE_TYPE.OPINION,
    icon: 'chat',
    label: '의견 표출',
  },
  {
    value: PURPOSE_TYPE.MARKETING,
    icon: 'shopping',
    label: '홍보/마케팅',
  },
] as const;

export const REFERENCE_OPTIONS = [
  {
    value: REFERENCE_TYPE.NONE,
    icon: 'pencil',
    label: '입력된 주제로만 생성',
    description: '주제에 맞는 글을 간단히 생성',
  },
  {
    value: REFERENCE_TYPE.NEWS,
    icon: 'stack',
    label: '최근 뉴스로 글 생성',
    description: '최근 소식/뉴스 기반',
  },
  {
    value: REFERENCE_TYPE.IMAGE,
    icon: 'picture',
    label: '이미지를 참고해 글 생성',
    description: '첨부한 이미지 기반',
  },
] as const;
