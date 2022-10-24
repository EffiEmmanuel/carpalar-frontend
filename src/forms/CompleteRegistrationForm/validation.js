import * as yup from "yup";

const required = "*Required";

const CompleteRegistrationSchema = new yup.object().shape({
  guarantorOneLastName: yup.string().required(required),
  gurarantorOneRelationship: yup.string().required(required),
  gurarantorOnePhone: yup.string().required(required),
  gurarantorOneAddress: yup.string().required(required),
  gurarantorOneJobTitle: yup.string().required(required),
  gurarantorOneEmail: yup.string().email("Please enter a valid email").required(required),
  gurarantorOneNin: yup.number('NIN cannot contain alphabets').required(required),
  gurarantorOneBvn: yup.number('BVN cannot contain alphabets').required(required),

  guarantorTwoLastName: yup.string().required(required),
  gurarantorTwoRelationship: yup.string().required(required),
  gurarantorTwoPhone: yup.string().required(required),
  gurarantorTwoAddress: yup.string().required(required),
  gurarantorTwoJobTitle: yup.string().required(required),
  gurarantorTwoEmail: yup.string().email("Please enter a valid email").required(required),
  gurarantorTwoNin: yup.number('NIN cannot contain alphabets').required(required),
  gurarantorTwoBvn: yup.number('BVN cannot contain alphabets').required(required),

  vehicle: yup.string().required(required),
  comfortableContractDuration: yup.string().required(required),
  downpaymentBudget: yup.string().required(required),
  otherPaymentAmount: yup.string().notRequired(),

});

export default CompleteRegistrationSchema;
