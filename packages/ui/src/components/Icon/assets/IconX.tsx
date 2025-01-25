import type { SVGProps } from 'react';

interface IconXProps extends React.SVGProps<SVGSVGElement> {}

const IconX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 8.5L24.5 24.5"
      stroke="#A3ADBD"
      stroke-width="3.04762"
      stroke-linecap="round"
    />
    <path
      d="M24.5 8.5L8.5 23.7381"
      stroke="#A3ADBD"
      stroke-width="3.04762"
      stroke-linecap="round"
    />
  </svg>
);

export default IconX;
