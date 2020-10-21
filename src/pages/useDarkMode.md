---
templateKey: post
title: useDarkMode
date: "2019-02-11"
composes: ["useMedia", "useLocalStorage"]
gist: https://gist.github.com/gragland/cdaab58e8621be22301700e6a5d59498
sandbox: https://codesandbox.io/s/p33j1m0mxj
links:
  - url: https://github.com/donavon/use-dark-mode
    name: donavon/use-dark-mode
    description: A more configurable implementation of this hook that syncs changes across browser tabs and handles SSR. Provided much of the code and inspiration for this post.
isMultilingual: true
---

This hook handles all the stateful logic required to add a <b>☾ dark mode</b> toggle to your website. It utilizes localStorage to remember the user's chosen mode, defaults to their browser or OS level setting using the `prefers-color-scheme` media query and manages the setting of a `.dark-mode` className on `body` to apply your styles.
<br/><br/>
This post also helps illustrate the power of hook composition. The syncing of state to localStorage is handled by our [`useLocalStorage`](/useLocalStorage) hook. Detecting the user's dark mode preference is handled by our [`useMedia`](/useMedia) hook. Both of these hooks were created for other use-cases, but here we've composed them to create a super useful hook in relatively few lines of code. It's almost as if hooks bring the compositional power of React components to stateful logic! 🤯

```jsx
// Usage
function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <Content />
    </div>
  );
}

// Hook
function useDarkMode() {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark-mode";
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  // Return enabled state and setter
  return [enabled, setEnabledState];
}

// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}
```

```typescript
// Usage
function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <Content />
    </div>
  );
}

// Hook
function useDarkMode() {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [enabledState, setEnabledState] = useLocalStorage<boolean>(
    "dark-mode-enabled",
    false
  );

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled = enabledState ?? prefersDarkMode;

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark-mode";
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  // Return enabled state and setter
  return [enabled, setEnabledState];
}

// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
function usePrefersDarkMode() {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}
```
