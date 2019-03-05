---
templateKey: post
title: useTheme
date: "2019-01-07"
gist: https://gist.github.com/gragland/509efd16c695e7817eb70921c77c8a05
sandbox: https://codesandbox.io/s/15mko9187
links:
  - url: https://medium.com/geckoboard-under-the-hood/how-we-made-our-product-more-personalized-with-css-variables-and-react-b29298fde608
    name: CSS Variables and React
    description: The blog post by Dan Bahrami that inspired this recipe.
code: "import { useLayoutEffect } from 'react';\r\nimport '.\/styles.scss'; \/\/ -> https:\/\/codesandbox.io\/s\/15mko9187\r\n\r\n\/\/ Usage\r\nconst theme = {\r\n  'button-padding': '16px',\r\n  'button-font-size': '14px',\r\n  'button-border-radius': '4px',\r\n  'button-border': 'none',\r\n  'button-color': '#FFF',\r\n  'button-background': '#6772e5',\r\n  'button-hover-border': 'none',\r\n  'button-hover-color': '#FFF'\r\n};\r\n\r\nfunction App() {\r\n  useTheme(theme);\r\n\r\n  return (\r\n    <div>\r\n      <button className=\"button\">Button<\/button>\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ Hook\r\nfunction useTheme(theme) {\r\n  useLayoutEffect(\r\n    () => {\r\n      \/\/ Iterate through each value in theme object\r\n      for (const key in theme) {\r\n        \/\/ Update css variables in document's root element\r\n        document.documentElement.style.setProperty(`--${key}`, theme[key]);\r\n      }\r\n    },\r\n    [theme] \/\/ Only call again if theme object reference changes\r\n  );\r\n}"
---

This hook makes it easy to dynamically change the appearance of your app using CSS variables. You simply pass in an object containing key/value pairs of the CSS variables you'd like to update and the hook updates each variable in the document's root element. This is useful in situations where you can't define styles inline (no pseudo class support) and there are too many style permutations to include each theme in your stylesheet (such as a web app that lets users customize the look of their profile). It's worth noting that many css-in-js libraries support dynamic styles out of the box, but it's interesting to experiment with how this can be done with just CSS variables and a React Hook. The example below is intentionally very simple, but you could imagine the theme object being stored in state or fetched from an API. Be sure to check out the [CodeSandbox demo](https://codesandbox.io/s/15mko9187) for a more interesting example and to see the accompanying stylesheet.
