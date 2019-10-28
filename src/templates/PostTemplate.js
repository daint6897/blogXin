import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React,{useState } from "react";

require("prismjs/themes/prism-okaidia.css");
import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";

import Toc from "../components/toc";
import {FaAlignJustify, FaTimes} from "react-icons/fa";
import { ThemeContext } from "../layouts";


import {BodyContent,LeftSidebar ,TocWrapper,ToggleTocButton } from './common'


const PostTemplate = props => {
  
  const {
    data: {
      post,
      authornote: { html: authorNote }
    },
    pageContext: { next, prev }
  } = props;
  const [showToc, setShowToc] = useState(false);
  const toggleToc = () => setShowToc(!showToc);
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