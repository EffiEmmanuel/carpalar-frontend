import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import personalDetailsSchema from './validation'
import './index.css'

function PersonalDetailsForm({ driver }) {
  const [isEditing, setIsEditing] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  const [driverDetails, setDriverDetails] = useState(driver);

  useEffect(() => {
    setDriverDetails(driver);
  }, [driver]);

  const onSubmit = async (values) => {
    console.log('VALUES:', values)
    await axios.patch(`http://localhost:5000/driver/update?driverId=${driverDetails._id}`, values)
    .then(res => {
        if(res.data) {
            Swal.fire({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                timer: 3000
            })
            window.location.reload()
        }
    }).catch(err => {
        console.log(err)
        Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            timer: 3000
        })
    })
  }

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: driverDetails?.firstname,
        othername: driverDetails?.othername,
        surname: driverDetails?.surname,
        gender: driverDetails?.gender,
        address: driverDetails?.address,
        placeOfBirth: driverDetails?.placeOfBirth,
        maritalStatus: driverDetails?.maritalStatus,
        occupation: driverDetails?.occupation,
      },
      validationSchema: personalDetailsSchema,
      onSubmit
    });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="form-control"
            value={isEditing ? values.firstname : driverDetails?.firstname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="othername">othername</label>
          <input
            type="text"
            name="othername"
            id="othername"
            className="form-control"
            value={isEditing ? values.othername : driverDetails?.othername}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="surname">surname</label>
          <input
            type="text"
            name="surname"
            id="surname"
            className="form-control"
            value={isEditing ? values.surname : driverDetails?.surname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="gender">gender</label>
          <select
            name="gender"
            value={isEditing ? values.gender : driverDetails?.gender}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male" disabled>
              Male
            </option>
            <option value="female" disabled>
              Female
            </option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="address">address</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control"
            value={isEditing ? values.address : driverDetails?.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="phone">phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={isEditing ? values.phone : driverDetails?.phone}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="otherPhone">otherPhone</label>
          <input
            type="text"
            name="otherPhone"
            id="otherPhone"
            className="form-control"
            value={isEditing ? values.otherPhone : driverDetails?.otherPhone}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={driverDetails?.email}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="dateOfBirth">date Of Birth</label>
          <input
            type="text"
            name="dateOfBirth"
            id="dateOfBirth"
            className="form-control"
            value={driverDetails?.firstname}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group form-item">
          <label htmlFor="placeOfBirth">place Of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            id="placeOfBirth"
            className="form-control"
            value={isEditing ? values.placeOfBirth : driverDetails?.placeOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="form-group form-item">
          <label htmlFor="maritalStatus">marital status</label>
          <select
            name="maritalStatus"
            value={isEditing ? values.maritalStatus : driverDetails?.maritalStatus}
            onChange={handleChange}
            className="form-control marital-status"
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="single" style={{textTransform: 'capitalize !important'}}>Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>
        <div className="form-group form-item">
          <label htmlFor="occupation">Occupation</label>
          <select
            name="occupation"
            className="form-control"
            value={isEditing ? values.occupation : driverDetails?.occupation}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="self-employed">Self-employed</option>
            <option value="salaried">Salaried</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>
      </div>

      <div className="buttons mt-4">
        {!isEditing && (
          <button
            className="btn btn-dark blue-bg border-none py-2 px-4 me-2"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            type="submit"
            className="btn btn-dark blue-bg border-none py-2 px-4 me-2"
            disabled={isSubmitting}
            onClick={() => onSubmit(values)}
          >
            {isSubmitting ? <span>Saving...</span> : <span>Save</span>}
          </button>
        )}
      </div>
    </form>
  );
}

export default PersonalDetailsForm;
