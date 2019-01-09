---
templateKey: post
title: useInterval
date: "2019-01-09"
gist: https://gist.github.com/escaton/fe423174f43e3cf5ca65c535950e360f
sandbox: https://codesandbox.io/s/p3xorr6q9m
links:
  - url: https://github.com/facebook/react/issues/14543#issuecomment-452256357
    name: React issue
    description:
      Related issue on github
code:
  "\r\nimport React, { useState, useEffect, useRef } from 'react'\r\n\r\n// Usage\r\nfunction App() {\r\n  const [count, setCount] = useState(0);\r\n  useInterval(\r\n    () => {\r\n      console.log(count)\r\n    },\r\n    2000,\r\n    [count]\r\n  );\r\n  return (\r\n    <button onClick={() => setCount(c => c + 1)}>\r\n      {count} - inc\r\n    </button>\r\n  );\r\n}\r\n\r\n// Hook\r\nfunction useInterval(callback, interval, args) {\r\n  const adjustment = useRef(0);\r\n  useEffect(() => {\r\n    let id;\r\n    let absoluteTimeout;\r\n    function tick(firstTime) {\r\n      // call callback only on subsequent calls\r\n      !firstTime && callback();\r\n      // schedule timer considering previous call\r\n      const remaining = adjustment.current;\r\n      const timeout = remaining > 0 ? remaining : interval;\r\n      // remember absolute time to calc adjusted timeout later\r\n      absoluteTimeout = Date.now() + timeout;\r\n      // reset timer adjustment\r\n      adjustment.current = 0;\r\n      id = setTimeout(tick, timeout);\r\n    }\r\n    tick(true);\r\n    return () => {\r\n      clearTimeout(id);\r\n      // set timer adjustment\r\n      adjustment.current = absoluteTimeout - Date.now();\r\n    };\r\n  }, args);\r\n}"
---

This hook come to the rescue when you need `setInterval` in your effect. The problem with naive solution is that it will work only while you dont use anything out of effect scope. Otherwise you would either get staled data:
```js
const [state, setState] = useState(0)
useEffect(() => {
  const id = setInterval(() => {
    console.log(state) // first log is "0", as well as all subsequent
  }, 2000)
  () => clearInterval(id)
}, [])
...
setState(1)
```
or restart your interval every time effect updates:
```js
const [state, setState] = useState(0)
useEffect(() => {
  const id = setInterval(() => {
    console.log(state)
  }, 2000)
  () => clearInterval(id)
}, [state]) // restart interval every time state changes
...
setState(1)
```

The suggested `useInterval` preserve intervals while updating after required values.