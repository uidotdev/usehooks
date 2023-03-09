templateKey: post
title: useCookie
date: "2023-03-09"
---

This hook allows you to quickly init and set cookies using a custom hook

```js
import React, { useState } from 'react';

const getItem = (key) =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=');
    const storedKey = item[0];
    const storedValue = item[1];

    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, '');

const setItem = ({ key, value, numberOfMinutes }) => {
  const now = new Date();
  // set the time to be now + numberOfMinutes
  now.setTime(now.getTime() + numberOfMinutes * 60 * 1000);

  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

const useCookie = (key, defaultValue) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());
  const updateCookie = (value, numberOfMinutes) => {
    setCookie(value);
    setItem({ key, value, numberOfMinutes });
  };

  return [cookie, updateCookie];
};

export default useCookie;

```

- Init cookie
```typescript
const [cookie, setCookie] = useCookie('cookie', 'valueCookie')
```

- Update value and time expires

```typescript
setCookie('newValueCookie', 2)
```