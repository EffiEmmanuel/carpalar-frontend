import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const makeAPICall = {
  postFormWithFile: async (endpoint, data) => {
    console.log("DATA FROM HELPER:", data.get("firstname"));
    // const JSONFormData = JSON.stringify(Object.fromEntries(data.entries()))
    axios
      .post(endpoint, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "We have received your details!",
          text: "We will get back to you within 72 hours.",
          icon: "success",
          timer: 4000,
        });
        console.log('RES:', res)
        return res.status;
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          timer: 3000,
        });
        console.log("Error:", err);
        console.log("Error response:", err.response);
        console.log("Error data:", err.response.data.message);
        return true;
      });
  },
  get: async (endpoint) => {
    axios
      .get(endpoint)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  },
};

export default makeAPICall;
