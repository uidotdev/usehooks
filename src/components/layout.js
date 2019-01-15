import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import App from "./App"; // Soon to be "App"
import EmailSignup from "./EmailSignup";

export const Layout = ({ children }) => {
  return (
    <App>
      <GitHubLink />
      <div className="hero is-bold is-primary has-text-centered">
        <div className="hero-body">
          <h1 className="title is-size-2-mobile is-1 is-spaced has-text-weight-bold">
            <Logo to="/">
              useHooks
              <span>(</span>
              🐠
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
                lineHeight: 2
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
              <div className="title is-5">What all this about?</div>
              <p>
                Hooks are an upcoming feature that lets you use state and other
                React features without writing a class. This websites provides
                easy to understand code examples to help you understand how
                hooks work and hopefully inspire you to take advantage of them
                in your next project. Be sure to check out the{" "}
                <a
                  target="_blank"
                  href="https://reactjs.org/docs/hooks-intro.html"
                >
                  official docs
                </a>
                .
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
              <a target="_blank" href="https://twitter.com/gabe_ragland">
                Twitter
              </a>
            </div>
            <div className="level-item is-hidden-mobile">
              <span>/</span>
            </div>
            <div className="level-item">
              <a target="_blank" href="https://github.com/gragland/usehooks">
                Github
              </a>
            </div>
            <div className="level-item is-hidden-mobile">
              <span>/</span>
            </div>
            <div className="level-item">
              <a target="_blank" href="/rss.xml">
                RSS
              </a>
            </div>
          </FooterLevel>
        </div>
      </div>
    </App>
  );
};

export default Layout;

const GitHubLink = () => {
  return (
    <a
      className="is-hidden-mobile"
      target="blank"
      href="https://github.com/gragland/usehooks"
    >
      <i
        class="fab fa-github"
        style={{
          position: "absolute",
          fontSize: "1.5rem",
          top: "1rem",
          right: "1rem",
          color: "white"
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
  max-width: 150px;
  span {
    padding: 0 0.8rem;
    opacity: 0.6;
  }
  a:hover {
    text-decoration: underline;
  }
`;
