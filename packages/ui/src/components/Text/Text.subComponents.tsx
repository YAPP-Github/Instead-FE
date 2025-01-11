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

const tags: AllowedTags[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'div',
];

const compounds = tags.reduce(
  (acc, tag) => {
    acc[tag] = (props?: Omit<TextProps<typeof tag>, 'as'>) =>
      CreateSubText({
        as: tag,
        ...props,
      });
    return acc;
  },
  {} as {
    [K in AllowedTags]: (props?: Omit<TextProps<K>, 'as'>) => JSX.Element;
  }
);

const TextWithCompounds = Object.assign(BaseText, compounds);

export { TextWithCompounds as Text };
