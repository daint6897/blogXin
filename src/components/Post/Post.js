import React, {createRef, FunctionComponent, useState} from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import NextPrev from "./NextPrev";

import {FaAlignJustify, FaTimes} from "react-icons/fa";
import styled from "styled-components";
import Toc from "../toc";
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
  transition: opacity .5s;
  // position : fixed;
  // top:40px;
  // right:20px;
  @media (max-width: 300) {
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
`;
const TocWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 40px 30px 40px 0;
`;
const Post = props => {
 
  const {
    post,
    post: {
      html,
      htmlAst,
      fields: { prefix, slug },
      frontmatter: { title, author, tags },
      parent: { modifiedTime },
      headings
    },
    authornote,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;


  console.log('titletitle',props,post.headings);
  
  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta prefix={prefix} lastEdit={modifiedTime} author={author} tags={tags} theme={theme} />

        
      </header>
     
      

       
      <Bodytext content={post} theme={theme} />
      
  
      
      <footer>
         {/*<Author note={authornote} theme={theme} /> */}
         <NextPrev next={nextPost} prev={prevPost} theme={theme} />
      </footer>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;


