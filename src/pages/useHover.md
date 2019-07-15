---
templateKey: post
title: useHover
date: "2018-10-30"
gist: https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8
sandbox: https://codesandbox.io/s/01w2zmj010
links:
  - url: https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f
    name: useHover with callback ref
    description: Alternate version that supports changing the element that hoverRef is applied to
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
hovered. Just add the returned ref to any element whose hover state you want
to monitor. **One potential bug with this method**: If you have logic that changes the element that `hoverRef` is added to then your event listeners will not necessarily get applied to the new element. If you need this functionality then use this [alternate version](https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f) that utilizes a callback ref.
