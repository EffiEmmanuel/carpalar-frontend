import React from "react";

function GuarantorCard({
  name,
  relationship,
  phone,
  email,
  address,
  jobTitle,
}) {
  return (
    <div className="appointment driver-card">
      <div className="appointment-details">
        <div className="driver-detail">
          <span>{name}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{relationship}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{phone}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{email}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{address}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{jobTitle}</span>
          <hr className="hr-opacity" />
        </div>
      </div>
    </div>
  );
}

export default GuarantorCard;
