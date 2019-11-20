import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

function Entry(props) {
  const {
    isPermalink,
    data,
  } = props;
  const {
    fields,
    frontmatter,
    html,
  } = data;
  const {
    date,
    title,
    image,
  } = frontmatter;

  return (
    <EntryWrap>
      <EntryHeader>
        <Link to={`/entry/${fields.slug}`}>
          { title } - { date }
        </Link>
      </EntryHeader>

      {html &&
        <EntryBody dangerouslySetInnerHTML={{__html: html}} />
      }

      {image &&
        <EntryImage isFullWidth={isPermalink}>
          <Link to={`/entry/${fields.slug}`}>
            <Img
              fluid={image.childImageSharp.fluid}
              loading={isPermalink && 'eager'} />
          </Link>
        </EntryImage>
      }
    </EntryWrap>
  )
}

const EntryWrap = styled.article`
  padding: 10px;

  & + & {
    margin-top: 50px;
  }
`;

const EntryHeader = styled.header`
  margin-bottom: 5px;
`;

const EntryBody = styled.main`
  width: 100%;
  max-width: 600px;
  margin: 5px 0;
`;

const EntryImage = styled.figure`
  width: 100%;
  max-width: ${props => props.isFullWidth ? 1200 : 600}px;
  height: auto;
  display: block;
`;

export default Entry


