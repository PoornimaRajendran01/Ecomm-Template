import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {getConfig} from "../../helpers/ls"

const Logo = ({ imageUrl, logoClass }) => {
  const config = getConfig();
  const styles = {
    color: config.theme.color
  }
  return (
    <div className={`${logoClass ? logoClass : ""}`} >
      <Link to={process.env.PUBLIC_URL + "/"} style={styles}>
        {config.name}
        {/* <img alt="" src={process.env.PUBLIC_URL + imageUrl} /> */}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
