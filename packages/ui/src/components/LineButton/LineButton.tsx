import { Button, ButtonProps } from '@repo/ui/Button';
import { motion } from 'motion/react';
import { button, gradient, wrapper } from './LineButton.css';
import { forwardRef } from 'react';

const backgroundVariants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: 2, ease: 'linear', repeat: Infinity },
  },
};

export const LineButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
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
      >
        <motion.div className={gradient} variants={backgroundVariants} />
        <Button
          ref={ref}
          className={button}
          size={size}
          variant="line"
          {...rest}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

LineButton.displayName = 'LineButton';
