import React from "react";
import { Fade } from "react-reveal";
import { ArrowRight } from "react-bootstrap-icons";

function VehicleCard({ name, year, transmission, fuel, engineSize, vehicleSize, image, _id }) {
  return (
    <Fade bottom delay={200} duration={1000}>
      <a
        className="link-to-vehicle-page"
        href={`/explore-cars/${_id}`}
      >
        <div className="vehicle-card m-3">
          <div className="vehicle-details">
            <h3>{name} </h3>
            <p>{year} and above</p>
            <div className="transmission">
              <p>Transmission</p>
              <p>{transmission}</p>
            </div>
            <div className="fuel">
              <p>Fuel</p>
              <p>{fuel}</p>
            </div>
          </div>

          <div className="vehicle-image-container">
            <img src={image} alt={name} className="vehicle-image" />
          </div>

          <div className="vehicle-card-footer">
            <a
              href={`/explore-cars/${_id}`}
              className="view-details-link blue-text nav-link semibold"
            >
              VIEW DETAILS{" "}
              <span className="arrow">
                <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </a>
    </Fade>
  );
}

export default VehicleCard;
