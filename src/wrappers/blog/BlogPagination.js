import React from "react";

const BlogPagination = () => {
  const config=JSON.parse(localStorage.getItem('config'));
    const color = {
      background: config.theme.color
    }
  return (
    <div className="pro-pagination-style text-center mt-20" style={color}>
      <ul>
        <li>
          <button className="prev">
            <i className="fa fa-angle-double-left" />
          </button>
        </li>
        <li>
          <button className="active">1</button>
        </li>
        <li>
          <button>2</button>
        </li>
        <li>
          <button className="next">
            <i className="fa fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BlogPagination;
