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

export function useModal() {
  const alert = useCallback((options: AlertOptions) => {
    const {
      title,
      description,
      alertButton = '확인',
      alertButtonProps,
      ...otherOptions
    } = options;

    return overlay.open(({ isOpen, close, unmount }) => (
      <Modal
        open={isOpen}
        onClose={close}
        onExited={unmount}
        cta={
          <Modal.CTA onClick={close} {...alertButtonProps}>
            {alertButton}
          </Modal.CTA>
        }
        {...otherOptions}
      >
        <Modal.Title>{title}</Modal.Title>
        {description && <Modal.Description>{description}</Modal.Description>}
      </Modal>
    ));
  }, []);

  const asyncAlert = useCallback((options: AsyncAlertOptions) => {
    const {
      title,
      description,
      alertButton = '확인',
      alertButtonProps,
      onAlertClick,
      ...otherOptions
    } = options;

    return overlay.open(({ isOpen, close, unmount }) => {
      const [isAlertLoading, setIsAlertLoading] = useState(false);

      return (
        <Modal
          open={isOpen}
          onClose={close}
          onExited={unmount}
          cta={
            <Modal.CTA
              onClick={async () => {
                if (onAlertClick) {
                  setIsAlertLoading(true);
                  await onAlertClick();
                  setIsAlertLoading(false);
                }
                close();
              }}
              isLoading={isAlertLoading}
              {...alertButtonProps}
            >
              {alertButton}
            </Modal.CTA>
          }
          {...otherOptions}
        >
          <Modal.Title>{title}</Modal.Title>
          {description && <Modal.Description>{description}</Modal.Description>}
        </Modal>
      );
    });
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => {
    const {
      title,
      description,
      confirmButton = '확인',
      cancelButton = '취소',
      confirmButtonProps,
      cancelButtonProps,
      closeOnDimmerClick = false,
      ...otherOptions
    } = options;

    return overlay.open(({ isOpen, close, unmount }) => (
      <Modal
        open={isOpen}
        onClose={close}
        onExited={unmount}
        isCloseOnDimmerClick={closeOnDimmerClick}
        doubleCTA={
          <Modal.DoubleCTA
            confirmProps={{
              children: confirmButton,
              onClick: close,
              ...confirmButtonProps,
            }}
            cancelProps={{
              children: cancelButton,
              onClick: close,
              ...cancelButtonProps,
            }}
          />
        }
        {...otherOptions}
      >
        <Modal.Title>{title}</Modal.Title>
        {description && <Modal.Description>{description}</Modal.Description>}
      </Modal>
    ));
  }, []);

  const asyncConfirm = useCallback((options: AsyncConfirmOptions) => {
    const {
      title,
      description,
      confirmButton = '확인',
      cancelButton = '취소',
      confirmButtonProps,
      cancelButtonProps,
      onConfirmClick,
      onCancelClick,
      closeOnDimmerClick,
      ...otherOptions
    } = options;

    return overlay.open(({ isOpen, close, unmount }) => {
      const [isConfirmLoading, setIsConfirmLoading] = useState(false);
      const [isCancelLoading, setIsCancelLoading] = useState(false);

      return (
        <Modal
          open={isOpen}
          onClose={close}
          onExited={unmount}
          isCloseOnDimmerClick={closeOnDimmerClick}
          doubleCTA={
            <Modal.DoubleCTA
              confirmProps={{
                children: confirmButton,
                onClick: async () => {
                  if (!onConfirmClick || isConfirmLoading) {
                    close();
                    return;
                  }

                  setIsConfirmLoading(true);
                  await onConfirmClick();
                  setIsConfirmLoading(false);
                  close();
                },
                isLoading: isConfirmLoading,
                ...confirmButtonProps,
              }}
              cancelProps={{
                children: cancelButton,
                onClick: async () => {
                  if (!onCancelClick || isCancelLoading) {
                    close();
                    return;
                  }

                  setIsCancelLoading(true);
                  await onCancelClick();
                  setIsCancelLoading(false);
                  close();
                },
                isLoading: isCancelLoading,
                ...cancelButtonProps,
              }}
            />
          }
          {...otherOptions}
        >
          <Modal.Title>{title}</Modal.Title>
          {description && <Modal.Description>{description}</Modal.Description>}
        </Modal>
      );
    });
  }, []);

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
