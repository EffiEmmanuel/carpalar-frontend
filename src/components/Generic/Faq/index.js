import React, { useContext } from "react";
import "./index.css";
// import vehicles from "../../../assets/images/vehicles.png";
import verifyme from "../../../assets/images/verifyme.png";
import youverify from "../../../assets/icons/youverify.svg";
import Footer from "../../Driver/Footer";
import { CarpalarContext } from "../../../App.js";
import BecomeAPartner from "../../Driver/BecomeAPartner";
import Navbar from "../Navbar";

// FAQs
import { faqs } from "./frequentlyAskedQuestions.js";
import FaqItem from "./FaqItem";

function Faq() {
  const { isInvestor } = useContext(CarpalarContext);
  return (
    <div className="">
      <Navbar />
      <hr className="hr-nav" />
      {!isInvestor && (
        <div className="customer-option faq">
          <main className="main-content faq">
            <div className="hero faq">
              <div className="hero-content faq container-fluid">
                <h1>Frequenty Asked Questions (FAQs)</h1>
                <p></p>
                <h3> </h3>
              </div>
            </div>

            <div className="container">
              <div className="accordion" id="accordionExample">
                {faqs.map((faq, index) => (
                  <div key={index} className="mt-4">
                    <FaqItem
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                    />
                  </div>
                ))}
                <div className="accordion-item mt-4 mb-5">
                  <h2 className="accordion-header" id="headingLast">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseLast"
                      aria-expanded="true"
                      aria-controls="collapseLast"
                    >
                      What documents do I need to complete my application process?
                    </button>
                  </h2>
                  <div
                    id="collapseLast"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingLast"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ol>
                        <li className="mt-3" >Typically you must be 25 or older</li>
                        <li className="mt-3" >Must have a clean and no criminal record.</li>
                        <li className="mt-3" >Must have two Guarantors</li>
                        <li className="mt-3" >Must have a valid driver’s license</li>
                        <li className="mt-3" >Have Lasdri Card</li>
                        <li className="mt-3" >Documents to verify your address</li>
                        <li className="mt-3" >Must be able to make a security deposit.</li>
                        <li className="mt-3" >Must have active Bolt or Uber accounts.</li>
                        <li className="mt-3" >Background Check fee of N10, 000 (Compulsory)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="hr-nav" />

            <div className="d-flex flex-column justify-content-center align-items-center m-5 p-5 opacity-50">
              <h2>
                Our partners<span className="blue-text">.</span>
              </h2>
              <div className="partner-logos mt-5">
                <img
                  src={verifyme}
                  alt="Verify me"
                  className="partner-logo mx-5"
                />
                <img
                  src={youverify}
                  alt="Verify me"
                  className="partner-logo mx-5"
                />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      )}

      <div className="investor-option">{isInvestor && <BecomeAPartner />}</div>
    </div>
  );
}

export default Faq;
