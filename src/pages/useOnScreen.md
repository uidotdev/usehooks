---
templateKey: post
title: useOnScreen
date: "2018-11-08"
gist: https://gist.github.com/gragland/d1175eb983772b077cb17ae0841c5329
sandbox: https://codesandbox.io/s/y7kr0vll4v
links:
  - url: https://github.com/thebuilder/react-intersection-observer
    name: react-intersection-observer
    description: A more robust and configurable implementation of this hook.
code:
  "import { useState, useEffect, useRef } from 'react';\r\n\r\n// Usage\r\nfunction
  App() {\r\n  // Ref for the element that we want to detect whether on screen\r\n
  \ const ref = useRef();\r\n  // Call the hook passing in ref and root margin\r\n
  \ // In this case it would only be considered onScreen if more ...\r\n  // ... than
  300px of element is visible.\r\n  const onScreen = useOnScreen(ref, '-300px');\r\n\r\n
  \ return (\r\n    <div>\r\n      <div style={{ height: '100vh' }}>\r\n        <h1>Scroll
  down to next section \U0001F447</h1>\r\n      </div>\r\n      <div\r\n        ref={ref}\r\n
  \       style={{\r\n          height: '100vh',\r\n          backgroundColor: onScreen
  ? '#23cebd' : '#efefef'\r\n        }}\r\n      >\r\n        {onScreen ? (\r\n          <div>\r\n
  \           <h1>Hey I'm on the screen</h1>\r\n            <img src=\"https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif\"
  />\r\n          </div>\r\n        ) : (\r\n          <h1>Scroll down 300px from
  the top of this section \U0001F447</h1>\r\n        )}\r\n      </div>\r\n    </div>\r\n
  \ );\r\n}\r\n\r\n// Hook\r\nfunction useOnScreen(ref, rootMargin = '0px') {\r\n
  \ // State and setter for storing whether element is visible\r\n  const [isIntersecting,
  setIntersecting] = useState(false);\r\n\r\n  useEffect(() => {\r\n    const observer
  = new IntersectionObserver(\r\n      ([entry]) => {\r\n        // Update our state
  when observer callback fires\r\n        setIntersecting(entry.isIntersecting);\r\n
  \     },\r\n      {\r\n        rootMargin\r\n      }\r\n    );\r\n    if (ref.current)
  {\r\n      observer.observe(ref.current);\r\n    }\r\n    return () => {\r\n      observer.unobserve(ref.current);\r\n
  \   };\r\n  }, []); // Empty array ensures that effect is only run on mount and
  unmount\r\n\r\n  return isIntersecting;\r\n}"
---

This hook allows you to easily detect when an element is visible on the
screen as well as specify how much of the element should be visible before being
considered on screen. Perfect for lazy loading images or triggering animations when
the user has scrolled down to a particular section.
