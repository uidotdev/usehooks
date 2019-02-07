---
templateKey: post
title: useDarkMode
date: "2019-02-06"
gist: https://gist.github.com/gragland/cdaab58e8621be22301700e6a5d59498
sandbox: https://codesandbox.io/s/p33j1m0mxj
links:
  - url: https://github.com/donavon/use-dark-mode
    name: donavon/use-dark-mode
    description: A more configurable implemenation of this hook.
code: "\/\/ Usage\r\nfunction App() {\r\n  const darkMode = useDarkMode(false);\r\n\r\n  return (\r\n    <div>\r\n      <div className=\"navbar\">\r\n        <Toggle darkMode={darkMode} \/>\r\n      <\/div>\r\n      <Content \/>\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nconst className = 'dark-mode';\r\nconst element = global.document.body;\r\n\r\nfunction useDarkMode(initialValue = false){\r\n  \/\/ Enabled state for dark mode\r\n  const [value, setDarkMode] = useState(initialValue);\r\n\r\n  \/\/ Fire off effect that add\/removes dark mode class\r\n  useEffect(\r\n    () => {\r\n      if (value) {\r\n        element.classList.add(className);\r\n      } else {\r\n        element.classList.remove(className);\r\n      }\r\n    },\r\n    [value] \/\/ Only re-call effect when value changes\r\n  );\r\n\r\n  \/\/ Return object containing value and handy methods for changing value\r\n  return {\r\n    value,\r\n    enable: () => setDarkMode(true),\r\n    disable: () => setDarkMode(false),\r\n    toggle: () => setDarkMode(current => !current)\r\n  };\r\n\r\n  \/\/ Alternatively, we could return a [value, setter] array (like useState) ...\r\n  \/\/ ... if we don't care about having enable\/disable\/toggle methods.\r\n  \/\/return [ value, setDarkMode ];\r\n};"
---

This hook makes it easy to add a "dark mode" toggle to your website. Essentially all it does is control whether your body element has the .dark-mode className and gives you some useful methods (enable, disable, and toggle) that you can pass to the button or component that triggers the change. See it in action in the [CodeSandbox Demo](https://codesandbox.io/s/p33j1m0mxj).
<br/><br/>
I've kept this example as simple as possible, but if you're looking for something more configurable check out this [use-dark-mode hook](https://github.com/donavon/use-dark-mode) on Github (which inspired this post). If you look at their [hook code](https://github.com/donavon/use-dark-mode/blob/develop/src/index.js) you can see how they've moved the useEffect logic out into its the parent hook's scope so that values can be read from a configuration object.
<br/><br/>
<b>Update:</b> As Dan Abramov [mentioned on Twitter](https://twitter.com/dan_abramov/status/1093272256007098368), it would make much more sense for this hook to utilize the prefers-color-scheme media query and to persist to localstorage. I'll be posting an updated version of this hook tomorrow!
