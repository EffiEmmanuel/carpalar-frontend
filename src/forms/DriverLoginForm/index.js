import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import driverLoginSchema from "./validation";

function DriverLoginForm() {
  const navigator = useNavigate();

  const onSubmit = async (values, actions) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL_DRIVER}/login`, values)
      .then((res) => {
        console.log("RES:", res);
        navigator(`/driver/login/2FA?driverId=${res?.data?.driverId}`);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: driverLoginSchema,
      validateOnChange: false,
      onSubmit,
    });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <small className="error">{errors.password}</small>}
      </div>

      <button className="btn btn-dark blue-bg border-none px-4 py-2 mt-4" disabled={isSubmitting}>
        {isSubmitting ? <span>Loading...</span> : <span>Log in</span>}
      </button>
      <small className="">
        <a href="/driver/forgot-password" className="nav-link mt-3">
          Forgot password?
        </a>
      </small>

      <p className="mt-3">
        Don't have an account?
        <a href="/apply-to-drive" className="mx-2">
          Sign up
        </a>
      </p>
    </form>
  );
}

export default DriverLoginForm;
