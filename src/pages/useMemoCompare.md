---
templateKey: post
title: useMemoCompare
date: "2020-04-08"
gist: https://gist.github.com/gragland/ca6806dbb849efa32be8a6919e281d09
links:
  - url: https://github.com/facebook/react/issues/14476
    name: useEffect custom comparator
    description: Related discussion in the React Github repo that has other potential solutions
---

This hook is similar to [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo), but instead of passing an array of dependencies we pass a custom compare function that receives the previous and new value. The compare function can then compare nested properties, call object methods, or anything else to determine equality. If the compare function returns true then the hook returns the old object reference.
<br/><br/>
It's worth noting that, unlike useMemo, this hook isn't meant to avoid expensive calculations. It needs to be passed a computed value so that it can compare it to the old value. Where this comes in handy is if you want to offer a library to other developers and it would be annoying to force them to memoize an object before passing it to your library. If that object is created in the component body (often the case if it's based on props) then it's going to be a new object on every render. If that object is a <code>useEffect</code> dependency then it's going to cause the effect to fire on every render, which can lead to problems or even an infinite loop. This hook allows you to avoid that scenario by using the old object reference instead of the new one if your custom comparison function deems them equal.
<br/><br/>
Read through the recipe and comments below. For a more practical example be sure to check out our [useFirestoreQuery](https://usehooks.com/useFirestoreQuery) hook.

```jsx
import React, { useState, useEffect, useRef } from "react";

// Usage
function MyComponent({ obj }) {
  const [state, setState] = useState();

  // Use the previous obj value if the "id" property hasn't changed
  const objFinal = useMemoCompare(obj, (prev, next) => {
    return prev && prev.id === next.id;
  });

  // Here we want to fire off an effect if objFinal changes.
  // If we had used obj directly without the above hook and obj was technically a
  // new object on every render then the effect would fire on every render.
  // Worse yet, if our effect triggered a state change it could cause an endless loop
  // where effect runs -> state change causes rerender -> effect runs -> etc ...
  useEffect(() => {
    // Call a method on the object and set results to state
    return objFinal.someMethod().then((value) => setState(value));
  }, [objFinal]);

  // So why not pass [obj.id] as the dependency array instead?
  useEffect(() => {
    // Then eslint-plugin-hooks would rightfully complain that obj is not in the
    // dependency array and we'd have to use eslint-disable-next-line to work around that.
    // It's much cleaner to just get the old object reference with our custom hook.
    return obj.someMethod().then((value) => setState(value));
  }, [obj.id]);

  return <div> ... </div>;
}

// Hook
function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}
```
