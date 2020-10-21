---
templateKey: post
title: useWhyDidYouUpdate
date: "2019-02-21"
gist: https://gist.github.com/gragland/fe89992181663d5e46d024dec8a8e5e6
sandbox: https://codesandbox.io/s/kx83n7201o
---

This hook makes it easy to see which prop changes are causing a component to re-render. If a function is particularly expensive to run and you know it renders the same results given the same props you can use the `React.memo` higher order component, as we've done with the `Counter` component in the below example. In this case if you're still seeing re-renders that seem unnecessary you can drop in the `useWhyDidYouUpdate` hook and check your console to see which props changed between renders and view their previous/current values. Pretty nifty huh?
<br/><br/>
A huge thanks to Bruno Lemos for the [idea and original code](https://twitter.com/brunolemos/status/1090377532845801473). You can also see it in action in the [CodeSandbox demo](https://codesandbox.io/s/kx83n7201o).

```jsx
import { useState, useEffect, useRef } from "react";

// Let's pretend this <Counter> component is expensive to re-render so ...
// ... we wrap with React.memo, but we're still seeing performance issues :/
// So we add useWhyDidYouUpdate and check our console to see what's going on.
const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = {
    fontSize: "3rem",
    color: "red",
  };

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}

// Hook
function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
```
