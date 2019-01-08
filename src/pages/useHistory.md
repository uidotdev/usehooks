---
templateKey: post
title: useHistory
date: "2018-11-19"
gist: https://gist.github.com/gragland/d48cca2b26bcd93f453054554fc892bf
sandbox: https://codesandbox.io/s/32rqn6zq0p
links:
  - url: https://github.com/xxhomey19/use-undo
    name: xxhomey19/use-undo
    description:
      The library that this code was copied from with minor changes. Also
      returns previous and future states from hook, but doesn't have a clear action.
  - url: https://codesandbox.io/s/yv3004lqnj
    name: React useHistory hook
    description: An alternate implementation of useHistory by <a target="_blank"  href="https://twitter.com/juice49">@juice49</a>.
code:
  "import { useReducer, useCallback } from 'react';\r\n\r\n// Usage\r\nfunction
  App() {\r\n  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});\r\n\r\n
  \ return (\r\n    <div className=\"container\">\r\n      <div className=\"controls\">\r\n
  \       <div className=\"title\">\U0001F469‍\U0001F3A8 Click squares to draw</div>\r\n
  \       <button onClick={undo} disabled={!canUndo}>\r\n          Undo\r\n        </button>\r\n
  \       <button onClick={redo} disabled={!canRedo}>\r\n          Redo\r\n        </button>\r\n
  \       <button onClick={clear}>Clear</button>\r\n      </div>\r\n\r\n      <div
  className=\"grid\">\r\n        {((blocks, i, len) => {\r\n          // Generate
  a grid of blocks\r\n          while (++i <= len) {\r\n            const index =
  i;\r\n            blocks.push(\r\n              <div\r\n                // Give
  block \"active\" class if true in state object\r\n                className={'block'
  + (state[index] ? ' active' : '')}\r\n                // Toggle boolean value of
  clicked block and merge into current state\r\n                onClick={() => set({
  ...state, [index]: !state[index] })}\r\n                key={i}\r\n              />\r\n
  \           );\r\n          }\r\n          return blocks;\r\n        })([], 0, 625)}\r\n
  \     </div>\r\n    </div>\r\n  );\r\n}\r\n\r\n// Initial state that we pass into
  useReducer\r\nconst initialState = {\r\n  // Array of previous state values updated
  each time we push a new state\r\n  past: [],\r\n  // Current state value\r\n  present:
  null,\r\n  // Will contain \"future\" state values if we undo (so we can redo)\r\n
  \ future: []\r\n};\r\n\r\n// Our reducer function to handle state changes based
  on action\r\nconst reducer = (state, action) => {\r\n  const { past, present, future
  } = state;\r\n\r\n  switch (action.type) {\r\n    case 'UNDO':\r\n      const previous
  = past[past.length - 1];\r\n      const newPast = past.slice(0, past.length - 1);\r\n\r\n
  \     return {\r\n        past: newPast,\r\n        present: previous,\r\n        future:
  [present, ...future]\r\n      };\r\n    case 'REDO':\r\n      const next = future[0];\r\n
  \     const newFuture = future.slice(1);\r\n\r\n      return {\r\n        past:
  [...past, present],\r\n        present: next,\r\n        future: newFuture\r\n      };\r\n
  \   case 'SET':\r\n      const { newPresent } = action;\r\n\r\n      if (newPresent
  === present) {\r\n        return state;\r\n      }\r\n      return {\r\n        past:
  [...past, present],\r\n        present: newPresent,\r\n        future: []\r\n      };\r\n
  \   case 'CLEAR':\r\n      const { initialPresent } = action;\r\n\r\n      return
  {\r\n        ...initialState,\r\n        present: initialPresent\r\n      };\r\n
  \ }\r\n};\r\n\r\n// Hook\r\nconst useHistory = initialPresent => {\r\n  const [state,
  dispatch] = useReducer(reducer, {\r\n    ...initialState,\r\n    present: initialPresent\r\n
  \ });\r\n\r\n  const canUndo = state.past.length !== 0;\r\n  const canRedo = state.future.length
  !== 0;\r\n\r\n  // Setup our callback functions\r\n  // We memoize with useCallback
  to prevent unecessary re-renders\r\n\r\n  const undo = useCallback(\r\n    () =>
  {\r\n      if (canUndo) {\r\n        dispatch({ type: 'UNDO' });\r\n      }\r\n
  \   },\r\n    [canUndo, dispatch]\r\n  );\r\n\r\n  const redo = useCallback(\r\n
  \   () => {\r\n      if (canRedo) {\r\n        dispatch({ type: 'REDO' });\r\n      }\r\n
  \   },\r\n    [canRedo, dispatch]\r\n  );\r\n\r\n  const set = useCallback(newPresent
  => dispatch({ type: 'SET', newPresent }), [\r\n    dispatch\r\n  ]);\r\n\r\n  const
  clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [\r\n    dispatch\r\n
  \ ]);\r\n\r\n  // If needed we could also return past and future state\r\n  return
  { state: state.present, set, undo, redo, clear, canUndo, canRedo };\r\n};"
---

This hook makes it really easy to add undo/redo functionality to your app. Our recipe is a simple drawing app. It generates a grid of blocks, allows you to click any block to toggle its color, and uses the useHistory hook so we can undo, redo, or clear all changes to the canvas. Check out our [CodeSandbox demo](https://codesandbox.io/s/32rqn6zq0p). Within our hook we're using useReducer to store state instead of useState, which should look familiar to anyone that's used redux (read more about useReducer in the [official docs](https://reactjs.org/docs/hooks-reference.html#usereducer)). The hook code was copied, with minor changes, from the excellent [use-undo library](https://github.com/xxhomey19/use-undo), so if you'd like to pull this into your project you can also use that library via npm.
