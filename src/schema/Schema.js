import * as yup from 'yup'
export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .max(40)
    .required('Name must be filled'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email must be filled'),
  password: yup
    .string()
    .min(6)
    .required('Password must be filled'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup
    .string()
    .required('Phone number must be filled'),
  // address: yup
  //   .string()
  //   .required('Address must be filled'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .required('Gender is required'),
})
