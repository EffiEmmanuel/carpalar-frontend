import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import "./index.css";
import makeAPICall from "../../helpers/makeAPICall.js";
import ApplyToDriveFormSchema from "./validation";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ApplyToDriveForm({
  isStepOne,
  isStepTwo,
  setIsStepOne,
  setIsStepTwo,
}) {
  const gender = ["male", "female"];
  const occupation = ["Self-employed", "Salaried", "Unemployed"];
  const maritalStatus = ["single", "married", "divorced"];
  const [file, setFile] = useState();

  const [licenseName, setLicenseName] = useState('')
  //   const countries = [
  //     "Nigeria",
  //     "Ghana",
  //     "Egypt",
  //     "Kenya",
  //     "India",
  //     "South Africa",
  //     "Uganda",
  //     "United Arab Emirates",
  //     "United Kingdom",
  //   ];

  const navigator = useNavigate();

  const onSubmit = async (values, actions) => {
    const license = file;
    const { termsAndConditions, driversLicense, ...others } = values;
    const finalData = {
      ...values,
      driversLicense: license,
    };

    const formData = new FormData();
    for (const key in finalData) {
      formData.append(`${key}`, `${others[key]}`);
    }
    formData.append("drivers-license", file, license.name);

    await axios
      .post("http://localhost:5000/driver/register", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "We have received your details!",
          text: "We will get back to you within 72 hours.",
          icon: "success",
          timer: 4000,
        });
        console.log("RES:", res);

        navigator(`/driver/${res.data.driverId}/verify-phone`);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
        console.log("Error:", err);
        console.log("Error response:", err.response);
        console.log("Error data:", err.response.data.message);
        return true;
      });
  };

  const checkLicense = async (e) => {
    console.log("INSIDE CHECK NIN");
    if (values.surname === "" || values.firstname === "" || values.dateOfBirth == "" ) {
      return Swal.fire({
        title: "Attention",
        text: "Lastname, firstname and date of birth must be filled first!",
        icon: "info",
        timer: 3000,
      });
    }
    if (e.target.value.length === 11) {
      e.target.disabled = true;
      await axios
        .post(
          `https://vapi.verifyme.ng/v1/verifications/identities/drivers_license/${e.target.value}?type=basic`,
          {
            dateOfBirth: values.dateOfBirth,
            lastname: values.surname,
            firstname: values.firstname,
          },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0NzM3MSwiZW52IjoidGVzdCIsImlhdCI6MTY2NjMzOTU4MH0.SxPzE7aZFejgVvknmHsrkJSvBF_Y4mDbOJ6yqUmIryw",
            },
          }
        )
        .then((res) => {
          console.log("VERIFYME RESPONSE:", res);
          if (res.data.data.fieldMatches.lastname) {
            e.target.disabled = true;
            setLicenseName('valid and matches details')
          } else {
            e.target.disabled = false;
            setLicenseName('No match! Please cross check your entries (Lastname, firstname and date of birth.')
          }
        })
        .catch((err) => {
          console.log("VERIFYME ERROR:", err);
        });
    }
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstname: "",
      othername: "",
      surname: "",
      gender: "",
      address: "",
      phone: "",
      otherPhone: "",
      email: "",
      password: "",
      dateOfBirth: "",
      placeOfBirth: "",
      maritalStatus: "",
      occupation: "",
      yearsOfDrivingExperience: "",
      nationality: "",
      highestAcademicQualification: "",
      stateOfOrigin: "",
      lga: "",
      licenseNumber: "",
      driversLicense: "",
      otherHailingPlatforms: "",
      termsAndConditions: "",
    },
    validationSchema: ApplyToDriveFormSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container d-flex flex-column justify-content-center align-items-center"
      encType="multipart/form-data"
    >
      <div
        className="1st-step apply-step"
        style={{
          display: isStepOne ? "flex" : "none",
          flexDirection: "column",
        }}
        id="step-1"
      >
        <h2 className="semibold">Please tell us about yourself</h2>
        <p className="step-description">
          Please fill in your details and our team will get back to you in 72
          hours.
        </p>
        <div className="form-group mt-5">
          <label htmlFor="firstname">firstname</label>
          <input
            type="text"
            id="firstname"
            className="form-control"
            name="firstname"
            value={values.firstname}
            placeholder="eg. John"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="other-name">Other name</label>
          <input
            type="text"
            id="other-name"
            className="form-control"
            name="othername"
            value={values.othername}
            placeholder="eg. Jane"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.othername && <p className="error">{errors.othername}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">surname</label>
          <input
            type="text"
            id="surname"
            className="form-control"
            name="surname"
            value={values.surname}
            placeholder="eg. Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.surname && <p className="error">{errors.surname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <option value="" disabled={isSubmitting}>
              Select
            </option>
            <option value="male" disabled={isSubmitting}>
              {gender[0]}
            </option>
            <option value="female" disabled={isSubmitting}>
              {gender[1]}
            </option>
          </select>

          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address">address</label>
          <input
            type="text"
            id="address"
            className="form-control"
            name="address"
            value={values.address}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">phone</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            name="phone"
            value={values.phone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="otherPhone">other phone</label>
          <input
            type="tel"
            id="otherPhone"
            className="form-control"
            name="otherPhone"
            value={values.otherPhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.otherPhone && <p className="error">{errors.otherPhone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={values.email}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Chooe a password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={values.password}
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">date of birth</label>
          <input
            type="date"
            id="dateOfBirth"
            className="form-control"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="placeOfBirth">place of birth</label>
          <input
            type="text"
            id="placeOfBirth"
            className="form-control"
            name="placeOfBirth"
            value={values.placeOfBirth}
            placeholder="eg. Somewhere beautiful..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.placeOfBirth && (
            <p className="error">{errors.placeOfBirth}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="maritalStatus">marital status</label>
          <select
            className="form-control"
            id="maritalStatus"
            name="maritalStatus"
            value={values.maritalStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <option value="" disabled={isSubmitting}>
              Select
            </option>
            <option value={maritalStatus[0]} disabled={isSubmitting}>
              {maritalStatus[0]}
            </option>
            <option value={maritalStatus[1]} disabled={isSubmitting}>
              {maritalStatus[1]}
            </option>
            <option value={maritalStatus[2]} disabled={isSubmitting}>
              {maritalStatus[2]}
            </option>
          </select>
        </div>
        {errors.maritalStatus && (
          <p className="error">{errors.maritalStatus}</p>
        )}
      </div>

      <div
        className="2nd-step apply-step"
        style={{
          display: isStepTwo ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <h2 className="semibold">Now, let's take your professional details</h2>
        <p className="step-description">
          Please fill in your details and our team will get back to you in 72
          hours.
        </p>

        {/* OCCUPATION */}
        <div className="form-group mt-5">
          <label htmlFor="occupation">occupation</label>

          <select
            className="form-control"
            id="occupation"
            name="occupation"
            value={values.occupation}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              {occupation.map((occupation, index) => (
                <option key={index} value={occupation} disabled={isSubmitting}>
                  {occupation}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.occupation && <p className="error">{errors.occupation}</p>}
        </div>

        {/* YEARS OF DRIVING EXPERIENCE */}
        <div className="form-group mt-5">
          <label htmlFor="yearsOfDrivingExperience">
            years of Driving Experience
          </label>
          <input
            type="number"
            id="yearsOfDrivingExperience"
            className="form-control"
            name="yearsOfDrivingExperience"
            value={values.yearsOfDrivingExperience}
            placeholder="eg. 2"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.yearsOfDrivingExperience && (
            <p className="error">{errors.yearsOfDrivingExperience}</p>
          )}
        </div>

        {/* COUNTRY */}
        {/* <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                className="form-control"
                id="country"
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <optgroup>
                  <option value="">
                    Select
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div> */}

        {/* NATIONALITY */}
        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            className="form-control"
            name="nationality"
            value={values.nationality}
            placeholder="eg. Germany"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.nationality && <p className="error">{errors.nationality}</p>}
        </div>

        {/* CITY */}
        {/* <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="form-control"
                name="city"
                value={values.city}
                placeholder="eg. Lagos"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div> */}

        {/* HIGHEST ACADEMIC QUALIFICATION */}
        <div className="form-group">
          <label htmlFor="highestAcademicQualification">
            Highest academic qualification
          </label>
          <select
            name="highestAcademicQualification"
            className="form-control"
            value={values.highestAcademicQualification}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <option value="">
              Select
            </option>
            <option value="phd">
              PhD
            </option>
            <option value="msc">
              Masters's Degree
            </option>
            <option value="bsc">
              Bachelor's Degree
            </option>
            <option value="ssce">
              SSCE / O Level
            </option>
          </select>
          {errors.highestAcademicQualification && (
            <p className="error">{errors.highestAcademicQualification}</p>
          )}
        </div>

        {/* STATE OF ORIGIN */}
        <div className="form-group">
          <label htmlFor="stateOfOrigin">state Of Origin</label>
          <input
            type="text"
            id="stateOfOrigin"
            className="form-control"
            name="stateOfOrigin"
            value={values.stateOfOrigin}
            placeholder="eg. Ogun state"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.stateOfOrigin && (
            <p className="error">{errors.stateOfOrigin}</p>
          )}
        </div>

        {/* LGA */}
        <div className="form-group">
          <label htmlFor="lga">LGA</label>
          <input
            type="text"
            id="lga"
            className="form-control"
            name="lga"
            value={values.lga}
            placeholder="eg. Iba"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.lga && <p className="error">{errors.lga}</p>}
        </div>

        {/* DRIVER'S LICENSE */}
        <div className="form-group">
          <label htmlFor="driversLicense">Driver's License</label>
          <input
            type="file"
            accept=".pdf, .png, .jpg"
            id="driversLicense"
            className="form-control"
            name="driversLicense"
            value={values.driversLicense}
            onChange={(e) => {
              handleChange(e);
              const driversLicese = e.target.files[0];
              setFile(driversLicese);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.driversLicense && (
            <p className="error">{errors.driversLicense}</p>
          )}
        </div>
        
        {/* LICENSE NUMBER */}
        <div className="form-group">
          <label htmlFor="licenseNumber">license Number</label>
          <input
            type="text"
            id="licenseNumber"
            className="form-control"
            name="licenseNumber"
            value={values.licenseNumber}
            placeholder="eg. AA0092998"
            onChange={(e) => {
              handleChange(e)
              checkLicense(e)
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.licenseNumber && <p className="error">{errors.licenseNumber}</p>}
          {licenseName && <label className="">{licenseName}</label>}
        </div>

        

        {/* OTHER HAILING PLATFORMS */}
        <div className="form-group">
          <label>
            Are you currently driving for any ride-hailing platforms? (eg. Uber
            or Taxify){" "}
          </label>
          <div className="radio-group d-flex align-items-center mt-2">
            <input
              type="radio"
              id="otherHailingPlatformsYes"
              className="me-2"
              name="otherHailingPlatforms"
              //   value={values.otherHailingPlatforms}
              value="yes"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
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
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            <label htmlFor="otherHailingPlatformsNo">No</label>
          </div>

          {errors.otherHailingPlatforms && (
            <p className="error">{errors.otherHailingPlatforms}</p>
          )}
        </div>

        {/* AGREE TO TERMS AND CONDITIONS */}
        <div className="form-group">
          <div className="radio-group d-flex align-items-center mt-2">
            <input
              type="checkbox"
              className="me-2"
              id="termsAndConditions"
              value={values.termsAndConditions}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            <label htmlFor="termsAndConditions">
              I agree to{" "}
              <a className="blue-text d-inline" href="/terms-and-conditions">
                Terms & Conditions{" "}
              </a>
              and{" "}
              <a className="blue-text d-inline" href="/privacy-policy">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.termsAndConditions && (
            <p className="error">{errors.termsAndConditions}</p>
          )}
        </div>
      </div>

      <div className="control-buttons py-5">
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div className="back-button-apply">
            <button
              className="btn semibold back-button py-2 px-4"
              disabled={isStepOne ? "disabled" : false}
              onClick={(e) => {
                e.preventDefault();
                setIsStepOne(true);
                setIsStepTwo(false);
                navigator("#step-1");
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 50);
              }}
            >
              <span className="arrow mx-2">
                <ArrowLeft />
              </span>
              BACK
            </button>
          </div>

          {!isStepTwo && (
            <div className="next-button-apply">
              <button
                className="btn btn-dark blue-bg py-2 px-4 next-button"
                disabled={isStepTwo ? "disabled" : false}
                onClick={(e) => {
                  e.preventDefault();
                  setIsStepTwo(true);
                  setIsStepOne(false);
                  navigator("#step-2");
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </button>
            </div>
          )}
          {isStepTwo && (
            <div className="next-button-apply">
              <button
                type="submit"
                className="btn btn-dark blue-bg py-2 px-4 next-button"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span>
                    <i className="fa fa-spinner fa-pulse fa-2x fa-fw margin-bottom"></i>
                    <span className="sr-only">Applying...</span>
                  </span>
                )}
                {!isSubmitting && <span>Apply</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default ApplyToDriveForm;
