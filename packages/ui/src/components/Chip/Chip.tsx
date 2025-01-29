import { ChipIcon } from './ChipIcon';
import { ChipItem } from './ChipItem';

export const Chip = Object.assign(ChipItem, {
  Icon: ChipIcon,
});

export type { ChipProps } from './ChipItem';
export type { ChipIconProps } from './ChipIcon';
