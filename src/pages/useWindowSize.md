---
templateKey: post
title: useWindowSize
date: "2018-10-31"
gist: https://gist.github.com/gragland/4e3d9b1c934a18dc76f585350f97e321
sandbox: https://codesandbox.io/s/jj61r2w6z5
code:
  "import { useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  const size = useWindowSize();\r\n\r\n  return (\r\n    <div>\r\n      {size.width}px
  / {size.height}px\r\n    </div>\r\n  );\r\n}\r\n\r\n// Hook\r\nfunction useWindowSize()
  {\r\n  const isClient = typeof window === 'object';\r\n\r\n  function getSize()
  {\r\n    return {\r\n      width: isClient ? window.innerWidth : undefined,\r\n
  \     height: isClient ? window.innerHeight : undefined\r\n    };\r\n  }\r\n\r\n
  \ const [windowSize, setWindowSize] = useState(getSize);\r\n\r\n  useEffect(() =>
  {\r\n    if (!isClient) {\r\n      return false;\r\n    }\r\n    \r\n    function
  handleResize() {\r\n      setWindowSize(getSize());\r\n    }\r\n\r\n    window.addEventListener('resize',
  handleResize);\r\n    return () => window.removeEventListener('resize', handleResize);\r\n
  \ }, []); // Empty array ensures that effect is only run on mount and unmount\r\n\r\n
  \ return windowSize;\r\n}"
---

A really common need is to get the current size of the browser window.
This hook returns an object containing the window's width and height. If executed
server-side (no window object) the value of width and height will be undefined.
