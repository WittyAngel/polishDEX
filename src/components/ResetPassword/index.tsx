import React, { ReactElement, useEffect, useState } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const Moralis = require('moralis');

const ResetPassword = ({
  isOpen,
  toggleModal,
  toggleLoginModal
}: {
  isOpen: boolean;
  toggleModal: any;
  toggleLoginModal?: (val: boolean) => void;
}): ReactElement => {
    const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const onResetPassword = async () => {
    try {
      setLoading(true);
      setIsSuccess(false);
      // await Moralis.User.requestPasswordReset(email);
      await Moralis.Cloud.run("forgotPassword", {email})
      setLoading(false);
      setIsSuccess(true);
    } catch(e) {
      setError(e.message);
      setLoading(false);
    }
  }


  const handleFormClose = () => {
    setError(null);
    setIsSuccess(false);
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        { isSuccess ? <div className={classes.resetPwdInfo}>
          <img src={require('assets/success.png').default} alt="success" className={classes.success} />
          <Label variant="h2" text="RESET_PASSWORD_LINK_SENT" style={{marginBottom: 10}} />
          <Label variant="body1" text="RESET_PASSWORD_INFO" />
          </div> : <>
        <Label component="div" variant="h2" className={classes.infoMsg}>
          {t('FORGOT_PASSWORD')}
        </Label>
        <form autoComplete="off">
          <div className={classes.fields}>
                <FormItemLabel
                  label={t("GENERAL_EMAIL_ADDRESS")}
                  error={error || ""}
                  formControlClass={classes.formControlClass}
                >
                  <InputField
                    type="text"
                    variant="outlined"
                    name="email"
                    value={email}
                    margin="dense"
                    hiddenLabel
                    placeholder={t("GENERAL_EMAIL_ADDRESS")}
                    onChange={(e: any) =>
                      setEmail(e.target.value)
                    }
                  />
                </FormItemLabel>

            <ActionButton
              className={classes.actionBtn}
              showLoading={loading}
              onClick={onResetPassword}
            >
              <Label variant="body1" text="GENERAL_CONTINUE" />
            </ActionButton>
          </div>
        </form>
        </>}
      </div>
    </DesktopModal>
  );
};

export default ResetPassword;
