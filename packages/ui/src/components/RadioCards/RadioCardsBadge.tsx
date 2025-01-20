import { Badge, BadgeProps } from '../../components';
import { radioCardsBadgeStyle } from './RadioCards.css';
import { useRadioCardsItem } from './context';

export type RadioCardsBadgeProps = Omit<
  BadgeProps,
  'variant' | 'size' | 'shape'
>;

export const RadioCardsBadge = ({
  className = '',
  ...props
}: RadioCardsBadgeProps) => {
  const { isSelected } = useRadioCardsItem();

  return (
    <Badge
      className={`${radioCardsBadgeStyle} ${className}`}
      size="medium"
      shape="round"
      variant={isSelected ? 'primary' : 'neutral'}
      {...props}
    />
  );
};

RadioCardsBadge.displayName = 'RadioCards.Badge';
