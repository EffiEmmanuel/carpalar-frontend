import React from "react";
import AddVehicleBrandForm from "../../../../../forms/AddVehicleBrandForm";

function AddVehicleBrand() {
  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>Add Vehicle Brand</h5>
        <small>
        Add a new vehicle brand. Images set here would appear on all vehicles under this brand.
        </small>
        <AddVehicleBrandForm />
      </div>
    </div>
  );
}

export default AddVehicleBrand;
