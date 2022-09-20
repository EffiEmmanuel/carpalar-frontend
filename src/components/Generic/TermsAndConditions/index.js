import React, { useContext } from "react";
import "./index.css";
// import vehicles from "../../../assets/images/vehicles.png";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../../Driver/Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../../Driver/BecomeAPartner";
import Navbar from "../Navbar";

function TermsAndConditions() {
  const { isInvestor } = useContext(CarpalarContext);
  return (
    <div className="">
      <Navbar />
      <hr className="hr-nav" />
      {!isInvestor && (
        <div className="customer-option terms-and-conditions">
          <main className="main-content terms-and-conditions">
            <div className="hero terms-and-conditions">
              <div className="hero-content terms-and-conditions container-fluid">
                <h1>Terms and Conditions</h1>
                <h3> </h3>
              </div>
            </div>

            <div className="container terms-and-conditions-container">
              <ol>
                <li>
                  The website located at www.carpalar.com (the &quot;Site&quot;)
                  is operated by Carpalar Limited (&quot;we&quot;,
                  &quot;our&quot;, &quot;us&quot;, &quot;Carpalar
                  limited&quot;). We are a private limited company registered in
                  Nigeria under company number 1601222 at our registered office
                  at 2 Martins Steet off Ojuelegba Road
                </li>
                <li>
                  The site provides products and services related to car
                  lease/Hire Purchase.
                </li>
                <li>
                  By accessing and using the Site you agree to be bound by and
                  to act in accordance with these terms and conditions.
                </li>
                <li>
                  ​These terms operate in conjunction with our Privacy Policy
                  and Cookie Policy (together the &quot;Terms&quot;) and apply
                  to your usage of this Site.
                </li>
                <li>
                  We take your privacy seriously and process information about
                  you in accordance with our Privacy Policy.
                </li>
                <li>You must be aged 25 or over to access our Service.</li>
                <li>
                  If a driver is unable to make payments, the vehicle would be
                  recovered.
                </li>
              </ol>
            </div>

            <hr className="hr-nav" />

            <div className="d-flex flex-column justify-content-center align-items-center m-5 p-5 opacity-50">
              <h2>
                Our partners<span className="blue-text">.</span>
              </h2>
              <div className="partner-logos mt-5">
                <img
                  src={verifyme}
                  alt="Verify me"
                  className="partner-logo mx-5"
                />
                <img
                  src={youverify}
                  alt="Verify me"
                  className="partner-logo mx-5"
                />
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

export default TermsAndConditions;
