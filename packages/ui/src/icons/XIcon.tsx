import type { SVGProps } from 'react';

export const XIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 7.5L25 24.5"
        stroke="#A3ADBD"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M25 7.5L8 24.5"
        stroke="#A3ADBD"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};
