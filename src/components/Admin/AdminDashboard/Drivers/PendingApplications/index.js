import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Check, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import PendingApplicationCard from "./PendingApplicationCard";

function PendingApplications() {
  const [pendingApplications, setPendingApplications] = useState();

  const navigator = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    async function getPendingApplications() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL_ADMIN}/get-pending-applications`, {
          headers: {
            auth_token: `Bearer ${adminToken}`,
          },
        })
        .then((res) => {
          console.log("RES:", res.data);
          setPendingApplications(res.data.pendingApplications);
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

    getPendingApplications();
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
        </div>

        {pendingApplications?.length === 0 && <p className="text-center w-100 my-5">No pending applications</p>}

        {pendingApplications?.map((pendingApplication) => (
          <div key={pendingApplication._id}>
            <PendingApplicationCard
              _id={pendingApplication._id}
              name={`${pendingApplication.surname} ${pendingApplication.firstname} ${pendingApplication.othername}`}
              gender={pendingApplication.gender}
              address={pendingApplication.address}
              phone={pendingApplication.phone}
              email={pendingApplication.email}
              dateOfBirth={pendingApplication.dateOfBirth}
              maritalStatus={pendingApplication.maritalStatus}
              occupation={pendingApplication.occupation}
              yearsOfDrivingExperience={pendingApplication.yearsOfDrivingExperience}
              nationality={pendingApplication.nationality}
              highestAcademicQualification={pendingApplication.highestAcademicQualification}
              stateOfOrigin={pendingApplication.stateOfOrigin}
              isDriversLicenseApproved='Yes'
              isEmailVerified={pendingApplication.isEmailVerified ? 'Yes' : 'No'}
              isPhoneVerified={pendingApplication.isPhoneVerified ? 'Yes' : 'No'}
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default PendingApplications;
