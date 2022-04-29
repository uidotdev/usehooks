import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PostTemplate from "../components/PostTemplate";
import { More } from "../components/styled";

const Post = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;

  const { next } = pageContext;

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} React Hook - useHooks`}>
        <link rel="canonical" href={`https://usehooks.com${post.fields.slug}`} />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        {post.frontmatter.ogImage && (
          <meta
            property="og:image"
            content={"https://usehooks.com/img/" + post.frontmatter.ogImage}
          />
        )}
      </Helmet>
      <PostTemplate
        content={post.html}
        frontmatter={post.frontmatter}
        slug={post.fields.slug}
        permalink={true}
      />

      <More>
        Next recipe:
        <Link to={next.fields.slug} rel="next" className="next">
          {next.frontmatter.title}
        </Link>
      </More>
    </Layout>
  );
};

Post.displayName = "Post";

export default Post;

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        composes
        gist
        sandbox
        links {
          url
          name
          description
        }
        isMultilingual
        ogImage
      }
    }
  }
`;
