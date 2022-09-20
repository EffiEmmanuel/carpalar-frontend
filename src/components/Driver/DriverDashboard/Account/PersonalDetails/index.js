import React from "react";
import PersonalDetailsForm from "../../../../../forms/DriverAccountForms/PersonalDetailsForm";

function PersonalDetails({ driver }) {
  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>Personal Details</h5>
        <small>
          Here's what we know about you. Please do update it if there have been
          any recent changes.
        </small>
        <PersonalDetailsForm driver={driver} />
      </div>
    </div>
  );
}

export default PersonalDetails;
