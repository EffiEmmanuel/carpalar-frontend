import * as yup from "yup";

const required = '* This field is required'

const personalDetailsSchema = yup.object().shape({
  firstname: yup.string().required(required),
  othername: yup.string().required(required),
  surname: yup.string().required(required),
  gender: yup.string().required(required),
  address: yup.string().required(required),
  placeOfBirth: yup.string().required(required),
  maritalStatus: yup.string().required(required),
  occupation: yup.string().required(required),
});

export default personalDetailsSchema