import React from "react";
import AddVehicleForm from "../../../../../forms/AddVehicleForm";
import PersonalDetailsForm from "../../../../../forms/DriverAccountForms/PersonalDetailsForm";

function AddVehicle({ driver }) {
  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>Add Vehicle</h5>
        <small>
        Add a new vehicle to your fleet
        </small>
        <AddVehicleForm />
      </div>
    </div>
  );
}

export default AddVehicle;
