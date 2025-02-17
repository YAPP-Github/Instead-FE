import { ButtonProps } from '@repo/ui/Button';
import { HTMLMotionProps, motion } from 'motion/react';
import { gradient, wrapper } from './LineButtonAnimate.css';
import { forwardRef, ReactNode } from 'react';

const backgroundVariants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: 2, ease: 'linear', repeat: Infinity },
  },
};

export type LineButtonAnimateProps = {
  size: ButtonProps['size'];
  children: ReactNode;
} & Omit<HTMLMotionProps<'div'>, 'ref'>;

export const LineButtonAnimate = forwardRef<
  HTMLDivElement,
  LineButtonAnimateProps
>(
  (
    { size, children, ...rest },

    ref
  ) => {
    return (
      <motion.div
        className={wrapper({ size })}
        initial="rest"
        whileHover="hover"
        ref={ref}
        {...rest}
      >
        <motion.div className={gradient} variants={backgroundVariants} />
        {children}
      </motion.div>
    );
  }
);
