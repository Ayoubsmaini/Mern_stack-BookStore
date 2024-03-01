import React from "react";

const SpinerBs = () => {
  return (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinerBs;
