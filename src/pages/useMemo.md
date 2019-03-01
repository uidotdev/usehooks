---
templateKey: post
title: useMemo
date: "2018-11-12"
gist: https://gist.github.com/gragland/5ed9a4bd45a7775a5802e35de93fc3b6
sandbox: https://codesandbox.io/s/jjxypyk86w
code:
  "import { useState, useMemo } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  // State for our counter\r\n  const [count, setCount] = useState(0);\r\n
  \ // State to keep track of current word in array we want to show\r\n  const [wordIndex,
  setWordIndex] = useState(0);\r\n\r\n  // Words we can flip through and view letter
  count\r\n  const words = ['hey', 'this', 'is', 'cool'];\r\n  const word = words[wordIndex];\r\n\r\n
  \ // Returns number of letters in a word\r\n  // We make it slow by including a
  large and completely unnecessary loop\r\n  const computeLetterCount = word => {\r\n
  \   let i = 0;\r\n    while (i < 1000000000) i++;\r\n    return word.length;\r\n
  \ };\r\n\r\n  // Memoize computeLetterCount so it uses cached return value if input
  array ...\r\n  // ... values are the same as last time the function was run.\r\n
  \ const letterCount = useMemo(() => computeLetterCount(word), [word]);\r\n\r\n  //
  This would result in lag when incrementing the counter because ...\r\n  // ... we'd
  have to wait for expensive function when re-rendering.\r\n  //const letterCount
  = computeLetterCount(word);\r\n\r\n  return (\r\n    <div style={{ padding: '15px'
  }}>\r\n      <h2>Compute number of letters (slow \U0001F40C)</h2>\r\n      <p>\"{word}\"
  has {letterCount} letters</p>\r\n      <button\r\n        onClick={() => {\r\n          const
  next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;\r\n          setWordIndex(next);\r\n
  \       }}\r\n      >\r\n        Next word\r\n      </button>\r\n\r\n      <h2>Increment
  a counter (fast ⚡️)</h2>\r\n      <p>Counter: {count}</p>\r\n      <button onClick={()
  => setCount(count + 1)}>Increment</button>\r\n    </div>\r\n  );\r\n}"
---

React has a built-in hook called useMemo that allows you to memoize expensive functions so that you can avoid calling them on every render. You simple pass in a function and an array of inputs and useMemo will only recompute the memoized value when one of the inputs has changed. In our example below we have an expensive function called computeLetterCount (for demo purposes we make it slow by including a large and completely unnecessary loop). When the current selected word changes you'll notice a delay as it has to recall computeLetterCount on the new word. We also have a separate counter that gets incremented every time the increment button is clicked. When that counter is incremented you'll notice that there is zero lag between renders. This is because computeLetterCount is not called again. The input word hasn't changed and thus the cached value is returned. You'll probably want to check out the [CodeSandbox demo](https://codesandbox.io/s/jjxypyk86w) so you can see for yourself.
