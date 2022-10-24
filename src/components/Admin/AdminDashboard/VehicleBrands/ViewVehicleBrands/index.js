import axios from "axios";
import React from "react";
import './index.css'
import { useState } from "react";
import { useEffect } from "react";
import { Check, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import VehicleCard from "../../../../Driver/VehicleCard";
import VehicleBrandCard from "./VehicleBrandCard";

function ViewVehicleBrands() {
  const [vehicleBrands, setVehicleBrands] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
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
    getAllVehicleBrands();
  }, []);
  return (
    <div className="account-overview">
      <form className="form-container">
        <div className="fg-row">
          <div className="form-group">
            <input
              type="text"
              name="search"
              className="form-control search-drivers"
              placeholder="Search vehicle brands"
            />
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-center align-items-center w-100 flex-wrap vehicle-brand-cards-container">
        {vehicleBrands?.map((vehicleBrand) => (
          <div key={vehicleBrand._id}>
            <VehicleBrandCard vehicleBrand={vehicleBrand} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewVehicleBrands;
