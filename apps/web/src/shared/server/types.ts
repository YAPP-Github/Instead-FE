export interface ApiResponse<Data> {
  status: number;
  data: Data;
  timeStamp: string;
}

export const STATUS = {
  SUCCESS: 200,
  UNKNOWN: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  DUPLICATE: 409,
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type Tokens = { accessToken: string; refreshToken: string };
