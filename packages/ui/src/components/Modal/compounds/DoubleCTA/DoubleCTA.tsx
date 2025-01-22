import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components';
import * as styles from './DoubleCTA.css';

export type ModalDoubleCTAProps = {
  cancelProps?: ButtonProps;
  confirmProps?: ButtonProps;
};

export const DoubleCTA = forwardRef<HTMLDivElement, ModalDoubleCTAProps>(
  ({ cancelProps, confirmProps }, ref) => (
    <div ref={ref} className={styles.doubleCta}>
      <Button
        size={cancelProps?.size ?? 'large'}
        variant={cancelProps?.variant ?? 'terminal'}
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
