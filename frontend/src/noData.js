import React from 'react';
import "./noData.css"
const NoDataFound = () => {
  const handleRefresh = () => {
    console.log('Data refresh logic goes here');
  };

  return (
    <div className="no-data-container">
      <img src={"https://static.vecteezy.com/system/resources/previews/012/181/008/original/document-data-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"} alt="No Data" className="no-data-image" />
      <h2>No Data Found</h2>
      <p>There is no data available at the moment. Please upload files ! </p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default NoDataFound;