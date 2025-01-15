import { forwardRef, LabelHTMLAttributes } from 'react';
import { Text } from '../Text/Text';
import { labelStyle, requiredStyle, optionalStyle } from './Label.css';

export type LabelVariant = 'default' | 'required' | 'optional';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: LabelVariant;
};

const LABEL_CLASS = {
  default: undefined,
  required: requiredStyle,
  optional: optionalStyle,
} as const;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    return (
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
    );
  }
);

Label.displayName = 'Label';
