'use client';

import {
  ComponentProps,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { overlay } from 'overlay-kit';
import { Modal } from '../components/Modal/Modal';
import type { ModalProps } from '../components/Modal/Modal';
import { isNotNil } from '../utils';

type AlertOptions = Omit<
  ModalProps,
  'open' | 'onClose' | 'onExited' | 'children' | 'cta'
> & {
  title: string;
  description?: string;
  alertButton?: string | ReactElement;
  alertButtonProps?: ComponentProps<typeof Modal.CTA>;
};

type AsyncAlertOptions = AlertOptions & {
  onAlertClick?: () => Promise<void>;
};

type ConfirmOptions = Omit<
  ModalProps,
  'open' | 'onClose' | 'onExited' | 'children' | 'doubleCTA'
> & {
  title: string;
  description?: string;
  confirmButton?: string | ReactElement;
  cancelButton?: string | ReactElement;
  confirmButtonProps?: ComponentProps<typeof Modal.DoubleCTA>['confirmProps'];
  cancelButtonProps?: ComponentProps<typeof Modal.DoubleCTA>['cancelProps'];
  closeOnDimmerClick?: boolean;
};

type AsyncConfirmOptions = ConfirmOptions & {
  onConfirmClick?: () => Promise<void>;
  onCancelClick?: () => Promise<void>;
};

/**
 * 모달을 쉽게 관리할 수 있는 훅입니다.
 *
 * @example
 * // 기본 Alert 모달
 * modal.alert({
 *   title: '알림',
 *   description: '작업이 완료되었습니다.',
 *   icon: <Modal.Icon name="notice" color="primary500" />,
 *   alertButton: '확인',
 * });
 *
 * // 비동기 Alert 모달
 * const result = modal.asyncAlert({
 *   title: '비동기 작업 중',
 *   description: '잠시만 기다려주세요...',
 *   icon: <Modal.Icon name="notice" color="grey500" />,
 *   alertButton: '확인',
 *   onAlertClick: async () => {
 *     await new Promise((resolve) => setTimeout(resolve, 1000));
 *     // 작업 완료 후 처리
 *   },
 * });
 *
 * if (await result) {
 *   console.log('작업 완료');
 * }
 *
 * // 기본 Confirm 모달
 * modal.confirm({
 *   title: '정말 나가시겠어요?',
 *   description: '이 페이지를 나가면\n작성한 내용은 저장되지 않아요',
 *   icon: <Modal.Icon name="notice" color="warning500" />,
 *   confirmButton: '나가기',
 *   cancelButton: '취소',
 * });
 *
 * // 비동기 Confirm 모달
 * const result = modal.asyncConfirm({
 *   title: '변경사항을 저장하시겠습니까?',
 *   description: '저장하지 않은 변경사항은 모두 사라집니다.',
 *   icon: <Modal.Icon name="notice" color="warning500" />,
 *   confirmButton: '저장',
 *   cancelButton: '취소',
 *   onConfirmClick: async () => {
 *     await new Promise((resolve) => setTimeout(resolve, 1000));
 *   },
 *   onCancelClick: async () => {
 *     await new Promise((resolve) => setTimeout(resolve, 500));
 *   },
 * });
 *
 * if (await result) {
 *   console.log('저장');
 * } else {
 *   console.log('취소');
 * }
 *
 * // 커스텀 모달
 * const CustomModalContent = () => (
 *   <>
 *     <Modal.Icon name="stack" color="grey900" />
 *     <Modal.Title>커스텀 모달</Modal.Title>
 *     <Modal.Description>
 *       원하는 대로 모달 내용을 구성할 수 있습니다.
 *     </Modal.Description>
 *     <Modal.DoubleCTA
 *       confirmProps={{
 *         children: '확인',
 *         variant: 'primary',
 *         size: 'large',
 *       }}
 *       cancelProps={{
 *         children: '취소',
 *       }}
 *     />
 *   </>
 * );
 *
 * modal.custom(<CustomModalContent />, {
 *   isCloseOnDimmerClick: true,
 * });
 *
 */
export function useModal() {
  const alert = useCallback(
    ({ alertButton = '확인', ...options }: AlertOptions) => {
      const { onClick: alertOnClick, ...restAlertProps } =
        options.alertButtonProps || {};

      return overlay.open(({ isOpen, close, unmount }) => (
        <Modal
          open={isOpen}
          onClose={close}
          onExited={unmount}
          cta={
            <Modal.CTA
              onClick={(e) => {
                if (alertOnClick) {
                  alertOnClick(e);
                }
                close();
              }}
              {...restAlertProps}
            >
              {alertButton}
            </Modal.CTA>
          }
          {...options}
        >
          <Modal.Title>{options.title}</Modal.Title>
          {isNotNil(options.description) && (
            <Modal.Description>{options.description}</Modal.Description>
          )}
        </Modal>
      ));
    },
    []
  );

  const asyncAlert = useCallback(
    ({ alertButton = '확인', ...options }: AsyncAlertOptions) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => {
          const [isAlertLoading, setIsAlertLoading] = useState(false);

          return (
            <Modal
              open={isOpen}
              onClose={() => {
                resolve(false);
                close();
              }}
              cta={
                <Modal.CTA
                  onClick={async () => {
                    setIsAlertLoading(true);
                    if (isNotNil(options.onAlertClick)) {
                      await options.onAlertClick();
                    }
                    setIsAlertLoading(false);
                    resolve(true);
                    close();
                  }}
                  isLoading={isAlertLoading}
                  {...options.alertButtonProps}
                >
                  {alertButton}
                </Modal.CTA>
              }
              {...options}
            >
              <Modal.Title>{options.title}</Modal.Title>
              {isNotNil(options.description) && (
                <Modal.Description>{options.description}</Modal.Description>
              )}
            </Modal>
          );
        });
      });
    },
    []
  );

  const confirm = useCallback(
    ({
      confirmButton = '확인',
      cancelButton = '취소',
      ...options
    }: ConfirmOptions) => {
      const { onClick: confirmOnClick, ...restConfirmProps } =
        options.confirmButtonProps || {};
      const { onClick: cancelOnClick, ...restCancelProps } =
        options.cancelButtonProps || {};

      return overlay.open(({ isOpen, close, unmount }) => (
        <Modal
          open={isOpen}
          onClose={close}
          onExited={unmount}
          isCloseOnDimmerClick={options.closeOnDimmerClick}
          doubleCTA={
            <Modal.DoubleCTA
              confirmProps={{
                children: confirmButton,
                onClick: (e) => {
                  if (confirmOnClick) {
                    confirmOnClick(e);
                  }
                  close();
                },
                ...restConfirmProps,
              }}
              cancelProps={{
                children: cancelButton,
                onClick: (e) => {
                  if (cancelOnClick) {
                    cancelOnClick(e);
                  }
                  close();
                },
                ...restCancelProps,
              }}
            />
          }
          {...options}
        >
          <Modal.Title>{options.title}</Modal.Title>
          {isNotNil(options.description) && (
            <Modal.Description>{options.description}</Modal.Description>
          )}
        </Modal>
      ));
    },
    []
  );

  const asyncConfirm = useCallback(
    ({
      confirmButton = '확인',
      cancelButton = '취소',
      ...options
    }: AsyncConfirmOptions) => {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, close }) => {
          const [isConfirmLoading, setIsConfirmLoading] = useState(false);
          const [isCancelLoading, setIsCancelLoading] = useState(false);

          return (
            <Modal
              open={isOpen}
              onClose={() => {
                resolve(false);
                close();
              }}
              isCloseOnDimmerClick={options.closeOnDimmerClick}
              doubleCTA={
                <Modal.DoubleCTA
                  confirmProps={{
                    children: confirmButton,
                    onClick: async () => {
                      setIsConfirmLoading(true);
                      if (isNotNil(options.onConfirmClick)) {
                        await options.onConfirmClick();
                      }
                      setIsConfirmLoading(false);
                      resolve(true);
                      close();
                    },
                    isLoading: isConfirmLoading,
                    ...options.confirmButtonProps,
                  }}
                  cancelProps={{
                    children: cancelButton,
                    onClick: async () => {
                      setIsCancelLoading(true);
                      if (isNotNil(options.onCancelClick)) {
                        await options.onCancelClick();
                      }
                      setIsCancelLoading(false);
                      resolve(false);
                      close();
                    },
                    isLoading: isCancelLoading,
                    ...options.cancelButtonProps,
                  }}
                />
              }
              {...options}
            >
              <Modal.Title>{options.title}</Modal.Title>
              {isNotNil(options.description) && (
                <Modal.Description>{options.description}</Modal.Description>
              )}
            </Modal>
          );
        });
      });
    },
    []
  );

  const custom = useCallback(
    (
      content: ReactNode,
      options: Omit<
        ModalProps,
        'open' | 'onClose' | 'onExited' | 'children'
      > = {}
    ) => {
      return overlay.open(({ isOpen, close, unmount }) => (
        <Modal open={isOpen} onClose={close} onExited={unmount} {...options}>
          {content}
        </Modal>
      ));
    },
    []
  );

  return {
    alert,
    asyncAlert,
    confirm,
    asyncConfirm,
    custom,
  };
}
