---
templateKey: post
title: useScript
date: "2018-11-15"
gist: https://gist.github.com/gragland/929e42759c0051ff596bc961fb13cd93
sandbox: https://codesandbox.io/s/pm28k14qlj
links:
  - url: https://github.com/sesilio/react-script-loader-hoc/blob/master/src/index.js
    name: react-script-loader-hoc
    description: HOC implementation of same logic for the sake of comparison.
  - url: https://github.com/palmerhq/the-platform#usescript
    name: useScript from palmerhq/the-platform
    description: Similar hook but returns a promise for use with React Suspense.
code:
  "import { useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction App()
  {\r\n  const [loaded, error] = useScript(\r\n    'https://pm28k14qlj.codesandbox.io/test-external-script.js'\r\n
  \ );\r\n\r\n  return (\r\n    <div>\r\n      <div>\r\n        Script loaded: <b>{loaded.toString()}</b>\r\n
  \     </div>\r\n      {loaded && !error && (\r\n        <div>\r\n          Script
  function call response: <b>{TEST_SCRIPT.start()}</b>\r\n        </div>\r\n      )}\r\n
  \   </div>\r\n  );\r\n}\r\n\r\n// Hook\r\nlet cachedScripts = [];\r\nfunction useScript(src)
  {\r\n  // Keeping track of script loaded and error state\r\n  const [state, setState]
  = useState({\r\n    loaded: false,\r\n    error: false\r\n  });\r\n\r\n  useEffect(\r\n
  \   () => {\r\n      // If cachedScripts array already includes src that means another
  instance ...\r\n      // ... of this hook already loaded this script, so no need
  to load again.\r\n      if (cachedScripts.includes(src)) {\r\n        setState({\r\n
  \         loaded: true,\r\n          error: false\r\n        });\r\n      } else
  {\r\n        cachedScripts.push(src);\r\n\r\n        // Create script\r\n        let
  script = document.createElement('script');\r\n        script.src = src;\r\n        script.async
  = true;\r\n\r\n        // Script event listener callbacks for load and error\r\n
  \       const onScriptLoad = () => {\r\n          setState({\r\n            loaded:
  true,\r\n            error: false\r\n          });\r\n        };\r\n\r\n        const
  onScriptError = () => {\r\n          // Remove from cachedScripts we can try loading
  again\r\n          const index = cachedScripts.indexOf(src);\r\n          if (index
  >= 0) cachedScripts.splice(index, 1);\r\n          script.remove();\r\n\r\n          setState({\r\n
  \           loaded: true,\r\n            error: true\r\n          });\r\n        };\r\n\r\n
  \       script.addEventListener('load', onScriptLoad);\r\n        script.addEventListener('error',
  onScriptError);\r\n\r\n        // Add script to document body\r\n        document.body.appendChild(script);\r\n\r\n
  \       // Remove event listeners on cleanup\r\n        return () => {\r\n          script.removeEventListener('load',
  onScriptLoad);\r\n          script.removeEventListener('error', onScriptError);\r\n
  \       };\r\n      }\r\n    },\r\n    [src] // Only re-run effect if script src
  changes\r\n  );\r\n\r\n  return [state.loaded, state.error];\r\n}"
---

This hook makes it super easy to dynamically load an external script and know when its loaded. This is useful when you need to interact with a 3rd party library (Stripe, Google Analytics, etc) and you'd prefer to load the script when needed rather then include it in the document head for every page request. In the example below we wait until the script has loaded successfully before calling a function declared in the script. If you're interested in seeing how this would look if implemented as a Higher Order Component then check out the [source of react-script-loader-hoc](https://github.com/sesilio/react-script-loader-hoc/blob/master/src/index.js). I personally find it much more readable as a hook. Another advantage is because it's so easy to call the same hook multiple times to load multiple different scripts, unlike the HOC implementation, we can skip adding support for passing in multiple src strings.
