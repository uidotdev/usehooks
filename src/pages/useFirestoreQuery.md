---
templateKey: post
title: useFirestoreQuery
ogImage: og-use-firestore-query.jpg
date: "2020-08-11"
gist: https://gist.github.com/gragland/8f9495deda2d7c171fcd1b4ecddf2ebb
composes: ["useMemoCompare"]
links:
  - url: https://github.com/tannerlinsley/react-query
    name: React Query
    description: Data fetching library that has a similar useQuery hook and inspired the API for this example.
  - url: https://github.com/nandorojo/swr-firestore
    name: SWR Firestore
    description: Firestore query hooks built on top of SWR
---

This hook makes it super easy to subscribe to data in your Firestore database without having to worry about state management. Instead of calling Firestore's `query.onSnapshot()` method you simply pass a query to `useFirestoreQuery()` and you get back everything you need, including `status`, `data`, and `error`. Your component will re-render when data changes and your subscription will be automatically removed when the component unmounts. Our example even supports dependent queries where you can wait on needed data by passing a falsy value to the hook. Read through the recipe and comments below to see how it works.

```jsx
// Usage
function ProfilePage({ uid }) {
  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery(
    firestore.collection("profiles").doc(uid)
  );

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "error") {
    return `Error: ${error.message}`;
  }

  return (
    <div>
      <ProfileHeader avatar={data.avatar} name={data.name} />
      <Posts posts={data.posts} />
    </div>
  );
}

// Reducer for hook state and actions
const reducer = (state, action) => {
  switch (action.type) {
    case "idle":
      return { status: "idle", data: undefined, error: undefined };
    case "loading":
      return { status: "loading", data: undefined, error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

// Hook
function useFirestoreQuery(query) {
  // Our initial state
  // Start with an "idle" status if query is falsy, as that means hook consumer is
  // waiting on required data before creating the query object.
  // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
  const initialState = {
    status: query ? "loading" : "idle",
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare(query, (prevQuery) => {
    // Use built-in Firestore isEqual method to determine if "equal"
    return prevQuery && query && query.isEqual(prevQuery);
  });

  useEffect(() => {
    // Return early if query is falsy and reset to "idle" status in case
    // we're coming from "success" or "error" status due to query change.
    if (!queryCached) {
      dispatch({ type: "idle" });
      return;
    }

    dispatch({ type: "loading" });

    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    return queryCached.onSnapshot(
      (response) => {
        // Get data for collection or doc
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response);

        dispatch({ type: "success", payload: data });
      },
      (error) => {
        dispatch({ type: "error", payload: error });
      }
    );
  }, [queryCached]); // Only run effect if queryCached changes

  return state;
}

// Get doc data and merge doc.id
function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

// Get array of doc data from collection
function getCollectionData(collection) {
  return collection.docs.map(getDocData);
}
```
