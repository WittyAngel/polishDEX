import React, { useMemo, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { AddressContext } from 'context/AddressContext';
import { checkMetaMaskInstallation, getAccounts, getChainId } from './metamask';
import { useWalletStyles } from './styles';

const WalletMetamask = () => {
  const classes = useWalletStyles();
  // const { t } = useTranslation();
  const history = useHistory();
  const { redirect } = useParams<{ redirect?: string }>();
  const context = useContext(AddressContext);
  const { t } = useTranslation();

  if (!checkMetaMaskInstallation()) {
    window.location.replace('https://metamask.io/');
  }

  useEffect(() => {
    if (localStorage.getItem("selectedWallet") === 'KRYPTO Wallet') {
      return;
    }
    (async () => {
      try {
        const accounts = await getAccounts();
        if (accounts) {
          localStorage.setItem('metamaskAddress', accounts[0]);
          context?.setIsAddressAvailable(accounts[0]);
          const chainId = await getChainId();
          localStorage.setItem('metamaskChainId', chainId);
          if (redirect) {
            history.push(`/${redirect}`);
          } else {
            history.push('/wallet/details');
          }
        } else {
          history.push('/wallet');
          throw new Error('Unable to fetch accounts');
        }
      } catch (error) {
        console.error(error);
        history.push('/wallet');
      }
    })();
  }, [localStorage.getItem("selectedWallet")!]);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>{t('CONNECT_TO_METAMASK')}</div>
      <div className={classes.heading}>{t('CONNECTING')}</div>
    </div>
  );
};

export default React.memo(WalletMetamask);
