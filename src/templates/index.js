import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
// import Search from "../components/Search";
import PostTemplate from "../components/PostTemplate";

const IndexPage = ({ pageContext }) => {
  const { group, index, first, last, pageCount } = pageContext;
  const previousUrl = index - 1 === 1 ? "/" : `/page/${index - 1}`;
  const nextUrl = "/page/" + (index + 1).toString();

  return (
    <Layout>
      {group.map(({ node }) => (
        <PostTemplate
          key={node.id}
          content={node.html}
          frontmatter={node.frontmatter}
          slug={node.fields.slug}
        />
      ))}

      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Link
          className="pagination-previous"
          to={previousUrl}
          disabled={first}
          style={{
            // Temp hack to prevent clicking
            // TODO: Render a link without a href instead
            pointerEvents: first ? "none" : "auto",
          }}
        >
          Previous
        </Link>
        <Link
          className="pagination-next"
          to={nextUrl}
          disabled={last}
          style={{
            pointerEvents: last ? "none" : "auto",
          }}
        >
          Next Page
        </Link>
        <ul className="pagination-list">
          {Array(pageCount)
            .fill(null)
            .map((value, i) => {
              const pageNum = i + 1;
              const isCurrent = index === pageNum;
              const url = pageNum === 1 ? "/" : `/page/${pageNum}`;

              return (
                <li key={i}>
                  <Link
                    className={
                      "pagination-link" + (isCurrent ? " is-current" : "")
                    }
                    to={url}
                  >
                    {pageNum}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </Layout>
  );
};

export default IndexPage;
