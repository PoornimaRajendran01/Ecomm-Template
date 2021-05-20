import React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";

const Breadcrumb = () => {
  const config=JSON.parse(localStorage.getItem('config'));
  const styles = {
    display: config.theme.display
  }
  return (
    <div className="breadcrumb-area pt-35 pb-35 bg-gray-3"  style={styles}>
      <div className="container">
        <div className="breadcrumb-content text-center">
          <Breadcrumbs
            separator={<span>/</span>}
            item={NavLink}
            finalItem={"span"}
          />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
