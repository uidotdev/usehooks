---
templateKey: post
title: useRequireAuth
date: "2019-11-17"
composes: ["useAuth", "useRouter"]
gist: https://gist.github.com/gragland/d0fa96ced6b1cf0e6f073964573266f4
links:
---

A common need is a way to redirect the user if they are signed out and trying to view a page that should require them to be authenticated. This example shows how you can easily compose our [`useAuth`](/useAuth) and [`useRouter`](/useRouter) hooks to create a new `useRequireAuth` hook that does just that. Of course, this functionality could be added directly to our `useAuth` hook, but then we'd need to make that hook aware of our router logic. Using the power of hook composition we can keep the other two hooks as simple as possible and just utilize our new `useRequireAuth` when redirection is needed.

```jsx
import Dashboard from "./Dashboard.js";
import Loading from "./Loading.js";
import { useRequireAuth } from "./use-require-auth.js";

function DashboardPage(props) {
  const auth = useRequireAuth();

  // If auth is null (still fetching data)
  // or false (logged out, above hook will redirect)
  // then show loading indicator.
  if (!auth) {
    return <Loading />;
  }

  return <Dashboard auth={auth} />;
}

// Hook (use-require-auth.js)
import { useEffect } from "react";
import { useAuth } from "./use-auth.js";
import { useRouter } from "./use-router.js";

function useRequireAuth(redirectUrl = "/signup") {
  const auth = useAuth();
  const router = useRouter();

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
}
```
