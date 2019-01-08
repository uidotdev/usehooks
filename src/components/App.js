import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql, withPrefix } from "gatsby";
import ogImage from "./../../static/img/og-image.png";
import "./global.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title="useHooks - One new React Hook code recipe every day">
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
          />

          <meta
            name="description"
            content="We bring you one new React hook code recipe per day so you can learn how React hooks work and feel more comfortable writing your own."
          />

          <meta
            name="keywords"
            content="react, javascript, hooks, useState, useEffect, tutorial, demo, code"
          />

          <meta
            property="og:image"
            content={"https://usehooks.com" + ogImage}
          />

          <meta property="og:title" content="useHooks" />
          <meta
            property="og:description"
            content="One new React Hook recipe every day"
          />
          <meta name="twitter:card" content="summary_large_image" />

          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
            integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
            crossorigin="anonymous"
          />
        </Helmet>

        {children}
      </>
    )}
  />
);

export default Layout;
