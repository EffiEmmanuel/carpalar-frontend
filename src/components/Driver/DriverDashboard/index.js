import React from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import {
  BoxArrowLeft,
  Briefcase,
  Check,
  Key,
  List,
  Lock,
  PatchCheck,
  Person,
  ShieldCheck,
  Wallet2,
  XLg,
} from "react-bootstrap-icons";
import PersonalDetails from "./Account/PersonalDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalDetails from "./Account/ProfessionalDetails";
import MyVehicle from "./Business/MyVehicle";
import Compliance from "./Account/Compliance";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import MyPayments from "./Business/MyPayments";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import Swal from "sweetalert2";
import Guarantors from "./Account/Guarantors";

function DriverDashboard() {
  const [isPersonalDetails, setIsPersonalDetails] = useState(true);
  const [isProfessionalDetails, setIsProfessionalDetails] = useState(false);
  const [isGuarantors, setIsGuarantors] = useState(false);
  const [isCompliance, setIsCompliance] = useState(false);
  const [isMyVehicle, setIsMyVehicle] = useState(false);
  const [isMyPayments, setIsMyPayments] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);

  // s FUNCTIONALITY
  const [dashboardNavDisplay, setDashboardNavDisplay] = useState("none");

  // DRIVER STATES
  const [decodedDriver, setDecodedDriver] = useState();
  const [decodedDriverCheck, setDecodedDriverCheck] = useState();
  const [driverInitials, setDriverInitials] = useState("");

  useEffect(() => {
    const onPageLoad = () => {
      let token = localStorage.getItem("driverToken");
      setDecodedDriver(jwtDecode(token));
      const initials = `${decodedDriver?.firstname[0]}${decodedDriver?.othername[0]}`;
      setDriverInitials(initials);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const navigator = useNavigate();

  const paystackPay = async () => {
    const paystack = new PaystackPop();
    const amount = 25000 * 100;
    console.log("Amount:", amount);
    console.log("Amount type:", typeof amount);
    console.log("PAYSTACK:", paystack);
    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      amount: amount,
      email: decodedDriver?.email,
      firstname: decodedDriver?.firstname,
      lastname: decodedDriver?.surname,
      onSuccess: async (transaction) => {
        console.log("REF ID:", transaction.reference);
        setIsVerifying(true);
        // VERIFY TRANSACTION HERE
        await axios
          .get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}/transactions/verify/${transaction.reference}`
          )
          .then((res) => {
            // SAVE VERIFIED TRANSACTION TO THE DATABASE
            console.log("RESPONSE FROM VERIFY:", res);
            return axios.post(
              `${process.env.REACT_APP_BASE_URL_ADMIN}/transactions`,
              {
                transactionId: res.data.transactionDetails?.id,
                amount: res.data.transactionDetails?.amount,
                channel: res.data.transactionDetails?.channel,
                currency: res.data.transactionDetails?.currency,
                reference: res.data.transactionDetails?.reference,
                driver: decodedDriver?._id,
                status: res.data.transactionDetails?.status,
              }
            );
          })
          .then((res) => {
            console.log("hi hi hi hi hi 1111");
            Swal.fire({
              title: "Success",
              text: "Payment verified successfully! Redirecting to log in.",
              icon: "success",
              timer: 3000,
            });
            setIsVerifying(false);
            setIsTransactionSuccessful(true);
            return axios.patch(
              `${process.env.REACT_APP_BASE_URL_DRIVER}/update?driverId=${decodedDriver._id}`,
              { isRegistrationFeePaid: true },
              {
                headers: {
                  token: `${localStorage.getItem("driverToken")}`,
                },
              }
            );
          })
          .then((res) => {
            console.log("HELLO FROM THE OTHER SIIIIIDEEEEEEEE");
            localStorage.removeItem("driverToken");
            navigator("/driver/login");
          })
          .catch((err) => {
            console.log("ERROR FROM VERIFY:", err);
            Swal.fire({
              title: "Error",
              text: err.response.message,
              icon: "error",
              timer: 3000,
            });
            setIsVerifying(false);
            setIsTransactionSuccessful(false);
          });
      },
    });
  };

  return (
    <>
      {!decodedDriver?.isAccountApproved && (
        <div className="glass-box d-flex flex-column justify-content-center align-items-center">
          <Lock size={30} />
          <h4 className="mt-2">Your account has not been approved.</h4>
        </div>
      )}

      {decodedDriver?.isRegistrationFeePaid && <span>hi hi</span>}
      {decodedDriver?.isAccountApproved &&
        !decodedDriver?.isRegistrationFeePaid && (
          <div className="glass-box d-flex flex-column justify-content-center align-items-center">
            <Check size={60} color="green" />
            <h4 className="mt-3 text-center">
              Your account has been approved. Please proceed to pay your
              registration fee.
            </h4>
            <button
              // href="/driver/complete-registration"
              // role="button"
              className="btn btn-dark blue-bg border-none mt-3 px-4 py-2"
              onClick={() => {
                paystackPay();
              }}
            >
              {!isVerifying && !isTransactionSuccessful && <span>Pay</span>}
              {isVerifying && <span>Verifying transaction...</span>}
              {isTransactionSuccessful && <span>Redirecting...</span>}
            </button>
          </div>
        )}

      <div className="dashboard-container">
        <div
          className="dashboard-nav"
          style={{
            display: dashboardNavDisplay,
          }}
        >
          <div className="dashboard-nav-content d-flex flex-column">
            <div className="logo-container dashboard-logo-container px-3">
              <img src={carpalarLogo} alt="Carpalar" className="logo" />
              <div className="close-menu">
                <XLg
                  size={25}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setDashboardNavDisplay("none");
                  }}
                />
              </div>
            </div>
            <nav>
              <ul>
                <li className="dashboard-nav-category">
                  <p className="category-name">OVERVIEW</p>
                  <ul>
                    <li>
                      <a
                        href="#personal-details"
                        onClick={() => {
                          setIsPersonalDetails(true);
                          setIsProfessionalDetails(false);
                          setIsGuarantors(false);
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isPersonalDetails ? "#3f69e2" : "#181818",
                        }}
                        className="dashboard-nav-category-item d-flex align-items-center"
                      >
                        <Person size={20} className="me-2" />{" "}
                        <span className="mt-1">Personal Details</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#professional-details"
                        onClick={() => {
                          setIsPersonalDetails(false);
                          setIsProfessionalDetails(true);
                          setIsGuarantors(false);
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isProfessionalDetails ? "#3f69e2" : "#181818",
                        }}
                        className="dashboard-nav-category-item d-flex align-items-center"
                      >
                        <Briefcase size={20} className="me-2" />{" "}
                        <span className="mt-1">Professional Details</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#guarantors"
                        onClick={() => {
                          setIsPersonalDetails(false);
                          setIsProfessionalDetails(false);
                          setIsGuarantors(true);
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isGuarantors ? "#3f69e2" : "#181818",
                        }}
                        className="dashboard-nav-category-item d-flex align-items-center"
                      >
                        <ShieldCheck size={20} className="me-2" />{" "}
                        <span className="mt-1">Guarantors</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#compliance"
                        onClick={() => {
                          setIsPersonalDetails(false);
                          setIsProfessionalDetails(false);
                          setIsGuarantors(false)
                          setIsCompliance(true);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isCompliance ? "#3f69e2" : "#181818",
                        }}
                        className="dashboard-nav-category-item d-flex align-items-center"
                      >
                        <PatchCheck size={20} className="me-2" />{" "}
                        <span className="mt-1">Compliance</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">business</p>
                  <ul>
                    <li>
                      <a
                        href="#my-vehicle"
                        onClick={() => {
                          setIsPersonalDetails(false);
                          setIsProfessionalDetails(false);
                          setIsGuarantors(false)
                          setIsCompliance(false);
                          setIsMyVehicle(true);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isMyVehicle ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Key size={20} className="me-2" /> My Vehicle
                      </a>
                    </li>
                    <li>
                      <a
                        href="#my-payments"
                        onClick={() => {
                          setIsPersonalDetails(false);
                          setIsProfessionalDetails(false);
                          setIsGuarantors(false)
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(true);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isMyPayments ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Wallet2 size={20} className="me-2" /> My Payments
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Account</p>
                  <ul>
                    <li>
                      <button
                        className="btn btn-dark blue-bg border-none text-white"
                        onClick={() => {
                          localStorage.removeItem("driverToken");
                          navigator("/driver/login");
                        }}
                        style={{
                          color: isSettings ? "#3f69e2" : "#181818",
                        }}
                      >
                        <BoxArrowLeft size={20} className="me-2" /> Log out
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* PAGES */}
        <div className="dashboard-main-content">
          <div className="dashboard-main-content-top d-flex justify-content-between">
            {/* <div className="notifications">
            <Bell size={30} className="me-3" />
            <div className="notification-indicator"></div>
          </div> */}
            <div className="menu">
              <List
                size={33}
                style={{ cursor: "pointer" }}
                onClick={() => setDashboardNavDisplay("block")}
              />
            </div>
            <div className="user-profile">
              <h4 className="user-initials">
                {decodedDriver?.firstname[0]}
                {decodedDriver?.othername[0]}
              </h4>
            </div>
            {/* <div className="user-account-dropdown"></div> */}
          </div>
          <hr className="hr-opacity" />

          <div className="dashboard-main-content-body">
            <div className="user-identity">
              <h2>Welcome, {decodedDriver?.firstname}</h2>
              <p className="text-opacity-50 semibold">
                {decodedDriver?.surname} {decodedDriver?.firstname}{" "}
                {decodedDriver?.othername}
              </p>
            </div>
            <hr className="hr-opacity" />

            {isPersonalDetails && <PersonalDetails driver={decodedDriver} />}
            {isProfessionalDetails && (
              <ProfessionalDetails driver={decodedDriver} />
            )}
            {isGuarantors && <Guarantors driver={decodedDriver} />}
            {isCompliance && <Compliance driver={decodedDriver} />}
            {isMyVehicle && <MyVehicle />}
            {isMyPayments && <MyPayments />}
            {/* { isSettings && <PersonalDetails />} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverDashboard;
