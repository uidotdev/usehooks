---
templateKey: post
title: useRequireAuth
date: "2019-11-17"
composes: ["useAuth", "useRouter"]
gist: https://gist.github.com/gragland/d0fa96ced6b1cf0e6f073964573266f4
links:
code: "import Dashboard from \".\/Dashboard.js\";\r\nimport Loading from \".\/Loading.js\";\r\nimport { useRequireAuth } from \".\/use-require-auth.js\";\r\n\r\nfunction DashboardPage(props) {\r\n  const auth = useRequireAuth();\r\n  \r\n  \/\/ If auth is null (still fetching data) \r\n  \/\/ or false (logged out, above hook will redirect)\r\n  \/\/ then show loading indicator.\r\n  if (!auth) {\r\n    return <Loading \/>;\r\n  }\r\n  \r\n  return (\r\n    <Dashboard auth={auth} \/>\r\n  );\r\n}\r\n\r\n\/\/ Hook (use-require-auth.js)\r\nimport { useEffect } from \"react\";\r\nimport { useAuth } from \".\/use-auth.js\";\r\nimport { useRouter } from \".\/use-router.js\";\r\n\r\nfunction useRequireAuth(redirectUrl = '\/signup'){\r\n  const auth = useAuth();\r\n  const router = useRouter();\r\n  \r\n  \/\/ If auth.user is false that means we're not\r\n  \/\/ logged in and should redirect.\r\n  useEffect(() => {\r\n    if (auth.user === false){\r\n      router.push(redirectUrl);\r\n    }\r\n  }, [auth, router]);\r\n    \r\n  return auth;\r\n}"
---

A common need is a way to redirect the user if they are signed out and trying to view a page that should require them to be authenticated. This example shows how you can easily compose our [`useAuth`](/useAuth) and [`useRouter`](/useRouter) hooks to create a new `useRequireAuth` hook that does just that. Of course, this functionality could be added directly to our `useAuth` hook, but then we'd need to make that hook aware of our router logic. Using the power of hook composition we can keep the other two hooks as simple as possible and just utilize our new `useRequireAuth` when redirection is needed.
