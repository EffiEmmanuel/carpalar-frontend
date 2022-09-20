import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

function EmailVerificationForm() {
  const [token, setToken] = useState("");

  // eslint-disable-next-line no-restricted-globals
  const query = queryString.parse(location.search);
  const userId = query.userId;

  const navigator = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/verifyEmail?userId=${userId}`,
        token
      )
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Congratilations! Your email has been successfully verified! Now you can log in.",
          icon: "success",
        });
        navigator("/login");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
        window.location.reload();
      });
  };
  return (
    <form className="form-container mt-5" onSubmit={handleVerifyEmail}>
      <input
        type="text"
        name="token"
        className="form-control"
        placeholder="Verification code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <div className="d-flex justify-content-center">
        <button type="sumit" className="btn btn-dark my-4">
          Verify
        </button>
      </div>
    </form>
  );
}

export default EmailVerificationForm;
