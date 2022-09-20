import * as yup from "yup";

const required = "* This field is required";

const professionalDetailsSchema = yup.object().shape({
  yearsOfDrivingExperience: yup.string().required(required),
  highestAcademicQualification: yup.string().required(required),
  stateOfOrigin: yup.string().required(required),
  lga: yup.string().required(required),
  otherHailingPlatforms: yup.string().required(required),
});

export default professionalDetailsSchema;
