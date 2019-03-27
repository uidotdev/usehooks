const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            html
            fields {
              slug
            }
            frontmatter {
              templateKey
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
              code
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    let posts = result.data.allMarkdownRemark.edges;

    createPaginatedPages({
      edges: posts,
      createPage: createPage,
      pageTemplate: "src/templates/index.js",
      pageLength: 10, // This is optional and defaults to 10 if not used
      pathPrefix: "page", // This is optional and defaults to an empty string if not used
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/`, // This is optional and this is the default
      context: {} // This is optional and defaults to an empty object if not used
    });

    posts.forEach((edge, index) => {
      const id = edge.node.id;

      // Get next post (starts back at beginning if viewing most recent post)
      const next = posts[index + 1] ? posts[index + 1].node : posts[0].node;

      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          next
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
