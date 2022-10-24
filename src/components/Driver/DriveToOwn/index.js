import React, { useContext } from "react";
import "./index.css";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../../Driver/Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../../Driver/BecomeAPartner";
import VehicleCard from "../VehicleCard";

import suzuki from "../../../assets/images/delete-later/suzuki-alto.jpg";
import applyIcon from "../../../assets/icons/apply.svg";
import verifyIcon from "../../../assets/icons/verify.svg";
import ownIcon from "../../../assets/icons/own.svg";
import Navbar from "../../Generic/Navbar";
import { Fade } from "react-reveal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function DriveToOwn() {
  const { isInvestor, isApplyToDrive, setIsApplyToDrive } =
    useContext(CarpalarContext);

  // Setting the navbar back
  if (isApplyToDrive) setIsApplyToDrive(false);

  const [vehicles, setVehicles] = useState();
  const [vehicleFetchError, setVehicleFetchError] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    async function getAllVehicles() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/vehicles`)
        .then((res) => {
          console.log("RES:", res.data);
          setVehicles(res.data.vehicles);
        })
        .catch((err) => {
          console.log("ERR:", err);
          setVehicleFetchError(
            "We encountered a problem fetching vehicles. Please refresh the page."
          );
        });
    }

    getAllVehicles();
  }, []);

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="customer-option about-us">
          <main className="main-content about-us">
            <div className="hero drive-to-own">
              <div className="hero-content about-us container-fluid">
                <Fade bottom delay={100} duration={900}>
                  <h1 className="semibold">Drive to own</h1>
                </Fade>

                <Fade bottom delay={200} duration={900}>
                  <p className="">
                    Carpalar’s main product is her ‘Drive-to-own’ service. Our
                    utmost goal is to create ownership opportunities to
                    individuals who are interested in securing automobiles for
                    personal or business purposes but are financially incapable.
                    Our brand’s identity differs uniquely as consumers of our
                    product are expected to pay just an affordable percentage of
                    the fleet vehicle value before commencing usage of vehicle.
                    After the initial payment, the remaining payment is spread
                    across a stipulated period as agreed between our company and
                    the customer. Upon payment completion, the customer becomes
                    entitled to the ownership of the vehicle. However, a
                    customer is also permitted to opt for early settlement of
                    repayment period.
                  </p>
                </Fade>
              </div>
            </div>

            <div className="d-flex flex-wrap w-100 justify-content-center align-items-center p-5">
              <div className="vehicle-cards-container d-flex flex-wrap justify-content-center align-items-center">
                {vehicles?.map((vehicle) => (
                  <div key={vehicle._id}>
                    <VehicleCard
                      _id={vehicle._id}
                      name={vehicle.name}
                      year={vehicle.yearOfProduction}
                      transmission={vehicle.transmission}
                      fuel={vehicle.fuel}
                      image={suzuki}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="steps-to-own d-flex flex-wrap w-100 justify-content-center align-items-center p-5">
              <div className="steps-to-own-top">
                <h2>
                  Steps to own a vehicle<span className="blue-text">.</span>
                </h2>
                <small>
                  It is very easy to own a vehicle with{" "}
                  <span className="blue-text">Carpalar</span>.
                </small>
              </div>
              <div className="steps-to-own-bottom d-flex justify-content-between align-items-center mt-5">
                <div className="step">
                  <img
                    src={applyIcon}
                    alt="apply to carpalar"
                    className="steps-icon apply"
                  />
                  <p className="blue-text">APPLY</p>
                </div>
                <div className="step">
                  <img
                    src={verifyIcon}
                    alt="Get verified"
                    className="steps-icon verified"
                  />
                  <p className="blue-text">GET VERIFIED</p>
                </div>
                <div className="step">
                  <img
                    src={ownIcon}
                    alt="claim ownership"
                    className="steps-icon own"
                  />
                  <p className="blue-text">CLAIM OWNERSHIP</p>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center m-5 p-5 opacity-50">
              <h2>
                Our partners<span className="blue-text">.</span>
              </h2>
              <div className="partner-logos mt-5 d-flex justify-content-center align-items-center">
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

export default DriveToOwn;
