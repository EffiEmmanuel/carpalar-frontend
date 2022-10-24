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
import PaystackPop from '@paystack/inline-js'

function CompleteRegistrationForm({
  isStepOne,
  isStepTwo,
  setIsStepOne,
  setIsStepTwo,
}) {
  const navigator = useNavigate();

  const [vehicles, setVehicles] = useState();
  const [fetchVehiclesError, setFetchVehiclesError] = useState();

  const [guarantorOneNameBvn, setGuarantorOneNameBvn] = useState();
  const [guarantorTwoNameBvn, setGuarantorTwoNameBvn] = useState();
  const [guarantorOneNameNin, setGuarantorOneNameNin] = useState();
  const [guarantorTwoNameNin, setGuarantorTwoNameNin] = useState();

  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);

  // Get user token: USED TO MAKE SECURE API CALL
  useEffect(() => {
    async function getAllVehicles() {
      await axios
        .get(`http://localhost:5000/vehicles`)
        .then((res) => {
          console.log("RES:", res);
          if (res.data.vehicles) {
            setVehicles(res.data.vehicles);
          }
        })
        .catch((err) => {
          console.log("ERR:", err);
        });
    }

    getAllVehicles();
  }, []);
  const token = localStorage.getItem("driverToken");
  const decodedDriver = jwtDecode(token);

  const onSubmit = async (values) => {
    if (
      guarantorOneNameBvn !== guarantorOneNameNin ||
      guarantorTwoNameBvn !== guarantorTwoNameNin
    ) {
      return Swal.fire({
        title: "Attention",
        text: "Please cross-check the NINs and BVNs provided! Inconsistent data has been detected!",
        icon: "info",
        timer: 3000,
      });
    }
    const guarantorOne = {
      name: values.guarantorOneName,
      relationship: values.guarantorOneRelationship,
      phone: values.guarantorOnePhone,
      address: values.guarantorOneAddress,
      jobTitle: values.guarantorOneJobTitle,
      email: values.guarantorOneEmail,
      nin: values.guarantorOneNin,
      bvn: values.guarantorOneBvn,
    };

    const guarantorTwo = {
      name: values.guarantorTwoName,
      relationship: values.guarantorTwoRelationship,
      phone: values.guarantorTwoPhone,
      address: values.guarantorTwoAddress,
      jobTitle: values.guarantorTwoJobTitle,
      email: values.guarantorTwoEmail,
      nin: values.guarantorTwoNin,
      bvn: values.guarantorTwoBvn,
    };

    console.log("VALUES:", values);
    console.log("GONE:", guarantorOne);
    console.log("GTWO:", guarantorTwo);

    await axios
      .patch(
        `http://localhost:5000/driver/complete-registration?driverId=${decodedDriver._id}`,
        {
          guarantorOne,
          guarantorTwo,
          vehicle: values.vehicle,
          comfortableContractDuration: values.comfortableContractDuration,
          downpaymentBudget: values.downpaymentBudget,
          otherPaymentAmount: values.otherPaymentAmount,
        },
        {
          headers: {
            authToken: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Congratulations!🎉",
          text: "Your application has been completed successfully.",
          icon: "success",
          timer: 4000,
        });
        console.log("RES:", res);

        // navigator('/driver/dashboard');
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

        console.log("Error:", err);
        console.log("Error response:", err.response);
        console.log("Error data:", err.response.data.message);
        return true;
      });
  };

  const paystackPay = async () => {
    const paystack = new PaystackPop()
    const amount = +values.downpaymentBudget * 100
    console.log('Amount:', amount)
    console.log('Amount type:', typeof amount)
    console.log('PAYSTACK:', paystack)
    paystack.newTransaction({
      key: "pk_test_dd7ee9d92ddadad73da127a2f34831fd3e3d54d4",
      amount: amount,
      email: decodedDriver?.email,
      firstname: decodedDriver?.firstname,
      lastname: decodedDriver?.surname,
      onSuccess: async (transaction) => {
        console.log('REF ID:', transaction.reference)
        // VERIFY TRANSACTION HERE
        await axios.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/transactions/verify/${transaction.reference}`)
        .then(res => {
          console.log('RESPONSE FROM VERIFY:', res)
          return axios.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/transactions`, {
            transactionId: res.data.transactionDetails.id,
            amount: res.data.transactionDetails.amount,
            channel: res.data.transactionDetails.channel,
            currency: res.data.transactionDetails.currency,
            ipAddress: res.data.transactionDetails.ipAddress,
            reference: res.data.transactionDetails.reference,
            driver: decodedDriver?._id,
            status: res.data.transactionDetails.status,
          })
        }).then(res => {
          Swal.fire({
            title: 'Success',
            text: 'Payment made successfully! Please click on the apply button to complete your registration.',
            icon: 'success',
            timer: 3000
          })
          setIsTransactionSuccessful(true)
        })
        .catch(err => {
          console.log('ERROR FROM VERIFY:', err)
        })
      }
    })

  }

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
            isGuarantorOne
              ? setGuarantorOneNameNin(
                  `${res.data.data.firstname} ${res.data.data.lastname}`
                )
              : setGuarantorTwoNameNin(
                  `${res.data.data.firstname} ${res.data.data.lastname}`
                );
          } else {
            e.target.disabled = false;
            isGuarantorOne
              ? setGuarantorOneNameNin(`Lastname did not match provided BVN!`)
              : setGuarantorTwoNameNin(`Last name did not match provided BVN!`);
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
            isGuarantorOne
              ? setGuarantorOneNameBvn(
                  `${res.data.data.firstname} ${res.data.data.lastname}`
                )
              : setGuarantorTwoNameBvn(
                  `${res.data.data.firstname} ${res.data.data.lastname}`
                );
          } else {
            e.target.disabled = false;
            isGuarantorOne
              ? setGuarantorOneNameBvn(`Lastname did not match provided BVN!`)
              : setGuarantorTwoNameBvn(`Last name did not match provided BVN!`);
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
      guarantorOneLastName: "",
      guarantorOneRelationship: "",
      guarantorOnePhone: "",
      guarantorOneAddress: "",
      guarantorOneJobTitle: "",
      guarantorOneEmail: "",
      guarantorOneNin: "",
      guarantorOneBvn: "",

      guarantorTwoLastName: "",
      guarantorTwoRelationship: "",
      guarantorTwoPhone: "",
      guarantorTwoAddress: "",
      guarantorTwoJobTitle: "",
      guarantorTwoEmail: "",
      guarantorTwoNin: "",
      guarantorTwoBvn: "",

      vehicle: "",
      comfortableContractDuration: "",
      downpaymentBudget: "",
      otherPaymentAmount: "",
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
          display: isStepOne ? "flex" : "none",
          flexDirection: "column",
        }}
        id="step-1"
      >
        <h2 className="semibold">Guarantors form</h2>
        <p className="step-description">
          Someone who is willing to vouch for your character and background.
        </p>

        <hr className="hr-opacity" />
        <h5>Guatantor 1</h5>

        <div className="form-group mt-3">
          <label htmlFor="guarantorOneLastName">Lastname</label>
          <input
            type="text"
            id="guarantorOneLastName"
            className="form-control"
            name="guarantorOneLastName"
            value={values.guarantorOneLastName}
            placeholder="eg. John Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            // disabled={true}
          />
          {errors.guarantorOneLastName && (
            <p className="error">{errors.guarantorOneLastName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorOneBvn">bvn</label>
          <input
            type="text"
            id="guarantorOneBvn"
            className="form-control"
            name="guarantorOneBvn"
            value={values.guarantorOneBvn}
            maxLength={11}
            placeholder="********"
            onChange={(e) => {
              checkBvn(e, values.guarantorOneLastName, true);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneBvn && (
            <p className="error">{errors.guarantorOneBvn}</p>
          )}
          {guarantorOneNameBvn && <label>{guarantorOneNameBvn}</label>}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorOneNin">nin</label>
          <input
            type="text"
            id="guarantorOneNin"
            className="form-control"
            name="guarantorOneNin"
            value={values.guarantorOneNin}
            placeholder="********"
            maxLength={11}
            minLength={11}
            onChange={(e) => {
              checkNin(e, values.guarantorOneLastName, true);
              // checkBvn(e);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneNin && (
            <p className="error">{errors.guarantorOneNin}</p>
          )}
          {guarantorOneNameNin && <label>{guarantorOneNameNin}</label>}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorOneRelationship">relationship</label>
          <input
            type="text"
            id="guarantorOneRelationship"
            className="form-control"
            name="guarantorOneRelationship"
            value={values.guarantorOneRelationship}
            placeholder="eg. Brother"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneRelationship && (
            <p className="error">{errors.guarantorOneRelationship}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOnePhone">phone</label>
          <input
            type="tel"
            id="guarantorOnePhone"
            className="form-control"
            name="guarantorOnePhone"
            value={values.guarantorOnePhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOnePhone && (
            <p className="error">{errors.guarantorOnePhone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneAddress">home address</label>
          <input
            type="text"
            id="guarantorOneAddress"
            className="form-control"
            name="guarantorOneAddress"
            value={values.guarantorOneAddress}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneAddress && (
            <p className="error">{errors.guarantorOneAddress}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneJobTitle">Job title</label>
          <input
            type="tel"
            id="guarantorOneJobTitle"
            className="form-control"
            name="guarantorOneJobTitle"
            value={values.guarantorOneJobTitle}
            placeholder="eg. Lawyer"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneJobTitle && (
            <p className="error">{errors.guarantorOneJobTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorOneEmail">email</label>
          <input
            type="email"
            id="guarantorOneEmail"
            className="form-control"
            name="guarantorOneEmail"
            value={values.guarantorOneEmail}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorOneEmail && (
            <p className="error">{errors.guarantorOneEmail}</p>
          )}
        </div>

        <hr className="hr-opacity mt-5" />
        <h5>Guatantor 2</h5>

        <div className="form-group mt-3">
          <label htmlFor="guarantorTwoLastName">Lastname</label>
          <input
            type="text"
            id="guarantorTwoLastName"
            className="form-control"
            name="guarantorTwoLastName"
            value={values.guarantorTwoLastName}
            placeholder="eg. John Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoLastName && (
            <p className="error">{errors.guarantorTwoLastName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorTwoBvn">bvn</label>
          <input
            type="text"
            id="guarantorTwoBvn"
            className="form-control"
            name="guarantorTwoBvn"
            value={values.guarantorTwoBvn}
            placeholder="********"
            maxLength={11}
            minLength={11}
            onChange={(e) => {
              checkBvn(e, values.guarantorTwoLastName, false);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoBvn && (
            <p className="error">{errors.guarantorTwoBvn}</p>
          )}
          {guarantorTwoNameBvn && <label>{guarantorTwoNameBvn}</label>}
        </div>

        <div className="form-group">
          <label htmlFor="guarantorTwoNin">nin</label>
          <input
            type="text"
            id="guarantorTwoNin"
            className="form-control"
            name="guarantorTwoNin"
            value={values.guarantorTwoNin}
            placeholder="********"
            maxLength={11}
            minLength={11}
            onChange={(e) => {
              checkNin(e, values.guarantorTwoLastName, false);
              handleChange(e);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoNin && (
            <p className="error">{errors.guarantorTwoNin}</p>
          )}
          {guarantorTwoNameNin && <label>{guarantorTwoNameNin}</label>}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoRelationship">relationship</label>
          <input
            type="text"
            id="guarantorTwoRelationship"
            className="form-control"
            name="guarantorTwoRelationship"
            value={values.guarantorTwoRelationship}
            placeholder="eg. Sister"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoRelationship && (
            <p className="error">{errors.guarantorTwoRelationship}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoPhone">phone</label>
          <input
            type="tel"
            id="guarantorTwoPhone"
            className="form-control"
            name="guarantorTwoPhone"
            value={values.guarantorTwoPhone}
            placeholder="eg. +234"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoPhone && (
            <p className="error">{errors.guarantorTwoPhone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoAddress">home address</label>
          <input
            type="text"
            id="guarantorTwoAddress"
            className="form-control"
            name="guarantorTwoAddress"
            value={values.guarantorTwoAddress}
            placeholder="eg. 123 example street..."
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoAddress && (
            <p className="error">{errors.guarantorTwoAddress}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoJobTitle">Job title</label>
          <input
            type="text"
            id="guarantorTwoJobTitle"
            className="form-control"
            name="guarantorTwoJobTitle"
            value={values.guarantorTwoJobTitle}
            placeholder="eg. Banker"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoJobTitle && (
            <p className="error">{errors.guarantorTwoJobTitle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="guarantorTwoEmail">email</label>
          <input
            type="email"
            id="guarantorTwoEmail"
            className="form-control"
            name="guarantorTwoEmail"
            value={values.guarantorTwoEmail}
            placeholder="eg. johndoe@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guarantorTwoEmail && (
            <p className="error">{errors.guarantorTwoEmail}</p>
          )}
        </div>
      </div>

      <div
        className="2nd-step apply-step"
        style={{
          display: isStepTwo ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <h2 className="semibold">
          Now, let's take your car and payment details
        </h2>
        <p className="step-description">
          Please select your desired car and pick a payment plan most suitable
          for you.
        </p>

        {/* OCCUPATION */}
        <div className="form-group mt-5">
          <label htmlFor="vehicle">choose your vehicle</label>

          <select
            className="form-control"
            id="vehicle"
            name="vehicle"
            value={values.vehicle}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select vehicle
              </option>
              {vehicles?.map((vehicle) => (
                <option key={vehicle?._id} value={`${vehicle?._id}`}>
                  {vehicle?.name} - ₦{new Intl.NumberFormat('en-US').format(vehicle?.price)}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.vehicle && <p className="error">{errors.vehicle}</p>}
        </div>

        {!values.vehicle == "" && (
          <div className="form-group">
            <a
              href={`/explore-cars/${values.vehicle}`}
              rel="noreferrer"
              target="_blank"
            >
              SEE VEHICLE DETAILS
            </a>
          </div>
        )}

        {/* COMFORTABLE CONTRACT DURATION */}
        <div className="form-group mt-5">
          <label htmlFor="comfortableContractDuration">Contract duration</label>
          <select
            className="form-control"
            id="comfortableContractDuration"
            name="comfortableContractDuration"
            value={values.comfortableContractDuration}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value="24 month">24 Month</option>
              <option value="27 month">27 Month</option>
            </optgroup>
          </select>
          {errors.comfortableContractDuration && (
            <p className="error">{errors.comfortableContractDuration}</p>
          )}
        </div>

        {/* DOWN PAYMENT BUDGET */}
        <div className="form-group mt-5">
          <label htmlFor="downpaymentBudget">Down payment budget</label>
          <select
            className="form-control"
            id="downpaymentBudget"
            name="downpaymentBudget"
            value={values.downpaymentBudget}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value="400000">₦400,000</option>
              <option value="500000">₦500,000</option>
              <option value="700000">₦700,000</option>
              <option value="1000000">₦1,000,000</option>
              <option value="other">Other</option>
            </optgroup>
          </select>
          {errors.downpaymentBudget && (
            <p className="error">{errors.downpaymentBudget}</p>
          )}
        </div>

        {values.downpaymentBudget === "other" && (
          <div className="form-group mt-5">
            <label htmlFor="downpaymentBudget">
              Please provide amount below
            </label>
            <input
              type="text"
              name="otherPaymentAmount"
              id="otherPaymentAmount"
              className="form-control"
              value={values.otherPaymentAmount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherPaymentAmount && (
              <p className="error">{errors.otherPaymentAmount}</p>
            )}
          </div>
        )}
      </div>

      <div className="control-buttons py-5">
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div className="back-button-apply">
            <button
              className="btn semibold back-button py-2 px-4"
              disabled={isStepOne ? "disabled" : false}
              onClick={(e) => {
                e.preventDefault();
                setIsStepOne(true);
                setIsStepTwo(false);
                navigator("#step-1");
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 50);
              }}
            >
              <span className="arrow mx-2">
                <ArrowLeft />
              </span>
              BACK
            </button>
          </div>

          {!isStepTwo && (
            <div className="next-button-apply">
              <button
                className="btn btn-dark blue-bg py-2 px-4 next-button"
                disabled={isStepTwo ? "disabled" : false}
                onClick={(e) => {
                  e.preventDefault();
                  setIsStepTwo(true);
                  setIsStepOne(false);
                  navigator("#step-2");
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </button>
            </div>
          )}
          {isStepTwo && (
            <div className="next-button-apply">
              {isTransactionSuccessful && (
                <button
                  type="submit"
                  className="btn btn-dark blue-bg py-2 px-4 next-button"
                  disabled={isSubmitting}
                  onClick={() => onSubmit(values)}
                >
                  {isSubmitting && (
                    <span>
                      <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
                      <span className="sr-only">Applying...</span>
                    </span>
                  )}
                  {!isSubmitting && <span>Apply</span>}
                </button>
              )}
              {!isTransactionSuccessful && (
                <button
                  type="submit"
                  className="btn btn-dark blue-bg py-2 px-4 next-button"
                  disabled={isSubmitting}
                  onClick={() => paystackPay()}
                >
                  <span>Make Payment</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default CompleteRegistrationForm;
