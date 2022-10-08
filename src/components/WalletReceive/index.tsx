import React, { ReactElement, useEffect, useState } from 'react';
import { Label, DesktopModal, ActionButton } from 'components/UI';
// import { useAuthenticationContext } from 'context/AuthenticationContext';
// import { useTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import useStyles from './style';


const WalletReceive = ({
  isOpen,
  toggleModal,
  address,
}: {
  isOpen: boolean;
  toggleModal: any;
  address: string;
}): ReactElement => {
  const classes = useStyles();
  // const { t } = useTranslation();
  // const { setIsAuthenticated } = useAuthenticationContext();
  const { t } = useTranslation();

  const [walletAddress, setWalletAddress] = useState<any>("");

  const selectedWallet = localStorage.getItem("selectedWallet");

  useEffect(() => {

    if (selectedWallet === "KRYPTO Wallet") {
      const tykloAddress = localStorage.getItem("tykloAddress");
      if (tykloAddress && tykloAddress !== '') {
        setWalletAddress(tykloAddress)
      }
    } else {
      const metamaskAddress = localStorage.getItem("metamaskAddress");
      if (metamaskAddress && metamaskAddress !== '') {
        setWalletAddress(metamaskAddress)
      }
    }
  }, [selectedWallet, localStorage.getItem("tykloAddress")!, localStorage.getItem("metamaskAddress")!]);

  const handleFormClose = () => {
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <Label component="div" variant="h2" className={classes.infoMsg}>
          {t('RECEIVE')}
        </Label>
        <div className={classes.fields}>
          <QRCode value={walletAddress} size={288} />
          <Label variant="subtitle1" className={classes.infoMessage}>
            {t('YOUR_WALLET_ADDRESS')}
          </Label>
          <Label variant="subtitle1" className={classes.address}>
            {walletAddress}
          </Label>
        </div>
        <ActionButton className={classes.actionBtn}>
          <Label variant="body1" text={t('PRINT')} />
        </ActionButton>
      </div>
    </DesktopModal>
  );
};

export default WalletReceive;
