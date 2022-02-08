import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import App from "./App";
import EmailSignup from "./EmailSignup";
import analytics from "./../utils/analytics.js";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  return (
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
              href="https://ui.dev"
              rel="noopener"
              style={{
                boxShadow: "0 2px 0 0 rgba(255, 255, 255, 0.3)",
                lineHeight: 2,
              }}
              onClick={() => {
                analytics.track("clickSubtitleLink");
              }}
            >
              ui.dev
            </a>
          </div>
        </div>
      </div>

      <InfoSection>
        <Container>
          <div className="columns is-vcentered ">
            <div className="column is-6">
              <h4 className="title is-5">What's all this about?</h4>
              <p>
                <i>Hooks</i> are a feature in React that allow you use state and
                other React features without writing classes. This website
                provides easy to understand code examples to help you learn how
                hooks work and inspire you to take advantage of them in your
                next project.
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
                href="https://twitter.com/uidotdev"
                rel="noreferrer"
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
                href="https://github.com/uidotdev/usehooks"
                rel="noreferrer"
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
                rel="noopener"
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 3000,
          },
        }}
      />
    </App>
  );
};

export default Layout;

const GitHubLink = () => {
  return (
    <a
      className="is-hidden-mobile"
      target="blank"
      rel="noreferrer"
      href="https://github.com/uidotdev/usehooks"
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
