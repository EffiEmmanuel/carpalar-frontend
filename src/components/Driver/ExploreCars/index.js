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

function ExploreCars() {
  const { isInvestor } = useContext(CarpalarContext);

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="customer-option about-us">
          <main className="main-content about-us">
            <div className="hero explore">
              <div className="hero-content about-us container-fluid">
                <h1>Explore Cars</h1>
                <h3> </h3>
                <p className="">
                  With Carpalar, a variety of luxurious cars are assured! Our
                  customers enjoy the opportunity to select from a wide range of
                  car brands, sizes, colors and shapes. Our cars and buses have
                  all the necessary documents and are in their perfect
                  conditions.
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap w-100 justify-content-center align-items-center p-5">
              <div className="vehicle-cards-container d-flex flex-wrap justify-content-between align-items-center">
                <VehicleCard
                  name="Toyota Corolla"
                  year="2014"
                  transmission="Automatic"
                  fuel="Petrol"
                  image={suzuki}
                />
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
