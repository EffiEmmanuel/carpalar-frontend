import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PlusSquareDotted } from "react-bootstrap-icons";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import PendingApplicationCard from "../../../../Admin/AdminDashboard/Drivers/PendingApplications/PendingApplicationCard";
import GuarantorCard from "./GuarantorCard";
import "./index.css";

function Guarantors({ driver }) {
  const [guarantors, setGuarantors] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    const driverToken = localStorage.getItem("driverToken");
    async function getGuarantors() {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL_DRIVER}/get-guarantors?driverId=${driver._id}`,
          {
            headers: {
              token: `Bearer ${driverToken}`,
            },
          }
        )
        .then((res) => {
          console.log("RES:", res.data);
          setGuarantors(res.data.guarantors);
        })
        .catch((err) => {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("driverToken");
          navigator("/driver/login");
        });
    }

    getGuarantors();
  }, []);

  const onSubmit = async (values, actions) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_DRIVER}/guarantors/send-email?driverId=${driver._id}`,
        values,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES:", res);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 3000,
        });
        actions.resetForm();
      })
      .catch((err) => {
        console.log("ERR:", err);
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const addGuarantorSchema = yup.object().shape({
    guarantorEmail: yup
      .string()
      .email("Please provide a valid email address")
      .required("* Required"),
  });

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      guarantorEmail: "",
    },
    validationSchema: addGuarantorSchema,
    onSubmit,
  });

  return (
    <div className="account-overview">
      {isModalOpen && (
        <div
          className="add-guarantor-modal"
          style={{
            display: isModalOpen ? "block" : "none",
          }}
        >
          <div
            className="overlay"
            style={{
              display: isModalOpen ? "block" : "none",
            }}
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="add-guarantor-container">
            <h3>Add guarantor</h3>
            <small>
              A link would be sent to the email provided. This link expires in 2
              hours
            </small>
            <form classname="form-container" onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="form-group form-item">
                  <label htmlFor="guarantorEmail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="guarantorEmail"
                    value={values.guarantorEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary blue-bg mt-2">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="drivers-pending-applications">
        <h5>Guarantors</h5>
        <small>Here's all we know about your guarantors.</small>
        <div className="driver-details-header mt-4">
          <div className="driver-detail">
            <span>Fullname</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Relationship</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Phone</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Email</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Address</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>Job title</span>
            <hr className="hr-opacity" />
          </div>
          {/* <div className="driver-detail">
            <span>bvn</span>
            <hr className="hr-opacity" />
          </div>
          <div className="driver-detail">
            <span>nin</span>
            <hr className="hr-opacity" />
          </div> */}
        </div>

        {guarantors?.map((guarantor) => (
          <div key={guarantor._id}>
            <GuarantorCard
              name={`${guarantor.name}`}
              gender={guarantor.relationship}
              phone={guarantor.phone}
              email={guarantor.email}
              address={guarantor.address}
              dateOfBirth={guarantor.jobTitle}
            />
          </div>
        ))}

        {guarantors?.length !== 2 && (
          // <a className="btn btn-primary blue-bg">
          <div className="d-flex justify-content-center align-items-center my-5">
            <PlusSquareDotted
              size={32}
              className="add-guarantor"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          // </a>
        )}
      </div>
    </div>
  );
}

export default Guarantors;
