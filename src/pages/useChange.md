---
templateKey: post
title: useChange
date: "2021-04-03"
sandbox: https://codesandbox.io/s/usechange-963vp?file=/src/App.tsx
isMultilingual: true
---

If you need to track changes of some variable, you can use `useEffect` hook, but if you need to run callback with unstable reference (i.e. it came from props), you might want to omit it from `dependencies` of hook. This approach is [unsafe](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies). To implement this kind of logic you should use `usePrevious` hook and manually compare values like in `componentDidUpdate` lifecycle method from class components.

```jsx
import { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
}

// Hook
function useChange(
  callback,
  value
) {
  const previousValue = usePrevious(value);

  useEffect(() => {
    if (value !== previousValue) {
      // Callback called only when value is changed
      callback(previousValue, value);
    }
  }, [value, previousValue, callback]);
}

// Usage
function App() {
  // State value and setter for our example
  const [count, setCount] = useState(0),
    [list, setList] = useState([]);

  // Function with unstable ref (new one is created on every render)
  const addListItem = (item) => {
    setList((list) => [item, ...list]);
  };

  useChange((prev, curr) => {
    const changeString = `${prev} -> ${curr}`;
    // It's safe to use unstable variables inside useChange
    addListItem(changeString);
    console.log(`Change encountered: ${changeString}`);
  }, count);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      <p>Changes:</p>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

```typescript
import { useState, useEffect, useRef } from "react";

function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T>();

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
}

// Hook
function useChange<T>(
  callback: (prev: T | undefined, curr: T) => void,
  value: T
): void {
  const previousValue = usePrevious(value);

  useEffect(() => {
    if (value !== previousValue) {
      // Callback called only when value is changed
      callback(previousValue, value);
    }
  }, [value, previousValue, callback]);
}

// Usage
function App() {
  // State value and setter for our example
  const [count, setCount] = useState<number>(0),
    [list, setList] = useState<string[]>([]);

  // Function with unstable ref (new one is created on every render)
  const addListItem = (item: string) => {
    setList((list) => [item, ...list]);
  };

  useChange((prev, curr) => {
    const changeString = `${prev} -> ${curr}`;
    // It's safe to use unstable variables inside useChange
    addListItem(changeString);
    console.log(`Change encountered: ${changeString}`);
  }, count);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      <p>Changes:</p>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```
