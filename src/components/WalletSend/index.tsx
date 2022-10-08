import React, { ReactElement, useEffect, useState } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import { Button } from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import { sendTransaction } from '../Wallets/metamask';
import WalletSendSchema from './schema';
import useStyles from './style';

// const Moralis = require('moralis');

const initialValues: any = {
  amount: '',
  send_to: '',
  reference: '',
};

const WalletSend = ({
  isOpen,
  toggleModal,
  openWalletSendResult,
  address,
}: {
  isOpen: boolean;
  toggleModal: any;
  openWalletSendResult: any;
  address: string;
}): ReactElement => {
  const [serverErrors, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();


  const FormInputConfig = [
    {
      field: 'amount',
      fieldType: 'number',
      placeHolder: t('SEND_AMOUNT'),
      label: t('SEND_AMOUNT'),
    },
    {
      field: 'send_to',
      fieldType: 'text',
      placeHolder: t('SEND_TO'),
      label: t('SEND_TO'),
    },
    {
      field: 'reference',
      fieldType: 'text',
      placeHolder: t('REFERENCE'),
      label: t('REFERENCE'),
    },
  ];


  const walletSend = async (formValues: any) => {
    try {
      setLoading(true);
      const txHash = await sendTransaction({
        to: formValues.send_to,
        from: address,
        value: formValues.amount
      });
      if (txHash) {
        openWalletSendResult({ address, txHash });
        handleFormClose();
      } else {
        throw new Error('Unable to send transaction');
      }
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: WalletSendSchema,
    validateOnChange: true,
    onSubmit: walletSend,
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
        <Label component="div" variant="h2" className={classes.infoMsg}>
          Send
        </Label>
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
              <Label variant="body1" text="Send" />
            </ActionButton>
          </div>
          <Label variant="subtitle1" className={classes.infoMessage}>
            {t('SEND_NOTE')}
            {' '}
            <a href="/" target="_blank">
              {t('MORE_INFO')}
            </a>
          </Label>
        </form>
      </div>
    </DesktopModal>
  );
};

export default WalletSend;
