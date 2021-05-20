import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenu from "./NavMenu";

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  const config=JSON.parse(localStorage.getItem('config'));
  const styles = {
    color: config.theme.color
  }
  const background = {
    background: config.theme.backgroundcolor
  }
  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`} style={background}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}
        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <div>{config.name}</div>
          {/* <img
            alt=""
            src={process.env.PUBLIC_URL + "/assets/img/logo/logo.png"}
          /> */}
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu sidebarMenu={true} />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

OffcanvasMenu.propTypes = {
  activeState: PropTypes.bool,
  getActiveState: PropTypes.func
};

export default OffcanvasMenu;
