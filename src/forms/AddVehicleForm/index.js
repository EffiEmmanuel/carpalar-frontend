import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import addVehicleSchema from "./validation";
import personalDetailsSchema from "./validation";

function AddVehicleForm({ driver }) {
  const [vehicleBrands, setVehicleBrands] = useState();

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
    await axios
      .post(`${process.env.REACT_APP_BASE_URL_ADMIN}/vehicles/create`, values, {
        headers: {
          auth_token: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Success",
            text: res.data.message,
            icon: "success",
            timer: 3000,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: err.response.message,
          icon: "error",
          timer: 3000,
        });
      });
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        yearOfProduction: "",
        transmission: "",
        fuel: "",
        engineSize: "",
        vehicleSize: "",
        vehicleBrand: "",
        price: "",
      },
      validationSchema: addVehicleSchema,
      onSubmit,
    });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="yearOfProduction">year Of Production</label>
          <input
            type="text"
            name="yearOfProduction"
            id="yearOfProduction"
            className="form-control"
            value={values.yearOfProduction}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="transmission">transmission</label>
          <select
            name="transmission"
            value={values.transmission}
            onChange={handleChange}
            className="form-control"
            disabled={isSubmitting}
          >
            <option value="">Select</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <div className="form-group form-item">
          <label htmlFor="fuel">fuel</label>
          <select
            name="fuel"
            value={values.fuel}
            onChange={handleChange}
            className="form-control"
            disabled={isSubmitting}
          >
            <option value="">Select</option>
            <option value="petrol">petrol</option>
            <option value="diesel">diesel</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="engineSize">engine Size</label>
          <input
            type="text"
            name="engineSize"
            id="engineSize"
            className="form-control"
            value={values.engineSize}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="vehicleSize">vehicle size</label>
          <input
            type="text"
            name="vehicleSize"
            id="vehicleSize"
            className="form-control"
            value={values.vehicleSize}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="vehicleBrand">vehicle Brand</label>
          <select
            name="vehicleBrand"
            value={values.vehicleBrand}
            onChange={handleChange}
            className="form-control"
            disabled={isSubmitting}
          >
            <option value="">Select</option>
            {vehicleBrands?.map((vehicleBrand) => (
              <option value={`${vehicleBrand?._id}`} key={vehicleBrand?._id}>
                {vehicleBrand?.brandName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group form-item">
          <label htmlFor="price">vehicle price (₦)</label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            value={values.price}
            onChange={handleChange}
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

export default AddVehicleForm;
