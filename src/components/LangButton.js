import React, { useCallback, useState } from "react";
import styled from "styled-components";
import analytics from "../utils/analytics";

const StyledButton = styled(({ className, ...props }) => (
  <button
    className={`button is-secondary has-text-weight-semibold ${className}`}
    {...props}
  />
))`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const LangButton = () => {
  const [isTS, setIsTS] = useState(false);

  const handleClick = useCallback((event) => {
    const postContaner = event.target.parentElement;
    const tsClassName = "show-typescript";
    analytics.track("clickTsToggle");

    if (postContaner.classList.contains(tsClassName)) {
      postContaner.classList.remove(tsClassName);
      setIsTS(false);
    } else {
      postContaner.classList.add(tsClassName);
      setIsTS(true);
    }
  }, []);

  return (
    <StyledButton onClick={handleClick}>
      {`View in ${isTS ? "JavaScript" : "TypeScript"}`}
    </StyledButton>
  );
};

LangButton.displayName = "LangButton";

export default LangButton;
