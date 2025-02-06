import { tokens } from '@repo/theme';
import { keyframes, styleVariants } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

// TODO 가상선택자 방식으로 바꾸기
const rotateGradient = keyframes({
  '0%': {
    backgroundImage: `linear-gradient(to right, #F9F4FF, #F9F4FF), linear-gradient(0deg, #B68AE7 0.56%, #3348D6 41.25%, #9290DC 75.34%, #F8B3EC 110.53%)`,
  },
  '100%': {
    backgroundImage: `linear-gradient(to right, #F9F4FF, #F9F4FF), linear-gradient(359deg, #B68AE7 0.56%, #3348D6 41.25%, #9290DC 75.34%, #F8B3EC 110.53%)`,
  },
});

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    height: 'fit-content',
    lineHeight: '150%',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },

  variants: {
    size: {
      large: {
        gap: '0.8rem',
        padding: '1.2rem 1.8rem',
        borderRadius: tokens.radius[12],
        fontSize: tokens.typography.fontSize[20],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      small: {
        gap: '0.4rem',
        padding: '0.8rem 2rem',
        borderRadius: tokens.radius[8],
        fontSize: tokens.typography.fontSize[18],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },

    variant: {
      primary: {
        backgroundColor: tokens.colors.primary700,
        color: tokens.colors.grey0,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.primary600,
            color: tokens.colors.grey0,
          },
          '&:disabled': {
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
      neutral: {
        backgroundColor: tokens.colors.grey950,
        color: tokens.colors.grey0,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.grey700,
            color: tokens.colors.grey0,
          },
          '&:disabled': {
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
      text: {
        backgroundColor: 'transparent',
        color: tokens.colors.grey1000,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.grey50,
            color: tokens.colors.grey1000,
          },
          '&:disabled': {
            // TODO 디자이너 분들이 지정해 주시면 스타일 수정 필요
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
      line: {
        border: '0.2rem solid transparent',
        // TODO 토큰 지정해 주시면 바꾸기
        backgroundImage: `linear-gradient(to right, #F9F4FF, #F9F4FF), linear-gradient(144deg, #B68AE7 0.56%, #3348D6 41.25%, #9290DC 75.34%, #F8B3EC 110.53%)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        color: tokens.colors.primary800,
        selectors: {
          '&:hover': {
            animation: `${rotateGradient} 1.5s linear infinite`,
          },
          '&:disabled': {
            // TODO 디자이너 분들이 지정해 주시면 스타일 수정 필요
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
    },

    isLoading: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { size: 'large', isLoading: true },
      style: {
        padding: '0.7rem 5.45rem',
      },
    },
    {
      variants: { size: 'small', isLoading: true },
      style: {
        padding: '0.55rem 2rem',
      },
    },
  ],
});

export type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;

export const addonRootStyle = styleVariants({
  large: {
    width: '2.0rem',
    height: '2.0rem',
  },
  small: {
    width: '1.6rem',
    height: '1.6rem',
  },
});
