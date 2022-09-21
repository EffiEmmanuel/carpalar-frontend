import React, { useContext } from "react";
import "./index.css";
import vehicles from "../../../assets/images/vehicles.png";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../Footer";
import { CarpalarContext } from "../../../App";
import Navbar from "../../Generic/Navbar";
import { Fade } from "react-awesome-reveal";

function ForCustomers() {
  const { isApplyToDrive, setIsApplyToDrive } = useContext(CarpalarContext);

  // Setting the navbar back
  if (isApplyToDrive) setIsApplyToDrive(false);

  return (
    <>
      <div className="customer-option">
        <main className="main-content">
          <div className="hero">
            <div className="hero-content container-fluid">
              <h1>Recommended Car Hire Purchase.</h1>
              <h3>Become a car owner with no pressured payment plan.</h3>
              <p>
                Keep your business going with Carpalar. Get an affordable Car or
                drive-to-own car with flexible payment plan.
              </p>
              <a
                role="button"
                className="btn btn-dark hero-cta blue-bg"
                href="/"
              >
                CHOOSE YOUR VEHICLE
              </a>
            </div>
          </div>

          <div className="choose-your-vehicle m-150">
            <div className="left">
              <h1 className="semibold">
                Choose your <span className="blue-text">vehicle.</span>
              </h1>
              <p>
                Find out more information about the vehicles that are available
                to you and explore the various ways in which you can get started
                with Carpalar.
              </p>
              <a
                role="button"
                className="btn btn-dark blue-bg feature-cta"
                href="/apply-to-drive"
              >
                GET STARTED
              </a>
            </div>

            <div className="right">
              <img
                src={vehicles}
                alt="Choose your vehicle"
                className="vehicles"
              />
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
    </>
  );
}

export default ForCustomers;
