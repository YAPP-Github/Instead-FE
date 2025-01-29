import { forwardRef } from 'react';
import { Button, ButtonProps } from '../../../Button';
import * as styles from './DoubleCTA.css';

type OptionalButtonProps = Omit<ButtonProps, 'size' | 'variant'> & {
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
};

export type ModalDoubleCTAProps = {
  cancelProps?: OptionalButtonProps;
  confirmProps?: OptionalButtonProps;
};

export const DoubleCTA = forwardRef<HTMLDivElement, ModalDoubleCTAProps>(
  ({ cancelProps, confirmProps }, ref) => (
    <div ref={ref} className={styles.doubleCta}>
      <Button
        size={cancelProps?.size ?? 'large'}
        variant={cancelProps?.variant ?? 'text'}
        className={styles.secondaryButtonStyle}
        {...cancelProps}
      />
      <Button
        size={confirmProps?.size ?? 'large'}
        variant={confirmProps?.variant ?? 'neutral'}
        className={styles.ctaButtonStyle}
        {...confirmProps}
      />
    </div>
  )
);

DoubleCTA.displayName = 'Modal.DoubleCTA';
