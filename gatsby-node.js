const path = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({node, actions, getNode}) => {
  const { createNodeField } = actions;

  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      query Entries {
        feed: allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      const { edges: entries } = result.data.feed;
  
      entries.forEach(({ node }) => {
        const {
          id,
          fields,
        } = node;

        createPage({
          path: `/entry${fields.slug}`,
          component: path.resolve('./src/templates/EntryTemplate.js'),
          context: {
            id,
          },
        });
      });

      resolve();
    });
  });
};