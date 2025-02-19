import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const sidebarStyle = style({
  width: '44rem',
  height: '100%',
  backgroundColor: 'transparent',
  padding: `0 ${vars.space[40]}`,
  position: 'absolute',
  top: 0,
  left: 0,
  borderRight: `1px solid ${vars.colors.grey200}`,
  paddingTop: '8rem',
});
