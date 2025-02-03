import { isNil } from '@repo/ui/utils';

type NullableString = string | null | undefined;

export function isEmptyStringOrNil(value: NullableString): boolean {
  return isNil(value) || value.trim() === '';
}
