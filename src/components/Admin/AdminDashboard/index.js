import React, { useState, useEffect } from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import ViewDrivers from "./Drivers/ViewDrivers/index";
import PendingApplications from "./Drivers/PendingApplications//index";
import AddVehicle from "./Vehicles/AddVehicle/index";
import ViewVehicles from "./Vehicles/ViewVehicles/index";
import AddVehicleBrand from "./VehicleBrands/AddVehicleBrand/index";
import ViewVehicleBrands from "./VehicleBrands/ViewVehicleBrands/index";
import Transactions from "./Payments/Transactions/index";
import AdminAccountSettings from "./Account/Settings";
import {
  BoxArrowLeft,
  Eye,
  // Briefcase,
  Gear,
  Key,
  Lightbulb,
  List,
  Motherboard,
  Person,
  Plus,
  Wallet2,
  Watch,
  XLg,
} from "react-bootstrap-icons";
import jwtDecode from "jwt-decode";
import Stats from "./Overview/Stats";

function AdminDashboard() {
  const [isStats, setIsStats] = useState(true);
  const [isPendingApplications, setIsPendingApplications] = useState(false);
  const [isViewDrivers, setIsViewDrivers] = useState(false);
  const [isAddVehicle, setIsAddVehicle] = useState(false);
  const [isViewVehicles, setIsViewVehicles] = useState(false);
  const [isAddVehicleBrand, setIsAddVehicleBrand] = useState(false);
  const [isViewVehicleBrands, setIsViewVehicleBrands] = useState(false);
  const [isTransactions, setIsTransactions] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  // s FUNCTIONALITY
  const [dashboardNavDisplay, setDashboardNavDisplay] = useState("none");

  // ADMIN STATES
  const [decodedAdmin, setDecodedAdmin] = useState();
  const [adminInitials, setAdminInitials] = useState("");

  useEffect(() => {
    const onPageLoad = () => {
      let token = localStorage.getItem("adminToken");
      const admin = jwtDecode(token);
      setDecodedAdmin(admin);
      if (decodedAdmin) {
        const initials = `${decodedAdmin?.firstname[0]}${decodedAdmin?.lastname[0]}`;
        setAdminInitials(initials);
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
                        href="#statistics"
                        onClick={() => {
                          setIsStats(true);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
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
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Drivers</p>
                  <ul>
                    <li>
                      <a
                        href="#pending-applications"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(true);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isPendingApplications ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Watch size={20} className="me-2" /> Pending Applications
                      </a>
                    </li>
                    <li>
                      <a
                        href="#view-drivers"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(true);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isViewDrivers ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Person size={20} className="me-2" /> View Drivers
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Vehicles</p>
                  <ul>
                    <li>
                      <a
                        href="#add-vehicle"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(true);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isAddVehicle ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Motherboard size={20} className="me-2" /> Add Vehicle
                      </a>
                    </li>
                    <li>
                      <a
                        href="#view-vehicles"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(true);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isViewVehicles ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Eye size={20} className="me-2" /> View Vehicles
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Vehicle Brands</p>
                  <ul>
                    <li>
                      <a
                        href="#add-vehicle-brand"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(true);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isAddVehicleBrand ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Key size={20} className="me-2" /> Add Vehicle Brand
                      </a>
                    </li>
                    <li>
                      <a
                        href="#view-vehicle-brands"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(true);
                          setIsTransactions(false);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isViewVehicleBrands ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Eye size={20} className="me-2" /> View Vehicle
                        Brands
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Payments</p>
                  <ul>
                    <li>
                      <a
                        href="#transactions"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(true);
                          setIsSettings(false);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isTransactions ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Gear size={20} className="me-2" /> Transactions
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dashboard-nav-category">
                  <p className="category-name">Account</p>
                  <ul>
                    <li>
                      <a
                        href="#my-payments"
                        onClick={() => {
                          setIsStats(false);
                          setIsPendingApplications(false);
                          setIsViewDrivers(false);
                          setIsAddVehicle(false);
                          setIsViewVehicles(false);
                          setIsAddVehicleBrand(false);
                          setIsViewVehicleBrands(false);
                          setIsTransactions(false);
                          setIsSettings(true);
                          setDashboardNavDisplay("none");
                        }}
                        style={{
                          color: isSettings ? "#3f69e2" : "#181818",
                        }}
                      >
                        <Gear size={20} className="me-2" /> Settings
                      </a>
                    </li>
                    <li>
                      <button
                        className="btn btn-dark blue-bg border-none text-white"
                        // onClick={() => {}}
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
                {decodedAdmin?.firstname[0]}
                {decodedAdmin?.lastname[0]}
              </h4>
            </div>
            {/* <div className="user-account-dropdown"></div> */}
          </div>
          <hr className="hr-opacity" />

          <div className="dashboard-main-content-body">
            <div className="user-identity">
              <h2>Welcome, {decodedAdmin?.firstname}</h2>
              <span className="text-opacity-50 semibold">
                {decodedAdmin?.lastname} {decodedAdmin?.firstname}{" "}
              </span>
            </div>
            <hr className="hr-opacity" />

            {isStats && <Stats />}
            {isViewDrivers && <ViewDrivers />}
            {isPendingApplications && <PendingApplications />}
            {isAddVehicle && <AddVehicle />}
            {isViewVehicles && <ViewVehicles />}
            {isAddVehicleBrand && <AddVehicleBrand />}
            {isViewVehicleBrands && <ViewVehicleBrands />}
            {isTransactions && <Transactions />}
            {isSettings && <AdminAccountSettings />}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
