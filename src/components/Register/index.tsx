import React, { ReactElement, useState, useEffect } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import { useFormik } from 'formik';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { IS_USER_LOGGED_IN } from 'constants/config';
import { generateToken } from '../../api/referral-manager/user';
import RegisterSchema from './schema';
import useStyles from './style';

const Moralis = require('moralis');

const FormInputConfig = [
  // {
  //   field: 'name',
  //   fieldType: 'text',
  //   placeHolder: 'GENERAL_YOUR_NAME',
  //   label: 'GENERAL_YOUR_NAME',
  // },
  {
    field: 'username',
    fieldType: 'text',
    placeHolder: 'GENERAL_USERNAME',
    label: 'GENERAL_USERNAME',
  },
  {
    field: 'email',
    fieldType: 'text',
    placeHolder: 'GENERAL_EMAIL_ADDRESS',
    label: 'GENERAL_EMAIL_ADDRESS',
  },
  {
    field: 'password',
    fieldType: 'password',
    placeHolder: 'GENERAL_PASSWORD',
    label: 'GENERAL_PASSWORD',
  },
  {
    field: 'confirmPassword',
    fieldType: 'password',
    placeHolder: 'GENERAL_REPASSWORD',
    label: 'GENERAL_REPASSWORD',
  },
  {
    field: 'referralCode',
    fieldType: 'text',
    placeHolder: 'ENTER_REFERAL_CODE',
    label: 'REFERAL_CODE',
  },
];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const initialValues: any = {
  email: '',
  password: '',
  username: '',
  name: 'name',
  referralCode: urlParams.get('referral_code') ?? '',
};

const Register = ({
  isOpen,
  toggleModal,
  openLoginModal,
}: {
  isOpen: boolean;
  toggleModal: any;
  openLoginModal: (val: boolean) => void;
}): ReactElement => {
  const [serverErrors, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const { setIsAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    if (urlParams.get('referral_code')) {
      toggleModal(true);
    }
  }, []);

  const toggleToLoginModal = () => {
    toggleModal(false);
    openLoginModal(true);
  };

  const register = async (formikValues: any) => {
    try {
      setLoading(true);
      const blacklist = ['CUxsxghega2e']
      if (formikValues.referralCode && blacklist.indexOf(formikValues.referralCode) >= 0) {
        alert('Expired! Sorry try another/new referral code.')
        return;
      }

      const user = new Moralis.User();
      user.set('email', formikValues.email);
      user.set('password', formikValues.password);
      user.set('username', formikValues.username);
      user.set('name', 'name');
      await user.save();

      const newuser = await Moralis.User.logIn(
        formikValues.username,
        formikValues.password,
        {
          userPost: true,
        },
      );

      const referralCode = await generateToken(newuser.id, formikValues.referralCode);
      if (referralCode) {
        const query = new Moralis.Query(Moralis.User);
        const userAgain = await query.get(newuser.id);
        userAgain.set('referralCode', referralCode);
        await userAgain.save();
      }

      setIsAuthenticated(true);
      localStorage.setItem(IS_USER_LOGGED_IN, 'true');
      handleFormClose();
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    validateOnChange: true,
    onSubmit: register,
  });

  const {
    values,
    setFieldValue,
    resetForm: resetFields,
    handleSubmit,
    errors,
    isSubmitting,
  } = formik;

  const handleFormClose = () => {
    setServerError(null);
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <Label
          component="div"
          variant="h2"
          className={classes.infoMsg}
          text="REGISTER_NEW_ACCOUNT"
        />
        <form autoComplete="off">
          <div className={classes.fields}>
            {FormInputConfig.map((config) => {
              return (
                <FormItemLabel
                  key={config.label}
                  label={t(config.label)}
                  error={errors[config.field] as any}
                  formControlClass={classes.formControlClass}
                >
                  <InputField
                    type={config.fieldType}
                    variant="outlined"
                    name={config.field}
                    value={values[config.field]}
                    margin="dense"
                    hiddenLabel
                    placeholder={t(config.placeHolder)}
                    onChange={(e: any) =>
                      setFieldValue(config.field, e.target.value)
                    }
                  />
                </FormItemLabel>
              );
            })}

            <span>{serverErrors}</span>

            <ActionButton
              className={classes.actionBtn}
              showLoading={loading}
              onClick={() => handleSubmit()}
            >
              <Label variant="body1">{t('Register')}</Label>
            </ActionButton>
          </div>
          <Button
            style={{ width: '100%', padding: 0 }}
            onClick={toggleToLoginModal}
          >
            <Label variant="subtitle1" className={classes.signupLink}>
              {t('DO_NOT_HAVE_ACCOUNT_LOGIN')}
            </Label>
          </Button>
        </form>
      </div>
    </DesktopModal>
  );
};

export default Register;
