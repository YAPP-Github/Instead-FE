import ky from 'ky';

const TIMEOUT = 1000 * 30;

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
