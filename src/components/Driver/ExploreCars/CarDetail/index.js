import React, { useContext } from "react";
import { CarpalarContext } from "../../../../App";
import Navbar from "../../../Generic/Navbar";
import Footer from "../../Footer";
import "./index.css";
import BecomeAPartner from "../../BecomeAPartner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import OurPartners from "../../OurPartners";

function CarDetail() {
  const { isInvestor } = useContext(CarpalarContext);

  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicle, setVehicle] = useState("");

  const params = useParams();
  console.log("CARID:", params.carId);

  // Check if user is logged in
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    async function getCarById() {
      await axios
        .get(`http://localhost:5000/vehicles/${params.carId}`)
        .then((res) => {
          console.log("RESPONSE:", res);
          setVehicle(res.data.vehicle);
          return axios.get(
            `http://localhost:5000/vehicle-brands/${res.data.vehicle.vehicleBrand}`
          );
        })
        .then((res) => {
          console.log("SECOND RESPONSE:", res);
          const vehicleBrand = res.data.vehicleBrand;
          setVehicleBrand(vehicleBrand);
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    }
    getCarById();
  }, []);

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div>
          <hr className="hr-opacity mt-n5" />
          <div className="">
            <div className="car-detail d-flex flex-column justify-content-center align-items-center mt-5">
              <h1 className="car-name semibold">{vehicle.name}</h1>
              <small>{vehicle.yearOfProduction} and above</small>
              <img
                src={`${vehicleBrand?.image}`}
                alt={`${vehicleBrand?.brandName}`}
                className="vehicle-brand-image mt-4"
              />

              <div className="car-specs mt-5 d-flex flex-wrap justify-content-center">
                {token && (
                  <div className="car-spec mt-5">
                    <p>Price</p>
                    <h2 className="semibold mt-n3 text-capitalize">
                      &#8358;8,000,000
                    </h2>
                  </div>
                )}
                <div className="car-spec mt-5">
                  <p>Transmission</p>
                  <h2 className="semibold mt-n3 text-capitalize">
                    {vehicle.transmission}
                  </h2>
                </div>
                <div className="car-spec mt-5">
                  <p>Fuel</p>
                  <h2 className="semibold mt-n3 text-capitalize">
                    {vehicle.fuel}
                  </h2>
                </div>
                <div className="car-spec mt-5">
                  <p>Engine size</p>
                  <h2 className="semibold mt-n3">{vehicle.engineSize}L</h2>
                </div>
                <div className="car-spec mt-5">
                  <p>Vehicle size</p>
                  <h2 className="semibold mt-n3">{vehicle.vehicleSize}</h2>
                </div>
              </div>
            </div>
            <OurPartners />
            <Footer />
          </div>
        </div>
      )}

      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default CarDetail;
