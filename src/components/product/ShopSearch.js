import React from "react";

const ShopSearch = () => {
  const config=JSON.parse(localStorage.getItem('config'));
  const styles = {
    color: config.theme.categoryColor
  }
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title" style={styles}>Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..." />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
