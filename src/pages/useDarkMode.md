---
templateKey: post
title: useDarkMode
date: "2019-02-06"
composes: ["useMedia", "useLocalStorage"]
gist: https://gist.github.com/gragland/cdaab58e8621be22301700e6a5d59498
sandbox: https://codesandbox.io/s/p33j1m0mxj
links:
  - url: https://github.com/donavon/use-dark-mode
    name: donavon/use-dark-mode
    description: A more configurable implemention of this hook that syncs changes across browser tabs and handles SSR. Provided much of the code and inspiration for this post.
code: "import { useEffect } from 'react';\r\nimport useLocalStorage from '.\/use-local-storage';\r\nimport useMedia from '.\/use-media';\r\n\r\n\/\/ Dark mode className and container element\r\nconst className = 'dark-mode';\r\nconst element = global.document.body;\r\n\r\nfunction useDarkMode() {\r\n  \/\/ Use our useLocalStorage hook to persist state through a page refresh.\r\n  \/\/ Read the recipe for this hook to learn more: usehooks.com\/useLocalStorage\r\n  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');\r\n\r\n  \/\/ See if user has set a browser or OS preference for dark mode.\r\n  \/\/ The usePrefersDarkMode hook composes a useMedia hook (see code below).\r\n  const prefersDarkMode = usePrefersDarkMode();\r\n\r\n  \/\/ If enabledState is defined use it, otherwise fallback to prefersDarkMode.\r\n  \/\/ This allows user to override OS level setting on our website.\r\n  const enabled =\r\n    typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;\r\n\r\n  \/\/ Fire off effect that add\/removes dark mode class\r\n  useEffect(\r\n    () => {\r\n      if (enabled) {\r\n        element.classList.add(className);\r\n      } else {\r\n        element.classList.remove(className);\r\n      }\r\n    },\r\n    [enabled] \/\/ Only re-call effect when value changes\r\n  );\r\n\r\n  \/\/ Return enabled state and setter\r\n  return [enabled, setEnabledState];\r\n}\r\n\r\n\/\/ Compose our useMedia hook to detect dark mode preference.\r\n\/\/ The API for useMedia looks a bit weird, but that's because ...\r\n\/\/ ... it was designed to support multiple media queries and return values.\r\n\/\/ Thanks to hook composition we can hide away that extra complexity!\r\n\/\/ Read the recipe for useMedia to learn more: usehooks.com\/useMedia\r\nfunction usePrefersDarkMode() {\r\n  return useMedia(['(prefers-color-scheme: dark)'], [true], false);\r\n}"
---

This hook handles all the stateful logic required to add a <b>☾ dark mode</b> toggle to your website. It utilizes localStorage to remember the user's chosen mode, defaults to their browser or OS level setting using the `prefers-color-scheme` media query and manages the setting of a `.dark-mode-enabled` className on `body` to apply your styles.
<br/><br/>
This post also helps illustrate the power of hook composition. The syncing of state to localStorage is handled by our [`useLocalStorage`](https://usehooks.com/useLocalStorage) hook. Detecting the user's dark mode preference is handled by our [`useMedia`](https://usehooks.com/useMedia) hook. Both of these hooks were created for other use-cases, but here we've composed them to create a super useful hook in relatively few lines of code. It's almost as if hooks bring the compositional power of React components to stateful logic! 🤯
