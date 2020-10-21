---
templateKey: post
title: useOnClickOutside
date: "2018-11-05"
gist: https://gist.github.com/gragland/81a678775c30edfdbb224243fc0d1ec4
sandbox: https://codesandbox.io/s/23jk7wlw4y
links:
  - url: https://github.com/Andarist/use-onclickoutside
    name: Andarist/use-onclickoutside
    description: Similar logic implemented as a library. Also accounts for passive events. Good choice if you want to pull something from github/npm.
---

This hook allows you to detect clicks outside of a specified element.
In the example below we use it to close a modal when any element outside of the
modal is clicked. By abstracting this logic out into a hook we can easily use it
across all of our components that need this kind of functionality (dropdown menus,
tooltips, etc).

```jsx
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>
          👋 Hey, I'm a modal. Click anywhere outside of me to close.
        </div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
```
