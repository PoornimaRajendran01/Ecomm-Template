import PropTypes from "prop-types";
import React from "react";

const FeatureIconSingle = ({ singleFeature }) => {
  const config=JSON.parse(localStorage.getItem('config'));
  const color = {
    color: config.theme.color
  }
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="support-wrap mb-30">
        <div className="support-icon">
          <img
            className="animated"
            src={process.env.PUBLIC_URL + singleFeature.image}
            alt=""
          />
        </div>
        <div className="support-content">
          <h5 style={color}>{singleFeature.title}</h5>
          <p style={color}>{singleFeature.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.object
};

export default FeatureIconSingle;
