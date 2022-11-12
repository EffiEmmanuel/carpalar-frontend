import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

function CarPaymentForm() {
  const [vehicles, setVehicles] = useState();
  const [amountLeftToBePaid, setAmountLeftToBePaid] = useState(0);
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  async function getVehicles() {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/vehicles`)
      .then((res) => {
        console.log("RES VEHICLES:", res);
        setVehicles(res.data.vehicles);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  }

  useEffect(() => {
    getVehicles();
  }, []);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      vehicle: "",
      comfortableContractDuration: "",
      paymentInterval: "",
      downpaymentBudget: "",
      otherPaymentAmount: "",
    },
  });

  function calculateMonthlyPayment() {
    const contractDuration = parseInt(values.comfortableContractDuration);
    const vehicleAmount = vehiclePrice.split(",");
    let stringAmount = ''
    vehicleAmount.forEach(amount => {
      stringAmount += amount
    })
    console.log("STRING AMOUNT:", stringAmount);
    const finalAmount = parseInt(stringAmount);
    console.log("FINAL AMOUNT:", finalAmount);
    const mp = finalAmount / contractDuration;
    setMonthlyPayment(new Intl.NumberFormat('en-US').format(mp));
  }

  // function calculateMonthlyPayment() {
  //   let contractDuration = parseInt(values.comfortableContractDuration);
  //   console.log("CD:", contractDuration);
  //   let vehicleAmount = vehiclePrice.split(",");
  //   console.log("VA:", vehicleAmount);
  //   let stringAmount = ''
  //   vehicleAmount.forEach(amount => {
  //     stringAmount += amount
  //   })
  //   console.log("STRING AMOUNT:", stringAmount);
  //   let finalAmount = parseInt(stringAmount);
  //   console.log("FINAL AMOUNT:", finalAmount);
  //   let mp = finalAmount / values.comfortableContractDuration;
  //   console.log("FINAL MP:", mp);
  //   setMonthlyPayment(new Intl.NumberFormat('en-US').format(mp));
  // }

  function calculatePaymentDue() {
    const vehicleAmount = vehiclePrice.split(",");
    console.log("VEHICLE AMOUNT:", vehicleAmount);
    let stringAmount = ''
    vehicleAmount.forEach(amount => {
      stringAmount += amount
    })
    console.log("STRING AMOUNT:", stringAmount);
    const finalAmount = parseInt(stringAmount);
    console.log("PD:", pd);
    const pd = finalAmount - values.downpaymentBudget
    console.log("PD:", pd);
    setAmountLeftToBePaid(pd);
  }

  const getVehiclePrice = async (vid) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/vehicles/${vid}`)
      .then((res) => {
        console.log("RES VEHICLE BY ID:", res);
        setVehiclePrice(new Intl.NumberFormat('en-US').format(res.data.vehicle.price));
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  };

  const onSubmit = async (values) => {
    console.log("VALUES:", values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container d-flex flex-column justify-content-center align-items-start"
    >
      <div
        className="1st-step apply-step"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        id="step-1"
      >
        {/* OCCUPATION */}
        <div className="form-group mt-5">
          <label htmlFor="vehicle">choose your vehicle</label>
          <select
            className="form-control"
            id="vehicle"
            name="vehicle"
            value={values.vehicle}
            onChange={(e) => {
              handleChange(e);
              getVehiclePrice(e.target.value);
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select vehicle
              </option>
              {vehicles?.map((vehicle) => (
                <option key={vehicle?._id} value={`${vehicle?._id}`}>
                  {vehicle?.name} - ₦
                  {new Intl.NumberFormat("en-US").format(vehicle?.price)}
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
          <label htmlFor="comfortableContractDuration">
            Comfortable contract duration
          </label>
          <select
            className="form-control"
            id="comfortableContractDuration"
            name="comfortableContractDuration"
            value={values.comfortableContractDuration}
            onChange={(e) => {
              handleChange(e);
              calculatePaymentDue();
              calculateMonthlyPayment();
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value="12">12 Month</option>
              <option value="24">24 Month</option>
            </optgroup>
          </select>
          {errors.comfortableContractDuration && (
            <p className="error">{errors.comfortableContractDuration}</p>
          )}
        </div>

        {/* PAYMENT INTERVAL */}
        {/* <div className="form-group mt-5">
    <label htmlFor="paymentInterval">Payment interval</label>
    <select
      className="form-control"
      id="paymentInterval"
      name="paymentInterval"
      value={values.paymentInterval}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
    >
      <optgroup>
        <option value="" disabled={isSubmitting}>
          Select
        </option>
        <option value="1">Every month</option>
        <option value="2">Every 2 months</option>
        <option value="4">Every 4 months</option>
        <option value="6">Every 6 months</option>
      </optgroup>
    </select>
    {errors.paymentInterval && (
      <p className="error">{errors.paymentInterval}</p>
    )}
  </div> */}

        {/* DOWN PAYMENT BUDGET */}
        <div className="form-group mt-5">
          <label htmlFor="downpaymentBudget">Down payment budget</label>
          <select
            className="form-control"
            id="downpaymentBudget"
            name="downpaymentBudget"
            value={values.downpaymentBudget}
            onChange={(e) => {
              handleChange(e);
              calculatePaymentDue();
              calculateMonthlyPayment();
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
          >
            <optgroup>
              <option value="" disabled={isSubmitting}>
                Select
              </option>
              <option value='400000'>₦400,000</option>
              <option value='500000'>₦500,000</option>
              <option value='700000'>₦700,000</option>
              <option value='1000000'>₦1,000,000</option>
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

        <div className="form-group mt-5">
          <label>Summary</label> <p></p>
          <label className="mt-2">VEHICLE PRICE: ₦{vehiclePrice}</label> <br />
          <label className="mt-2">
            TOTAL DUE AFTER DOWNPAYMENT: ₦{amountLeftToBePaid}
          </label>{" "}
          <br />
          <label className="mt-2">
            MONTHLY PAYMENT: ₦{monthlyPayment}
          </label>{" "}
          <br />
        </div>
      </div>
      <div className="control-buttons py-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="back-button-apply">
            <button
              type="submit"
              className="btn btn-dark blue-bg py-2 px-4 next-button"
              disabled={isSubmitting}
              onClick={() => onSubmit(values)}
            >
              {isSubmitting && (
                <span>
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
                  <span className="sr-only">Loading...</span>
                </span>
              )}
              {!isSubmitting && <span>Make downpayment</span>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CarPaymentForm;
