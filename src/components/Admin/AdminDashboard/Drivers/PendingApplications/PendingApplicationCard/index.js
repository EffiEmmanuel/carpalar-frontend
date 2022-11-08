import axios from "axios";
import React from "react";
import { Check, SlashCircle, Trash, X } from "react-bootstrap-icons";
import Swal from "sweetalert2";

function PendingApplicationCard({
  _id,
  name,
  gender,
  address,
  email,
  phone,
  dateOfBirth,
  maritalStatus,
  occupation,
  yearsOfDrivingExperience,
  nationality,
  highestAcademicQualification,
  stateOfOrigin,
  isDriversLicenseApproved,
  isEmailVerified,
  isPhoneVerified,
  isRegistrationFeePaid,
  isViewDriver,
  isAccountBlocked
}) {
  const rejectApplication = async () => {
    console.log("_id", _id);
    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/drivers/block-driver/${_id}?email=${email}`,
        {
          headers: {
            auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log("ERR:", err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const approveApplication = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/drivers/approve-driver/${_id}?email=${email}`,
        {
          headers: {
            auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 3000,
        });
        window.location.reload()
      })
      .catch((err) => {
        console.log("ERR:", err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const blockDriver = async () => {
    console.log("_id", _id);
    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/drivers/block-driver/${_id}?email=${email}`,
        {
          headers: {
            auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 3000,
        });
        window.location.reload()
      })
      .catch((err) => {
        console.log("ERR:", err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const deleteDriver = async () => {
    console.log("_id", _id);
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/drivers/delete?driverId=${_id}`,
        {
          headers: {
            auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 3000,
        });
        window.location.reload()
      })
      .catch((err) => {
        console.log("ERR:", err);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          timer: 3000,
        });
      });
  }

  return (
    <div className="appointment driver-card">
      <div className="appointment-details">
        <div className="driver-detail">
          <span>{name}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{gender}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{address}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{phone}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{dateOfBirth}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{maritalStatus}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{occupation}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{yearsOfDrivingExperience}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{nationality}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{highestAcademicQualification}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{stateOfOrigin}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{isDriversLicenseApproved}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{isEmailVerified}</span>
          <hr className="hr-opacity" />
        </div>
        <div className="driver-detail">
          <span>{isPhoneVerified}</span>
        </div>
        <div className="driver-detail">
          <span>{isRegistrationFeePaid}</span>
        </div>
      </div>
      <div className="action-buttons">
        {!isViewDriver && (
          <>
            <button className="done delete" onClick={() => rejectApplication()}>
              <X size={35} color="#fff" />
              {/* <img src={deleteIcon} alt="Delete" className="nav-link-icon" /> */}
            </button>
            <button className="done" onClick={() => approveApplication()}>
              <Check size={35} color="#fff" />
              {/* <img src={doneIcon} alt="Mark as done" className="nav-link-icon" /> */}
            </button>
          </>
        )}
        {isViewDriver && (
          <>
            <button
              className="done edit bg-error"
              onClick={() => deleteDriver()}
            >
              <Trash size={35} color="#fff" />
              {/* <img src={deleteIcon} alt="Delete" className="nav-link-icon" /> */}
            </button>
            <button
              className="done edit bg-primary"
              onClick={() => blockDriver()}
            >
              <SlashCircle size={35} color="#fff" />
              {/* <img src={deleteIcon} alt="Delete" className="nav-link-icon" /> */}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PendingApplicationCard;
