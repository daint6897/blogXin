import PropTypes from "prop-types";
import React,{useState } from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");
import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import styled from "styled-components";
import Toc from "../components/toc";
import {FaAlignJustify, FaTimes} from "react-icons/fa";
import { ThemeContext } from "../layouts";

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
  min-width: 0px;
  max-width: 0px;
  padding-left: 40px;
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
    display: ${props => props.show ? 'unset' : 'none'};
    width: 100%;
    position:fixed;
    top: 40px;
    left: 0px;
    height: 100vh;
    background: #fff;
    max-width:1000px;
    padding:0px;  
    font-size: 18px;
  }
`;
const TocWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 40px 30px 40px 0;
  white-space: nowrap;
  @media (max-width: 500px) {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  
}
`;
const BodyContent = styled.div`
  display:flex
  justify-content: center;
  @media (max-width: 500px) {
    display: unset;
  }
  h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    display: block;
    content: " ";
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
}
`;
// const LeftSidebarWrapper = styled.div`
// @media (max-width: 500px) {
//   z-index: ${props => props.show ? 10 : -100};
//   width: 100%;
//   position:fixed;
//   top: 0px;
//   left: 0px;
//   height: 100vh;
//   background: #fff;
 
 
// }
// `;



const PostTemplate = props => {
  const [showToc, setShowToc] = useState(false);
  const toggleToc             = () => setShowToc(!showToc);
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
            {/* <LeftSidebarWrapper></LeftSidebarWrapper> */}
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