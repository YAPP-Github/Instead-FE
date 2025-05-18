import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';
import {
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react';
import { ToastIcon } from './compounds/Icon/Icon';
import * as styles from './Toast.css';
import { useTimer } from './hooks/useTimer';
import { mergeRefs } from '../../utils';

export type ToastType = 'default' | 'success' | 'error';

export type ToastProps = {
  /**
   * 토스트 타입
   * @default 'default'
   */
  toastType?: ToastType;
  /**
   * 토스트 위치
   * @default 'bottom'
   */
  toastPosition?: 'top' | 'bottom';
  /**
   * 왼쪽 추가 요소 (아이콘 등)
   */
  leftAddon?: ReactNode;
  /**
   * 토스트 지속 시간
   * @default 2000
   */
  duration?: number;
  /**
   * 자식 요소
   */
  children?: ReactNode;
  /**
   * 토스트 열기 여부
   */
  open: boolean;
  /**
   * 토스트가 열릴 때 호출되는 함수
   */
  onOpen?: VoidFunction;
  /**
   * 토스트가 닫힐 때 호출되는 함수
   */
  onClose?: VoidFunction;
  /**
   * 토스트가 완전히 닫힌 후 호출되는 함수
   */
  onExited?: VoidFunction;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

const ToastComponent = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      toastType = 'default',
      toastPosition = 'top',
      leftAddon,
      duration = 2000,
      children,
      open,
      onOpen,
      onClose,
      onExited,
      style: toastStyle,
      ...restProps
    },
    ref
  ) => {
    const { startCurrentTimer, clearCurrentTimeout } = useTimer({
      onTimerEnd: onClose,
      timeoutSecond: duration,
    });
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (open) {
        onOpen?.();
        startCurrentTimer();
        toastRef.current?.focus();
      }
    }, [open, onOpen, startCurrentTimer]);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    return (
      <AnimatePresence onExitComplete={onExited}>
        {open && (
          <motion.div
            ref={mergeRefs(ref, toastRef)}
            className={styles.container({ toastPosition })}
            initial={{
              y: toastPosition === 'top' ? '-120%' : '120%',
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: toastPosition === 'top' ? '-120%' : '120%',
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 400,
              opacity: {
                duration: 0.15,
                ease: 'easeInOut',
              },
            }}
            onPointerEnter={clearCurrentTimeout}
            onPointerLeave={startCurrentTimer}
            style={{
              ...toastStyle,
            }}
            role="alert"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            {...restProps}
          >
            <div className={styles.content}>
              {leftAddon ?? (
                <ToastIcon toastType={toastType} aria-hidden="true" />
              )}
              <span className={styles.message}>{children}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

type ToastComposition = {
  Icon: typeof ToastIcon;
};

export const Toast: ForwardRefExoticComponent<ToastProps> & ToastComposition =
  Object.assign(ToastComponent, {
    Icon: ToastIcon,
  });

Toast.displayName = 'Toast';
