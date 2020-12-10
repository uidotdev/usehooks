---
templateKey: post
title: useToggle
date: "2020-12-02"
gist: https://gist.github.com/nikasepiskveradze/9db51bc37e1c87974528b7bc47b5268c
sandbox: https://codesandbox.io/s/recursing-cori-ckw8p
isMultilingual: true
---

Basically, what this hook does is that, it takes a parameter with value true or false and toggles that value to opposite.
It's useful when we want to take some action into it's opposite action, for example: show and hide modal, show more/show less text, open/close side menu.


```jsx
import { useCallback, useState } from 'react';


// Usage
function App() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();
    
    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
}

// Hook
// Parameter is the boolean, with default "false" value
const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);
    
    // Define and memorize toggler function in case we pass down the comopnent,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}
```

```typescript
import { useCallback, useState } from 'react';


// Usage
function App() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();

    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
}

// Hook
// Parameter is the boolean, with default "false" value
const useToggle = (initialState: boolean = false): [boolean, any] => {
    // Initialize the state
    const [state, setState] = useState<boolean>(initialState);

    // Define and memorize toggler function in case we pass down the comopnent,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback((): void => setState(state => !state), []);

    return [state, toggle]
}
```
