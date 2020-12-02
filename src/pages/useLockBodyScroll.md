---
templateKey: post
title: useLockBodyScroll
date: "2019-01-15"
gist: https://gist.github.com/gragland/f50690d2724aec1bd513de8596dcd9b9
sandbox: https://codesandbox.io/s/yvkol51m81
isMultilingual: true
links:
  - url: https://jeremenichelli.io/2019/01/how-hooks-might-shape-design-systems-built-in-react/
    name: How hooks might shape design systems built in React
    description: Great blog post that inspired this hook recipe. Their version of the useLockBodyScroll hook accepts a toggle argument to give more control over lock state.
---

Sometimes you want to prevent your users from being able to scroll the body of your page while a particular component is absolutely positioned over your page (think modal or full-screen mobile menu). It can be confusing to see the background content scroll underneath a modal, especially if you intended to scroll an area within the modal. Well, this hook solves that! Simply call the useLockBodyScroll hook in any component and body scrolling will be locked until that component unmounts. See it in action in the [CodeSandbox Demo](https://codesandbox.io/s/yvkol51m81).

```jsx
import { useState, useLayoutEffect } from "react";

// Usage
function App() {
  // State for our modal
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function Modal({ title, content, onClose }) {
  // Call hook to lock body scroll
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Hook
function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}
```

```typescript
import { useState, useLayoutEffect } from "react";

// Usage
function App() {
  // State for our modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}


// Define modal props type
type ModalProps = {
  title: string;
  content: string;
  onClose: () => void;
}

function Modal({ title, content, onClose } : ModalProps) {
  // Call hook to lock body scroll
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Hook
function useLockBodyScroll(): void {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect(() : () => void => {
    // Get original body overflow
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}
```
