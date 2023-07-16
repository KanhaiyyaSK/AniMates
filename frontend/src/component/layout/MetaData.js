import React from "react";
// Helmet for setting the title of the website 
import Helmet from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
