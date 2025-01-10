import { useRef, useCallback, useEffect } from 'react';

type UseTimerParameters = {
  onTimerEnd?: () => void;
  timeoutSecond?: number;
};

export function useTimer({
  onTimerEnd,
  timeoutSecond = 3000,
}: UseTimerParameters) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const startCurrentTimer = useCallback(() => {
    if (!onTimerEnd) {
      return;
    }

    timerRef.current = setTimeout(() => {
      onTimerEnd();
    }, timeoutSecond);
  }, [timeoutSecond, onTimerEnd]);

  const clearCurrentTimeout = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerRef]);

  return {
    startCurrentTimer,
    clearCurrentTimeout,
  };
}
