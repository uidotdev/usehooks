---
templateKey: post
title: useThrottle
date: "2022-10-30"
---

This hook allows you to throttle any fast changing value. this version is optimum for quick event updates like scrolling in DOM. this hook invokes the callback function every Xms (includes trailing invocation as well but not leading). eg. this will invoke the function after Xms of the first call, continues till the calls register within Xms and when the register stops, it invokes one last call after Xms(trailing call) and stops entirely.

The below example registers the scroll event for X=300ms

```js
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useThrottle(function(e) {
    setScrollPosition(e.target.scrollTop);
  }, 300);

  return (
    <div>
      {`Scrolled applied to ${scrollPosition}!`}
    </div>
  );
}

//Hook
function useThrottle(callback, timeout = 300) {
  const timerRef = useRef(null);

  // For a same timeout value, the function returned by this useCallback will remain the same throughout the lifecycle. 
  // For example, given timeout = 300, this should call the function every trailing end of 300ms thus, any extra calls in between will be ignored.
  const throttledFunction = useCallback(
    param => {
      if (timerRef.current === null) {
        timerRef.current = setTimeout(() => {
          callback(param);
          timerRef.current = null;
        }, timeout);
      }
    },
    [timeout]
  );

  return throttledFunction;
}

```

```typescript
// Hook
// K and T is are generic types for the callback which takes param of type K and returns a value of type T or not.
type Callback<K, T> = (param: K) => T | void;

function useThrottle<K, T>(
  callback: Callback<K, T>,
  timeout = 300
): Callback<K, T> {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // For a same timeout value, the function returned by this useCallback will remain the same throughout the lifecycle. 
  // For example, given timeout = 300, this should call the function every trailing end of 300ms thus, any extra calls in between will be ignored.
  const throttledFunction = useCallback(
    (param: K) => {
      if (timerRef.current === null) {
        timerRef.current = setTimeout(() => {
          callback(param);
          timerRef.current = null;
        }, timeout);
      }
    },
    [timeout]
  );

  return throttledFunction;
}
```