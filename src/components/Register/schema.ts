import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('GENERAL_REQUIRED')
    .matches(/^\S+@\S+$/, 'ERROR_INVALID_EMAIL'),
  password: yup.string().required('GENERAL_REQUIRED'),
  confirmPassword: yup
      .string()
      .required("GENERAL_REQUIRED")
      .oneOf([yup.ref("password"), ""], "GENERAL_PASSWORD_MUST_MATCH"),
  // name: yup.string().required('GENERAL_REQUIRED'),
  username: yup.string().required('GENERAL_REQUIRED'),
});
