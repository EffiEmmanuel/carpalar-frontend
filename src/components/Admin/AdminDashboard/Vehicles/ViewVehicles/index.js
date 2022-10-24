import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Check, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import VehicleCard from "../../../../Driver/VehicleCard";

function ViewVehicles() {
  const [vehicles, setVehicles] = useState();
  const [vehicleBrands, setVehicleBrands] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    async function getAllVehicles() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/vehicles`)
        .then((res) => {
          console.log("RES:", res.data);
          setVehicles(res.data.vehicles);
        })
        .catch((err) => {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("adminToken");
          navigator("/admin/login");
        });
    }

    async function getAllVehicleBrands() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/vehicle-brands`)
        .then((res) => {
          console.log("RES:", res.data);
          setVehicleBrands(res.data.vehicleBrands);
        })
        .catch((err) => {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("adminToken");
          navigator("/admin/login");
        });
    }

    getAllVehicles();
    getAllVehicleBrands();
  }, []);

  const getImage = (vehicle) => {
    vehicleBrands?.forEach((vehicleBrand) => {
      if (vehicleBrand._id === `${vehicle.vehicleBrand}`) {
        console.log("YESSS");
        return vehicleBrand.image;
      }
    });
  };
  return (
    <div className="account-overview">
      <form className="form-container">
        <div className="fg-row">
          <div className="form-group">
            <input
              type="text"
              name="search"
              className="form-control search-drivers"
              placeholder="Search vehicles"
            />
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-center align-items-center w-100 flex-wrap">
        {vehicles?.map((vehicle) => (
          <div key={vehicle._id} className="my-5">
            <VehicleCard
              _id={vehicle._id}
              fuel={vehicle.fuel}
              image={getImage(vehicle)}
              name={vehicle.name}
              transmission={vehicle.transmission}
              year={vehicle.year}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewVehicles;
