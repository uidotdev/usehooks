---
templateKey: post
title: useRedux
date: "2019-03-01"
gist: https://gist.github.com/nickvdyck/3bbc097993ba602856c5880220108eda
sandbox: https://codesandbox.io/s/8n1o5n135l
links:
    - url: https://github.com/nickvdyck/use-redux
      name: nickvdyck/use-redux
      description: React hook utilities to access your state or dispatch actions from a redux store.
code: "import { createContext, useContext, useEffect, useRef, useState } from 'react';\r\nimport shallowEqual from 'shallowequal';\r\n\r\nconst StoreContext = createContext(null);\r\n\r\nconst Provider = StoreContext.Provider;\r\n\r\nconst useDispatch = () => {\r\n  // Get the provided store from the current StoreContext\r\n  const store = useContext(StoreContext);\r\n\r\n  // Throw an error when hook is used without being wrapped in a redux provider context\r\n  if (!store)\r\n    throw new Error(\r\n      'A redux store should be provided via the useRedux Provider component. <Provider value={store} />'\r\n    );\r\n\r\n  // Return redux store dispatch function\r\n  return store.dispatch;\r\n};\r\n\r\nconst useRedux = () => {\r\n  // Get the provided store from the current StoreContext\r\n  const store = useContext(StoreContext);\r\n\r\n  // Throw an error when hook is used without being wrapped in a redux provider context\r\n  if (!store)\r\n    throw new Error(\r\n      'A redux store should be provided via the useRedux Provider component. <Provider value={store} />'\r\n    );\r\n\r\n  // Store the current state\r\n  const [currentState, setCurrentState] = useState(store.getState());\r\n  // Keep a reference to the previous state\r\n  const previousState = useRef(currentState);\r\n\r\n  // Monitor for changes to the store and than resubscribe\r\n  useEffect(\r\n    () => {\r\n      let didUnsubscribe = false;\r\n\r\n      // Redux update function, run on each store update\r\n      const checkForUpdates = () => {\r\n        if (didUnsubscribe) return;\r\n\r\n        const newState = store.getState();\r\n\r\n        // Check if the new state is different from the last saved state\r\n        // If so change the current state\r\n        if (!shallowEqual(newState, previousState.current)) {\r\n          setCurrentState(newState);\r\n          previousState.current = newState;\r\n        }\r\n      };\r\n\r\n      checkForUpdates();\r\n\r\n      const unsubscribe = store.subscribe(checkForUpdates);\r\n      const unsubscribeWrapper = () => {\r\n        didUnsubscribe = true;\r\n        unsubscribe();\r\n      };\r\n\r\n      // Unsubscribe from redux store updates when component goes out of scope\r\n      return unsubscribeWrapper;\r\n    },\r\n    [store]\r\n  );\r\n\r\n  // Return the current state\r\n  return currentState;\r\n};\r\n\r\nexport { Provider, useRedux, useDispatch };"
---

This hooks makes it easy to get access to your redux store with just a couple lines of code. It gives you access to the current state tree as an object so that via destructuring you can get access to the properties you care about. It uses the useState hook underneath so that any state changes will get propagated to your component. It also gives you access to the current redux store dispatch function so that you can dispatch new actions and update your state on user events.
<br/><br/>
Be sure to check out the [CodeSandbox Demo](https://codesandbox.io/s/8n1o5n135l) for this one.

