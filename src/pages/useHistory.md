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
  - url: https://codesandbox.io/s/usehistory-ts-example-dlox43
    name: React useHistory hook TS working example
    description: Implementation example for the useHistory hook.
---

This hook makes it really easy to add undo/redo functionality to your app. Our recipe is a simple drawing app. It generates a grid of blocks, allows you to click any block to toggle its color, and uses the useHistory hook so we can undo, redo, or clear all changes to the canvas. Check out our [CodeSandbox demo](https://codesandbox.io/s/32rqn6zq0p). Within our hook we're using useReducer to store state instead of useState, which should look familiar to anyone that's used redux (read more about useReducer in the [official docs](https://reactjs.org/docs/hooks-reference.html#usereducer)). The hook code was copied, with minor changes, from the excellent [use-undo library](https://github.com/xxhomey19/use-undo), so if you'd like to pull this into your project you can also use that library via npm.

```jsx
import { useReducer, useCallback } from "react";

// Usage
function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});

  return (
    <div className="container">
      <div className="controls">
        <div className="title">👩‍🎨 Click squares to draw</div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className="grid">
        {((blocks, i, len) => {
          // Generate a grid of blocks
          while (++i <= len) {
            const index = i;
            blocks.push(
              <div
                // Give block "active" class if true in state object
                className={"block" + (state[index] ? " active" : "")}
                // Toggle boolean value of clicked block and merge into current state
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={i}
              />
            );
          }
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};

// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO":
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case "SET":
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case "CLEAR":
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent,
      };
  }
};

// Hook
const useHistory = (initialPresent) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    (newPresent) => dispatch({ type: "SET", newPresent }),
    [dispatch]
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR", initialPresent }), [
    dispatch,
  ]);

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
```

```typescript
import { useReducer, useCallback, Reducer } from "react";

type ActionType = "UNDO" | "REDO" | "SET" | "CLEAR"
type Action<T=unknown> = {
    type: ActionType;
    initialPresent?: T;
    newPresent?: T;
}
type StateRow = Record<string,boolean>
type State<T = unknown> = {
    past: T[];
    present: T;
    future: T[];
}
// Usage
function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({1: false});

  return (
    <div className="container">
      <div className="controls">
        <div className="title">👩‍🎨 Click squares to draw</div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <hr />
      <div className="grid">
        {((blocks: JSX.Element[], i, len): JSX.Element[] => {
          // Generate a grid of blocks
          while (++i <= len) {
            const index = i;
            blocks.push(
              <button
                // Give block "active" class if true in state object
                className={"block" + (state[index] ? " active" : "")}
                // Toggle boolean value of clicked block and merge into current state
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={i}
              >History {index}: {!!state[index]?"on":"off"}</button>
            );
          }
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}

// Initial state that we pass into useReducer
const initialState: State<StateRow> = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: {},
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};

type HistoryReducer = Reducer<State<StateRow>, Action<StateRow>>

// Our reducer function to handle state changes based on action
const reducer: HistoryReducer = (state: State<StateRow>, action: Action<StateRow>) => {
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO":
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case "SET":
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent || {},
        future: [],
      };
    case "CLEAR":
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent || {},
      };
  }
};

// Hook
const useHistory = (initialPresent: Record<number,boolean>) => {
  const [state, dispatch] = useReducer<HistoryReducer>(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    (newPresent:Record<number,boolean>) => dispatch({ type: "SET", newPresent }),
    [dispatch]
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR", initialPresent }), [
    dispatch,
    initialPresent,
  ]);

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
```
