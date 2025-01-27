import { forwardRef } from 'react';
import * as styles from './Spinner.css';

export type SpinnerProps = {
  color?: 'black' | 'white';
  size?: 'small' | 'large';
};

/**
 * @param {SpinnerProps} props - 스피너 속성
 * @property {color} [color='white'] - 'black' | 'white' 스피너 색상
 * @property {size} [size='small'] - 'small' | 'large' 스피너 크기
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ color = 'white', size = 'small' }, ref) => {
    return (
      <div ref={ref} className={styles.spinnerRecipe({ size })}>
        <svg
          className={styles.svg}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.circleRecipe({ color })}
            cx="12"
            cy="12"
            r="10"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
