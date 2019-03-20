import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import PaginationContainer from "../components/PaginationContainer";
import Search from "../components/Search";
import { PostTemplate } from "../templates/post.js";

const NavLink = props => {
  if (!props.test) {
    return <Link to={`/${props.url}`}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

class IndexPage extends React.Component {
  state = { search: "" };

  render() {
    const { pageContext } = this.props;
    const { group, index, first, last, pageCount } = pageContext;
    const previousUrl = index - 1 == 1 ? "" : "/page/" + (index - 1).toString();
    const nextUrl = "/page/" + (index + 1).toString();
    const { search } = this.state;

    // const filteredPosts = search ? searchPosts(posts, search) : posts;

    return (
      <Layout>
        {/*
        <Search
          value={this.search}
          onChange={value => this.setState({ search: value })}
        />
        */}

        {group.map(({ node }) => (
          <PostTemplate
            key={node.id}
            content={node.excerpt}
            frontmatter={node.frontmatter}
            slug={node.fields.slug}
          />
        ))}
        <PaginationContainer>
          <NavLink test={first} url={previousUrl} text="<<< Previous" />
          <span>{` Page ${index} of ${pageCount}`}</span>
          <NavLink test={last} url={nextUrl} text="Next >>>" />
        </PaginationContainer>
      </Layout>
    );
  }
}

export default IndexPage;

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
