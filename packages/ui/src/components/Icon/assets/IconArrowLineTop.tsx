import type { SVGProps } from 'react';

interface IconArrowLineTopProps extends React.SVGProps<SVGSVGElement> {}

const IconArrowLineTop = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.0858 15.3737C20.0858 15.7187 19.9508 16.0637 19.6958 16.3337C19.4428 16.5856 19.1003 16.7271 18.7433 16.7271C18.3863 16.7271 18.0438 16.5856 17.7908 16.3337L11.9858 10.5287L6.19578 16.3337C5.94278 16.5856 5.60029 16.7271 5.24328 16.7271C4.88626 16.7271 4.54378 16.5856 4.29078 16.3337C4.03888 16.0807 3.89746 15.7383 3.89746 15.3812C3.89746 15.0242 4.03888 14.6817 4.29078 14.4287L11.0408 7.67873C11.2938 7.42684 11.6363 7.28542 11.9933 7.28542C12.3503 7.28542 12.6928 7.42684 12.9458 7.67873L19.6958 14.4287C19.9508 14.6837 20.0858 15.0287 20.0858 15.3737Z"
      fill="#A3ADBD"
    />
  </svg>
);

export default IconArrowLineTop;
