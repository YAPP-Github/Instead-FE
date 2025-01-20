import { motion } from 'motion/react';
import { Text, Icon } from '../../components';
import * as styles from './Checkbox.css';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useState,
  KeyboardEvent,
} from 'react';
import { usePress } from '../../hooks';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  /**
   * 체크박스의 선택 상태를 제어합니다.
   * 이 값이 제공되면 제어 컴포넌트로 동작합니다.
   */
  checked?: boolean;

  /**
   * 체크박스의 초기 선택 상태를 설정합니다.
   * 비제어 컴포넌트로 사용할 때만 적용됩니다.
   */
  defaultChecked?: boolean;

  /**
   * 체크박스 상태가 변경될 때 호출되는 콜백 함수입니다.
   * @param checked - 새로운 체크 상태
   */
  onChange?: (checked: boolean) => void;

  /**
   * 체크박스를 비활성화 상태로 만듭니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 체크박스 옆에 표시될 레이블 텍스트입니다.
   */
  label?: string;

  /**
   * 체크박스의 크기를 지정합니다.
   * @default 28
   */
  size?: number;
};

/**
 * @example
 * // 비제어 컴포넌트로 사용하기
 * <Checkbox defaultChecked onChange={(checked) => console.log(checked)} />
 *
 * @example
 * // 제어 컴포넌트로 사용하기
 * const [isChecked, setIsChecked] = useState(false);
 * <Checkbox checked={isChecked} onChange={setIsChecked} />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      disabled,
      label,
      size = 28,
      ...restProps
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const { pressed, pressHandlers } = usePress();
    // checked prop이 제공되면 제어 컴포넌트로, 아니면 비제어 컴포넌트로 내부 상태 사용
    const checkboxState = checked !== undefined ? checked : isChecked;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(event.target.checked);
      }
      onChange?.(event.target.checked);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        if (!disabled) {
          const newValue = !checkboxState;
          if (checked === undefined) {
            setIsChecked(newValue);
          }
          onChange?.(newValue);
        }
      }
    };

    return (
      <label
        className={styles.container({ disabled })}
        {...(!disabled && pressHandlers)}
        aria-disabled={disabled}
        aria-checked={checkboxState}
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          className={styles.checkboxWrapper()}
          initial={false}
          animate={{
            scale: pressed && !disabled ? 0.85 : 1,
            opacity: pressed && !disabled ? 0.7 : 1,
          }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            },
            opacity: {
              duration: 0.1,
            },
          }}
        >
          <input
            type="checkbox"
            ref={ref}
            checked={checkboxState}
            onChange={handleChange}
            disabled={disabled}
            className={styles.input()}
            aria-label={label}
            tabIndex={-1}
            {...restProps}
          />
          <Icon
            name={checkboxState ? 'checkbox' : 'unSelectedCheckbox'}
            size={size}
            color={checkboxState ? 'grey900' : 'grey300'}
            type={checkboxState ? 'fill' : 'stroke'}
            aria-hidden="true"
          />
        </motion.div>
        {label && <Text.Span className={styles.label()}>{label}</Text.Span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
