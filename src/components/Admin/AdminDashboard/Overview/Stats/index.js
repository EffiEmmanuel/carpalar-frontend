import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Stats({ stats }) {
  const navigator = useNavigate();
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    console.log('Gotten token:', adminToken)
    async function getStatistics() {
      console.log("BEFORE AXIOS CALL");
      await axios
        .get(`${process.env.REACT_APP_BASE_URL_ADMIN}/statistics`, {
          headers: {
            auth_token: `Bearer ${adminToken}`,
          },
        })
        .then((res) => {
          console.log("RES:", res.data);
          setStatistics(res.data.stats);
        })
        .catch((err) => {
          console.log("ERR:", err);
          Swal.fire({
            title: "Session expired",
            text: "Please log in again",
            icon: "info",
            timer: 3000,
          });
          localStorage.removeItem("adminToken");
          navigator("/admin/login");
        });
    }

    getStatistics();
  }, []);

  return (
    <div className="account-overview">
      <div className="stat-cetegory">
        <small className="stat-category-title semibold opacity-50 text-center w-100 d-block text-uppercase">Drivers</small>
        <div className="car-specs d-flex flex-wrap justify-content-center">
          <div className="car-spec mt-3">
            <p>Drivers</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.drivers}
            </h2>
          </div>
          <div className="car-spec mt-3">
            <p>Approved Drivers</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.approvedDrivers}
            </h2>
          </div>
          {/* <div className="car-spec mt-3">
            <p>Pending Applications</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.pendingApplications}
            </h2>
          </div> */}
        </div>
      </div>
      <div className="stat-cetegory mt-5">
        <small className="stat-category-title semibold opacity-50 text-center w-100 d-block text-uppercase">Vehicles and Vehicle brands</small>
        <div className="car-specs d-flex flex-wrap justify-content-center">
          <div className="car-spec mt-3">
            <p>Vehicles</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.vehicles}
            </h2>
          </div>
          <div className="car-spec mt-3">
            <p>Vehicle brands</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.vehicleBrands}
            </h2>
          </div>
        </div>
      </div>
          
      {/* TODO: Plot a graph based on the monthly payments recorded */}
      {/* <div className="stat-cetegory mt-5">
        <small className="stat-category-title semibold opacity-50 text-center w-100 d-block text-uppercase">Transactions</small>
        <div className="car-specs d-flex flex-wrap justify-content-center">
          <div className="car-spec mt-3">
            <p>Total payments</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.totalPayment}
            </h2>
          </div>
          <div className="car-spec mt-3">
            <p>Payments this month</p>
            <h2 className="semibold mt-n3 text-capitalize">
              {statistics?.monthlyPayment}
            </h2>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Stats;
