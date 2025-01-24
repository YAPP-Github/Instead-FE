import { ColorsType } from '@repo/theme';
import { Icon, IconProps } from '../Icon/Icon';
import { ButtonVariant } from './ChipItem';

export type ChipIconProps = {
  variant: ButtonVariant;
  name?: IconProps['name'];
  type?: IconProps['type'];
} & Omit<IconProps, 'color' | 'name' | 'type'>;

const color: Record<ButtonVariant, keyof ColorsType> = {
  grey: 'grey600',
  purple: 'purple800',
  green: 'green800',
};

export function ChipIcon({
  variant,
  name = 'circle',
  type = 'fill',
  ...rest
}: ChipIconProps) {
  return <Icon name={name} type={type} color={color[variant]} {...rest} />;
}
