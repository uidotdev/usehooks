---
templateKey: post
title: useLocalStorage
date: "2018-10-29"
gist: https://gist.github.com/gragland/2970ae543df237a07be1dbbf810f23fe
sandbox: https://codesandbox.io/s/qxkr4mplv6
links:
  - url: https://github.com/donavon/use-persisted-state
    name: use-persisted-state
    description: A more advanced implementation that syncs between tabs and browser windows.
code: "import { useState } from 'react';\r\n\r\n\/\/ Usage\r\nfunction App() {\r\n  \/\/ Similar to useState but first arg is key to the value in local storage.\r\n  const [name, setName] = useLocalStorage('name', 'Bob');\r\n\r\n  return (\r\n    <div>\r\n      <input\r\n        type=\"text\"\r\n        placeholder=\"Enter your name\"\r\n        value={name}\r\n        onChange={e => setName(e.target.value)}\r\n      \/>\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nfunction useLocalStorage(key, initialValue) {\r\n  \/\/ State to store our value\r\n  \/\/ Pass initial state function to useState so logic is only executed once\r\n  const [storedValue, setStoredValue] = useState(() => {\r\n    try {\r\n      \/\/ Get from local storage by key\r\n      const item = window.localStorage.getItem(key);\r\n      \/\/ Parse stored json or if none return initialValue\r\n      return item ? JSON.parse(item) : initialValue;\r\n    } catch (error) {\r\n      \/\/ If error also return initialValue\r\n      console.log(error);\r\n      return initialValue;\r\n    }\r\n  });\r\n\r\n  \/\/ Return a wrapped version of useState's setter function that ...\r\n  \/\/ ... persists the new value to localStorage.\r\n  const setValue = value => {\r\n    try {\r\n      \/\/ Allow value to be a function so we have same API as useState\r\n      const valueToStore =\r\n        value instanceof Function ? value(storedValue) : value;\r\n      \/\/ Save state\r\n      setStoredValue(valueToStore);\r\n      \/\/ Save to local storage\r\n      window.localStorage.setItem(key, JSON.stringify(valueToStore));\r\n    } catch (error) {\r\n      \/\/ A more advanced implementation would handle the error case\r\n      console.log(error);\r\n    }\r\n  };\r\n\r\n  return [storedValue, setValue];\r\n}"
---

Sync state to local storage so that it persists through a page refresh.
Usage is similar to useState except we pass in a local storage key so that we can
default to that value on page load instead of the specified initial value.
