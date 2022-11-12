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
import jwtDecode from "jwt-decode";
import PaystackPop from "@paystack/inline-js";

function CompleteRegistrationForm({ driverName }) {
  const navigator = useNavigate();

  const [guarantorNameBvn, setGuarantorNameBvn] = useState();
  const [guarantorNameNin, setGuarantorNameNin] = useState();
  const [driverId, setDriverId] = useState();

  // Get user token: USED TO MAKE SECURE API CALL
  //
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const queryParams = new URLSearchParams(location.search)
    const driver = queryParams.get('driverId')
    setDriverId(driver)
  }, []);
  const token = localStorage.getItem("driverToken");
  const decodedDriver = jwtDecode(token);

  const onSubmit = async (values) => {
    console.log('INSIDE HERE');
    if (guarantorNameBvn !== guarantorNameNin) {
      return Swal.fire({
        title: "Attention",
        text: "Please cross-check the NINs and BVNs provided! Inconsistent data has been detected!",
        icon: "info",
        timer: 3000,
      });
    }
    const guarantor = {
      name: guarantorNameBvn,
      relationship: values.guarantorRelationship,
      phone: values.guarantorPhone,
      address: values.guarantorAddress,
      jobTitle: values.guarantorJobTitle,
      email: values.guarantorEmail,
      nin: values.guarantorNin,
      bvn: values.guarantorBvn,
      driver: driverId
    };

    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL_DRIVER}/guarantors/create?driverId=${driverId}`,
        guarantor,
        {
          headers: {
            authToken: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Thank you!🎉",
          text: `You have successfully signed up as ${guarantor.name}'s guarantor. Your personal information remains safe and confidential with us!`,
          icon: "success",
          timer: 4000,
        });
        localStorage.removeItem("driverToken");
        navigator("/driver/login");
      })
      .catch((err) => {
        if (err.response.data.message === "Token required!") {
          Swal.fire({
            title: "Error",
            text: "Session timeout. Please log in again.",
            icon: "error",
            timer: 3000,
          });

          navigator("/driver/login");
          return;
        }

        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
        return true;
      });
  };

  const checkNin = async (e, lastname, isGuarantorOne) => {
    console.log("INSIDE CHECK NIN");
    if (lastname === "") {
      return Swal.fire({
        title: "Attention",
        text: "Lastname must be filled first!",
        icon: "info",
        timer: 3000,
      });
    }
    if (e.target.value.length === 11) {
      e.target.disabled = true;
      await axios
        .post(
          `https://vapi.verifyme.ng/v1/verifications/identities/nin/${e.target.value}?type=basic`,
          {
            lastname: lastname,
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
            e.target.disabled = false;
            setGuarantorNameNin(
              `${res.data.data.firstname} ${res.data.data.lastname}`
            );
          } else {
            e.target.disabled = false;
            setGuarantorNameNin(`Lastname did not match provided BVN!`);
          }
        })
        .catch((err) => {
          console.log("VERIFYME ERROR:", err);
        });
    }
  };
  const checkBvn = async (e, lastname, isGuarantorOne) => {
    console.log("INSIDE CHECK BVN");
    if (lastname === "") {
      return Swal.fire({
        title: "Attention",
        text: "Lastname must be filled first!",
        icon: "info",
        timer: 3000,
      });
    }
    if (e.target.value.length === 11) {
      e.target.disabled = true;
      await axios
        .post(
          `https://vapi.verifyme.ng/v1/verifications/identities/bvn/${e.target.value}?type=basic`,
          {
            firstname: "John",
            lastname: lastname,
            phone: "080000000000",
            dob: "04-04-1944",
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
            e.target.disabled = false;
            setGuarantorNameBvn(
              `${res.data.data.firstname} ${res.data.data.lastname}`
            );
          } else {
            e.target.disabled = false;
            setGuarantorNameBvn(`Lastname did not match provided BVN!`);
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
      guarantorLastName: "",
      guarantorRelationship: "",
      guarantorPhone: "",
      guarantorAddress: "",
      guarantorJobTitle: "",
      guarantorEmail: "",
      guarantorNin: "",
      guarantorBvn: "",
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
          display: "flex",
          flexDirection: "column",
        }}
        id="step-1"
      >
        <h2 className="semibold">Guarantors form</h2>
        <p className="step-description">
          Someone who is willing to vouch for your character and background.
        </p>
        <p className="error">Please wait for BVN and NIN verification before accepting request!</p>
        <small className="error">Refresh the page and check your internet connection if verification takes longer than a minute.</small>

        <hr className="hr-opacity" />
        <h5>Guatantor Details</h5>

        <div className="form-group mt-3">
          <label htmlFor="guarantorLastName">Lastname</label>
          <input
            type="text"
            id="guarantorLastName"
            className="form-control"
            name="guarantorLastName"
            value={values.guarantorLastName}
            placeholder="eg. John Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            // disabled={true}
          />
          {errors.guarantorLastName && (
            <p className="error">{errors.guarantorLastName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorBvn">bvn</label>
          <input
            type="text"
            id="guarantorBvn"
            className="form-control"
            name="guarantorBvn"
            value={values.guarantorBvn}
            maxLength={11}
            placeholder="********"
            onChange={(e) => {
              checkBvn(e, values.guarantorLastName, true);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorBvn && (
            <p className="error">{errors.guarantorBvn}</p>
          )}
          {guarantorNameBvn && <label>{guarantorNameBvn}</label>}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorNin">nin</label>
          <input
            type="text"
            id="guarantorNin"
            className="form-control"
            name="guarantorNin"
            value={values.guarantorNin}
            placeholder="********"
            maxLength={11}
            minLength={11}
            onChange={(e) => {
              checkNin(e, values.guarantorLastName, true);
              // checkBvn(e);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorNin && (
            <p className="error">{errors.guarantorNin}</p>
          )}
          {guarantorNameNin && <label>{guarantorNameNin}</label>}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorRelationship">relationship</label>
          <input
            type="text"
            id="guarantorRelationship"
            className="form-control"
            name="guarantorRelationship"
            value={values.guarantorRelationship}
            placeholder="eg. Brother"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorRelationship && (
            <p className="error">{errors.guarantorRelationship}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorPhone">phone</label>
          <input
            type="tel"
            id="guarantorPhone"
            className="form-control"
            name="guarantorPhone"
            value={values.guarantorPhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorPhone && (
            <p className="error">{errors.guarantorPhone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorAddress">home address</label>
          <input
            type="text"
            id="guarantorAddress"
            className="form-control"
            name="guarantorAddress"
            value={values.guarantorAddress}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorAddress && (
            <p className="error">{errors.guarantorAddress}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorJobTitle">Job title</label>
          <input
            type="tel"
            id="guarantorJobTitle"
            className="form-control"
            name="guarantorJobTitle"
            value={values.guarantorJobTitle}
            placeholder="eg. Lawyer"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorJobTitle && (
            <p className="error">{errors.guarantorJobTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorEmail">email</label>
          <input
            type="email"
            id="guarantorEmail"
            className="form-control"
            name="guarantorEmail"
            value={values.guarantorEmail}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorEmail && (
            <p className="error">{errors.guarantorEmail}</p>
          )}
        </div>

      <div className="control-buttons py-5">
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div className="back-button-apply">
            <button
              type="submit"
              className="btn btn-dark blue-bg py-2 px-4 next-button"
              disabled={isSubmitting}
              onClick={() => onSubmit(values)}
            >
              {isSubmitting && (
                <span>
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
                  <span className="sr-only">Loading...</span>
                </span>
              )}
              {!isSubmitting && <span>Accept request</span>}
            </button>
          </div>
        </div>
      </div>
      </div>

    </form>
  );
}

export default CompleteRegistrationForm;
