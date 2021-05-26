import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useInitConfig } from "../../data/configuration/utils";

const Logo = ({ imageUrl, logoClass }) => {
  const initConfig = useInitConfig();

  const activeConfig = initConfig.find(el => el.isActive);
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <h4>{activeConfig.name}</h4>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
