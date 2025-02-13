import { Text } from '../../components';
import type { TextProps } from '../../components';
import { useRadioCardsItem } from './context';

export type RadioCardsDescriptionProps = TextProps<'p'>;

export const RadioCardsDescription = ({
  children,
  ...props
}: RadioCardsDescriptionProps) => {
  const { isDisabled } = useRadioCardsItem();

  return (
    <Text.P
      fontSize={14}
      fontWeight="medium"
      color={isDisabled ? 'grey200' : 'grey600'}
      {...props}
    >
      {children}
    </Text.P>
  );
};

RadioCardsDescription.displayName = 'RadioCards.Description';
