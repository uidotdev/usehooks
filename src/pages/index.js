import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Search from "../components/Search";
import { PostTemplate } from "../templates/post.js";

class IndexPage extends React.Component {
  state = { search: "" };

  render() {
    const { data } = this.props;
    const { search } = this.state;
    const { edges: posts } = data.allMarkdownRemark;

    const filteredPosts = search ? searchPosts(posts, search) : posts;

    return (
      <Layout>
        {/*
        <Search
          value={this.search}
          onChange={value => this.setState({ search: value })}
        />
        */}

        {filteredPosts.map(post => (
          <PostTemplate
            content={post.node.html}
            frontmatter={post.node.frontmatter}
            slug={post.node.fields.slug}
          />
        ))}
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          html
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
            date(formatString: "MMMM DD, YYYY")
            gist
            sandbox
            links {
              url
              name
              description
            }
            code
          }
        }
      }
    }
  }
`;

// Quicky and hacky search
function searchPosts(posts, search) {
  // Store title matches for quick lookup
  let titles = {};

  // Get all posts that have a matching title
  const filterPostsByTitle = posts.filter(post => {
    const hook = post.node.frontmatter;
    const titleLowerCase = hook.title.toLowerCase();
    const doesInclude = titleLowerCase.includes(search.toLowerCase());
    if (doesInclude) {
      titles[titleLowerCase] = true;
      return true;
    } else {
      return false;
    }
  });

  // Get all posts that have a matching description and DON'T match by title
  const filterPostsByDescription = posts.filter(post => {
    const hook = post.node.frontmatter;
    const titleLowerCase = hook.title.toLowerCase();
    const description = post.node.html || "";
    return (
      !titles[titleLowerCase] &&
      description.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Add description matches to end of results
  const filteredPosts = filterPostsByTitle.concat(filterPostsByDescription);
  return filteredPosts;
}
