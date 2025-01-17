import {
  forwardRef,
  ComponentPropsWithoutRef,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { TextFieldContext } from './context';
import { textFieldContainerStyle, textFieldStyle } from './TextField.css';
import { TextFieldCounter } from './TextFieldCounter';
import { isNil, mergeRefs } from '@/utils';

export type TextFieldInputProps = {
  maxLength?: number;
  showCounter?: boolean;
  value?: string;
  defaultValue?: string;
} & Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'maxLength' | 'value' | 'defaultValue'
>;

export const TextFieldInput = forwardRef<
  HTMLTextAreaElement,
  TextFieldInputProps
>(
  (
    {
      maxLength = 500,
      showCounter = true,
      value: controlledValue,
      defaultValue,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ''
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { variant, id } = useContext(TextFieldContext);
    const [isMultiline, setIsMultiline] = useState(false);

    const value = controlledValue ?? uncontrolledValue;

    const handleResizeHeight = () => {
      const textarea = textareaRef.current;
      if (isNil(textarea)) return;

      // height 초기화
      textarea.style.height = 'auto';

      // 스크롤 높이에 따라 높이 조절
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;

      // 한 줄 높이 = 상하패딩(32px) + 라인높이(27px) = 59px
      setIsMultiline(newHeight > 59);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) return;
      if (isNil(controlledValue)) {
        setUncontrolledValue(e.target.value);
      }
      handleResizeHeight();
      onChange?.(e);
    };

    useEffect(() => {
      handleResizeHeight();
    }, [value]);

    return (
      <>
        <div className={textFieldContainerStyle({ variant })}>
          <textarea
            rows={1}
            id={id}
            ref={mergeRefs(ref, textareaRef)}
            className={`${textFieldStyle({ variant })} ${className}`}
            value={value}
            onChange={handleChange}
            data-multiline={isMultiline}
            {...props}
          />
        </div>
        {showCounter && (
          <TextFieldCounter current={value.length} max={maxLength} />
        )}
      </>
    );
  }
);

TextFieldInput.displayName = 'TextField.Input';
