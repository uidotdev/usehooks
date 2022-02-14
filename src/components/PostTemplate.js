import React, { useCallback, useMemo, useState } from "react";
import { Link } from "gatsby";
import analytics from "./../utils/analytics.js";
import {
  CodeContent,
  Composes,
  Content,
  Hook,
  Info,
  Links,
  LinksLi,
  Name,
} from "./styled";

const PostTemplate = ({ content, frontmatter, slug, permalink }) => {
  const extraLinks = frontmatter.links || [];
  const [lang, setLang] = useState("jsx");
  const isCodeSwitchAvailable = useMemo(
    () => Boolean(frontmatter.isMultilingual),
    [frontmatter.isMultilingual]
  );

  const handleSwitchCodeClick = useCallback(() => {
    setLang((value) => (value === "jsx" ? "tsx" : "jsx"));
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
            <React.Fragment key={i}>
              <Link to={`/${title}`}>{title}</Link>
              {i < frontmatter.composes.length - 1 ? "," : ""}{" "}
            </React.Fragment>
          ))}
        </Composes>
      )}

      <CodeContent
        language={lang}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {isCodeSwitchAvailable && (
        <Content>
          <button
            className="button is-secondary has-text-weight-semibold"
            onClick={handleSwitchCodeClick}
          >
            View in {lang === "jsx" ? "TypeScript" : "JavaScript"}
          </button>
        </Content>
      )}

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
                  rel="noopener"
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
                    __html: link.description,
                  }}
                />
              </LinksLi>
            ))}

            {permalink === true && (
              <LinksLi key="reactHooksCourse">
                <a
                  href="https://ui.dev/react-hooks"
                  onClick={() => {
                    analytics.track("clickHooksCourseLink");
                  }}
                >
                  Our React Hooks course
                </a>{" "}
                - <span>Find out more by visiting </span>
                <a
                  href="https://ui.dev/react-hooks"
                  onClick={() => {
                    analytics.track("clickHooksCourseLink");
                  }}
                >
                  ui.dev
                </a>{" "}
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
              <a target="_blank" rel="noreferrer" href={frontmatter.sandbox}>
                Open in CodeSandbox
              </a>
            </div>
            <div className="level-item is-hidden-mobile">
              <span>•</span>
            </div>
          </>
        )}
        <div className="level-item">
          <a target="_blank" rel="noreferrer" href={frontmatter.gist}>
            Suggest a change
          </a>
        </div>
      </Info>
    </Hook>
  );
};

PostTemplate.displayName = "PostTemplate";

export default PostTemplate;
