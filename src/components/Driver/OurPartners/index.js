import React from "react";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";

function OurPartners() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-5 p-5 opacity-50">
      <hr className="hr-opacity my-5" />
      <h2>
        Our partners<span className="blue-text">.</span>
      </h2>
      <div className="partner-logos mt-5 d-flex justify-content-center align-items-center">
        <img src={verifyme} alt="Verify me" className="partner-logo mx-5" />
        <img src={youverify} alt="Verify me" className="partner-logo mx-5" />
      </div>
    </div>
  );
}

export default OurPartners;
