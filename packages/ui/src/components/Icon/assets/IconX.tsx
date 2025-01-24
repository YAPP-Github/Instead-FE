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
      d="M6 6L27 27"
      stroke="#A3ADBD"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M27 6L6 26"
      stroke="#A3ADBD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default IconX;
