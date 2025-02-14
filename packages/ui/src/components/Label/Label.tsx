import { forwardRef, LabelHTMLAttributes, ReactNode } from 'react';
import { Text } from '../Text/Text';
import {
  labelStyle,
  labelWrapperStyle,
  requiredStyle,
  optionalStyle,
} from './Label.css';

export type LabelVariant = 'default' | 'required' | 'optional';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: LabelVariant;
  description?: ReactNode;
};

const LABEL_CLASS = {
  default: undefined,
  required: requiredStyle,
  optional: optionalStyle,
} as const;

/**
 * 폼 요소의 레이블을 표시하는 컴포넌트입니다.
 *
 * @example
 * // 기본 사용
 * <Label>이름</Label>
 *
 * // 필수 항목
 * <Label variant="required">이름</Label>
 *
 * // 선택 항목
 * <Label variant="optional">이름</Label>
 *
 * // 설명 추가
 * <Label
 *   description="2~10자 이내로 입력해주세요"
 * >
 *   이름
 * </Label>
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { children, variant = 'default', description, className = '', ...props },
    ref
  ) => {
    return (
      <div className={labelWrapperStyle}>
        <label
          ref={ref}
          className={`${labelStyle} ${LABEL_CLASS[variant]} ${className}`}
          aria-required={variant === 'required'}
          {...props}
        >
          {children}
          {variant === 'required' && (
            <Text
              as="span"
              fontSize={20}
              fontWeight="semibold"
              color="primary600"
            >
              *
            </Text>
          )}
          {variant === 'optional' && (
            <Text as="span" fontSize={16} fontWeight="semibold" color="grey300">
              선택
            </Text>
          )}
        </label>
        {description && (
          <Text fontSize={16} fontWeight="medium" color="grey400">
            {description}
          </Text>
        )}
      </div>
    );
  }
);

Label.displayName = 'Label';
