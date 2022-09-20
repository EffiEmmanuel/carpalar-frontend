import React from "react";
import "./index.css";

function FeatureSection({ image, title, description, isFlipped }) {
  return (
    <div className="feature-group container-fluid m-150">
      {isFlipped && (
        <>
          <div className="left">
            <h1 className="title">
              {title}
              <span className="blue-text">.</span>
            </h1>
            <p>{description}</p>
            <a
              role="button"
              className="btn btn-dark blue-bg feature-cta"
              href="/"
            >
              LEARN MORE
            </a>
          </div>

          <div className="right">
            <img src={image} alt={title} className="feature-image" />
          </div>
        </>
      )}

      {!isFlipped && (
        <>
          <div className="left">
            <img src={image} alt={title} className="feature-image" />
          </div>

          <div className="right">
            <h1 className="title">
              {title}
              <span className="blue-text">.</span>
            </h1>
            <p>{description}</p>
            <a
              role="button"
              className="btn btn-dark blue-bg feature-cta"
              href="/"
            >
              LEARN MORE
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default FeatureSection;
