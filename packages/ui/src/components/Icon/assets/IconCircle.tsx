import type { SVGProps } from 'react';

interface IconCircleProps extends React.SVGProps<SVGSVGElement> {}

const IconCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="6" cy="6" r="6" fill="#788391" />
  </svg>
);

export default IconCircle;
