'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, forwardRef, useCallback, useEffect } from 'react';
import { FocusTrap } from './FocusTrap';
import { Dimmer } from './Dimmer';
import * as styles from './Modal.css';
import { PortalConsumer } from '@/provider';

export type ModalProps = {
  /**
   * 모달 열기 여부
   */
  open: boolean;
  /**
   * 모달이 열릴 때 호출되는 함수
   */
  onOpen?: VoidFunction;
  /**
   * 모달이 닫힐 때 호출되는 함수
   */
  onClose?: VoidFunction;
  /**
   * 모달이 완전히 닫힌 후 호출되는 함수
   */
  onExited?: VoidFunction;
  /**
   * 모달 배경 클릭 시 호출되는 함수
   */
  onDimmerClick?: VoidFunction;
  /**
   * 모달 배경 클릭 시 모달 닫힘 여부
   */
  isCloseOnDimmerClick?: boolean;
  /**
   * 모달 배경 표시 여부
   */
  showDimmer?: boolean;
  /**
   * 아이콘 컴포넌트
   */
  icon?: ReactNode;
  /**
   * CTA 버튼
   */
  cta?: ReactNode;
  /**
   * Double CTA 버튼들
   */
  doubleCTA?: ReactNode;
  /**
   * 자식 요소
   */
  children?: ReactNode;
};

export const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpen,
      onClose,
      onExited,
      onDimmerClick,
      isCloseOnDimmerClick = true,
      showDimmer = true,
      icon,
      cta,
      doubleCTA,
      children,
    },
    ref
  ) => {
    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      },
      [onClose]
    );

    const handleDimmerClick = useCallback(() => {
      onDimmerClick?.();
      if (isCloseOnDimmerClick) {
        onClose?.();
      }
    }, [onClose, onDimmerClick, isCloseOnDimmerClick]);

    useEffect(() => {
      if (!open) return;

      onOpen?.();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, onOpen, handleEscape]);

    return (
      <PortalConsumer>
        <AnimatePresence onExitComplete={onExited}>
          {open && (
            <>
              {showDimmer && <Dimmer onClick={handleDimmerClick} />}
              <FocusTrap>
                <motion.div
                  ref={ref}
                  className={styles.container}
                  initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
                  transition={{ duration: 0.15 }}
                  role="dialog"
                  aria-modal="true"
                  tabIndex={-1}
                >
                  {icon}
                  <div className={styles.content}>{children}</div>
                  {cta}
                  {doubleCTA}
                </motion.div>
              </FocusTrap>
            </>
          )}
        </AnimatePresence>
      </PortalConsumer>
    );
  }
);
