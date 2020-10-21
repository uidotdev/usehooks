---
templateKey: post
title: useAuth
date: "2019-08-12"
gist: https://gist.github.com/gragland/25910a537e397844312870fcfc3ee74b
---

A very common scenario is you have a bunch of components that need to render different depending on whether the current user is logged in and sometimes call authentication methods like `signin`, `signout`, `sendPasswordResetEmail`, etc.
<br/><br/>
This is a perfect use-case for a `useAuth` hook that enables any component to get the current auth state and re-render if it changes. Rather than have each instance of the `useAuth` hook fetch the current user, the hook simply calls `useContext` to get the data from farther up in the component tree. The real magic happens in our `<ProvideAuth>` component and our `useProvideAuth` hook which wraps all our authentication methods (in this case we're using Firebase) and then uses React Context to make the current auth object available to all child components that call `useAuth`. Whew, that was a mouthfull...
<br/><br/>
Hopefully as you read through the code below it should all make sense. Another reason I like this method is it neatly abstracts away our actual auth provider (Firebase), making it super easy to change providers in the future.

```jsx
// Top level App component
import React from "react";
import { ProvideAuth } from "./use-auth.js";

function App(props) {
  return (
    <ProvideAuth>
      {/*
        Route components here, depending on how your app is structured.
        If using Next.js this would be /pages/_app.js
      */}
    </ProvideAuth>
  );
}

// Any component that wants auth state
import React from "react";
import { useAuth } from "./use-auth.js";

function Navbar(props) {
  // Get auth state and re-render anytime it changes
  const auth = useAuth();

  return (
    <NavbarContainer>
      <Logo />
      <Menu>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {auth.user ? (
          <Fragment>
            <Link to="/account">Account ({auth.user.email})</Link>
            <Button onClick={() => auth.signout()}>Signout</Button>
          </Fragment>
        ) : (
          <Link to="/signin">Signin</Link>
        )}
      </Menu>
    </NavbarContainer>
  );
}

// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  appID: "",
});

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
```
