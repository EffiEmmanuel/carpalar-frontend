import React from "react";
import "./index.css";
import autoSales from "../../../assets/images/feature1.jpg";
import FeatureSection from "../Homepage/FeatureSection";
import Footer from "../Footer";
// import investor from "../../assets/images/investor.jpg";
import returns from "../../../assets/icons/returns.svg";
import secure from "../../../assets/icons/verify.svg";
import manage from "../../../assets/icons/manage.svg";
import autoVest from "../../../assets/icons/autovest.svg";
import fleet from "../../../assets/icons/fleet.svg";
import ownIcon from "../../../assets/icons/own.svg";
import Navbar from "../../Generic/Navbar";

function BecomeAPartner() {
  return (
    <>
      <div className="partner">
        <div className="customer-option">
          <main className="main-content">
            <div className="hero investor">
              <div className="hero-content container-fluid">
                <h1>Join us as an investor.</h1>
                <h3>
                  Are you ready to join our mission to drive productivity and
                  success for the world’s mobility entrepreneurs?
                </h3>
                <p>
                  {/* Are you ready to join our mission to drive productivity and success for the world’s mobility entrepreneurs?. */}
                </p>
                <a
                  role="button"
                  className="btn btn-dark hero-cta blue-bg"
                  href="/"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>

            <div className="how-it-works">
              <h1>
                How it works<span className="blue-text">.</span>
              </h1>

              <div className="steps-steps my-5">
                <div className="steps-step">
                  <h3>Step 1</h3>
                </div>
                <div className="step-description">
                  <p>
                    Partner with your proposed vehicle “Appropriate
                    documentation necessary."
                  </p>
                </div>
              </div>

              <div className="steps-steps my-5">
                <div className="steps-step">
                  <h3>Step 2</h3>
                </div>
                <div className="step-description">
                  <p>We match your car with an honest and competent driver.</p>
                </div>
              </div>

              <div className="steps-steps my-5">
                <div className="steps-step">
                  <h3>Step 3</h3>
                </div>
                <div className="step-description">
                  <p>Earn weekly with no hidden charges.</p>
                </div>
              </div>
            </div>

            <div className="choose-your-vehicle m-150">
              <div className="left">
                <h1 className="semibold">
                  Our <span className="blue-text">Partners.</span>
                </h1>
                <p>
                  Our partners are an important part of Carpalar and generate
                  opportunities for customers.
                </p>
                <a
                  role="button"
                  className="btn btn-dark blue-bg feature-cta"
                  href="/"
                >
                  GET IN TOUCH
                </a>
              </div>

              <div className="right our-partners">
                <img
                  src={ownIcon}
                  alt="Our partners"
                  className="vehicles our-partners-svg"
                />
              </div>
            </div>

            <div className="choose-your-vehicle m-150 flipped">
              <div className="left">
                <img
                  src={autoVest}
                  alt="Our partners"
                  className="vehicles our-partners-svg mb-5"
                />
              </div>

              <div className="right our-partners">
                <h1 className="semibold">
                  <span className="blue-text">Auto</span> vest
                </h1>
                <p>
                  Our Auto-vest deal offers investors the opportunity to invest
                  by securing car hire purchase slots. Our car hire purchase
                  investment plans range from six months to two years with
                  different percentages applicable on returns. (ROI). Our slots
                  cost a sum of N500, 000 naira each and each slot attracts 25%
                  on ROI. Slots at Carpalar can be renewed, transferred or
                  terminated at the end of a contract. Our investors are paid
                  their capital and interest simultaneously...
                </p>
                <a
                  role="button"
                  className="btn btn-dark blue-bg feature-cta"
                  href="/"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>

            <div className="choose-your-vehicle m-150">
              <div className="left">
                <h1 className="semibold">
                  <span className="blue-text">Fleet</span> partnership
                </h1>
                <p>
                  It is expected that most car owners who are interested in a
                  car hire purchase transaction hold back due to the fear of
                  being ripped off. However, at Carpalar, honesty and
                  professionalism are our core values. With Carpalar, a smooth
                  hire purchase transaction between car owners and
                  drivers/companies can be achieved. This type of partnership
                  also proposes that investors subscribe to our partnership deal
                  with their cars while we ensure proper management of the
                  car...
                </p>
                <a
                  role="button"
                  className="btn btn-dark blue-bg feature-cta"
                  href="/"
                >
                  GET IN TOUCH
                </a>
              </div>

              <div className="right our-partners">
                <img
                  src={fleet}
                  alt="Our partners"
                  className="vehicles our-partners-svg"
                />
              </div>
            </div>

            <div className="why-invest">
              <div className="why-invest-container">
                <div className="skew-background">
                  <div className="why-invest-content text-align-center">
                    <h2>
                      Why invest with{" "}
                      <span className="blue-text">Carpalar</span>?
                    </h2>
                    <FeatureSection
                      image={returns}
                      title="Attractive Returns"
                      description="Our investment plans provide a whooping Return on Investment."
                      isFlipped={false}
                    />

                    <FeatureSection
                      image={secure}
                      title="Trusted &amp; Secured"
                      description="Funds invested on this platform are secured"
                      isFlipped={true}
                    />

                    <FeatureSection
                      image={manage}
                      title="Professionally managed"
                      description="Assets are managed professionally to ensure maximum RIO."
                      isFlipped={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default BecomeAPartner;
