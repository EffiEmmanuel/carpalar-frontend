import React, { useContext } from "react";
import "./index.css";
import Footer from "../Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../BecomeAPartner";
import Navbar from "../../Generic/Navbar";
import { useState } from "react";
import PhoneVerificationForm from "../../../forms/PhoneVerificationForm";

function PhoneVerification() {
  const { isInvestor, isApplyToDrive, setIsApplyToDrive } =
    useContext(CarpalarContext);

  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

  // Setting the navbar back
  if (isApplyToDrive) setIsApplyToDrive(false);

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="">
          <main className="">
            <div className="hero eandp-verification w-100 container-fluid d-flex justify-content-center align-items-start">
              <div className="hero-content eandp-verification container-fluid d-flex flex-column justify-content-center align-items-center">
                <h4>We have received your request.</h4>
                <p>Please use the code sent to your phone number to verify your phone.</p>

                <PhoneVerificationForm />
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

export default PhoneVerification;
