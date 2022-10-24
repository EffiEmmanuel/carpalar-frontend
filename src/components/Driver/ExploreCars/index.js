import React, { useContext } from "react";
import "./index.css";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../../Driver/Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../../Driver/BecomeAPartner";
import VehicleCard from "../VehicleCard";

import suzuki from "../../../assets/images/delete-later/suzuki-alto.jpg";
// import applyIcon from "../../../assets/icons/apply.svg";
// import verifyIcon from "../../../assets/icons/verify.svg";
// import ownIcon from "../../../assets/icons/own.svg";
import Navbar from "../../Generic/Navbar";
import OurPartners from "../OurPartners";
import { Fade } from "react-reveal";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function ExploreCars() {
  const { isInvestor } = useContext(CarpalarContext);

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
            <div className="hero explore">
              <div className="hero-content about-us container-fluid">
                <Fade bottom delay={100} duration={900}>
                  <h1>Explore Cars</h1>
                </Fade>

                <Fade bottom delay={200} duration={900}>
                  <p className="">
                    With Carpalar, a variety of luxurious cars are assured! Our
                    customers enjoy the opportunity to select from a wide range
                    of car brands, sizes, colors and shapes. Our cars and buses
                    have all the necessary documents and are in their perfect
                    conditions.
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

            {/* 9 */}

            <OurPartners />
          </main>

          <Footer />
        </div>
      )}

      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default ExploreCars;
