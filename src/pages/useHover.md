---
templateKey: post
title: useHover
date: "2018-10-30"
gist: https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8
sandbox: https://codesandbox.io/s/01w2zmj010
code:
  "\r\nimport { useRef, useState, useEffect } from 'react';\r\n\r\n// Usage\r\nfunction
  App() {\r\n  const [hoverRef, isHovered] = useHover();\r\n\r\n  return (\r\n    <div
  ref={hoverRef}>\r\n      {isHovered ? '\U0001F601' : '☹️'}\r\n    </div>\r\n  );\r\n}\r\n\r\n//
  Hook\r\nfunction useHover() {\r\n  const [value, setValue] = useState(false);\r\n\r\n
  \ const ref = useRef(null);\r\n\r\n  const handleMouseOver = () => setValue(true);\r\n
  \ const handleMouseOut = () => setValue(false);\r\n\r\n  useEffect(\r\n    () =>
  {\r\n      const node = ref.current;\r\n      if (node) {\r\n        node.addEventListener('mouseover',
  handleMouseOver);\r\n        node.addEventListener('mouseout', handleMouseOut);\r\n\r\n
  \       return () => {\r\n          node.removeEventListener('mouseover', handleMouseOver);\r\n
  \         node.removeEventListener('mouseout', handleMouseOut);\r\n        };\r\n
  \     }\r\n    },\r\n    [ref.current] // Recall only if ref changes\r\n  );\r\n\r\n
  \ return [ref, value];\r\n}"
---

Detect whether the mouse is hovering an element. The hook returns a ref
and a boolean value indicating whether the element with that ref is currently being
hovered. So just add the returned ref to any element whose hover state you want
to monitor.
