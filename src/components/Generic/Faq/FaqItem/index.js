import React from "react";

function FaqItem({ question, answer, index }) {
  return (
    <div className="accordion-item" key={index}>
      <h2 className="accordion-header" id={`heading${index}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded="true"
          aria-controls={`collapse${index}`}
        >
          { question }
        </button>
      </h2>
      <div
        id={`collapse${index}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${index}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          { answer }
        </div>
      </div>
    </div>
  );
}

export default FaqItem;
