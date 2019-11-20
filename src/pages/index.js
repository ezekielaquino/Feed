import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Entry from '../components/Entry';

function Feed(props) {
  const {
    feed,
  } = props.data;
  const {
   edges: entries,
  } = feed;

  return (
    <Layout>
      {entries.map(entry => {
        return (
          <Entry
            key={entry.node.id}
            data={entry.node} />
        );
      })}
    </Layout>
  )
}

export const query = graphql`
  query FeedQuery {
    feed: allMarkdownRemark(
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MM YYYY HH:MM")
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            title
          }
          html
        }
      }
    }
  }
`;

export default Feed
