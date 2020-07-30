---
templateKey: post
title: useWindowSize
date: "2018-10-31"
gist: https://gist.github.com/gragland/4e3d9b1c934a18dc76f585350f97e321
sandbox: https://codesandbox.io/s/jj61r2w6z5
code: "import { useState, useEffect } from 'react';\r\n\r\n\/\/ Usage\r\nfunction App() {\r\n  const size = useWindowSize();\r\n\r\n  return (\r\n    <div>\r\n      {size.width}px \/ {size.height}px\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nfunction useWindowSize() {\r\n  \/\/ Initialize state with undefined width\/height so server and client renders match\r\n  \/\/ Learn more here: https:\/\/joshwcomeau.com\/react\/the-perils-of-rehydration\/\r\n  const [windowSize, setWindowSize] = useState({\r\n    width: undefined,\r\n    height: undefined,\r\n  });\r\n\r\n  useEffect(() => {\r\n    \/\/ Handler to call on window resize\r\n    function handleResize() {\r\n      \/\/ Set window width\/height to state\r\n      setWindowSize({\r\n        width: window.innerWidth,\r\n        height: window.innerHeight,\r\n      });\r\n    }\r\n    \r\n    \/\/ Add event listener\r\n    window.addEventListener(\"resize\", handleResize);\r\n    \r\n    \/\/ Call handler right away so state gets updated with initial window size\r\n    handleResize();\r\n    \r\n    \/\/ Remove event listener on cleanup\r\n    return () => window.removeEventListener(\"resize\", handleResize);\r\n  }, []); \/\/ Empty array ensures that effect is only run on mount\r\n\r\n  return windowSize;\r\n}"
---

A really common need is to get the current size of the browser window.
This hook returns an object containing the window's width and height. If executed
server-side (no window object) the value of width and height will be undefined.
