import { TextFieldRoot } from './TextFieldRoot';
import { TextFieldLabel } from './TextFieldLabel';
import { TextFieldInput } from './TextFieldInput';
import { TextFieldSubmit } from './TextFieldSubmit';

/**
 *
 * @example
 * // 1. 기본값이 있는 비제어 컴포넌트
 * <TextField variant="button">
 *   <TextField.Label>메시지</TextField.Label>
 *   <TextField.Input
 *     placeholder="메시지를 입력하세요"
 *     showCounter
 *     sumbitButton={<TextField.Submit type="submit" />}
 *     {...register('message', {
 *       value: '초기값'
 *     })}
 *   />
 * </TextField>
 *
 * // 2. onChange 이벤트가 필요한 제어 컴포넌트
 * <TextField>
 *   <TextField.Input
 *     {...register('message')}
 *     onChange={(e) => {
 *       register('message').onChange(e);
 *       setValue('message', e.target.value);
 *     }}
 *   />
 * </TextField>
 *
 * // 3. 유효성 검사와 에러 상태를 포함한 컴포넌트
 * <TextField error={!!errors.message}>
 *   <TextField.Input
 *     {...register('message', {
 *       required: '메시지를 입력해주세요',
 *       maxLength: {
 *         value: 500,
 *         message: '최대 500자까지 입력 가능합니다'
 *       }
 *     })}
 *   />
 * </TextField>
 */
export const TextField = Object.assign(TextFieldRoot, {
  Label: TextFieldLabel,
  Input: TextFieldInput,
  Submit: TextFieldSubmit,
});

export type { TextFieldProps } from './TextFieldRoot';
export type { TextFieldLabelProps } from './TextFieldLabel';
export type { TextFieldInputProps } from './TextFieldInput';
export type { TextFieldSubmitProps } from './TextFieldSubmit';
export type { TextFieldCounterProps } from './TextFieldCounter';
