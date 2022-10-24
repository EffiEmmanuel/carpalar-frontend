import * as yup from "yup";

const required = "* This field is required";
const adminLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required(required),
  password: yup.string().required(required),
});

export default adminLoginSchema;
