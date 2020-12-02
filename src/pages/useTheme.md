---
templateKey: post
title: useTheme
date: "2019-01-07"
gist: https://gist.github.com/gragland/509efd16c695e7817eb70921c77c8a05
sandbox: https://codesandbox.io/s/15mko9187
isMultilingual: true
links:
  - url: https://medium.com/geckoboard-under-the-hood/how-we-made-our-product-more-personalized-with-css-variables-and-react-b29298fde608
    name: CSS Variables and React
    description: The blog post by Dan Bahrami that inspired this recipe.
---

This hook makes it easy to dynamically change the appearance of your app using CSS variables. You simply pass in an object containing key/value pairs of the CSS variables you'd like to update and the hook updates each variable in the document's root element. This is useful in situations where you can't define styles inline (no pseudo class support) and there are too many style permutations to include each theme in your stylesheet (such as a web app that lets users customize the look of their profile). It's worth noting that many css-in-js libraries support dynamic styles out of the box, but it's interesting to experiment with how this can be done with just CSS variables and a React Hook. The example below is intentionally very simple, but you could imagine the theme object being stored in state or fetched from an API. Be sure to check out the [CodeSandbox demo](https://codesandbox.io/s/15mko9187) for a more interesting example and to see the accompanying stylesheet.

```jsx
import { useLayoutEffect } from "react";
import "./styles.scss"; // -> https://codesandbox.io/s/15mko9187

// Usage
const theme = {
  "button-padding": "16px",
  "button-font-size": "14px",
  "button-border-radius": "4px",
  "button-border": "none",
  "button-color": "#FFF",
  "button-background": "#6772e5",
  "button-hover-border": "none",
  "button-hover-color": "#FFF",
};

function App() {
  useTheme(theme);

  return (
    <div>
      <button className="button">Button</button>
    </div>
  );
}

// Hook
function useTheme(theme) {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}
```

```typescript
import { useLayoutEffect } from "react";
import "./styles.scss"; // -> https://codesandbox.io/s/15mko9187

// Usage
const theme = {
  "button-padding": "16px",
  "button-font-size": "14px",
  "button-border-radius": "4px",
  "button-border": "none",
  "button-color": "#FFF",
  "button-background": "#6772e5",
  "button-hover-border": "none",
  "button-hover-color": "#FFF",
};

// This is type of "theme" object, kind of dynamic type
interface Theme {
    [name: string]: string;
}

function App() {
  useTheme(theme);

  return (
    <div>
      <button className="button">Button</button>
    </div>
  );
}

// Hook
function useTheme(theme: Theme): void {
  useLayoutEffect(
    (): void => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}
```