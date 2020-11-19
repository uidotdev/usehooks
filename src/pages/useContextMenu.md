---
templateKey: post
title: useContextMenu
date: "2020-11-19"
gist: https://gist.github.com/Rafi993/530e083aacd2a3a0e15518ace1317bbf
---

Some times you want to override browses context menu that shows up on right click.
This hook helps you to do that.

You can define you context menu as follows

```jsx
import React from "react";

import useContextMenu from "./useContextMenu";

const Menu = ({ outerRef }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);

  if (menu) {
    return (
      <ul className="menu" style={{ top: yPos, left: xPos }}>
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
```

and from the parent of context menu you can pass the corresponding ref

```jsx
import React, { useRef } from "react";

import Menu from "./Menu";

function App() {
  const outerRef = useRef(null);

  return (
    <div ref={outerRef} className="app">
      <Menu outerRef={outerRef} />
    </div>
  );
}

export default App;
```
