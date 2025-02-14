import { Text } from '../../components';
import type { TextProps } from '../../components';
import { useRadioCardsItem } from './context';

export type RadioCardsLabelProps = TextProps<'span'>;

export const RadioCardsLabel = ({
  children,
  ...props
}: RadioCardsLabelProps) => {
  const { isDisabled } = useRadioCardsItem();

  return (
    <Text.Span
      fontSize={18}
      fontWeight="semibold"
      color={isDisabled ? 'grey300' : 'grey800'}
      {...props}
    >
      {children}
    </Text.Span>
  );
};

RadioCardsLabel.displayName = 'RadioCards.Label';
