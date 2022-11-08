import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import professionalDetailsSchema from "./validation";

function ProfessionalDetailsForm({ driver }) {
  const [isEditing, setIsEditing] = useState(false);
  const [driverDetails, setDriverDetails] = useState(driver);

  useEffect(() => {
    setDriverDetails(driver);
  }, [driver]);

  const onSubmit = async (values) => {
    await axios
      .patch(
        `http://localhost:5000/driver/update?driverId=${driverDetails._id}`,
        values
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Success",
            text: res.data.message,
            icon: "success",
            timer: 3000,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        yearsOfDrivingExperience: driverDetails?.yearsOfDrivingExperience,
        highestAcademicQualification:
          driverDetails?.highestAcademicQualification,
        stateOfOrigin: driverDetails?.stateOfOrigin,
        lga: driverDetails?.lga,
        licenseNumber: driverDetails?.licenseNumber,
        otherHailingPlatforms: driverDetails?.otherHailingPlatforms,
      },
      validationSchema: professionalDetailsSchema,
      onSubmit,
    });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="yearsOfDrivingExperience">
            Years Of Driving Experience
          </label>
          <input
            type="number"
            name="yearsOfDrivingExperience"
            id="yearsOfDrivingExperience"
            className="form-control"
            value={!isEditing ? driverDetails?.yearsOfDrivingExperience : values.yearsOfDrivingExperience}
            onChange={handleChange}
            disabled={!isEditing}
          />
          { errors.yearsOfDrivingExperience && <small className="error">{ errors.yearsOfDrivingExperience }</small> }
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="nationality">nationality</label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            className="form-control"
            value={driverDetails?.nationality}
            disabled
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="highestAcademicQualification">
            Highest Academic Qualification
          </label>
          <select
            name="highestAcademicQualification"
            className="form-control"
            id="highestAcademicQualification"
            value={!isEditing ? driverDetails?.highestAcademicQualification : values.highestAcademicQualification}
            disabled={!isEditing}
          >
            <option value="">-- --</option>
            <option value="phd">PhD</option>
            <option value="msc">Masters's Degree</option>
            <option value="bsc">Bachelor's Degree</option>
            <option value="ssce">SSCE / O Level</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="stateOfOrigin">State Of Origin</label>
          <input
            type="text"
            name="stateOfOrigin"
            id="stateOfOrigin"
            className="form-control"
            value={values.stateOfOrigin}
            onChange={handleChange}
            disabled={!isEditing}
          />
          { errors.stateOfOrigin && <small className="error">{ errors.stateOfOrigin }</small> }
        </div>
        <div className="form-group form-item">
          <label htmlFor="lga">lga</label>
          <input
            type="text"
            name="lga"
            id="lga"
            value={values.lga}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
          />
          { errors.lga && <small className="error">{ errors.lga }</small> }
        </div>
        <div className="form-group form-item">
          <label htmlFor="licenseNumber">license number</label>
          <input
            type="text"
            name="licenseNumber"
            id="licenseNumber"
            value={values.licenseNumber}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
          />
          { errors.licenseNumber && <small className="error">{ errors.licenseNumber }</small> }
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="driversLicense">driver's License</label>
          <input
            type="text"
            id="driversLicense"
            className="form-control"
            name="driversLicense"
            value={driverDetails?.driversLicense}
            disabled
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="otherHailingPlatforms">
            ARE YOU CURRENTLY DRIVING FOR ANY RIDE-HAILING PLATFORMS? (EG. UBER
            OR TAXIFY)
          </label>
          <div className="radio-group d-flex align-items-center mt-2">
            <span>{values.otherHailingPlatforms}</span>
          </div>
        </div>
      </div>
      <div className="buttons mt-4">
        {!isEditing && (
          <button
            className="btn btn-dark blue-bg border-none py-2 px-4 me-2"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            type="submit"
            className="btn btn-dark blue-bg border-none py-2 px-4 me-2"
            disabled={isSubmitting}
            onClick={() => onSubmit(values)}
          >
            {isSubmitting ? <span>Saving...</span> : <span>Save</span>}
          </button>
        )}
      </div>
    </form>
  );
}

export default ProfessionalDetailsForm;
