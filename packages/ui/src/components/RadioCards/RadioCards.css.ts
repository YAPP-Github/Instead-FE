import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';

export const radioCardsRootStyle = recipe({
  base: {
    display: 'grid',
    gap: vars.space[16],
  },
  variants: {
    columns: {
      1: { gridTemplateColumns: '1fr' },
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
      5: { gridTemplateColumns: 'repeat(5, 1fr)' },
    },
  },
});

export const radioCardsItemStyle = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: `${vars.space[24]} ${vars.space[20]}`,
    borderRadius: '1.6rem',
    border: `0.2rem solid ${vars.colors.grey200}`,
    cursor: 'pointer',
    lineHeight: '150%',
    gap: vars.space[12],
  },
  variants: {
    selected: {
      true: {
        borderColor: vars.colors.primary700,
        backgroundColor: vars.colors.grey,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
        backgroundColor: vars.colors.grey25,
      },
    },
  },
});

export const radioCardsContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const radioCardsBadgeStyle = style({
  width: 'fit-content',
  height: 'auto',
  marginBottom: vars.space[12],
});
