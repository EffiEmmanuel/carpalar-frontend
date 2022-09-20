import React, { useContext, useState } from "react";
import "./index.css";

// Social media icons
import whatsappIcon from "../../../assets/icons/whatsapp.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";

import { CarpalarContext } from "../../../App.js";

function PageOptions() {
  // GET THE INVESTOR CONTEXT
  const {
    setIsInvestor,
    isBecomeAPartner,
    setIsBecomeAPartner,
    isForCustomer,
    setIsForCustomer,
  } = useContext(CarpalarContext);

  // const [isForCustomer, setIsForCustomer] = useState("page-options-link-active");
  // const [isBecomeAPartner, setIsBecomeAPartner] = useState("");

  return (
    <div className="top-level-continer">
      <div className="page-options d-flex justify-content-md-around">
        <div
          className={`page-options-link-container ${isForCustomer}`}
          onClick={() => {
            setIsInvestor(false);
            setIsForCustomer("page-options-link-active");
            setIsBecomeAPartner("bordered");
          }}
        >
          <span className="nav-link page-option-link" id="for-customers">
            For Customers
          </span>
        </div>
        <div
          className={`page-options-link-container ${isBecomeAPartner}`}
          onClick={() => {
            setIsInvestor(true);
            setIsForCustomer("bordered");
            setIsBecomeAPartner("page-options-link-active");
          }}
        >
          <span className="nav-link page-option-link" id="become-a-partner">
            Become a partner
          </span>
        </div>
      </div>

      <div className="social">
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
    </div>
  );
}

export default PageOptions;
