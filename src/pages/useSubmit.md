---
templateKey: post
title: useSubmit
date: '2019-10-13'
gist: https://gist.github.com/muratcatal/bcf58a2ade368bf279775749019c2d0b
sandbox: https://codesandbox.io/embed/useonesubmit-hook-08wz9?fontsize=14
code: "import React, { useState } from \"react\";\r\nimport ReactDOM from \"react-dom\";\r\n\r\nconst useSubmit = submitFunction => {\r\n  const [loading, setLoading] = useState(false);\r\n  const [error, setError] = useState(null);\r\n\r\n  const handleSubmit = async () => {\r\n    try {\r\n      setLoading(true);\r\n      setError(null);\r\n      await submitFunction();\r\n    } catch (error) {\r\n      setError(error);\r\n    } finally {\r\n      setLoading(false);\r\n    }\r\n  };\r\n  return [handleSubmit, loading, error];\r\n};\r\n\r\nfunction App() {\r\n  const mySubmitFunction = () => {\r\n    return new Promise((resolve, reject) => {\r\n      setTimeout(() => {\r\n        const rnd = Math.random() * 10;\r\n        rnd <= 5 ? resolve() : reject(\"Error occurred!\");\r\n      }, 2000);\r\n    });\r\n  };\r\n  const [handleSubmit, loading, error] = useSubmit(mySubmitFunction);\r\n\r\n  return (\r\n    <div>\r\n      <button onClick={handleSubmit} disabled={loading}>\r\n        {!loading ? \"Click me\" : \"Loading...\"}\r\n      <\/button>\r\n      {error && <div>{error}<\/div>}\r\n    <\/div>\r\n  );\r\n}"
---

If you use GraphQL, you may be used loading and error states which are exposed by ApolloClient. This hook helps you get loading
and error states just like in ApolloClient.
