import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Entry from '../components/Entry';

function EntryTemplate(props) {
  return (
    <Layout showBackButton>
      <Entry
        data={props.data.entry}
        isPermalink />
    </Layout>
  );
}

export const query = graphql`
  query PermalinkQuery($id: String) {
    entry: markdownRemark(
      id: { eq: $id }
    ) {
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
`;

export default EntryTemplate
