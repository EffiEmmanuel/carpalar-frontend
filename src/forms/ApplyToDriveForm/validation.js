import * as yup from "yup";

const required = "*Required";
const MAX_FILE_SIZE = "3mb";

const ApplyToDriveFormSchema = new yup.object().shape({
  firstname: yup.string().required(required),
  othername: yup.string().required(required),
  surname: yup.string().required(required),
  gender: yup.string().required(required),
  address: yup.string().required(required),
  phone: yup.string().required(required),
  otherPhone: yup.string().required(required),
  email: yup.string().email("Please enter a valid email").required(required),
  dateOfBirth: yup.date().required(required),
  placeOfBirth: yup.string().required(required),
  maritalStatus: yup.string().required(required),
  occupation: yup.string().required(required),
  yearsOfDrivingExperience: yup.number().required(required),
  nationality: yup.string().required(required),
  highestAcademicQualification: yup.string().required(required),
  stateOfOrigin: yup.string().required(required),
  lga: yup.string().required(required),
  licenseNumber: yup.string().required(required),
  driversLicense: yup
    .mixed()
    .test({
      message:
        "File type not supported! Supported file types [.pdf, .png, .jpg]",
      test: (file, context) => {
        console.log("File:", file);
        console.log("Filesize", file?.size);
        console.log("file ext:", file?.split(".")[1]);
        const isValid = ["pdf", "png", "jpg"].includes(file?.split(".")[1]);
        if (!isValid) context?.createError();
        return isValid;
      },
    })
    .required(required),
  otherHailingPlatforms: yup.string().required(required),
  termsAndConditions: yup.string().required(required),
  password: yup
    .string()
    .min(8, "Password must be greater than 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("* This field is required"),
});

export default ApplyToDriveFormSchema;
