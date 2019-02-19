---
templateKey: post
title: useLockBodyScroll
date: "2019-01-15"
gist: https://gist.github.com/gragland/f50690d2724aec1bd513de8596dcd9b9
sandbox: https://codesandbox.io/s/yvkol51m81
links:
  - url: https://jeremenichelli.io/2019/01/how-hooks-might-shape-design-systems-built-in-react/
    name: How hooks might shape design systems built in React
    description: Great blog post that inspired this hook recipe. Their version of the useLockBodyScroll hook accepts a toggle argument to give more control over lock state.
code: "import { useState, useLayoutEffect } from 'react';\r\n\r\n\/\/ Usage\r\nfunction App(){\r\n  \/\/ State for our modal\r\n  const [modalOpen, setModalOpen] = useState(false);\r\n  \r\n  return (\r\n    <div>\r\n      <button onClick={() => setModalOpen(true)}>Show Modal<\/button>\r\n      <Content \/>\r\n      {modalOpen && (\r\n        <Modal\r\n          title=\"Try scrolling\"\r\n          content=\"I bet you you can't! Muahahaha \uD83D\uDE08\"\r\n          onClose={() => setModalOpen(false)}\r\n        \/>\r\n      )}\r\n    <\/div>\r\n  );\r\n}\r\n\r\nfunction Modal({ title, content, onClose }){\r\n  \/\/ Call hook to lock body scroll\r\n  useLockBodyScroll();\r\n\r\n  return (\r\n    <div className=\"modal-overlay\" onClick={onClose}>\r\n      <div className=\"modal\">\r\n        <h2>{title}<\/h2>\r\n        <p>{content}<\/p>\r\n      <\/div>\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nfunction useLockBodyScroll() {\r\n  useLayoutEffect(() => {\r\n   \/\/ Get original body overflow\r\n   const originalStyle = window.getComputedStyle(document.body).overflow;  \r\n\   /\/ Prevent scrolling on mount\r\n   document.body.style.overflow = 'hidden';\r\n   \/\/ Re-enable scrolling when component unmounts\r\n   return () => document.body.style.overflow = originalStyle;\r\n   }, []); \/\/ Empty array ensures effect is only run on mount and unmount\r\n}"
---

Sometimes you want to prevent your users from being able to scroll the body of your page while a particular component is absolutely positioned over your page (think modal or full-screen mobile menu). It can be confusing to see the background content scroll underneath a modal, especially if you intended to scroll an area within the modal. Well, this hook solves that! Simply call the useLockBodyScroll hook in any component and body scrolling will be locked until that component unmounts. See it in action in the [CodeSandbox Demo](https://codesandbox.io/s/yvkol51m81).
