import * as yup from "yup";

const required = '* This field is required'

const addVehicleSchema = yup.object().shape({
  name: yup.string().required(required),
  yearOfProduction: yup.string().required(required),
  transmission: yup.string().required(required),
  fuel: yup.string().required(required),
  engineSize: yup.string().required(required),
  vehileSize: yup.string().required(required),
  vehicleBrand: yup.string().required(required),
  price: yup.number().required(required),
});

export default addVehicleSchema