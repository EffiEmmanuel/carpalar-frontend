import React from "react";
// import "./index.css";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

function MyPayments() {
  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>My Payments</h5>
        <small>All payments made in order to fulfil your purchase</small>

        <div className="compliance-box mt-5">
          <div className="payment-top d-flex justify-content-between align-items-center">
            <h5>Transactions (2/3) done</h5>
            <a href="/" className="btn btn-dark blue-bg border-none py-2 px-4">Make payment</a>
          </div>
          <hr className="hr-opacity" />

          <div className="first-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              <CheckCircleFill color="mediumseagreen" size={20} />
              <XCircleFill color="#ED4337" size={20} />

              <div className="verification-detail ms-1">
                <h6>Personal details</h6>
                <small>We'll love to know more about you</small>
              </div>
            </div>
            <div className="verification-type-right">
              <span>Completed</span>
            </div>
          </div>

          <hr className="hr-opacity" />

          <div className="first-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              <CheckCircleFill color="mediumseagreen" size={20} />
              <XCircleFill color="#ED4337" size={20} />

              <div className="verification-detail ms-1">
                <h6>Personal details</h6>
                <small>We'll love to know more about you</small>
              </div>
            </div>
            <div className="verification-type-right">
              <span>Completed</span>
            </div>
          </div>

          <hr className="hr-opacity" />

          <div className="first-verification verification-type d-flex w-100 justify-content-between">
            <div className="verification-type-left d-flex justify-content-between">
              <CheckCircleFill color="mediumseagreen" size={20} />
              <XCircleFill color="#ED4337" size={20} />

              <div className="verification-detail ms-1">
                <h6>Personal details</h6>
                <small>We'll love to know more about you</small>
              </div>
            </div>
            <div className="verification-type-right">
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPayments;
