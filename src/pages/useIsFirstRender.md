```jsx
// Usage
import React, { useEffect } from 'react';
import { useIsFirstRender } from './useIsFirstRender';

const MyComponent = () => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
      console.log('First Render');
    } else {
      console.log('Subsequent Render');
    }
  });

  return isFirstRender ? <p>First Render</p> : <p>Subsequent Render</p>;
};

// Hook
import { useRef, useEffect } from 'react';

export const useIsFirstRender = () => {
  const isFirstRenderRef = useRef(true);
  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);
  return isFirstRenderRef.current;
};
```
