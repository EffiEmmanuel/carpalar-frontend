import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./components/Driver/Homepage";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/Generic/AboutUs";
import ExploreCars from "./components/Driver/ExploreCars";
import DriveToOwn from "./components/Driver/DriveToOwn";
import ApplyToDrive from "./components/Driver/ApplyToDrive";
import TermsAndConditions from "./components/Generic/TermsAndConditions";
import Faq from "./components/Generic/Faq";
import PhoneVerification from "./components/Driver/PhoneVerification";
import EmailVerificationPage from "./components/Driver/EmailVerificationPage";
import Login from "./components/Driver/Login";
import Login2FA from "./components/Driver/Login/Login2FA";
import DriverDashboard from "./components/Driver/DriverDashboard";
import CompleteRegistration from "./components/Driver/CompleteRegistration";
import CarDetail from "./components/Driver/ExploreCars/CarDetail";
import AdminDashboard from "./components/Admin/AdminDashboard";

export const CarpalarContext = createContext(null);

function App() {
  const [isInvestor, setIsInvestor] = useState(false);
  const [isForCustomer, setIsForCustomer] = useState(
    "page-options-link-active"
  );
  const [isBecomeAPartner, setIsBecomeAPartner] = useState("");

  return (
    <React.Fragment>
      <CarpalarContext.Provider
        value={{
          isInvestor,
          setIsInvestor,
          isForCustomer,
          setIsForCustomer,
          isBecomeAPartner,
          setIsBecomeAPartner,
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/explore-cars" element={<ExploreCars />} />
          <Route path="/explore-cars/:carId" element={<CarDetail />} />
          <Route path="/drive-to-own" element={<DriveToOwn />} />
          <Route path="/apply-to-drive" element={<ApplyToDrive />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/driver/:driverId/verify-phone" element={<PhoneVerification />} />
          <Route path="/driver/verify-email" element={<EmailVerificationPage />} />
          <Route path="/driver/login" element={<Login />} />
          <Route path="/driver/login/2FA" element={<Login2FA />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/complete-registration" element={<CompleteRegistration />} />

          {/* ADMIN ROUTES */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/login' element={<AdminDashboard />} />
        </Routes>
      </CarpalarContext.Provider>
    </React.Fragment>
  );
}

export default App;
