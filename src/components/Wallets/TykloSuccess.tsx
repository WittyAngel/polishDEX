import React, { useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory, useLocation } from 'react-router-dom';
import { AddressContext } from 'context/AddressContext';
import { mnemonicToSeed } from 'bip39';
import { privateToPublic, publicToAddress, toChecksumAddress } from 'ethereumjs-util'
import { useTykloStyles } from './styles';

const TykloSuccess = () => {
  const classes = useTykloStyles();
  const HDKey = require('hdkey');

  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const context = useContext(AddressContext);

  const screenText = useMemo(() => {
    return {
      header: t('TYKLO_SUCCESS_HEADING'),
      subHeading1: t('TYKLO_SUCCESS_SUB_HEADING_1'),
      subHeading2: t('TYKLO_SUCCESS_SUB_HEADING_2'),
      buttonText: t('TYKLO_SUCCESS_BUTTON_TEXT')
    };
  }, [t]);

  const handleClick = async () => {
    const state: any = location;
    const mneumonicWords: string = state.state.mneumonicWords.mneumonic;
    const seed = await mnemonicToSeed(mneumonicWords);
    const root = HDKey.fromMasterSeed(seed);
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    /* eslint no-underscore-dangle: 0 */
    const pubKey = privateToPublic(addrNode._privateKey);
    const addr = `0x${publicToAddress(pubKey).toString('hex')}`;
    const address = toChecksumAddress(addr);
    /**
     * change - need to remove comments after prod
     */
    // localStorage.setItem('tykloAddress', address);
    localStorage.setItem('selectedWallet', 'KRYPTO Wallet');
    context?.setIsAddressAvailable(address);
    history.push('/wallet/details');
  };

  return (
    <div className={classes.containerImport} >
      <div className={classes.content}>
        <img
          src={require('assets/main-logo.png').default}
          alt="Metamask Icon"
          className={classes.logo}
        />
      </div>
      <div className={classes.content}>
        <Typography
          component="h2"
          className={classes.h2}
          color="textSecondary"
        >
          {screenText.header}
        </Typography>
        <Typography component="p" className={classes.title}>
          {screenText.subHeading1}
        </Typography>
        <Typography component="p" className={classes.title}>
          {screenText.subHeading2}
        </Typography>
      </div>
      <div className={classes.content} >
        <Button
          variant="contained"
          className={classes.buttonNext}
          onClick={handleClick}
        >
          {screenText.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TykloSuccess;
