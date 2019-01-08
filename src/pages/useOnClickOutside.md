---
templateKey: post
title: useOnClickOutside
date: "2018-11-05"
gist: https://gist.github.com/gragland/81a678775c30edfdbb224243fc0d1ec4
sandbox: https://codesandbox.io/s/23jk7wlw4y
links:
  - url: https://github.com/Andarist/use-onclickoutside
    name: Andarist/use-onclickoutside
    description: Similar logic implemented as a library. Also accounts for passive events. Good choice if you want to pull something from github/npm.
code:
  "import { useState, useEffect, useRef } from 'react';\r\n\r\n// Usage\r\nfunction
  App() {\r\n // Create a ref that we add to the element for which we want to detect
  outside clicks\r\n const ref = useRef();\r\n // State for our modal\r\n const
  [isModalOpen, setModalOpen] = useState(false);\r\n // Call hook passing in the
  ref and a function to call on outside click\r\n useOnClickOutside(ref, () => setModalOpen(false));\r\n\r\n
  \ return (\r\n <div>\r\n {isModalOpen ? (\r\n <div ref={ref}>\r\n
  \ \U0001F44B Hey, I'm a modal. Click anywhere outside of me to close.\r\n
  \ </div>\r\n ) : (\r\n <button onClick={() => setModalOpen(true)}>Open
  Modal</button>\r\n )}\r\n </div>\r\n );\r\n}\r\n\r\n// Hook\r\nfunction
  useOnClickOutside(ref, handler) {\r\n useEffect(() => {\r\n const listener =
  event => {\r\n // Do nothing if clicking ref's element or descendent elements\r\n
  \ if (!ref.current || ref.current.contains(event.target)) {\r\n return;\r\n
  \ }\r\n\r\n handler(event);\r\n };\r\n\r\n document.addEventListener('mousedown',
  listener);\r\n document.addEventListener('touchstart', listener);\r\n\r\n return
  () => {\r\n document.removeEventListener('mousedown', listener);\r\n document.removeEventListener('touchstart',
  listener);\r\n };\r\n }, []); // Empty array ensures that effect is only run
  on mount and unmount\r\n}"
---

This hook allows you to detect clicks outside of a specified element.
In the example below we use it to close a modal when any element outside of the
modal is clicked. By abstracting this logic out into a hook we can easily use it
across all of our components that need this kind of functionality (dropdown menus,
tooltips, etc).
