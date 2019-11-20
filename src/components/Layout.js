import React from 'react';
import styled from '@emotion/styled';
import { Link, StaticQuery, graphql } from 'gatsby';

function Layout(props) {
  const {
    children,
    showBackButton,
  } = props;

  return (
    <StaticQuery
      query={graphql`
        query SiteQuery {
          site {
            metadata: siteMetadata {
              title
              socials {
                label
                url
              }
            }
          }
        }
      `}
      render={({ site }) => {
        return (
          <>
            <SiteHeader>
              <div>
                <h1>
                  <Link to="/">
                    { site.metadata.title }
                  </Link>
                </h1>

                {showBackButton &&
                  <BackButton to="/">
                    &larr; Back to Index
                  </BackButton>
                }
              </div>

              <SiteHeaderSocials>
                {site.metadata.socials.map(social => {
                  const {
                    label,
                    url,
                  } = social;
        
                  return (
                    <li key={label}>
                      <a href={url}>
                        { label }
                      </a>
                    </li>
                  )
                })}
              </SiteHeaderSocials>
            </SiteHeader>

            <Main>
              { children }
            </Main>
          </>
        );
      }} />
  );
}

const SiteHeader = styled.header`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  color: #fff;
  z-index: 999;
`;

const SiteHeaderSocials = styled.ul`
  text-align: right;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
`;

const Main = styled.main`
  padding-top: 100px;
  background-color: #f4f4f4;
`;

export default Layout
