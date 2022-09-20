import React, { useContext } from "react";
import Footer from "../../Footer";
import { CarpalarContext } from "../../../../App.js";
import BecomeAPartner from "../../BecomeAPartner";
import Navbar from "../../../Generic/Navbar";
import { useState } from "react";
import PhoneVerificationForm from "../../../../forms/PhoneVerificationForm";
import queryString from "query-string";

function Login2FA() {
  const { isInvestor, isApplyToDrive, setIsApplyToDrive } =
    useContext(CarpalarContext);

  // Setting the navbar back
  if (isApplyToDrive) setIsApplyToDrive(false);

  // eslint-disable-next-line no-restricted-globals
  const query = queryString.parse(location.search);
  const driverId = query.driverId;

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="">
          <main className="">
            <div className="hero eandp-verification w-100 container-fluid d-flex justify-content-center align-items-start">
              <div className="hero-content eandp-verification container-fluid d-flex flex-column justify-content-center align-items-center">
                <h4>2-factor authentication.</h4>
                <p>
                  A 6-digit confirmation code was sent to your phone number,
                  please enter below
                </p>

                <PhoneVerificationForm isLogin2FA={true} driver_id={driverId} />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      )}

      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default Login2FA;
