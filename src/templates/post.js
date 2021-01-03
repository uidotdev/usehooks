import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PostTemplate from "../components/PostTemplate";
import { More } from "../components/styled";

const Post = ({
  // data,
  pageContext,
  children,
}) => {
  // const { mdx } = data;

  //  ____                                                ___   _____
  // |  _ \    ___   _ __ ___     ___   __   __   ___    |_ _| |_   _|
  // | |_) |  / _ \ | '_ ` _ \   / _ \  \ \ / /  / _ \    | |    | |
  // |  _ <  |  __/ | | | | | | | (_) |  \ V /  |  __/    | |    | |
  // |_| \_\  \___| |_| |_| |_|  \___/    \_/    \___|   |___|   |_|
  //
  // console.log('mdx', mdx);
  // ^^^^^^^^

  const { ...post } = pageContext;

  //  ____                                                ___   _____
  // |  _ \    ___   _ __ ___     ___   __   __   ___    |_ _| |_   _|
  // | |_) |  / _ \ | '_ ` _ \   / _ \  \ \ / /  / _ \    | |    | |
  // |  _ <  |  __/ | | | | | | | (_) |  \ V /  |  __/    | |    | |
  // |_| \_\  \___| |_| |_| |_|  \___/    \_/    \___|   |___|   |_|
  //
  console.log("post", post, pageContext);
  // ^^^^^^^^

  return (
    <Layout>
      <Helmet title={`${post.title} React Hook - useHooks`}>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        {post.ogImage && (
          <meta
            property="og:image"
            content={"https://usehooks.com/img/" + post.ogImage}
          />
        )}
      </Helmet>
      <PostTemplate content={post.html} frontmatter={post} permalink={true} />
      {children}

      {/* <More>
        Next recipe:
        <Link to={next.fields.slug} rel="next" className="next">
          {next.title}
        </Link>
      </More> */}
    </Layout>
  );
};

Post.displayName = "Post";

export default Post;

export const pageQuery = graphql`
  query PostByID($id: String!) {
    mdx(id: { eq: $id }) {
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
