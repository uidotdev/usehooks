import React, { useCallback, useState } from "react";

export const useLangButton = () => {
  const [syntax, setSyntax] = useState("jsx");

  const switchLang = useCallback(() => {
    setSyntax((lang) => (lang === "jsx" ? "tsx" : "jsx"));
  }, []);

  return {
    syntax,
    switchLang,
  };
};

const LangButton = ({ onClick }) => {
  const handleClick = (event) => {
    //  ____                                                ___   _____
    // |  _ \    ___   _ __ ___     ___   __   __   ___    |_ _| |_   _|
    // | |_) |  / _ \ | '_ ` _ \   / _ \  \ \ / /  / _ \    | |    | |
    // |  _ <  |  __/ | | | | | | | (_) |  \ V /  |  __/    | |    | |
    // |_| \_\  \___| |_| |_| |_|  \___/    \_/    \___|   |___|   |_|
    //
    // console.log('event', event);
    // ^^^^^^^^

    if (event.target.parentElement.classList.contains("show-typescript")) {
      event.target.parentElement.classList.remove("show-typescript");
    } else {
      event.target.parentElement.classList.add("show-typescript");
    }
  };
  return <button onClick={handleClick}>Click it</button>;
};

LangButton.displayName = "LangButton";

export default LangButton;
