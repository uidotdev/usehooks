import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import App from "./App";
import EmailSignup from "./EmailSignup";
import analytics from "./../utils/analytics.js";
import { MDXProvider } from "@mdx-js/react";
import LangButton, { useLangButton } from "./LangButton";

const shortcodes = { LangButton, useLangButton };

export const Layout = ({ children }) => {
  return (
    <MDXProvider components={shortcodes}>
      <App>
        {/* <Bar></Bar> */}
        <div className="hero is-bold is-primary has-text-centered">
          <GitHubLink />
          <div className="hero-body">
            <h1 className="title is-size-2-mobile is-1 is-spaced has-text-weight-bold">
              <Logo to="/">
                useHooks
                <span>(</span>
                <span role="img" aria-label="fish">
                  🐠
                </span>
                <span>)</span>
              </Logo>
            </h1>
            <div className="subtitle is-size-6-mobile is-5">
              Easy to understand React Hook recipes by{" "}
              <a
                target="_blank"
                href="https://twitter.com/gabe_ragland"
                style={{
                  boxShadow: "0 2px 0 0 rgba(255, 255, 255, 0.3)",
                  lineHeight: 2,
                }}
                onClick={() => {
                  analytics.track("clickSubtitleTwitter");
                }}
              >
                Gabe Ragland
              </a>
            </div>
          </div>
        </div>

        <InfoSection>
          <Container>
            <div className="columns is-vcentered ">
              <div className="column is-6">
                <div className="title is-5">What's all this about?</div>
                <p>
                  <i>Hooks</i> are a new addition in React that lets you use
                  state and other React features without writing a class. This
                  website provides easy to understand code examples to help you
                  learn how hooks work and inspire you to take advantage of them
                  in your next project. You may also like my{" "}
                  <a
                    href="https://divjoy.com?utm_source=usehooks&utm_medium=website&utm_campaign=usehooks-homepage&utm_content=about"
                    style={{
                      //textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      analytics.track("clickAboutDivjoy");
                    }}
                  >
                    React starter kit
                  </a>{" "}
                  ✨️
                </p>
              </div>

              <div className="column is-offset-1">
                {" "}
                <EmailSignup />
              </div>
            </div>
          </Container>
        </InfoSection>

        <div className="section">
          <Container>{children}</Container>
        </div>

        <div className="hero is-bold is-primary has-text-centered">
          <div className="hero-body">
            <FooterLevel>
              <div className="level-item">
                <Link
                  to="/"
                  onClick={() => {
                    analytics.track("clickFooterHome");
                  }}
                >
                  Home
                </Link>
              </div>
              <div className="level-item is-hidden-mobile">
                <span>/</span>
              </div>
              <div className="level-item">
                <a
                  target="_blank"
                  href="https://twitter.com/gabe_ragland"
                  onClick={() => {
                    analytics.track("clickFooterTwitter");
                  }}
                >
                  Twitter
                </a>
              </div>
              <div className="level-item is-hidden-mobile">
                <span>/</span>
              </div>
              <div className="level-item">
                <a
                  target="_blank"
                  href="https://github.com/gragland/usehooks"
                  onClick={() => {
                    analytics.track("clickFooterGithub");
                  }}
                >
                  Github
                </a>
              </div>
              <div className="level-item is-hidden-mobile">
                <span>/</span>
              </div>
              <div className="level-item">
                <a
                  target="_blank"
                  href="/rss.xml"
                  onClick={() => {
                    analytics.track("clickFooterRss");
                  }}
                >
                  RSS
                </a>
              </div>
            </FooterLevel>
          </div>
        </div>
      </App>
    </MDXProvider>
  );
};

export default Layout;

const GitHubLink = () => {
  return (
    <a
      className="is-hidden-mobile"
      target="blank"
      href="https://github.com/gragland/usehooks"
      onClick={() => {
        analytics.track("clickTopGithub");
      }}
    >
      <i
        className="fab fa-github"
        style={{
          position: "absolute",
          fontSize: "1.8rem",
          top: "1rem",
          right: "1rem",
          color: "white",
        }}
      />
    </a>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  span {
    opacity: 0.7;
  }
`;

const InfoSection = styled("section").attrs({ className: "section" })`
  background-color: #e9fffc;
`;

const Container = styled("div").attrs({ className: "container" })`
  max-width: 960px !important;
`;

const FooterLevel = styled("div").attrs({ className: "level" })`
  margin: 20px auto 0 auto;
  max-width: 300px;
  span {
    padding: 0 0.8rem;
    opacity: 0.6;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Bar = styled("div")`
  font-size: 20px;
  padding: 1rem;
  color: white;
  text-align: center;
  background-color: black;

  > a:link {
    text-decoration: none;
  }
`;
