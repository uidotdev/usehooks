---
templateKey: post
title: useKeyPress
date: "2018-11-14"
gist: https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5
sandbox: https://codesandbox.io/s/5v71vl72kk
tags: []
links:
  - url: https://codesandbox.io/s/y3qzyr3lrz
    name: useMultiKeyPress
    description:
      A fork of this recipe by <a target="_blank"  href="https://twitter.com/jhsu">@jhsu</a>
      that detects multiple keys at once.
---

This hook makes it easy to detect when the user is pressing a specific key on their keyboard. The recipe is fairly simple, as I want to show how little code is required, but I challenge any readers to create a more advanced version of this hook. Detecting when multiple keys are held down at the same time would be a nice addition. Bonus points: also require they be held down in a specified order. Feel free to share anything you've created in this [recipe's gist](https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5).

```jsx
import { useState, useEffect } from 'react';

// Usage
function App()
  {
  // Call our hook for each key that we'd like to monitor
  const happyPress
  = useKeyPress('h');
  const sadPress = useKeyPress('s');
  const robotPress
  = useKeyPress('r');
  const foxPress = useKeyPress('f');

  return (

     <div>
      <div>h, s, r, f</div>
      <div>
        {happyPress &&
  'U0001F60A'}
        {sadPress && 'U0001F622'}
        {robotPress && 'U0001F916'}

         {foxPress && 'U0001F98A'}
      </div>
    </div>
  );
}

//
  Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether
  key is pressed
  const [keyPressed, setKeyPressed] = useState(false);


   // If pressed key is our target key then set to true
  function downHandler({
  key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }

   }

  // If released key is our target key then set to false
  const upHandler
  = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);

     }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown',
  downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove
  event listeners on cleanup
    return () => {
      window.removeEventListener('keydown',
  downHandler);
      window.removeEventListener('keyup', upHandler);
    };

   }, []); // Empty array ensures that effect is only run on mount and unmount


   return keyPressed;
}
```
