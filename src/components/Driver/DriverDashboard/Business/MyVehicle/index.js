import React, { useEffect } from "react";
import VehicleCard from "../../../VehicleCard";
import suzuki from "../../../../../assets/images/delete-later/suzuki-alto.jpg";
import { useState } from "react";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import CarPaymentForm from "../../../../../forms/CarPaymentForm";

function MyVehicle({ driver }) {
  const [driverDetails, setDriverDetails] = useState(driver);

  console.log('DRIVER:', driver);

  useEffect(() => {
    setDriverDetails(driver);
  }, [driver]);

  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>My vehicle</h5>
        <small>Your vehicle with Carpalar.</small>

        <div className="compliance-box mt-5">
          {driver?.vehicle && (
            <div className="d-flex justify-content-center align-items-center my-5">
              <VehicleCard
                name="Toyota Corolla"
                year="2014"
                transmission="Automatic"
                fuel="Petrol"
                image={suzuki}
              />
            </div>
          )}
          {!driver?.vehicle && (
            <div>
              <CarPaymentForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyVehicle;
