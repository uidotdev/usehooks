---
templateKey: post
title: useAsync
date: "2020-01-14"
gist: https://gist.github.com/gragland/33b5d146891c77ceb1f3493a2428f026
sandbox: https://codesandbox.io/s/useasync-hook-rx5z2
links:
  - url: https://medium.com/javascript-in-plain-english/react-custom-hook-useonesubmit-b10be17245d8
    name: useSubmit
    description: Original hook by Murat Catal that inspired this recipe
  - url: https://swr.now.sh/
    name: SWR
    description: A React Hooks library for remote data fetching. Similar concept, but includes caching, automatic refetching, and many other nifty features.
  - url: https://github.com/async-library/react-async
    name: react-async
    description: React component and hook for declarative promise resolution and data fetching.

code: "import React, { useState, useEffect, useCallback } from 'react';\r\n\r\n\/\/ Usage\r\nfunction App() {\r\n  const { execute, pending, value, error } = useAsync(myFunction, false);\r\n\r\n  return (\r\n    <div>\r\n      {value && <div>{value}<\/div>}\r\n      {error && <div>{error}<\/div>}\r\n      <button onClick={execute} disabled={pending}>\r\n        {!pending ? 'Click me' : 'Loading...'}\r\n      <\/button>\r\n    <\/div>\r\n  );\r\n}\r\n\r\n\/\/ An async function for testing our hook.\r\n\/\/ Will be successful 50% of the time.\r\nconst myFunction = () => {\r\n  return new Promise((resolve, reject) => {\r\n    setTimeout(() => {\r\n      const rnd = Math.random() * 10;\r\n      rnd <= 5\r\n        ? resolve('Submitted successfully \uD83D\uDE4C')\r\n        : reject('Oh no there was an error \uD83D\uDE1E');\r\n    }, 2000);\r\n  });\r\n};\r\n\r\n\/\/ Hook\r\nconst useAsync = (asyncFunction, immediate = true) => {\r\n  const [pending, setPending] = useState(false);\r\n  const [value, setValue] = useState(null);\r\n  const [error, setError] = useState(null);\r\n\r\n  \/\/ The execute function wraps asyncFunction and\r\n  \/\/ handles setting state for pending, value, and error.\r\n  \/\/ useCallback ensures the below useEffect is not called\r\n  \/\/ on every render, but only if asyncFunction changes.\r\n  const execute = useCallback(() => {\r\n    setPending(true);\r\n    setValue(null);\r\n    setError(null);\r\n    return asyncFunction()\r\n      .then(response => setValue(response))\r\n      .catch(error => setError(error))\r\n      .finally(() => setPending(false));\r\n  }, [asyncFunction]);\r\n\r\n  \/\/ Call execute if we want to fire it right away.\r\n  \/\/ Otherwise execute can be called later, such as\r\n  \/\/ in an onClick handler.\r\n  useEffect(() => {\r\n    if (immediate) {\r\n      execute();\r\n    }\r\n  }, [execute, immediate]);\r\n\r\n  return { execute, pending, value, error };\r\n};"
---

It's generally a good practice to indicate to users the status of any async request. An example would be fetching data from an API and displaying a loading indicator before rendering the results. Another example would be a form where you want to disable the submit button when the submission is pending and then display either a success or error message when it completes.
<br/><br/>
Rather then litter your components with a bunch of `useState` calls to keep track of the state of an async function, you can use our custom hook which takes an async function as an input and returns the `pending`, `value`, and `error` values we need to properly update our UI. As you'll see in the code below, our hook allows both immediate execution and delayed execution using the returned `execute` function.
