---
templateKey: post
title: useLocalStorage
date: "2018-10-29"
gist: https://gist.github.com/gragland/2970ae543df237a07be1dbbf810f23fe
sandbox: https://codesandbox.io/s/qxkr4mplv6
code:
  "import { useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  // Similar to useState but we pass in a key to value in local storage\r\n
  \ // With useState: const [name, setName] = useState('Bob');\r\n  const [name, setName]
  = useLocalStorage('name', 'Bob');\r\n\r\n  return (\r\n    <div>\r\n      <input\r\n
  \       type=\"text\"\r\n        placeholder=\"Enter your name\"\r\n        value={name}\r\n
  \       onChange={e => setName(e.target.value)}\r\n      />\r\n    </div>\r\n  );\r\n}\r\n\r\n//
  Hook\r\nfunction useLocalStorage(key, initialValue) {\r\n  // The initialValue arg
  is only used if there is nothing in localStorage ...\r\n  // ... otherwise we use
  the value in localStorage so state persist through a page refresh.\r\n  // We pass
  a function to useState so localStorage lookup only happens once.\r\n  // We wrap
  in try/catch in case localStorage is unavailable\r\n  const [item, setInnerValue]
  = useState(() => {\r\n    try {\r\n      return window.localStorage.getItem(key)\r\n
  \       ? JSON.parse(window.localStorage.getItem(key))\r\n        : initialValue;\r\n
  \   } catch (error) {\r\n      // Return default value if JSON parsing fails\r\n
  \     return initialValue;\r\n    }\r\n  });\r\n\r\n  // Return a wrapped version
  of useState's setter function that ...\r\n  // ... persists the new value to localStorage.\r\n
  \ const setValue = value => {\r\n    setInnerValue(value);\r\n    window.localStorage.setItem(key,
  JSON.stringify(item));\r\n  };\r\n\r\n  // Alternatively we could update localStorage
  inside useEffect ...\r\n  // ... but this would run every render and it really only
  needs ...\r\n  // ... to happen when the returned setValue function is called.\r\n
  \ /*\r\n  useEffect(() => {\r\n    window.localStorage.setItem(key, JSON.stringify(item));\r\n
  \ });\r\n  */\r\n\r\n  return [item, setValue];\r\n}"
---

Sync state to local storage so that it persists through a page refresh.
Usage is similar to useState except we pass in a local storage key so that we can
default to that value on page load instead of the specified initial value.
