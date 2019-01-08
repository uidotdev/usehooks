---
templateKey: post
title: usePrevious
date: "2018-11-07"
gist: https://gist.github.com/gragland/1ed713a68c770ea414c3b92ccf2bdd2f
sandbox: https://codesandbox.io/s/pwnl6v7z6m
code:
  "import { useState, useEffect, useRef } from 'react';\r\n\r\n// Usage\r\nfunction
  App() {\r\n  // State value and setter for our example\r\n  const [count, setCount]
  = useState(0);\r\n  \r\n  // Get the previous value (was passed into hook on last
  render)\r\n  const prevCount = usePrevious(count);\r\n  \r\n  // Display both current
  and previous count value\r\n  return (\r\n    <div>\r\n      <h1>Now: {count}, before:
  {prevCount}</h1>\r\n      <button onClick={() => setCount(count + 1)}>Increment</button>\r\n
  \   </div>\r\n   );\r\n}\r\n\r\n// Hook\r\nfunction usePrevious(value) {\r\n  //
  The ref object is a generic container whose current property is mutable ...\r\n
  \ // ... and can hold any value, similar to an instance property on a class\r\n
  \ const ref = useRef();\r\n  \r\n  // Store current value in ref\r\n  useEffect(()
  => {\r\n    ref.current = value;\r\n  }, [value]); // Only re-run if value changes\r\n
  \ \r\n  // Return previous value (happens before update in useEffect above)\r\n
  \ return ref.current;\r\n}"
---

One question that comes up a lot is _"When using hooks how do I get the previous value of props or state?"_. With React class components you have the componentDidUpdate method which receives previous props and state as arguments or you can update an instance variable (this.previous = value) and reference it later to get the previous value. So how can we do this inside a functional component that doesn't have lifecycle methods or an instance to store values on? Hooks to the rescue! We can create a custom hook that uses the useRef hook internally for storing the previous value. See the recipe below with inline comments. You can also find this example in the official [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).
