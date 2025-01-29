import type { SVGProps } from 'react';

interface IconArrowBottomProps extends React.SVGProps<SVGSVGElement> {}

const IconArrowBottom = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.8986 8.63847C3.8986 8.29347 4.0336 7.94847 4.2886 7.67847C4.5416 7.42658 4.88408 7.28516 5.2411 7.28516C5.59811 7.28516 5.9406 7.42658 6.1936 7.67847L11.9986 13.4835L17.7886 7.67847C18.0416 7.42658 18.3841 7.28516 18.7411 7.28516C19.0981 7.28516 19.4406 7.42658 19.6936 7.67847C19.9455 7.93147 20.0869 8.27395 20.0869 8.63097C20.0869 8.98799 19.9455 9.33047 19.6936 9.58347L12.9436 16.3335C12.6906 16.5854 12.3481 16.7268 11.9911 16.7268C11.6341 16.7268 11.2916 16.5854 11.0386 16.3335L4.2886 9.58347C4.0336 9.32847 3.8986 8.98347 3.8986 8.63847Z"
      fill="#A3ADBD"
    />
  </svg>
);

export default IconArrowBottom;
