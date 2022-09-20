import React, { useContext } from "react";
import "./index.css";
import Footer from "../Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../BecomeAPartner";
import Navbar from "../../Generic/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EmailVerificationPage() {
  const { isInvestor, isApplyToDrive, setIsApplyToDrive } =
    useContext(CarpalarContext);

  // Setting the navbar back
  if (isApplyToDrive) setIsApplyToDrive(false);

  const [message, setMessage] = useState(["", ""]);
  const navigator = useNavigate()

  // eslint-disable-next-line no-restricted-globals
  const query = queryString.parse(location.search);

  const driverId = query.driverId;
  const code = query.code;

  useEffect(() => {
    axios
      .patch(
        `http://localhost:5000/driver/verify-email?driverId=${driverId}&code=${code}`
      )
      .then((res) => {
        console.log("RES:", res);
        setMessage([res.data.message, "success"]);
      })
      .catch((err) => {
        console.log("ERR:", err);
        setMessage([err.response.data.message, "error"]);
      });
  }, []);

  const resendVerificationEmail = async () => {
    await axios.get(`http://localhost:5000/driver/verify-email/resend?driverId=${driverId}`)
    .then(res => {
      console.log('RES:', res)
      Swal.fire({
        title: 'Success',
        text: res.data.message,
        icon: 'success',
        timer: 3000,
      });
      navigator('/')
    }).catch(err => {
      console.log('ERR:', err)
    })
  }

  return (
    <div className="">
      <Navbar />
      {!isInvestor && (
        <div className="">
          <main className="">
            <div className="hero eandp-verification w-100 container-fluid d-flex justify-content-center align-items-start">
              <div className="hero-content eandp-verification container-fluid d-flex flex-column justify-content-center align-items-center">
                <h4>{message[0]}</h4>
                {message[1] === "success" ? (
                  <p>
                    Now you can <a href="/driver/login">Log in</a> to your
                    dashboard.
                  </p>
                ) : (
                  <div className="next-button-apply mt-4">
                    <button
                      className="btn btn-dark blue-bg py-2 px-4 next-button"
                      onClick={resendVerificationEmail}
                    >
                      Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>

          <Footer />
        </div>
      )}

      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default EmailVerificationPage;
