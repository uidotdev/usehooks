---
templateKey: post
title: useTimer
date: "2020-10-12"
gist: https://gist.github.com/jakebirkes/a9d8a4202b2c64ea68e9a34fdc3138fd
sandbox: https://codesandbox.io/s/usetimer-example-ny527
links:
  - url: https://jakewantulok.com/react-custom-hook-usetimer
    name: React Custom Hook useTimer
    description: Blog post by Jake Wantulok explaining this hook.
code: "\n  export const useTimer = (bool, fn, time = 0, limit = 0) => {\n    useEffect(() => {\n      const timer = setTimeout(() => fn(true), 1000);\n      if (bool) {\n        if (time === limit) {\n          fn(false);\n          clearTimeout(timer);\n        }\n      } else {\n        return clearTimeout(timer);\n      }\n    }, [bool, fn, time, limit]);\n  };\n"
---

A simple hook that waits for a boolean to be `true` to begin counting. The count is controlled by a function that can remain in the function component. This hook will continue to pass `true` to the function until the starting number `time` is equal to the final number `limit`. It is recommended to remain outside and imported to a function component. [CodeSandbox demo](https://codesandbox.io/s/usetimer-example-ny527)
