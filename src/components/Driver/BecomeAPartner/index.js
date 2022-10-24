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
import { Fade } from "react-reveal";

function BecomeAPartner() {
  return (
    <>
      <div className="partner">
        <div className="customer-option">
          <main className="main-content">
            <div className="hero investor">
              <div className="hero-content container-fluid">
                <Fade bottom delay={200} duration={1000}>
                  <h1>Join us as an investor.</h1>
                </Fade>

                <Fade bottom delay={300} duration={1000}>
                  <h3>
                    Are you ready to join our mission to drive productivity and
                    success for the world’s mobility entrepreneurs?
                  </h3>
                </Fade>
                <p>
                  {/* Are you ready to join our mission to drive productivity and success for the world’s mobility entrepreneurs?. */}
                </p>

                <Fade bottom delay={400} duration={1000}>
                  <a
                    role="button"
                    className="btn btn-dark hero-cta blue-bg"
                    href="/"
                  >
                    GET IN TOUCH
                  </a>
                </Fade>
              </div>
            </div>

            <div className="how-it-works">
              <h1>
                How it works<span className="blue-text">.</span>
              </h1>

              <Fade bottom delay={200} duration={400}>
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
              </Fade>

              <Fade bottom delay={300} duration={400}>
                <div className="steps-steps my-5">
                  <div className="steps-step">
                    <h3>Step 2</h3>
                  </div>
                  <div className="step-description">
                    <p>
                      We match your car with an honest and competent driver.
                    </p>
                  </div>
                </div>
              </Fade>

              <Fade bottom delay={400} duration={400}>
                <div className="steps-steps my-5">
                  <div className="steps-step">
                    <h3>Step 3</h3>
                  </div>
                  <div className="step-description">
                    <p>Earn weekly with no hidden charges.</p>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="choose-your-vehicle m-150">
              <Fade left delay={100} duration={900}>
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
              </Fade>

              <Fade left delay={200} duration={1000}>
                <div className="right our-partners">
                  <img
                    src={ownIcon}
                    alt="Our partners"
                    className="vehicles our-partners-svg"
                  />
                </div>
              </Fade>
            </div>

            <div className="choose-your-vehicle m-150 flipped">
              <Fade right delay={100} duration={1000}>
                <div className="left">
                  <img
                    src={autoVest}
                    alt="Our partners"
                    className="vehicles our-partners-svg mb-5"
                  />
                </div>
              </Fade>

              <Fade right delay={200} duration={1000}>
                <div className="right our-partners">
                  <h1 className="semibold">
                    <span className="blue-text">Auto</span> vest
                  </h1>
                  <p>
                    Our Auto-vest deal offers investors the opportunity to
                    invest by securing car hire purchase slots. Our car hire
                    purchase investment plans range from six months to two years
                    with different percentages applicable on returns. (ROI). Our
                    slots cost a sum of N500, 000 naira each and each slot
                    attracts 25% on ROI. Slots at Carpalar can be renewed,
                    transferred or terminated at the end of a contract. Our
                    investors are paid their capital and interest
                    simultaneously...
                  </p>
                  <a
                    role="button"
                    className="btn btn-dark blue-bg feature-cta"
                    href="/"
                  >
                    GET IN TOUCH
                  </a>
                </div>
              </Fade>
            </div>

            <div className="choose-your-vehicle m-150">
              <Fade bottom delay={100} duration={1000}>
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
                    also proposes that investors subscribe to our partnership
                    deal with their cars while we ensure proper management of
                    the car...
                  </p>
                  <a
                    role="button"
                    className="btn btn-dark blue-bg feature-cta"
                    href="/"
                  >
                    GET IN TOUCH
                  </a>
                </div>
              </Fade>

              <Fade bottom delay={200} duration={1000}>
                <div className="right our-partners">
                  <img
                    src={fleet}
                    alt="Our partners"
                    className="vehicles our-partners-svg"
                  />
                </div>
              </Fade>
            </div>

            <div className="why-invest">
              <div className="why-invest-container">
                <div className="skew-background">
                  <div className="why-invest-content text-align-center">
                    <h2>
                      Why invest with{" "}
                      <span className="blue-text">Carpalar</span>?
                    </h2>

                    <Fade bottom delay={200} duration={600}>
                      <FeatureSection
                        image={returns}
                        title="Attractive Returns"
                        description="Our investment plans provide a whooping Return on Investment."
                        isFlipped={false}
                      />
                    </Fade>

                    <Fade bottom delay={200} duration={600}>
                      <FeatureSection
                        image={secure}
                        title="Trusted &amp; Secured"
                        description="Funds invested on this platform are secured"
                        isFlipped={true}
                      />
                    </Fade>

                    <Fade bottom delay={200} duration={600}>
                      <FeatureSection
                        image={manage}
                        title="Professionally managed"
                        description="Assets are managed professionally to ensure maximum RIO."
                        isFlipped={false}
                      />
                    </Fade>
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
