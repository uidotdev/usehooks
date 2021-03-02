---
templateKey: post
title: useToggle
date: "2021-01-09"
gist: https://gist.github.com/gragland/49a5d8d354b59b939f91d5510affad53
links:
  - url: https://reactjs.org/docs/hooks-reference.html#usereducer
    name: useReducer
    description: Official useReducer example that shows how it works with multiple actions
sandbox:
code: "import React, { useReducer } from \"react\";\r\n\r\n\/\/ Usage\r\nfunction App(){\r\n  const [isOn, toggleIsOn] = useToggle();\r\n  \r\n  return (\r\n    <button onClick={toggleIsOn}>\r\n      Turn  {isOn ? 'Off' : 'On'}\r\n    <\/button>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nfunction useToggle(initialValue = false){\r\n  \/\/ Returns the tuple [state, dispatch]\r\n  \/\/ Normally with useReducer you pass a value to dispatch to indicate what action to\r\n  \/\/ take on the state, but in this case there's only one action.\r\n  return useReducer((state) => !state, initialValue);\r\n}"
---

This hook makes it easy to toggle a boolean value (true/false) in state. It also shows how useful <code>useReducer</code> can be, even for simple use-cases. If we were to utilize <code>useState</code> instead of <code>useReducer</code> then we'd need to create a second function for toggling the boolean value. We'd also need to wrap that second function with <code>useCallback</code> to unsure it has a stable identity. We don't need to worry about that with <code>useReducer</code> because the dispatch function it returns always has a stable identity. To make this easier to understand I've created another [example with the useState method](https://gist.github.com/gragland/d5c183230a78b207ad9d14d38cc8f4f9). Check it out and compare. It's perfectly fine to use that method instead as long as you understand the pitfalls to avoid.
