---
templateKey: post
title: usePrevious
date: "2018-11-07"
gist: https://gist.github.com/gragland/1ed713a68c770ea414c3b92ccf2bdd2f
sandbox: https://codesandbox.io/s/pwnl6v7z6m
isMultilingual: true
---

One question that comes up a lot is _"When using hooks how do I get the previous value of props or state?"_. With React class components you have the componentDidUpdate method which receives previous props and state as arguments or you can update an instance variable (this.previous = value) and reference it later to get the previous value. So how can we do this inside a functional component that doesn't have lifecycle methods or an instance to store values on? Hooks to the rescue! We can create a custom hook that uses the useRef hook internally for storing the previous value. See the recipe below with inline comments. You can also find this example in the official [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

```jsx
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // State value and setter for our example
  const [count, setCount] = useState(0);

  // Get the previous value (was passed into hook on last render)
  const prevCount = usePrevious(count);

  // Display both current and previous count value
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
```

```typescript
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // State value and setter for our example
  const [count, setCount] = useState<number>(0);

  // Get the previous value (was passed into hook on last render)
  const prevCount: number = usePrevious<number>(count);

  // Display both current and previous count value
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Hook
function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
```
