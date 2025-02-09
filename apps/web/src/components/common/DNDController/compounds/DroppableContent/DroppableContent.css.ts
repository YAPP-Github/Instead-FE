import { style } from '@vanilla-extract/css';

export const droppableContainer = style({
  // NOTE minHeight를 20rem에서 fit-content로 바꿔도 사이드 이펙트가 없을까요?
  // 두 페이지에서 모두 사용하려면 fit-content로 가야 할 것 같아서요!
  // minHeight: '20rem',
  minHeight: 'fit-content',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
