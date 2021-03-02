---
templateKey: post
title: useContextAndReducer
date: "2021-01-27"
gist: https://gist.github.com/JO3-W3B-D3V/69b1322a16ee53c84613210b16592449
sandbox: https://codesandbox.io/s/usecontextandreducer-fjprs
---

It's a very common scenario if you have an array components, maybe even an array of components across a large number of pages. Often you may want to be able to share state across the entire application, but you may also want to have the ability to use a reducer to update some state on the context. 
<br/><br/>
Rather than re-write the same code over & over the `useContextAndReducer` essentially wraps up the logic & the other hooks that one may desire to make use of to ensure that the state that's modified in the reducer is in sync with the state that's held in the context.

```jsx
import React, { useState, useEffect, useReducer, useContext, useRef, createContext } from "react";

// Hook definition.
export const useContextAndReducer = (reducer, context) => {
  const ctx = useContext(context);
  const [state, dispatch] = useReducer(reducer, ctx.state);
  const { setState } = ctx;

  // Update the context when the state changes from the reducer.
  useEffect(() => {
    setState({ ...state });
  }, [state, setState]);

  // Return the state from the reducer & the dispatch function.
  return [state, dispatch];
};

// Create the context so that state can persist
// across many components & across different pages,
// etc.
const Context = createContext();

// Create the context provider so that other
// components can consume the shared state.
const ContextProvider = (props) => {
  const { state, setState } = props;

  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};

// Create your reducer, this is a simple
// example.
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE":
      const todos = [...state.todos];
      todos.splice(action.payload, 1);
      return { ...state, todos };
    case "EMPTY":
      return { ...state, todos: [] };
    default:
      return state;
  }
};


// The business logic to adding a todo item to the list.
const handleAddTodo = (dispatch) => (ref) => () => {
  dispatch({ type: "ADD", payload: ref.current.value });
  ref.current.value = "";
};

// The business logic to handle removing an item from the todo list.
const handleRemoveTodo = (dispatch) => (index) => () => {
  dispatch({ type: "REMOVE", payload: index });
};

// The business logic to empty the todo list.
const handleEmptyTodoList = (dispatch) => () => {
  dispatch({ type: "EMPTY" });
};

// Usage
// This is some component for the sake of example.
const TodoListComponent = () => {
  const ref = useRef(null);
  const [state, dispatch] = useContextAndReducer(todoReducer, Context);

  return (
    <>
      <input type="text" ref={ref} />
      <button onClick={handleAddTodo(dispatch)(ref)}>Add</button>
      <button onClick={handleEmptyTodoList(dispatch)}>Empty</button>
      <ul>
        {state.todos.map((todo, index) => {
          return (
            <li key={index}>
              <p>{todo}</p>
              <button onClick={handleRemoveTodo(dispatch)(index)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

// This is essentially the parent/root/container component.
function App() {
  const [state, setState] = useState({
    todos: ["Go shopping", "Hoover the house", "Cook dinner"],
  });

  return (
    <ContextProvider state={state} setState={setState}>
      <TodoListComponent />
    </ContextProvider>
  );
}

export default App;

```