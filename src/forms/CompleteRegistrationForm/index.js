import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CompleteRegistrationSchema from "./validation";
import { useEffect } from "react";

function CompleteRegistrationForm({
  isStepOne,
  isStepTwo,
  setIsStepOne,
  setIsStepTwo,
}) {
  const navigator = useNavigate();

  const [vehicles, setVehicles] = useState();
  const [fetchVehiclesError, setFetchVehiclesError] = useState();

  // Get user token: USED TO MAKE SECURE API CALL
  useEffect(() => {
    async function getAllVehicles() {
      await axios
        .get(`http://localhost:5000/vehicles`)
        .then((res) => {
          console.log("RES:", res);
          if (res.data.vehicles) {
            setVehicles(res.data.vehicles);
          }
        })
        .catch((err) => {
          console.log("ERR:", err);
        });
    }

    getAllVehicles();
  });
  const token = localStorage.getItem("userToken");

  const onSubmit = async (values, actions) => {
    await axios
      .post("http://localhost:5000/driver/register", values, {
        headers: {
          "auth-token": `Bearer ${token}`,
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

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      guarantorOneName: "",
      guarantorOneRelationship: "",
      guarantorOnePhone: "",
      guarantorOneAddress: "",
      guarantorOneJobTitle: "",
      guarantorOneEmail: "",
      guarantorOneNin: "",
      guarantorOneBvn: "",

      guarantorTwoName: "",
      guarantorTwoRelationship: "",
      guarantorTwoPhone: "",
      guarantorTwoAddress: "",
      guarantorTwoJobTitle: "",
      guarantorTwoEmail: "",
      guarantorTwoNin: "",
      guarantorTwoBvn: "",

      vehicle: "",
      comfortableContractDuration: "",
      downpaymentBudget: "",
      otherPaymentAmount: "",
    },
    validationSchema: CompleteRegistrationSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="1st-step apply-step"
        style={{
          display: isStepOne ? "flex" : "none",
          flexDirection: "column",
        }}
        id="step-1"
      >
        <h2 className="semibold">Guarantors form</h2>
        <p className="step-description">
          Someone who is willing to vouch for your character and background.
        </p>

        <hr className="hr-opacity" />
        <h5>Guatantor 1</h5>

        <div className="form-group mt-3">
          <label htmlFor="guarantorOneName">name</label>
          <input
            type="text"
            id="guarantorOneName"
            className="form-control"
            name="guarantorOneName"
            value={values.guarantorOneName}
            placeholder="eg. John Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneName && (
            <p className="error">{errors.guarantorOneName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneRelationship">relationship</label>
          <input
            type="text"
            id="guarantorOneRelationship"
            className="form-control"
            name="guarantorOneRelationship"
            value={values.guarantorOneRelationship}
            placeholder="eg. Brother"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneRelationship && (
            <p className="error">{errors.guarantorOneRelationship}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOnePhone">phone</label>
          <input
            type="tel"
            id="guarantorOnePhone"
            className="form-control"
            name="guarantorOnePhone"
            value={values.guarantorOnePhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOnePhone && (
            <p className="error">{errors.guarantorOnePhone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneAddress">home address</label>
          <input
            type="text"
            id="guarantorOneAddress"
            className="form-control"
            name="guarantorOneAddress"
            value={values.guarantorOneAddress}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneAddress && (
            <p className="error">{errors.guarantorOneAddress}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneJobTitle">Job title</label>
          <input
            type="tel"
            id="guarantorOneJobTitle"
            className="form-control"
            name="guarantorOneJobTitle"
            value={values.guarantorOneJobTitle}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneJobTitle && (
            <p className="error">{errors.guarantorOneJobTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneEmail">email</label>
          <input
            type="email"
            id="guarantorOneEmail"
            className="form-control"
            name="guarantorOneEmail"
            value={values.guarantorOneEmail}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneEmail && (
            <p className="error">{errors.guarantorOneEmail}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneNin">nin</label>
          <input
            type="text"
            id="guarantorOneNin"
            className="form-control"
            name="guarantorOneNin"
            value={values.guarantorOneNin}
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneNin && (
            <p className="error">{errors.guarantorOneNin}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneBvn">bvn</label>
          <input
            type="text"
            id="guarantorOneBvn"
            className="form-control"
            name="guarantorOneBvn"
            value={values.guarantorOneBvn}
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneBvn && (
            <p className="error">{errors.guarantorOneBvn}</p>
          )}
        </div>

        <hr className="hr-opacity mt-5" />
        <h5>Guatantor 2</h5>

        <div className="form-group mt-3">
          <label htmlFor="guarantorTwoName">name</label>
          <input
            type="text"
            id="guarantorTwoName"
            className="form-control"
            name="guarantorTwoName"
            value={values.guarantorTwoName}
            placeholder="eg. John Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoName && (
            <p className="error">{errors.guarantorTwoName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoRelationship">relationship</label>
          <input
            type="text"
            id="guarantorTwoRelationship"
            className="form-control"
            name="guarantorTwoRelationship"
            value={values.guarantorTwoRelationship}
            placeholder="eg. Sister"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoRelationship && (
            <p className="error">{errors.guarantorTwoRelationship}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoPhone">phone</label>
          <input
            type="tel"
            id="guarantorTwoPhone"
            className="form-control"
            name="guarantorTwoPhone"
            value={values.guarantorTwoPhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoPhone && (
            <p className="error">{errors.guarantorTwoPhone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoAddress">home address</label>
          <input
            type="text"
            id="guarantorTwoAddress"
            className="form-control"
            name="guarantorTwoAddress"
            value={values.guarantorTwoAddress}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoAddress && (
            <p className="error">{errors.guarantorTwoAddress}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoJobTitle">Job title</label>
          <input
            type="text"
            id="guarantorTwoJobTitle"
            className="form-control"
            name="guarantorTwoJobTitle"
            value={values.guarantorTwoJobTitle}
            placeholder="eg. Banker"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoJobTitle && (
            <p className="error">{errors.guarantorTwoJobTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoEmail">email</label>
          <input
            type="email"
            id="guarantorTwoEmail"
            className="form-control"
            name="guarantorTwoEmail"
            value={values.guarantorTwoEmail}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoEmail && (
            <p className="error">{errors.guarantorTwoEmail}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoNin">nin</label>
          <input
            type="text"
            id="guarantorTwoNin"
            className="form-control"
            name="guarantorTwoNin"
            value={values.guarantorTwoNin}
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoNin && (
            <p className="error">{errors.guarantorTwoNin}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoBvn">bvn</label>
          <input
            type="text"
            id="guarantorTwoBvn"
            className="form-control"
            name="guarantorTwoBvn"
            value={values.guarantorTwoBvn}
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoBvn && (
            <p className="error">{errors.guarantorTwoBvn}</p>
          )}
        </div>
      </div>

      <div
        className="2nd-step apply-step"
        style={{
          display: isStepTwo ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <h2 className="semibold">
          Now, let's take your car and payment details
        </h2>
        <p className="step-description">
          Please select your desired car and pick a payment plan most suitable
          for you.
        </p>

        {/* OCCUPATION */}
        <div className="form-group mt-5">
          <label htmlFor="vehicle">choose your vehicle</label>

          <select
            className="form-control"
            id="vehicle"
            name="vehicle"
            value={values.vehicle}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select vehicle
              </option>
            </optgroup>
          </select>
          {errors.vehicle && <p className="error">{errors.vehicle}</p>}
        </div>

        {!values.vehicle === "" && (
          <div className="form-group">
            <a href="/">SEE DETAILS</a>
          </div>
        )}

        {/* COMFORTABLE CONTRACT DURATION */}
        <div className="form-group mt-5">
          <label htmlFor="comfortableContractDuration">Contract duration</label>
          <select
            className="form-control"
            id="comfortableContractDuration"
            name="comfortableContractDuration"
            value={values.comfortableContractDuration}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value="24 month">24 Month</option>
              <option value="27 month">27 Month</option>
            </optgroup>
          </select>
          {errors.comfortableContractDuration && (
            <p className="error">{errors.comfortableContractDuration}</p>
          )}
        </div>

        {/* DOWN PAYMENT BUDGET */}
        <div className="form-group mt-5">
          <label htmlFor="downpaymentBudget">Down payment budget</label>
          <select
            className="form-control"
            id="downpaymentBudget"
            name="downpaymentBudget"
            value={values.downpaymentBudget}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value="400000">₦400,000</option>
              <option value="500,000">₦500,000</option>
              <option value="700,000">₦700,000</option>
              <option value="1,000,000">₦1,000,000</option>
              <option value="other">Other</option>
            </optgroup>
          </select>
          {errors.downpaymentBudget && (
            <p className="error">{errors.downpaymentBudget}</p>
          )}
        </div>

        {values.downpaymentBudget === "other" && (
          <div className="form-group mt-5">
            <label htmlFor="downpaymentBudget">
              Please provide amount below
            </label>
            <input
              type="text"
              name="otherPaymentAmount"
              id="otherPaymentAmount"
              className="form-control"
              value={values.otherPaymentAmount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherPaymentAmount && (
              <p className="error">{errors.otherPaymentAmount}</p>
            )}
          </div>
        )}
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
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
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

export default CompleteRegistrationForm;
