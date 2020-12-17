---
templateKey: post
title: useOnScreen
date: "2018-11-08"
gist: https://gist.github.com/gragland/d1175eb983772b077cb17ae0841c5329
sandbox: https://codesandbox.io/s/y7kr0vll4v
isMultilingual: true
links:
  - url: https://github.com/thebuilder/react-intersection-observer
    name: react-intersection-observer
    description: A more robust and configurable implementation of this hook.
---

This hook allows you to easily detect when an element is visible on the
screen as well as specify how much of the element should be visible before being
considered on screen. Perfect for lazy loading images or triggering animations when
the user has scrolled down to a particular section.

```jsx
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // Ref for the element that we want to detect whether on screen
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref, "-300px");

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <h1>Scroll down to next section 👇</h1>
      </div>
      <div
        ref={ref}
        style={{
          height: "100vh",
          backgroundColor: onScreen ? "#23cebd" : "#efefef",
        }}
      >
        {onScreen ? (
          <div>
            <h1>Hey I'm on the screen</h1>
            <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
          </div>
        ) : (
          <h1>Scroll down 300px from the top of this section 👇</h1>
        )}
      </div>
    </div>
  );
}

// Hook
function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
```

```typescript
import { useState, useEffect, useRef, MutableRefObject  } from "react";

// Usage
function App() {
  // Ref for the element that we want to detect whether on screen
  const ref: any = useRef<HTMLDivElement>();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, "-300px");

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <h1>Scroll down to next section 👇</h1>
      </div>
      <div
        ref={ref}
        style={{
          height: "100vh",
          backgroundColor: onScreen ? "#23cebd" : "#efefef",
        }}
      >
        {onScreen ? (
          <div>
            <h1>Hey I'm on the screen</h1>
            <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
          </div>
        ) : (
          <h1>Scroll down 300px from the top of this section 👇</h1>
        )}
      </div>
    </div>
  );
}

// Hook
function useOnScreen<T extends Element>(ref: MutableRefObject<T>, rootMargin: string = "0px"): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
```