import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const List = props => {
  const { edges, theme } = props;
  console.log("TCL: edgesssss", edges)

  return (
    <React.Fragment>
      <ul>
        {edges.map(edge => {
          console.log('edge',edge);
          const {
            node: {
              frontmatter: { title,path },
              fields: { slug }
            }
          } = edge;


          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          );
        })}
      </ul>

      {/* --- STYLES --- */}
      <style jsx>{`
        ul {
          margin: ${theme.space.stack.m};
          padding: ${theme.space.m};
          list-style: circle;
        }
        li {
          padding: ${theme.space.xs} 0;
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.l};
        }
      `}</style>
    </React.Fragment>
  );
};

List.propTypes = {
  edges: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default List;
