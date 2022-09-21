import React, { useContext, useState } from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import { List, XLg } from "react-bootstrap-icons";
import { CarpalarContext } from "../../../App.js";
import PageOptions from "../PageOptions";
import { Link } from "react-router-dom";

function Navbar() {
  const { isInvestor, setIsInvestor, setIsBecomeAPartner, setIsForCustomer } =
    useContext(CarpalarContext);

  const [mobileMenuVisibility, setMobileMenuVisibility] = useState("none");
  const [mobileMenuOpacity, setMobileMenuOpacity] = useState("0");

  return (
    <>
      <PageOptions />
      <div className="carpalar-navbar container-fluid">
        <div className="logo-container">
          <img src={carpalarLogo} alt="Carpalar" className="nav-logo" />
        </div>
        <nav
          className={`carpalar-desktop-navbar ${
            isInvestor ? "investor-width" : ""
          }`}
          id="carpalar-desktop-navbar"
        >
          <ul className="">
            <li className="carpalar-nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => {
                  if (isInvestor) {
                    setIsInvestor(false);
                    setIsForCustomer("page-options-link-active");
                    setIsBecomeAPartner("bordered");
                  }
                }}
              >
                Home
              </Link>
            </li>
            {!isInvestor && (
              <>
                <li className="carpalar-nav-item">
                  <Link
                    to="/drive-to-own"
                    className="nav-link"
                    onClick={() => {
                      if (isInvestor) {
                        setIsInvestor(false);
                        setIsForCustomer("page-options-link-active");
                        setIsBecomeAPartner("bordered");
                      }
                    }}
                  >
                    Drive to own
                  </Link>
                </li>
                <li className="carpalar-nav-item">
                  <Link
                    to="/explore-cars"
                    className="nav-link"
                    onClick={() => {
                      if (isInvestor) {
                        setIsInvestor(false);
                        setIsForCustomer("page-options-link-active");
                        setIsBecomeAPartner("bordered");
                      }
                    }}
                  >
                    Explore cars
                  </Link>
                </li>
              </>
            )}
            <li className="carpalar-nav-item">
              <Link
                to="/about-us"
                className="nav-link"
                onClick={() => {
                  if (isInvestor) {
                    setIsInvestor(false);
                    setIsForCustomer("page-options-link-active");
                    setIsBecomeAPartner("bordered");
                  }
                }}
              >
                About Us
              </Link>
            </li>
            {!isInvestor && (
              <li className="carpalar-nav-item">
                <Link
                  to="/driver/login"
                  className="nav-link"
                  role="button"
                  onClick={() => {
                    if (isInvestor) {
                      setIsInvestor(false);
                      setIsForCustomer("page-options-link-active");
                      setIsBecomeAPartner("bordered");
                    }
                  }}
                >
                  Login
                </Link>
              </li>
            )}
            {!isInvestor && (
              <li className="carpalar-nav-item">
                <Link
                  to="/apply-to-drive"
                  className="btn btn-dark blue-bg apply-to-drive"
                  role="button"
                  onClick={() => {
                    if (isInvestor) {
                      setIsInvestor(false);
                      setIsForCustomer("page-options-link-active");
                      setIsBecomeAPartner("bordered");
                    }
                  }}
                >
                  APPLY TO DRIVE
                </Link>
              </li>
            )}
            {isInvestor && (
              <li className="carpalar-nav-item">
                <Link
                  to="/get-in-touch"
                  className="btn btn-dark blue-bg apply-to-drive"
                  role="button"
                  onClick={() => {
                    if (isInvestor) {
                      setIsInvestor(false);
                      setIsForCustomer("page-options-link-active");
                      setIsBecomeAPartner("bordered");
                    }
                  }}
                >
                  GET IN TOUCH
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* MOBILE NAV ICON */}
        <div
          className="menu-icon"
          onClick={() => {
            setMobileMenuVisibility("flex");
            setMobileMenuOpacity('1')
          }}
        >
          <List size={40} />
        </div>

        {/* MOBILE NAV */}
        <nav
          className="carpalar-mobile-navbar"
          id="carpalar-mobile-navbar"
          style={{
            display: mobileMenuVisibility,
            opacity: mobileMenuOpacity,
            transition: 'opacity .5s ease-in-out'
          }}
        >
          <div
            className="menu-icon-close"
            onClick={() => setMobileMenuVisibility("none")}
          >
            {/* <i class="fa fa-times fa-2x" aria-hidden="true"></i> */}
            <XLg size={30} />
          </div>

          <ul className="">
            <li className="carpalar-mobile-nav-item">
              <Link to="/" className="mobile-nav-link">
                Home
              </Link>
            </li>
            {!isInvestor && (
              <>
                <li className="carpalar-mobile-nav-item">
                  <Link to="/drive-to-own" className="mobile-nav-link">
                    Drive to own
                  </Link>
                </li>
                <li className="carpalar-mobile-nav-item">
                  <Link to="/explore-cars" className="mobile-nav-link">
                    Explore cars
                  </Link>
                </li>
              </>
            )}
            <li className="carpalar-mobile-nav-item">
              <Link to="/about-us" className="mobile-nav-link">
                About Us
              </Link>
            </li>
            {!isInvestor && (
              <li className="carpalar-mobile-nav-item">
                <Link
                  to="/apply-to-drive"
                  className="btn btn-dark blue-bg apply-to-drive"
                  role="button"
                >
                  APPLY TO DRIVE
                </Link>
              </li>
            )}
            {isInvestor && (
              <li className="carpalar-mobile-nav-item">
                <Link
                  to="/get-in-touch"
                  className="btn btn-dark blue-bg apply-to-drive"
                  role="button"
                >
                  GET IN TOUCH
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
