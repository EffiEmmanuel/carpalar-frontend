import React from "react";
import VehicleCard from "../../../VehicleCard";
import suzuki from "../../../../../assets/images/delete-later/suzuki-alto.jpg";

function MyVehicle() {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <VehicleCard
        name="Toyota Corolla"
        year="2014"
        transmission="Automatic"
        fuel="Petrol"
        image={suzuki}
      />
    </div>
  );
}

export default MyVehicle;
