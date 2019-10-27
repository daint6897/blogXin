import PropTypes from "prop-types";
import React,{useState } from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

import styled from "styled-components";
import Toc from "../components/toc";
import {FaAlignJustify, FaTimes} from "react-icons/fa";
const ToggleTocButton = styled.button`
  display: flex;
  position: fixed;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  border-radius: 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, .03), 0 3px 46px rgba(0, 0, 0, .1);
  border: 0;
  z-index: 5000;
  width: 50px;
  height: 50px;
  background-color: #20232a;
  color: #fff;
  outline: none;

 
  @media (min-width: 900px) {
    display: none;
  }
`;
const LeftSidebar = styled.div<{ show?: boolean }>`
  min-width: 255px;
  max-width: 225px;
  margin-left: 40px;
  transition: opacity .5s;

  
  @media (max-width: 360) {
    position: fixed;
    opacity: ${props => props.show ? 1 : 0};
    z-index: 1000;
    background-color: #fff;
    width: 100% !important;
    max-width: 100%;
    padding: 0 20px;
    margin-top: -5px;
    height: calc(100vh - 70px);
  }

  @media (max-width: 500px) {
    display: none;
  }
`;
const TocWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 40px 30px 40px 0;
`;

const BodyContent = styled.div`
  display:flex
  justify-content: center;
  @media (max-width: 500px) {
    display: unset;
  }
`;

const PostTemplate = props => {
  const [showToc, setShowToc] = useState(false);
  let toggleToc             = () => setShowToc(!showToc);
  const {
    data: {
      post,
      authornote: { html: authorNote }
    },
    pageContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
 <BodyContent>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Post
              post={post}
              next={next}
              prev={prev}
              authornote={authorNote}
              theme={theme}
            />
          </Article>
        )}
      </ThemeContext.Consumer>

      {post.headings.find(h => h.depth > 1) &&
        <>
            <LeftSidebar show={showToc}>
                <TocWrapper>
                    <Toc onClick={toggleToc}/>
                </TocWrapper>
            </LeftSidebar>
            
            <ToggleTocButton
                role={`button`}
                aria-label={`Toggle table of contents`}
                onClick={toggleToc}
            >
              {showToc ? <FaTimes/> : <FaAlignJustify/>}
            </ToggleTocButton>
        </>
        }
      </BodyContent>
      <Seo data={post} />
    </React.Fragment>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      headings {
        depth
      }
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        author
        tags
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
      parent {
        ...on File {
          modifiedTime(formatString: "YYYY-MM-DD")
        }
      }
    }
    authornote: markdownRemark(fileAbsolutePath: { regex: "/author/" }) {
      id
      html
      htmlAst
    }
  }
`;
