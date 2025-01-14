import { useState } from 'react';

export const usePress = () => {
  const [pressed, setPressed] = useState(false);

  const pressHandlers = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
  };

  return { pressed, pressHandlers };
};
