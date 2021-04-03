---
templateKey: post
title: useForwardedRef
date: "2021-04-03"
sandbox: https://codesandbox.io/s/useforwardedref-bd956?file=/src/App.tsx
isMultilingual: true
---

When forwarding ref to element, you might need to use forwarded ref in this component. Simple `useForwardedRef` hook is supposed to solve this problem.

```jsx
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

function useForwardedRef(forwardedRef) {
  const innerRef = useRef(null);

  useImperativeHandle(forwardedRef, () => innerRef.current);

  return innerRef;
}

const Input = forwardRef((props, forwardedRef) => {
  const inputRef = useForwardedRef(forwardedRef);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocusClick}>Focus</button>
    </div>
  );
});

export default function App() {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="App">
      <Input ref={inputRef} />
      <button onClick={handleButtonClick}>Focus input</button>
    </div>
  );
}

```

```typescript
import {
  ForwardedRef,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef
} from "react";

function useForwardedRef<E>(forwardedRef: ForwardedRef<E>): RefObject<E> {
  const innerRef = useRef<E>(null);

  useImperativeHandle(forwardedRef, () => innerRef.current as E);

  return innerRef;
}

const Input = forwardRef<HTMLInputElement>((props, forwardedRef) => {
  const inputRef = useForwardedRef(forwardedRef);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocusClick}>Focus</button>
    </div>
  );
});

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="App">
      <Input ref={inputRef} />
      <button onClick={handleButtonClick}>Focus input</button>
    </div>
  );
}

```
