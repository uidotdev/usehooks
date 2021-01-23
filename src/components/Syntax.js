import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "./theme";

const Syntax = ({ children }) => {
  const className = children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);

  return (
    <Highlight
      {...defaultProps}
      code={children.props.children}
      theme={theme}
      language={matches?.groups?.lang || ""}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const spanProps = getTokenProps({ token, key });
                const isTagAttr = spanProps.className.includes("attr-name");

                return (
                  <>
                    {isTagAttr && " "}
                    <span {...spanProps} />
                  </>
                );
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

Syntax.displayName = "Syntax";

export default Syntax;
