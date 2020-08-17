---
templateKey: post
title: useHover
date: "2018-10-30"
gist: https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8
sandbox: https://codesandbox.io/s/01w2zmj010
links:
  - url: https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f
    name: useHover with callback ref
    description: Alternate version that supports changing the element that hoverRef is applied to
code: ""
---

Detect whether the mouse is hovering an element. The hook returns a ref
and a boolean value indicating whether the element with that ref is currently being
hovered. Just add the returned ref to any element whose hover state you want
to monitor. **One potential bug with this method**: If you have logic that changes the element that `hoverRef` is added to then your event listeners will not necessarily get applied to the new element. If you need this functionality then use this [alternate version](https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f) that utilizes a callback ref.

```jsx
import { useRef, useState, useEffect } from 'react';

// Usage
function
  App() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div
  ref={hoverRef}>
      {isHovered ? 'U0001F601' : '☹️'}
    </div>
  );
}

//
  Hook
function useHover() {
  const [value, setValue] = useState(false);


   const ref = useRef(null);

  const handleMouseOver = () => setValue(true);

   const handleMouseOut = () => setValue(false);

  useEffect(
    () =>
  {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover',
  handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);


         return () => {
          node.removeEventListener('mouseover', handleMouseOver);

           node.removeEventListener('mouseout', handleMouseOut);
        };

       }
    },
    [ref.current] // Recall only if ref changes
  );


   return [ref, value];
}
```
