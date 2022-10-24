import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import addVehicleSchema from "./validation";
import personalDetailsSchema from "./validation";

function AddVehicleBrandForm({ driver }) {
  const [vehicleBrands, setVehicleBrands] = useState();

  const [file, setFile] = useState("");

  useEffect(() => {
    async function getAllVehicleBrands() {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/vehicle-brands`)
        .then((res) => {
          console.log("RES:", res);
          setVehicleBrands(res.data.vehicleBrands);
        })
        .catch((err) => {
          console.log("ERR:", err);
        });
    }
    getAllVehicleBrands();
  }, []);

  const onSubmit = async (values) => {
    console.log("VALUES:", values);
    const vehicleBrandImage = file;

    const formData = new FormData();
    formData.append("vehicle-image", file, vehicleBrandImage.name);
    formData.append("brandName", values.brandName);

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/vehicle-brands/create`,
        formData,
        {
          headers: {
            auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Success",
            text: ' Vehicle brand created successfully',
            icon: "success",
            timer: 3000,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data.error.name === "TokenExpiredError") {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("adminToken");
          navigator("/admin/login");
        } else {
          Swal.fire({
            title: "Error",
            text: err.response.message,
            icon: "error",
            timer: 3000,
          });
        }
      });
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        brandName: "",
        image: "",
      },
      validationSchema: addVehicleSchema,
      onSubmit,
    });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="brandName">brand Name</label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            className="form-control"
            value={values.brandName}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept=".pdf, .png, .jpg"
            name="image"
            id="image"
            className="form-control"
            value={values.image}
            onChange={(e) => {
              handleChange(e);
              const vehicleBrandImage = e.target.files[0];
              setFile(vehicleBrandImage);
            }}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="buttons mt-4">
        <button
          type="submit"
          className="btn btn-dark blue-bg border-none py-2 px-4 me-2"
          disabled={isSubmitting}
          onClick={() => onSubmit(values)}
        >
          {isSubmitting ? <span>Saving...</span> : <span>Save</span>}
        </button>
      </div>
    </form>
  );
}

export default AddVehicleBrandForm;
