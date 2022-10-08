import React, { ReactElement } from 'react';
import {
  Label,
  DesktopModal,
} from 'components/UI';
import { Button } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import useStyles from './style';


const WalletMenuModal = ({
  isOpen,
  toggleModal,
  selectedWalletType,
  openRegisterModal,
  toggleForgotPwdModal,
  setSelectedWalletType,
  walletList
}: {
  isOpen: boolean;
  toggleModal: any;
  openRegisterModal: (val: boolean) => void;
  toggleForgotPwdModal: (val: boolean) => void;
  walletList?: { value?: string, name: string }[],
  selectedWalletType: { name?: string, value?: string },
  setSelectedWalletType: any;
}): ReactElement => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleFormClose = () => {
    toggleModal(!isOpen);
  };


  const selectWalletHandler = (event: { name?: string, value?: string }) => {
    console.log(event);
    setSelectedWalletType(event);
    localStorage.setItem("localSelctedWalletType", JSON.stringify(event));
    handleFormClose();
  }

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <Label
          component="div"
          variant="h2"
          className={classes.infoMsg}
          text="SWITCH_WALLET_HEADER"
        />
        {
          walletList && walletList.map(walletType => (
            <div className={classes.test} key={walletType.name}>
              <Button onClick={() => selectWalletHandler(walletType)} className={`${classes.currency_item}  ${selectedWalletType && selectedWalletType.name === walletType.name ? classes.active : ''}`} >
                <div className={classes.currency_details}>
                  <span className={classes.currency_name}>{walletType.name}</span>
                </div>
              </Button>
            </div>
          ))
        }
      </div>
    </DesktopModal>
  );
};

export default WalletMenuModal;
