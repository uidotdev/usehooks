---
templateKey: post
title: useKeyPress
date: "2018-11-14"
gist: https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5
sandbox: https://codesandbox.io/s/5v71vl72kk
tags: []
links:
  - url: https://codesandbox.io/s/y3qzyr3lrz
    name: useMultiKeyPress
    description:
      A fork of this recipe by <a target="_blank"  href="https://twitter.com/jhsu">@jhsu</a>
      that detects multiple keys at once.
code:
  "import { useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  // Call our hook for each key that we'd like to monitor\r\n  const happyPress
  = useKeyPress('h');\r\n  const sadPress = useKeyPress('s');\r\n  const robotPress
  = useKeyPress('r');\r\n  const foxPress = useKeyPress('f');\r\n\r\n  return (\r\n
  \   <div>\r\n      <div>h, s, r, f</div>\r\n      <div>\r\n        {happyPress &&
  '\U0001F60A'}\r\n        {sadPress && '\U0001F622'}\r\n        {robotPress && '\U0001F916'}\r\n
  \       {foxPress && '\U0001F98A'}\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n\r\n//
  Hook\r\nfunction useKeyPress(targetKey) {\r\n  // State for keeping track of whether
  key is pressed\r\n  const [keyPressed, setKeyPressed] = useState(false);\r\n\r\n
  \ // If pressed key is our target key then set to true\r\n  function downHandler({
  key }) {\r\n    if (key === targetKey) {\r\n      setKeyPressed(true);\r\n    }\r\n
  \ }\r\n\r\n  // If released key is our target key then set to false\r\n  const upHandler
  = ({ key }) => {\r\n    if (key === targetKey) {\r\n      setKeyPressed(false);\r\n
  \   }\r\n  };\r\n\r\n  // Add event listeners\r\n  useEffect(() => {\r\n    window.addEventListener('keydown',
  downHandler);\r\n    window.addEventListener('keyup', upHandler);\r\n    // Remove
  event listeners on cleanup\r\n    return () => {\r\n      window.removeEventListener('keydown',
  downHandler);\r\n      window.removeEventListener('keyup', upHandler);\r\n    };\r\n
  \ }, []); // Empty array ensures that effect is only run on mount and unmount\r\n\r\n
  \ return keyPressed;\r\n}"
---

This hook makes it easy to detect when the user is pressing a specific key on their keyboard. The recipe is fairly simple, as I want to show how little code is required, but I challenge any readers to create a more advanced version of this hook. Detecting when multiple keys are held down at the same time would be a nice addition. Bonus points: also require they be held down in a specified order. Feel free to share anything you've created in this [recipe's gist](https://gist.github.com/gragland/b61b8f46114edbcf2a9e4bd5eb9f47f5).
