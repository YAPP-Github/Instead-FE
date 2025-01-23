import { Icon, IconProps } from '@/components';
import { useRadioCardsItem } from './context';

export type RadioCardsIconProps = Omit<IconProps, 'color'>;

export const RadioCardsIcon = (props: RadioCardsIconProps) => {
  const { isDisabled, isSelected } = useRadioCardsItem();

  return (
    <Icon
      {...props}
      size={24}
      color={isDisabled || !isSelected ? 'grey300' : 'grey800'}
    />
  );
};

RadioCardsIcon.displayName = 'RadioCards.Icon';
