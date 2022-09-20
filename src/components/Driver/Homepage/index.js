import React, { useContext } from "react";
import "./index.css";
import BecomeAPartner from "../BecomeAPartner";
import ForCustomers from "../ForCustomers";

import { CarpalarContext } from "../../../App.js";
import Navbar from "../../Generic/Navbar";

function Homepage() {
  const { isInvestor } = useContext(CarpalarContext);

  return (
    <div className="">
      <Navbar />
      <div className="customer-option">{ !isInvestor && <ForCustomers /> }</div>
      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default Homepage;
