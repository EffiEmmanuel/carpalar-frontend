import React, { useState } from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import suzukiLogo from "../../../assets/images/suzuki.png";
import toyotaLogo from "../../../assets/images/toyota.png";
import volkswagenLogo from "../../../assets/images/volkswagen.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { XLg } from "react-bootstrap-icons";
import DriverLoginForm from "../../../forms/DriverLoginForm";
import AdminLoginForm from "../../../forms/AdminLoginForm";
// import

function AdminLogin() {
  const navigator = useNavigate();

  return (
    <div className="apply-to-drive-container">
      <div className="apply-to-drive-left login-left admin-login">
        {/* LOGO HERE */}
        <div className="logo-container">
          <img src={carpalarLogo} alt="Carpalar" className="nav-logo" />
        </div>
        <div className="">
          <h5 className="">Log in to your admin dashboard</h5>
          <div className="d-flex flex-column align-items-start opacity-50">
            <div className="partner-logos mt-5 d-flex align-items-center">
              <img src={toyotaLogo} alt="Toyota" className="partner-logo " />
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
            className="menu-icon-close"
            style={{
              filter: 'none'
            }}
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: `No, stay`,
                denyButtonText: `Yes, go back to homepage`,
                allowOutsideClick: false,
                closeOnClickOutside: false
              }).then((result) => {
                console.log('RESULT:', result)
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

        <div className="login-form-container">
          <h2>
            Admin Log in<span className="blue-text">.</span>
          </h2>
          <p>Sign in to your account</p>
          <AdminLoginForm />
        </div>
      </div>
    </div>
    // <div className="login-container">
    //   <div className="login-card">
    //     <div className="login-card-left blue-bg">

    //     </div>

    //     <div className="login-card-right">
    //       <h2>Log in<span className="blue-text">.</span></h2>
    //       <p>Sign in to your account</p>

    //       <form className="form-container">
    //         <div className="form-group">
    //           <label htmlFor="email">Email address</label>
    //           <input className="form-control" type='email' name="email" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="email">Password</label>
    //           <input className="form-control" type='password' name="password" />
    //         </div>

    //         <button className="btn btn-dark blue-bg border-none px-4 py-2">Log in</button>
    //         <small><a href="/driver/forgot-password" className="nav-link">Forgot password?</a></small>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AdminLogin;
