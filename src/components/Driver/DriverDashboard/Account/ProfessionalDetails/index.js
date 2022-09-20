import React from "react";
import ProfessionalDetailsForm from "../../../../../forms/DriverAccountForms/ProfessionalDetailsForm";

function ProfessionalDetails({ driver }) {
  return (
    <div className="account-overview">
      <div className="personal-details">
        <h5>Professional Details</h5>
        <small>
          Here's your professional experience. Please do update it if there have
          been any recent changes.
        </small>
        {/* <form className="form-container">
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="form-group form-item">
              <label htmlFor="occupation">occupation</label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                className="form-control"
              />
            </div>
            <div className="form-group form-item">
              <label htmlFor="yearsOfDrivingExperience">
                Years Of Driving Experience
              </label>
              <input
                type="number"
                name="yearsOfDrivingExperience"
                id="yearsOfDrivingExperience"
                className="form-control"
              />
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
              />
            </div>
            <div className="form-group form-item">
              <label htmlFor="highestAcademicQualification">
                Highest Academic Qualification
              </label>
              <select
                name="highestAcademicQualification"
                value="male"
                className="form-control"
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
              />
            </div>
            <div className="form-group form-item">
              <label htmlFor="lga">lga</label>
              <input type="text" name="lga" id="lga" className="form-control" />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="form-group form-item">
              <label htmlFor="driversLicense">driver's License</label>
              <input
                type="file"
                accept=".pdf, .png, .jpg"
                id="driversLicense"
                className="form-control"
                name="driversLicense"
                // value={values.driversLicense}
                // onChange={(e) => {
                //   handleChange(e);
                //   const driversLicese = e.target.files[0];
                //   setFile(driversLicese);
                // }}
                // onBlur={handleBlur}
                // disabled={isSubmitting}
              />
            </div>
            <div className="form-group form-item">
              <label htmlFor="otherHailingPlatforms">
                ARE YOU CURRENTLY DRIVING FOR ANY RIDE-HAILING PLATFORMS? (EG.
                UBER OR TAXIFY)
              </label>
              <div className="radio-group d-flex align-items-center mt-2">
                <input
                  type="radio"
                  id="otherHailingPlatformsYes"
                  className="me-2"
                  name="otherHailingPlatforms"
                  //   value={values.otherHailingPlatforms}
                  value="yes"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // disabled={isSubmitting}
                />
                <label htmlFor="otherHailingPlatformsYes">Yes</label>
              </div>

              <div className="radio-group d-flex align-items-center mt-2">
                <input
                  type="radio"
                  id="otherHailingPlatformsNo"
                  className="me-2"
                  name="otherHailingPlatforms"
                  //   value={values.otherHailingPlatforms
                  value="no"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // disabled={isSubmitting}
                />
                <label htmlFor="otherHailingPlatformsNo">No</label>
              </div>
            </div>
          </div>
          <div className="buttons mt-4">
            <button className="btn btn-dark blue-bg border-none py-2 px-4 me-2">
              Edit
            </button>
            <button className="btn btn-dark blue-bg border-none py-2 px-4 me-2">
              Save
            </button>
          </div>
        </form> */}
        <ProfessionalDetailsForm driver={driver} />
      </div>
    </div>
  );
}

export default ProfessionalDetails;
