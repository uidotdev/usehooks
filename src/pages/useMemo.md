---
templateKey: post
title: useMemo
date: "2018-11-12"
gist: https://gist.github.com/gragland/5ed9a4bd45a7775a5802e35de93fc3b6
sandbox: https://codesandbox.io/s/jjxypyk86w
---

React has a built-in hook called useMemo that allows you to memoize expensive functions so that you can avoid calling them on every render. You simple pass in a function and an array of inputs and useMemo will only recompute the memoized value when one of the inputs has changed. In our example below we have an expensive function called computeLetterCount (for demo purposes we make it slow by including a large and completely unnecessary loop). When the current selected word changes you'll notice a delay as it has to recall computeLetterCount on the new word. We also have a separate counter that gets incremented every time the increment button is clicked. When that counter is incremented you'll notice that there is zero lag between renders. This is because computeLetterCount is not called again. The input word hasn't changed and thus the cached value is returned. You'll probably want to check out the [CodeSandbox demo](https://codesandbox.io/s/jjxypyk86w) so you can see for yourself.

```jsx
import { useState, useMemo } from "react";

// Usage
function App() {
  // State for our counter
  const [count, setCount] = useState(0);
  // State to keep track of current word in array we want to show
  const [wordIndex, setWordIndex] = useState(0);

  // Words we can flip through and view letter count
  const words = ["hey", "this", "is", "cool"];
  const word = words[wordIndex];

  // Returns number of letters in a word
  // We make it slow by including a large and completely unnecessary loop
  const computeLetterCount = (word) => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  // Memoize computeLetterCount so it uses cached return value if input array ...
  // ... values are the same as last time the function was run.
  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  // This would result in lag when incrementing the counter because ...
  // ... we'd have to wait for expensive function when re-rendering.
  //const letterCount = computeLetterCount(word);

  return (
    <div style={{ padding: "15px" }}>
      <h2>Compute number of letters (slow 🐌)</h2>
      <p>
        "{word}" has {letterCount} letters
      </p>
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        Next word
      </button>

      <h2>Increment a counter (fast ⚡️)</h2>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
