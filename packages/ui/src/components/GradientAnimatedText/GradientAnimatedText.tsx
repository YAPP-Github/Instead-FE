import * as styles from './GradientAnimatedText.css';
import { ReactNode, forwardRef, ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

export type GradientAnimatedTextProps = {
  children: ReactNode;
  asChild?: boolean;
} & ComponentPropsWithoutRef<'h1'>;

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
        <div className={`${styles.gradientTitleStyle} ${className}`} {...props}>
          {children}
        </div>
      </Slot>
    );
  }

  return (
    <h1
      ref={ref}
      className={`${styles.gradientTitleStyle} ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
});

GradientAnimatedText.displayName = 'GradientAnimatedText';
