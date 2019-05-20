---
templateKey: post
title: useKonamiCode
date: "2019-05-20"
gist: https://gist.github.com/chrislaughlin/618c28cf958dd7cd40435f99261c0872
sandbox: https://codesandbox.io/s/iskonamicode-yfdb9
code:"const getKeyName = keyCode => {
  switch (keyCode) {
    case 37:
      return "left";
      break;
    case 38:
      return "up";
      break;
    case 39:
      return "right";
      break;
    case 40:
      return "down";
      break;
    case 65:
      return "A";
      break;
    case 66:
      return "B";
      break;
  }
};

const isKonamiCode = codes => {
  return codes.join(" ") === "up up down down left right left right B A";
};

const useKonamiCode = () => {
  const [keys, setKeys] = useState([]);
  let timeout;
  document.onkeydown = e => {
    clearTimeout(timeout);
    setKeys(currentKeys => [...currentKeys, getKeyName(e.keyCode)]);
    timeout = setTimeout(() => {
      setKeys([]);
    }, 10000);
  };

  return {
    isKonamiCode: isKonamiCode(keys),
    keys
  };
};
"
---

This hook allows you to tack if a user has entered the [Konami Code](https://en.wikipedia.org/wiki/Konami_Code) via the keyboard. the hook tacks the keys pressed by the user and check if the pattern matches _up up down down left right left right B A_ It will also clear the stored keys after 3 seconds of no key presses to allow for mistakes.
