import type { MutableRefObject, LegacyRef, ForwardedRef, Ref } from 'react';

export function mergeRefs<T>(
  ...refs: Array<
    | MutableRefObject<T>
    | LegacyRef<T>
    | ForwardedRef<T>
    | Ref<T>
    | undefined
    | null
  >
): Ref<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
