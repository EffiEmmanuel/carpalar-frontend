import React from "react";
import './index.css'

function FooterNav() {
  return (
    <nav className="carpalar-desktop-navbar footer-nav" id="footer-nav">
      <ul className="">
        <li className="carpalar-nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="carpalar-nav-item">
          <a href="/" className="nav-link">
            Drive to own
          </a>
        </li>
        <li className="carpalar-nav-item">
          <a href="/" className="nav-link">
            Explore cars
          </a>
        </li>
        <li className="carpalar-nav-item">
          <a href="/" className="nav-link">
            About Us
          </a>
        </li>
        {/* <li className="carpalar-nav-item">
          <a href="/" className="nav-link">
            Contact Us
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default FooterNav;
