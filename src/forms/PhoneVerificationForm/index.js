import axios from "axios";
import "./index.css";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import phoneVerificationSchema from "./validation";
import { useParams } from "react-router-dom";

function PhoneVerificationForm({ isLogin2FA, driver_id }) {
  const navigator = useNavigate();

  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);

  const params = useParams();
  const driverId = params.driverId;

  console.log("LOGIN2FA:", isLogin2FA);

  const sendOTP = async (e, seconds, driverId) => {
    e.preventDefault();

    console.log("DRIVER", driverId);

    setIsResending(true);

    await axios
      .get(`http://localhost:5000/driver/resend-otp?driverId=${driverId}`)
      .then((res) => {
        console.log("RES:", res);
        if (res.data) {
          Swal.fire({
            title: "Sent",
            text: "A new code has been sent to your registered phone number",
            icon: "success",
            timer: "3000",
          });
        }
      })
      .catch((err) => {
        console.log("RES:", err);
        Swal.fire({
          title: "Error",
          text: err.response.data.messagep,
          icon: "error",
          timer: "3000",
        });
      });

    const countdown = setInterval(() => {
      console.log("inside interval");
      console.log(timer);
      if (seconds === 0) {
        clearInterval(countdown);
        setIsResending(false);
        setTimer(60);
        return;
      }
      seconds--;
      setTimer(seconds);
    }, 1000);
  };

  const verify2FA = async (values) => {
    console.log("hi");
    console.log("DRIVERID:", driver_id);
    setIsSubmitting(true);
    await axios
      .post(
        `http://localhost:5000/driver/login/verify?driverId=${driver_id}`,
        values
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: "Redirecting to your dashboard...",
          icon: "success",
          timer: "3000",
        });
        setIsSubmitting(false);

        // localStorage.setItem('token', `Bearer ${res.data.token}`)
        // navigator("/driver/dashboard");
      })
      .catch((err) => {
        console.log("RES:", err);
        Swal.fire({
          title: "Error",
          text: "Your phone verification failed",
          icon: "error",
          timer: "3000",
        });
        setIsSubmitting(false);
      });
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    if (isLogin2FA) {
      await axios
        .post(
          `http://localhost:5000/driver/login/verify?driverId=${driver_id}`,
          values
        )
        .then((res) => {
          console.log("RES:", res);
          Swal.fire({
            title: "Success",
            text: "Redirecting to your dashboard...",
            icon: "success",
            timer: "3000",
          });
          setIsSubmitting(false);

          localStorage.setItem("driverToken", `${res.data.driverToken}`);
          navigator("/driver/dashboard");
        })
        .catch((err) => {
          console.log("RES:", err);
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            timer: "3000",
          });
          setIsSubmitting(false);
        });
    } else {
      await axios
        .patch(
          `http://localhost:5000/driver/verify-phone?driverId=${driverId}`,
          values
        )
        .then((res) => {
          console.log("RES:", res);
          Swal.fire({
            title: "Done",
            text: "Your phone has been verified! You can now log in",
            icon: "success",
            timer: "3000",
          });
          setIsSubmitting(false);
          navigator("/driver/login");
        })
        .catch((err) => {
          console.log("RES:", err);
          Swal.fire({
            title: "Error",
            text: "Your phone verification failed",
            icon: "error",
            timer: "3000",
          });
          setIsSubmitting(false);
        });
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: phoneVerificationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <div className="form-group" id="verification-container">
        <label htmlFor="verificationCode">Phone verification code</label>
        <input
          id="verificationCode"
          className="form-control w-100"
          name="verificationCode"
          type="text"
          value={values.verificationCode}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={6}
        />
      </div>
      <div className="d-flex flex-column-reverse justify-content-center align-items-center">
        {!isLogin2FA && (
          <span
            className="btn border-none btn-light no-bg mt-3 text-opacity-50"
            disabled={isResending}
            onClick={(e) => {
              if (isResending) {
                return;
              }
              sendOTP(e, timer, driverId);
            }}
          >
            {isResending ? <span>{timer}s</span> : <span>Resend code</span>}
          </span>
        )}
        {isLogin2FA && (
          <span
            className="btn border-none btn-light no-bg mt-3 text-opacity-50"
            disabled={isResending}
            onClick={(e) => {
              if (isResending) {
                return;
              }
              sendOTP(e, timer, driver_id);
            }}
          >
            {isResending ? <span>{timer}s</span> : <span>Resend code</span>}
          </span>
        )}

        <button
          type="submit"
          className="btn border-none btn-dark blue-bg mt-3"
          disabled={isSubmitting}
          onClick={() => onSubmit(values)}
        >
          {isSubmitting ? <span>Verifying...</span> : <span>Verify</span>}
        </button>
      </div>
    </form>
  );
}

export default PhoneVerificationForm;
