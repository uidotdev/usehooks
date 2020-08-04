import React, { useCallback, useMemo, useState } from "react";
import { Link } from "gatsby";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import analytics from "./../utils/analytics.js";
import { Composes, Content, Hook, Info, Links, LinksLi, Name } from "./styled";

const PostTemplate = ({ content, frontmatter, slug, permalink }) => {
  const extraLinks = frontmatter.links || [];
  const [codeKey, setCodeKey] = useState("code");
  const isCodeSwitchAvailable = useMemo(() => Boolean(frontmatter.tsCode), []);

  const handleSwitchCodeClick = useCallback(() => {
    setCodeKey(key => (key === "code" ? "tsCode" : "code"));
  }, []);

  return (
    <Hook id={frontmatter.title}>
      <Name>
        <i className="fas fa-link link-icon" />
        <Link to={slug}>{frontmatter.title}</Link>
      </Name>

      {frontmatter.composes && (
        <Composes>
          Composes:{" "}
          {frontmatter.composes.map((title, i) => (
            <>
              <Link to={`/${title}`}>{title}</Link>
              {i < frontmatter.composes.length - 1 ? "," : ""}{" "}
            </>
          ))}
        </Composes>
      )}

      <Content dangerouslySetInnerHTML={{ __html: content }} />
      {isCodeSwitchAvailable && (
        <Content>
          <button
            className="button is-secondary has-text-weight-semibold"
            onClick={handleSwitchCodeClick}
          >
            View in {codeKey === "code" ? "TypeScript" : "JavaScript"}
          </button>
        </Content>
      )}
      <SyntaxHighlighter
        language="javascript"
        style={codeStyle}
        customStyle={{
          borderRadius: "10px",
          padding: "1.5em",
          fontSize: "14px"
        }}
      >
        {frontmatter[codeKey]}
      </SyntaxHighlighter>

      {(permalink === true || extraLinks.length > 0) && (
        <Links>
          <div className="links-title">
            <span role="img" aria-label="books">
              📚
            </span>
            Also check out:
          </div>
          <ul>
            {extraLinks.map((link, i) => (
              <LinksLi key={i}>
                <a
                  target={link.target || "_blank"}
                  href={link.url}
                  onClick={() => {
                    analytics.track("clickExtraLink");
                  }}
                >
                  {link.name}
                </a>{" "}
                -{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.description
                  }}
                />
              </LinksLi>
            ))}

            {permalink === true && (
              <LinksLi key="divjoy">
                <a
                  href="https://divjoy.com?utm_source=usehooks&utm_medium=website&utm_campaign=usehooks-post-links"
                  onClick={() => {
                    analytics.track("clickExtraDivjoyLink");
                  }}
                >
                  Divjoy
                </a>{" "}
                -{" "}
                <span>React starter kit from the creator of usehooks.com</span>
              </LinksLi>
            )}
          </ul>
        </Links>
      )}

      <Info>
        <div className="level-item">{frontmatter.date}</div>
        <div className="level-item is-hidden-mobile">
          <span>•</span>
        </div>
        {frontmatter.sandbox && (
          <>
            <div className="level-item">
              <a target="_blank" href={frontmatter.sandbox}>
                Open in CodeSandbox
              </a>
            </div>
            <div className="level-item is-hidden-mobile">
              <span>•</span>
            </div>
          </>
        )}
        <div className="level-item">
          <a target="_blank" href={frontmatter.gist}>
            Suggest a change
          </a>
        </div>
      </Info>
    </Hook>
  );
};

PostTemplate.displayName = "PostTemplate";

export default PostTemplate;
