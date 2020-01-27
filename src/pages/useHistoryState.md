---
templateKey: post
title: useHistoryState
date: "2020-01-27"
sandbox: https://codesandbox.io/s/use-history-state-lqh68
gist: https://github.com/Ayc0/useHistoryState
links:
  - url: https://github.com/Ayc0/useHistoryState
    name: useHistoryState
    description: Original version of this hook written in TypeScript
code: "\r\nimport React, { Fragment } from 'react';\r\nimport useHistoryState from 'use-history-state';\r\n\r\nfunction App() {\r\n  // const [state, setState] = useHistoryState(initialValue, keyInHistoryState);\r\n  const [name, setName] = useHistoryState('', 'name');\r\n\r\n  const names = ['John', 'Susan', 'Hugo', 'Jade', 'Mike', 'Aurora'];\r\n\r\n  return (\r\n    <Fragment>\r\n      <h1>{name}</h1>\r\n      {names.map(n => (\r\n        <button key={n} type='button' onClick={() => setName(n)}>\r\n          {n}\r\n        </button>\r\n      ))}\r\n    </Fragment>\r\n  );\r\n};"
---

`useHistoryState` is replacement for `useState` that stores the state within the history state.

The difference between `useHistoryState` and `useState` is that every changes in your state will be stored within the navigator history.
And so, if you go back in your history, you will change the inner value of the state.
