import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components';
import * as styles from './CTA.css';

export type ModalCTAProps = ButtonProps;

export const CTA = forwardRef<HTMLButtonElement, ModalCTAProps>(
  ({ size = 'large', variant = 'neutral', ...props }, ref) => (
    <div className={styles.cta}>
      <Button
        ref={ref}
        size={size}
        variant={variant}
        className={styles.buttonStyle}
        {...props}
      />
    </div>
  )
);

CTA.displayName = 'Modal.CTA';
