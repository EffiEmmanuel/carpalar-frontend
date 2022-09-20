import React, { useEffect, useState } from "react";
import "./index.css";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

function Compliance({ driver }) {
  const [driverDetails, setDriverDetails] = useState(driver);

  useEffect(() => {
    setDriverDetails(driver);
  }, [driver]);

  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>Compliance check</h5>
        <small>Check to assess the status of your account.</small>

        <div className="compliance-box mt-5">
          <h5>Account Verification</h5>
          <hr className="hr-opacity" />

          <div className="first-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              {driverDetails.isAccountApproved ? (
                <CheckCircleFill color="mediumseagreen" size={20} />
              ) : (
                <XCircleFill color="#ED4337" size={20} />
              )}

              <div className="verification-detail ms-2">
                <h6>Personal details</h6>
                <small>We'll love to know more about you</small>
              </div>
            </div>
            <div className="verification-type-right">
              {driverDetails.isAccountApproved ? (
                <span className="success">Completed</span>
              ) : (
                <span className="error">Not completed</span>
              )}
            </div>
          </div>

          <hr className="hr-opacity" />

          <div className="second-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              {driverDetails.isAccountApproved ? (
                <CheckCircleFill color="mediumseagreen" size={20} />
              ) : (
                <XCircleFill color="#ED4337" size={20} />
              )}

              <div className="verification-detail ms-2">
                <h6>Professional details</h6>
                <small>All we know about your professional experience</small>
              </div>
            </div>
            <div className="verification-type-right">
              {driverDetails.isAccountApproved ? (
                <span className="success">Completed</span>
              ) : (
                <span className="error">Not completed</span>
              )}
            </div>
          </div>

          <hr className="hr-opacity" />

          <div className="first-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              {driverDetails.isApplicationComplete ? (
                <CheckCircleFill color="mediumseagreen" size={20} />
              ) : (
                <XCircleFill color="#ED4337" size={20} />
              )}

              <div className="verification-detail ms-2">
                <h6>Application Completion</h6>
                <small>Your application to Carpalar</small>
              </div>
            </div>
            <div className="verification-type-right">
              {driverDetails.isApplicationComplete ? (
                <span className="success">Completed</span>
              ) : (
                <span className="error">Not completed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compliance;
