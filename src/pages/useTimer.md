---
templateKey: post
title: useTimer
date: "2020-10-12"
gist: https://gist.github.com/jakebirkes/a9d8a4202b2c64ea68e9a34fdc3138fd
sandbox: https://codesandbox.io/s/usetimer-example-ny527
links:
  - url: https://jakewantulok.com/react-context-with-hooks
    name: React Custom Hook useTimer
    description: Blog post by Jake Wantulok explaining this hook.
code: "import { useEffect } from \"react\";\n\n  const useTimer = (bool, fn, time = 0, limit = 0) => {\n    useEffect(() => {\n      const timer = setTimeout(() => fn(true), 1000);\n      if (bool) {\n        if (time === limit) {\n          fn(false);\n          clearTimeout(timer);\n        }\n      } else {\n        return clearTimeout(timer);\n      }\n    }, [bool, fn, time, limit]);\n  };\n  \n  export default useTimer;\n"
---

This is a simple hook that can count down or count up. [CodeSandbox demo](https://codesandbox.io/s/usetimer-example-ny527)
