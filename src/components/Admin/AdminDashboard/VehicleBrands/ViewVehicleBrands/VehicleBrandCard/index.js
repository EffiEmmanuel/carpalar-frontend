import React from "react";
import './index.css'
import { Pencil, Trash } from "react-bootstrap-icons";

function VehicleBrandCard({ vehicleBrand }) {

    const editVehicleBrand = async () => {
        
    }

    const deleteVehicleBrand = async () => {

    }

  return (
    <div
      className="my-5 d-flex flex-column justify-content-center text-center align-items-center vehicle-brand-card"      
    >
      <h5 style={{ maxWidth: "33%", minWidth: '33%' }} className="text-center my-4">{vehicleBrand.brandName}</h5>
      <img
        src={vehicleBrand.image}
        style={{ maxWidth: "33%", minWidth: '33%' }}
        alt="Vehicle brand"
      />

      <div className="action-buttons my-4" style={{ maxWidth: "33%", minWidth: '33%' }}>
          <>
            <button className="done bg-primary" onClick={() => editVehicleBrand()}>
              <Pencil size={35} color="#fff" />
              {/* <img src={deleteIcon} alt="Delete" className="nav-link-icon" /> */}
            </button>
            <button className="done delete bg-danger" onClick={() => deleteVehicleBrand()}>
              <Trash size={35} color="#fff" />
              {/* <img src={doneIcon} alt="Mark as done" className="nav-link-icon" /> */}
            </button>
          </>
      </div>
    </div>
  );
}

export default VehicleBrandCard;
