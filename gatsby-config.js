const path = require("path");

module.exports = {
  siteMetadata: {
    title: "useHooks",
    description: "Easy to understand React Hook recipes",
    siteUrl: "https://usehooks.com",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "186849069509023",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `useHooks`,
        short_name: `useHooks`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: "static/images/favicon/favicon-32x32.png",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "custom-bytes-subscriber-count-plugin",
    "custom-plausible-plugin",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "images",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Tomorrow Night Eighties`, // From package.json: contributes.themes[0].label
              extensions: [
                `${__dirname}/ms-vscode.Theme-TomorrowKit-0.1.4.vsix`,
              ],
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: null,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 400)
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "useHooks",
            link: "https://usehooks.com",
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
