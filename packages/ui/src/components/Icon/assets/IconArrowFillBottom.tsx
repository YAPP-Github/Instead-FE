import type { SVGProps } from 'react';

interface IconArrowFillBottomProps extends React.SVGProps<SVGSVGElement> {}

const IconArrowFillBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.348 14.6432C9.95633 15.2699 9.04367 15.2699 8.652 14.6432L2.95625 5.53C2.53997 4.86395 3.01881 4 3.80425 4L15.1958 4C15.9812 4 16.46 4.86395 16.0438 5.53L10.348 14.6432Z"
      fill="#5A6471"
    />
  </svg>
);

export default IconArrowFillBottom;
