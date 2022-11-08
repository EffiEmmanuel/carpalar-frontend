import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Check, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import PendingApplicationCard from "../PendingApplications/PendingApplicationCard";

function ViewDrivers() {
  const [drivers, setDrivers] = useState();

  const navigator = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    async function getAllDrivers() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL_ADMIN}/drivers`, {
          headers: {
            auth_token: `Bearer ${adminToken}`,
          },
        })
        .then((res) => {
          console.log("RES:", res.data);
          setDrivers(res.data.drivers);
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

    getAllDrivers();
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
              placeholder="Search drivers"
            />
          </div>
        </div>
      </form>

      <div className="drivers-pending-applications">
        <div className="driver-details-header">
          <div className="driver-detail">
            <span>Fullname</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Gender</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Address</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Phone</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Date of birth</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Marital status</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Occupation</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Years of driving experience</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Nationality</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Highest academic qualification</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>State of origin</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Drivers license approved</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Email verified</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Phone verified</span>
          </div>
          <div className="driver-detail">
            <span>Registration fee</span>
          </div>
        </div>

        {drivers?.length === 0 && <p className="text-center w-100 my-5">No drivers yet</p>}

        {drivers?.map((drivers) => (
          <div key={drivers._id}>
            <PendingApplicationCard
              _id={drivers._id}
              name={`${drivers.surname} ${drivers.firstname} ${drivers.othername}`}
              gender={drivers.gender}
              address={drivers.address}
              phone={drivers.phone}
              email={drivers.email}
              dateOfBirth={drivers.dateOfBirth}
              maritalStatus={drivers.maritalStatus}
              occupation={drivers.occupation}
              yearsOfDrivingExperience={drivers.yearsOfDrivingExperience}
              nationality={drivers.nationality}
              highestAcademicQualification={drivers.highestAcademicQualification}
              stateOfOrigin={drivers.stateOfOrigin}
              isDriversLicenseApproved='Yes'
              isEmailVerified={drivers.isEmailVerified ? 'Yes' : 'No'}
              isPhoneVerified={drivers.isPhoneVerified ? 'Yes' : 'No'}
              isRegistrationFeePaid={drivers.isRegistrationFeePaid ? 'Yes' : 'No'}
              isViewDriver={true}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default ViewDrivers;
