---
templateKey: post
title: useForm
date: "2019-04-13"
gist: https://gist.github.com/bluebill1049/07d8b2cb306f9f7faca0886f4f8b0a31
sandbox: https://codesandbox.io/s/yj07z1639
links:
  - url: https://github.com/bluebill1049/react-hook-form
    name: react-hook-form
    description: 📋 React hook for form validation without the hassle
code: "import React from 'react';\r\nimport ReactDOM from 'react-dom';\r\nimport useForm from 'react-hook-form';\r\n\r\nfunction App() {\r\n  const { register, handleSubmit } = useForm();\r\n  const onSubmit = data => {\r\n    alert(JSON.stringify(data));\r\n  };\r\n\r\n  return (\r\n    <div className="App">\r\n      <form onSubmit={handleSubmit(onSubmit)}>\r\n        <div>\r\n          <label htmlFor="firstName">First Name</label>\r\n          <input name="firstName" placeholder="bill" ref={register} />\r\n        </div>\r\n\r\n        <div>\r\n          <label htmlFor="lastName">Last Name</label>\r\n          <input name="lastName" placeholder="luo" ref={register} />\r\n        </div>\r\n\r\n        <div>\r\n          <label htmlFor="email">Email</label>\r\n          <input name="email" placeholder="bluebill1049@hotmail.com" type="email" ref={register} />\r\n        </div>\r\n        <button type="submit">Submit</button>\r\n      </form>\r\n    </div>\r\n  );\r\n}\r\n\r\nconst rootElement = document.getElementById('root');\r\nReactDOM.render(<App />, rootElement);"
---

Performance, flexible and extensible forms with easy to use for validation. Leverage your existing html markup and start validation your forms with standard validation.
