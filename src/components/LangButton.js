import React, { useCallback } from "react";

const LangButton = () => {
  const handleClick = useCallback((event) => {
    const postContaner = event.target.parentElement;
    const tsClassName = "show-typescript";

    if (postContaner.classList.contains(tsClassName)) {
      postContaner.classList.remove(tsClassName);
    } else {
      postContaner.classList.add(tsClassName);
    }
  }, []);

  return (
    <button
      className="button is-secondary has-text-weight-semibold"
      onClick={handleClick}
    >
      Click it
    </button>
  );
};

LangButton.displayName = "LangButton";

export default LangButton;
