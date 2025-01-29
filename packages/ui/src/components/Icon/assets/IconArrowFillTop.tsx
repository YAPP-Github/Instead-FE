import type { SVGProps } from 'react';

interface IconArrowFillTopProps extends React.SVGProps<SVGSVGElement> {}

const IconArrowFillTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.652 5.3568C9.04367 4.73013 9.95633 4.73013 10.348 5.3568L16.0437 14.47C16.46 15.136 15.9812 16 15.1958 16H3.80425C3.01881 16 2.53997 15.136 2.95625 14.47L8.652 5.3568Z"
      fill="#5A6471"
    />
  </svg>
);

export default IconArrowFillTop;
