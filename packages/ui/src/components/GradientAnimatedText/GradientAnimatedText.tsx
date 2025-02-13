import { motion, HTMLMotionProps } from 'motion/react';
import * as styles from './GradientAnimatedText.css';
import { ReactNode, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

export type GradientAnimatedTextProps = {
  children: ReactNode;
  asChild?: boolean;
} & HTMLMotionProps<'h1'>;

/**
 * 그라디언트 애니메이션이 적용된 텍스트 컴포넌트입니다.
 *
 * @example
 * // 기본 사용 (h1)
 * <GradientAnimatedText>제목</GradientAnimatedText>
 *
 * // 다른 태그로 사용
 * <GradientAnimatedText asChild>
 *   <Text.P>제목</Text.P>
 * </GradientAnimatedText>
 *
 */
export const GradientAnimatedText = forwardRef<
  HTMLHeadingElement,
  GradientAnimatedTextProps
>(({ children, asChild, className = '', ...props }, ref) => {
  if (asChild) {
    return (
      <Slot ref={ref}>
        <motion.div
          className={`${styles.gradientTitleStyle} ${className}`}
          initial={{
            y: '35vh',
            scale: 2,
            x: '-50%',
            left: '50%',
            position: 'absolute',
          }}
          animate={{
            y: 0,
            scale: 1,
            x: 0,
            left: 'auto',
            position: 'relative',
          }}
          transition={{
            type: 'spring',
            duration: 0.6,
            bounce: 0.22,
          }}
          {...props}
        >
          {children}
        </motion.div>
      </Slot>
    );
  }

  return (
    <motion.h1
      ref={ref}
      className={`${styles.gradientTitleStyle} ${className}`}
      initial={{
        y: '35vh',
        scale: 2,
        x: '-50%',
        left: '50%',
        position: 'absolute',
      }}
      animate={{
        y: 0,
        scale: 1,
        x: 0,
        left: 'auto',
        position: 'relative',
      }}
      transition={{
        type: 'spring',
        duration: 0.6,
        bounce: 0.22,
      }}
      {...props}
    >
      {children}
    </motion.h1>
  );
});

GradientAnimatedText.displayName = 'GradientAnimatedText';
