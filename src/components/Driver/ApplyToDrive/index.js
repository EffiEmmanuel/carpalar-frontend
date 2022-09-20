import React, { useState } from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import suzukiLogo from "../../../assets/images/suzuki.png";
import toyotaLogo from "../../../assets/images/toyota.png";
import volkswagenLogo from "../../../assets/images/volkswagen.png";
import { ArrowLeft, ArrowRight, XLg } from "react-bootstrap-icons";
import { useFormik } from "formik";
import styled from "styled-components";
import ApplyToDriveForm from "../../../forms/ApplyToDriveForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import

function ApplyToDrive() {
  const [isStepOne, setIsStepOne] = useState(true);
  const [isStepTwo, setIsStepTwo] = useState(false);

  const navigator = useNavigate();

  return (
    <div className="apply-to-drive-container">
      <div className="apply-to-drive-left">
        {/* LOGO HERE */}
        <div className="logo-container">
          <img src={carpalarLogo} alt="Carpalar" className="nav-logo" />
        </div>

        <div className="apply-description">
          <h1 className="bold apply-header">Apply to Carpalar</h1>
          <p>
            Get access to a brand new car to drive on Uber with just a weekly
            rental fee.
          </p>
        </div>
        <div className="">
          <div className="d-flex flex-column align-items-center opacity-50">
            <div className="partner-logos mt-5 d-flex justify-content-center align-items-center">
              <img
                src={toyotaLogo}
                alt="Toyota"
                className="partner-logo mx-5"
              />
              <img
                src={suzukiLogo}
                alt="Suzuki"
                className="partner-logo mx-5"
              />
              <img
                src={volkswagenLogo}
                alt="Volkswagen"
                className="partner-logo mx-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="apply-to-drive-right">
        <div className="apply-top">
          <div
            style={{
              opacity: isStepTwo ? "0.5" : "1",
            }}
            className="apply-steps blue-bg step-1"
          ></div>
          <div
            style={{
              opacity: isStepOne ? "0.5" : "1",
            }}
            className="apply-steps blue-bg step-2"
          ></div>

          <div
            className="menu-icon-close"
            style={{
              filter: 'none'
            }}
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                text: "You are about to quit our application.",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: `No, don't cancel`,
                denyButtonText: `Yes, cancel`,
                allowOutsideClick: false,
                closeOnClickOutside: false
              }).then((result) => {
                if (!result.isConfirmed) {
                  console.log("Result confirmed");
                  navigator("/");
                }
              })
            }
          >
            <XLg size={20} />
          </div>
        </div>

        <ApplyToDriveForm
          isStepOne={isStepOne}
          isStepTwo={isStepTwo}
          setIsStepOne={setIsStepOne}
          setIsStepTwo={setIsStepTwo}
        />
      </div>
    </div>
  );
}

export default ApplyToDrive;
