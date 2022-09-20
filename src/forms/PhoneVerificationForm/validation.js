import * as yup from 'yup'

const phoneVerificationSchema = yup.object().shape({
    verificationCode: yup.number('Verification code can only contain digits').min(6, 'Invalid verification code').max(6, 'Invalid verification code').required('* This field is required')
})

export default phoneVerificationSchema