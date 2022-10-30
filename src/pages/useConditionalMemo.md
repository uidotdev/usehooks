---
templateKey: post
title: useConditionalMemo
date: "2022-10-30"
---

This hook is similar to [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) with an extra argument (condition function) which tells the hook whether the value should update or not on every dependency changes. This basically means that this hook will persist the old value if the condition returns 'false' on the new render (dependency change).
<br/><br/>

```jsx
import React, { useState, useEffect, useRef } from "react";

// Usage
function MyComponent({ obj }) {
  const [state, setState] = useState();

  const processedObj = useConditionalMemo(
  () => process(obj),
  [obj],
  () => {
    return obj.lastLog === "ping"
  });

  // This effect will only consider updates last logged as 'ping' (hypothetical scenario)
  useEffect(() => {
    // Call a method on the object and set results to the state.
    return processedObj.someMethod().then((value) => setState(value));
  }, [processedObj]);

  return <div> ... </div>;
}

// Hook
function useConditionalMemo(factory, deps, condition) {
  const ref = useRef(null);

  useEffect(() => {
    if (!condition || (condition && condition(...deps))) {
      ref.current = factory();
    }
  }, deps);

  return ref.current;
}
```
