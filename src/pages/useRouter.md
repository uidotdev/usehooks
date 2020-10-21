---
templateKey: post
title: useRouter
date: "2019-10-21"
gist: https://gist.github.com/gragland/8322804ba43392d5a1e96d37d1a38218
---

If you use React Router you might have noticed they recently added a number of useful hooks, specifically <code>useParams</code>, <code>useLocation</code>, <code>useHistory</code>, and use <code>useRouteMatch</code>. But let's see if we can make it even simpler by wrapping them up into a single <code>useRouter</code> hook that exposes just the data and methods we need. In this recipe we show how easy it is to compose multiple hooks and combine their returned state into a single object. It makes a lot of sense for libraries like React Router to offer a selection of low-level hooks, as using only the hook you need can minimize unnecessary re-renders. That said, sometimes you want a simpler developer experience and custom hooks make that easy.

```jsx
import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";

// Usage
function MyComponent() {
  // Get the router object
  const router = useRouter();

  // Get value from query string (?postId=123) or route param (/:postId)
  console.log(router.query.postId);

  // Get current pathname
  console.log(router.pathname);

  // Navigate with with router.push()
  return <button onClick={(e) => router.push("/about")}>About</button>;
}

// Hook
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
```
