import * as yup from "yup";

const required = '* This field is required'

const addVehicleBrandSchema = yup.object().shape({
  brandName: yup.string().required(required),
  image: yup
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
});

export default addVehicleBrandSchema