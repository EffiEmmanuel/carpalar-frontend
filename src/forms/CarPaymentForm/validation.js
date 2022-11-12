import * as yup from "yup";

const required = "*Required";

const CarPaymentSchema = new yup.object().shape({
  guarantorLastName: yup.string().required(required),
  gurarantorRelationship: yup.string().required(required),
  gurarantorPhone: yup.string().required(required),
  gurarantorAddress: yup.string().required(required),
  gurarantorJobTitle: yup.string().required(required),
  gurarantorEmail: yup.string().email("Please enter a valid email").required(required),
  gurarantorNin: yup.number('NIN cannot contain alphabets').required(required),
  gurarantorBvn: yup.number('BVN cannot contain alphabets').required(required),
});

export default CarPaymentSchema;
