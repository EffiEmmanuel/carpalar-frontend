import React, { useState, useEffect} from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import {
  BoxArrowLeft,
  Briefcase,
  Gear,
  Key,
  Lightbulb,
  List,
  Lock,
  MenuButton,
  PatchCheck,
  Person,
  Wallet2,
  XLg,
} from "react-bootstrap-icons";
import jwtDecode from "jwt-decode";

function AdminDashboard() {
  const [isStats, setIsStats] = useState(true);
  const [isProfessionalDetails, setIsProfessionalDetails] = useState(false);
  const [isCompliance, setIsCompliance] = useState(false);
  const [isMyVehicle, setIsMyVehicle] = useState(false);
  const [isMyPayments, setIsMyPayments] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  // s FUNCTIONALITY
  const [dashboardNavDisplay, setDashboardNavDisplay] = useState("none");

  // DRIVER STATES
  const [decodedDriver, setDecodedDriver] = useState();
  const [driverInitials, setDriverInitials] = useState("");

  useEffect(() => {
    const onPageLoad = () => {
      let token = localStorage.getItem("driverToken");
      const d = jwtDecode(token);
      if (d?.isAccountApproved && d?.isApplicationComplete) {
        setDecodedDriver(jwtDecode(token));
        if (decodedDriver) {
          const initials = `${decodedDriver?.firstname[0]}${decodedDriver?.othername[0]}`;
          setDriverInitials(initials);
        }
      }
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

  return (
    <>
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
                          setIsStats(true);
                          setIsProfessionalDetails(false);
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isStats ? "#3f69e2" : "#181818",
                        }}
                        className="dashboard-nav-category-item d-flex align-items-center"
                      >
                        <Lightbulb size={20} className="me-2" />{" "}
                        <span className="mt-1">Stats</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#professional-details"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(true);
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
                        <span className="mt-1">Pending Applications</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#compliance"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                  <p className="category-name">Drivers</p>
                  <ul>
                    <li>
                      <a
                        href="#my-vehicle"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Key size={20} className="me-2" /> Pending Applications
                      </a>
                    </li>
                    <li>
                      <a
                        href="#my-payments"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Wallet2 size={20} className="me-2" /> View Drivers
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Vehicles</p>
                  <ul>
                    <li>
                      <a
                        href="#my-vehicle"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Key size={20} className="me-2" /> Add Vehicle
                      </a>
                    </li>
                    <li>
                      <a
                        href="#my-payments"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Wallet2 size={20} className="me-2" /> View Vehicles
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Vehicle Brands</p>
                  <ul>
                    <li>
                      <a
                        href="#my-vehicle"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Key size={20} className="me-2" /> Add Vehicle Brand
                      </a>
                    </li>
                    <li>
                      <a
                        href="#my-payments"
                        onClick={() => {
                          setIsStats(false);
                          setIsProfessionalDetails(false);
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
                        <Wallet2 size={20} className="me-2" /> View Vehicles
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
                          setIsStats(false);
                          setIsProfessionalDetails(false);
                          setIsCompliance(false);
                          setIsMyVehicle(false);
                          setIsMyPayments(false);
                          setIsSettings(true);
                          setDashboardNavDisplay("none");
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
{/* 
            {isStats && <PersonalDetails driver={decodedDriver} />}
            {isProfessionalDetails && (
              <ProfessionalDetails driver={decodedDriver} />
            )}
            {isCompliance && <Compliance driver={decodedDriver} />}
            {isMyVehicle && <MyVehicle />}
            {isMyPayments && <MyPayments />} */}
            {/* { isSettings && <PersonalDetails />} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
