import type { SVGProps } from 'react';

interface IconArrowLeftProps extends React.SVGProps<SVGSVGElement> {}

const IconArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.3596 3.91227C15.7046 3.91227 16.0496 4.04727 16.3196 4.30227C16.5715 4.55527 16.7129 4.89775 16.7129 5.25477C16.7129 5.61179 16.5715 5.95427 16.3196 6.20727L10.5146 12.0123L16.3196 17.8023C16.5715 18.0553 16.7129 18.3978 16.7129 18.7548C16.7129 19.1118 16.5715 19.4543 16.3196 19.7073C16.0666 19.9592 15.7241 20.1006 15.3671 20.1006C15.0101 20.1006 14.6676 19.9592 14.4146 19.7073L7.66457 12.9573C7.41268 12.7043 7.27126 12.3618 7.27126 12.0048C7.27126 11.6478 7.41268 11.3053 7.66457 11.0523L14.4146 4.30227C14.6696 4.04727 15.0146 3.91227 15.3596 3.91227Z"
      fill="#A3ADBD"
    />
  </svg>
);

export default IconArrowLeft;
