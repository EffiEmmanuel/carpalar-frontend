import React, { useContext } from "react";
import "./index.css";
// import vehicles from "../../../assets/images/vehicles.png";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../../Driver/Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../../Driver/BecomeAPartner";
import Navbar from "../Navbar";
import { Fade } from "react-reveal";

function AboutUs() {
  const { isInvestor } = useContext(CarpalarContext);
  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="customer-option about-us">
          <main className="main-content about-us">
            <div className="hero about-us">
              <div className="hero-content about-us container-fluid">
                <Fade delay={100} duration={900}>
                  <h1>About us</h1>
                </Fade>

                <Fade delay={100} duration={900}>
                  <p className="">
                    Carpalar is a genuine and notable digital car leasing brand
                    that aims at ensuring ownership of automobiles in the most
                    convenient way. Simply refer to Carpalar as a financial
                    technology brand that provides cars and buses to interested
                    individuals or brands via hire purchase. We help you secure
                    an automobile of your choice with the deal of making an
                    affordable down payment and spreading the remaining payment
                    across 12-24 months. Carpalar provides neutral finance
                    solutions for individuals and businesses looking to own a
                    car.
                  </p>
                </Fade>
              </div>
            </div>

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

export default AboutUs;
