import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlusSquareDotted } from "react-bootstrap-icons";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";

function Guarantors({ driver }) {
  const [guarantors, setGuarantors] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    const driverToken = localStorage.getItem("driverToken");

    async function getGuarantors() {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL_DRIVER}/get-guarantors?driverId=${driver._id}`,
          {
            headers: {
              token: `Bearer ${driverToken}`,
            },
          }
        )
        .then((res) => {
          console.log("RES:", res.data);
          setGuarantors(res.data.guarantors);
        })
        .catch((err) => {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("driverToken");
          navigator("/driver/login");
        });
    }

    getGuarantors();
  }, []);
  return (
    <div className="account-overview">
      <div classname='add-guarantor-modal'>
        <form></form>
        </div>
      <div className="drivers-pending-applications">
        <div className="driver-details-header">
          <div className="driver-detail">
            <span>Fullname</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Relationship</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Phone</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Email</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Address</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Job title</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>bvn</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>nin</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Has approved</span>
            <hr className="hr-opacity" />
          </div>
        </div>

        {guarantors?.length === 0 && (
          // <a className="btn btn-primary blue-bg">
          <div className="d-flex justify-content-center align-items-center my-5">
            <PlusSquareDotted
              size={32}
              className="add-guarantor"
              onClick={() => console.log("hi")}
            />
          </div>
          // </a>
        )}

        {/* {guarantors?.map((pendingApplication) => (
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
              yearsOfDrivingExperience={
                pendingApplication.yearsOfDrivingExperience
              }
              nationality={pendingApplication.nationality}
              highestAcademicQualification={
                pendingApplication.highestAcademicQualification
              }
              stateOfOrigin={pendingApplication.stateOfOrigin}
              isDriversLicenseApproved="Yes"
              isEmailVerified={
                pendingApplication.isEmailVerified ? "Yes" : "No"
              }
              isPhoneVerified={
                pendingApplication.isPhoneVerified ? "Yes" : "No"
              }
              isRegistrationFeePaid={
                pendingApplication.isRegistrationFeePaid ? "Yes" : "No"
              }
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Guarantors;
