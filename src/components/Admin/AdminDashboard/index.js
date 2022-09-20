import React from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import { Gear, Search, Truck, ViewList } from "react-bootstrap-icons";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="logo-container">
            <img src={carpalarLogo} alt="Carpalar" className="logo" />
          </div>
          <nav>
            <ul>
              <li>
                <p className="category-name">Home</p>
                <ul>
                  <li>
                    <a href="/">
                      <ViewList size={20} /> Overview
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <p className="category-name">business</p>
                <ul>
                  <li>
                    <a href="/">
                      <Search size={20} /> Explore Vehicles
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <Search size={20} /> My Vehicle
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <p className="category-name">finance</p>
                <ul>
                  <li>
                    <a href="/">
                      <Search size={20} /> Payment plans
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <Search size={20} /> My Payments
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <p className="category-name">Account</p>
                <ul>
                  <li>
                    <a href="/">
                      <Gear size={20} /> Settings
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/">Log out</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* PAGES */}
    </div>
  );
}

export default AdminDashboard;
