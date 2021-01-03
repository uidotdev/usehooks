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
  return <button onClick={onClick}>Click it</button>;
};

LangButton.displayName = "LangButton";

export default LangButton;
