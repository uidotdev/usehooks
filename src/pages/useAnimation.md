---
templateKey: post
title: useAnimation
date: "2018-11-02"
gist: https://gist.github.com/gragland/28e628fb347afb908e945d43f9068d45
sandbox: https://codesandbox.io/s/qxnmn1n45q
code:
  "import { useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  // Call hook multiple times to get animated values with different start delays\r\n
  \ const animation1 = useAnimation('elastic', 600, 0);\r\n  const animation2 = useAnimation('elastic',
  600, 150);\r\n  const animation3 = useAnimation('elastic', 600, 300);\r\n\r\n  return
  (\r\n    <div style={{ display: 'flex', justifyContent: 'center' }}>\r\n      <Ball\r\n
  \       innerStyle={{\r\n          marginTop: animation1 * 200 - 100\r\n        }}\r\n
  \     />\r\n\r\n      <Ball\r\n        innerStyle={{\r\n          marginTop: animation2
  * 200 - 100\r\n        }}\r\n      />\r\n\r\n      <Ball\r\n        innerStyle={{\r\n
  \         marginTop: animation3 * 200 - 100\r\n        }}\r\n      />\r\n    </div>\r\n
  \ );\r\n}\r\n\r\nconst Ball = ({ innerStyle }) => (\r\n  <div\r\n    style={{\r\n
  \     width: 100,\r\n      height: 100,\r\n      marginRight: '40px',\r\n      borderRadius:
  '50px',\r\n      backgroundColor: '#4dd5fa',\r\n      ...innerStyle\r\n    }}\r\n
  \ />\r\n);\r\n\r\n// Hook \r\nfunction useAnimation(\r\n  easingName = 'linear',\r\n
  \ duration = 500,\r\n  delay = 0\r\n) {\r\n  // The useAnimationTimer hook calls
  useState every animation frame ...\r\n  // ... giving us elapsed time and causing
  a rerender as frequently ...\r\n  // ... as possible for a smooth animation.\r\n
  \ const elapsed = useAnimationTimer(duration, delay);\r\n  // Amount of specified
  duration elapsed on a scale from 0 - 1\r\n  const n = Math.min(1, elapsed / duration);\r\n
  \ // Return altered value based on our specified easing function\r\n  return easing[easingName](n);\r\n}\r\n\r\n//
  Some easing functions copied from:\r\n// https://github.com/streamich/ts-easing/blob/master/src/index.ts\r\n//
  Hardcode here or pull in a dependency\r\nconst easing = {\r\n  linear: n => n,\r\n
  \ elastic: n =>\r\n    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n -
  67 * n + 15),\r\n  inExpo: n => Math.pow(2, 10 * (n - 1))\r\n};\r\n\r\nfunction
  useAnimationTimer(duration = 1000, delay = 0) {\r\n  const [elapsed, setTime] =
  useState(0);\r\n\r\n  useEffect(\r\n    () => {\r\n      let animationFrame, timerStop,
  start;\r\n\r\n      // Function to be executed on each animation frame\r\n      function
  onFrame() {\r\n        setTime(Date.now() - start);\r\n        loop();\r\n      }\r\n\r\n
  \     // Call onFrame() on next animation frame\r\n      function loop() {\r\n        animationFrame
  = requestAnimationFrame(onFrame);\r\n      }\r\n\r\n      function onStart() {\r\n
  \       // Set a timeout to stop things when duration time elapses\r\n        timerStop
  = setTimeout(() => {\r\n          cancelAnimationFrame(animationFrame);\r\n          setTime(Date.now()
  - start);\r\n        }, duration);\r\n\r\n        // Start the loop\r\n        start
  = Date.now();\r\n        loop();\r\n      }\r\n\r\n      // Start after specified
  delay (defaults to 0)\r\n      const timerDelay = setTimeout(onStart, delay);\r\n\r\n
  \     // Clean things up\r\n      return () => {\r\n        clearTimeout(timerStop);\r\n
  \       clearTimeout(timerDelay);\r\n        cancelAnimationFrame(animationFrame);\r\n
  \     };\r\n    },\r\n    [duration, delay] // Only re-run effect if duration or
  delay changes\r\n  );\r\n\r\n  return elapsed;\r\n}"
---

This hook allows you to smoothly animate any value using an easing function (linear, elastic, etc). In the example we call the useAnimation hook three times to animated three balls on to the screen at different intervals. Additionally we show how easy it is to compose hooks. Our useAnimation hook doesn't actual make use of useState or useEffect itself, but instead serves as a wrapper around the useAnimationTimer hook. Having the timer logic abstracted out into its own hook gives us better code readability and the ability to use timer logic in other contexts. Be sure to check out the [CodeSandbox Demo](https://codesandbox.io/s/qxnmn1n45q) for this one.
