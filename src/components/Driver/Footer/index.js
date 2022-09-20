import React from "react";
import "./index.css";
import carpalarLogo from "../../../assets/images/carpalar-logo.png";
import FooterNav from "./FooterNav";
// Social media icons
import whatsappIcon from "../../../assets/icons/whatsapp.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top d-flex justify-content-between align-items-center">
        <img src={carpalarLogo} alt="Carpalar" className="nav-logo" />
        <FooterNav />
      </div>

      <div className="footer-middle">
        <div className="social mt-4 align-self-baseline">
          <img
            src={whatsappIcon}
            alt="Reach carpalar on Whatsapp"
            className="social-icon whatsapp"
          />
          <img
            src={instagramIcon}
            alt="Reach carpalar on Instagram"
            className="social-icon instagram"
          />
          <img
            src={facebookIcon}
            alt="Reach carpalar on Facebook"
            className="social-icon facebook"
          />
        </div>

        <div className="region">
          <h6>COUNTRY</h6>
          <p>Nigeria</p>
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <small>
          &copy; 2022 All Rights Reserved.
        </small>
        <ul>
          <li className="me-4">
            <small>
              <a href="/faqs">FAQs</a>
            </small>
          </li>
          <li className="me-4">
            <small>
              <a href="/privacy-policy">Privacy policy</a>
            </small>
          </li>
          <li className="">
            <small>
              <a href="/terms-and-conditions">Terms and conditions</a>
            </small>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
