---
templateKey: post
title: useAnimation
date: "2018-11-02"
gist: https://gist.github.com/gragland/28e628fb347afb908e945d43f9068d45
sandbox: https://codesandbox.io/s/qxnmn1n45q
---

This hook allows you to smoothly animate any value using an easing function (linear, elastic, etc). In the example we call the useAnimation hook three times to animated three balls on to the screen at different intervals. Additionally we show how easy it is to compose hooks. Our useAnimation hook doesn't actual make use of useState or useEffect itself, but instead serves as a wrapper around the useAnimationTimer hook. Having the timer logic abstracted out into its own hook gives us better code readability and the ability to use timer logic in other contexts. Be sure to check out the [CodeSandbox Demo](https://codesandbox.io/s/qxnmn1n45q) for this one.

```jsx
import { useState, useEffect } from "react";

// Usage
function App() {
  // Call hook multiple times to get animated values with different start delays
  const animation1 = useAnimation("elastic", 600, 0);
  const animation2 = useAnimation("elastic", 600, 150);
  const animation3 = useAnimation("elastic", 600, 300);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Ball
        innerStyle={{
          marginTop: animation1 * 200 - 100,
        }}
      />

      <Ball
        innerStyle={{
          marginTop: animation2 * 200 - 100,
        }}
      />

      <Ball
        innerStyle={{
          marginTop: animation3 * 200 - 100,
        }}
      />
    </div>
  );
}

const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 100,
      height: 100,
      marginRight: "40px",
      borderRadius: "50px",
      backgroundColor: "#4dd5fa",
      ...innerStyle,
    }}
  />
);

// Hook
function useAnimation(easingName = "linear", duration = 500, delay = 0) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};

function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}
```
