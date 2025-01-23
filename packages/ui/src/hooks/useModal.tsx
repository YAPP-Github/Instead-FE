'use client';

import {
  ComponentProps,
  ComponentType,
  ReactElement,
  useCallback,
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
          <Modal.CTA
            onClick={close}
            variant="neutral"
            size="large"
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

    return overlay.open(({ isOpen, close, unmount }) => (
      <Modal
        open={isOpen}
        onClose={close}
        onExited={unmount}
        cta={
          <Modal.CTA
            onClick={async () => {
              if (onAlertClick) {
                await onAlertClick();
              }
              close();
            }}
            variant="neutral"
            size="large"
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
    ));
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
              variant: 'neutral',
              size: 'large',
              onClick: close,
              ...confirmButtonProps,
            }}
            cancelProps={{
              children: cancelButton,
              variant: 'terminal',
              size: 'large',
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
              variant: 'neutral',
              size: 'large',
              onClick: async () => {
                if (onConfirmClick) {
                  await onConfirmClick();
                }
                close();
              },
              ...confirmButtonProps,
            }}
            cancelProps={{
              children: cancelButton,
              variant: 'terminal',
              size: 'large',
              onClick: async () => {
                if (onCancelClick) {
                  await onCancelClick();
                }
                close();
              },
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

  const custom = useCallback(
    (
      Content: ComponentType<{ close: () => void }>,
      options: Omit<
        ModalProps,
        'open' | 'onClose' | 'onExited' | 'children'
      > = {}
    ) => {
      return overlay.open(({ isOpen, close, unmount }) => (
        <Modal open={isOpen} onClose={close} onExited={unmount} {...options}>
          <Content close={close} />
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
