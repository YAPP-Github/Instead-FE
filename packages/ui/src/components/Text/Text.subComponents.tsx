import { AllowedTags, TextProps, Text } from './Text';

function CreateSubText<T extends AllowedTags>({
  as,
  ...rest
}: Omit<TextProps<T>, 'as'> & Required<Pick<TextProps<T>, 'as'>>) {
  return <Text as={as} {...rest} />;
}

type TextCompoundType = {
  <T extends AllowedTags = 'span'>(props: TextProps<T>): JSX.Element;
} & {
  [K in AllowedTags]: (props?: Omit<TextProps<K>, 'as'>) => JSX.Element;
};

const BaseText = Text as TextCompoundType;

const TextWithCompounds = Object.assign(BaseText, {
  h1: (props?: Omit<TextProps<'h1'>, 'as'>) =>
    CreateSubText({
      as: 'h1',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  h2: (props?: Omit<TextProps<'h2'>, 'as'>) =>
    CreateSubText({
      as: 'h2',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  h3: (props?: Omit<TextProps<'h3'>, 'as'>) =>
    CreateSubText({
      as: 'h3',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  h4: (props?: Omit<TextProps<'h4'>, 'as'>) =>
    CreateSubText({
      as: 'h4',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  h5: (props?: Omit<TextProps<'h5'>, 'as'>) =>
    CreateSubText({
      as: 'h5',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  h6: (props?: Omit<TextProps<'h6'>, 'as'>) =>
    CreateSubText({
      as: 'h6',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  p: (props?: Omit<TextProps<'p'>, 'as'>) =>
    CreateSubText({
      as: 'p',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  span: (props?: Omit<TextProps<'span'>, 'as'>) =>
    CreateSubText({
      as: 'span',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
  div: (props?: Omit<TextProps<'div'>, 'as'>) =>
    CreateSubText({
      as: 'div',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'grey50',
      ...props,
    }),
});

export { TextWithCompounds as Text };
