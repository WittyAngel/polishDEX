import { Grid, Paper, makeStyles, Button, Avatar } from '@material-ui/core';
import React, { useMemo, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStyles } from './styles';
import PortfolioTrack from './PortfolioTrack';

declare let window: any;

const Wallet = () => {
  const history = useHistory();

  const classes = useWalletStyles();
  const { t } = useTranslation();
  const screenText = useMemo(() => {
    return {
      walletHeader: t('WALLET_HEADER'),
      walletMetamask: t('WALLET_METAMASK'),
      walletTyklo: t('WALLET_TYKLO'),
      walletCardHeader1: t('WALLET_CARD_HEADER1'),
      walletCardHeader2: t('WALLET_CARD_HEADER2'),
      walletCardDesc: t('WALLET_CARD_DESC'),
    };
  }, [t]);

  // useEffect(() => {
  //   localStorage.setItem('selectedRoute', 'wallet');
    
  // }, [])

  const walletAddress: string = localStorage.getItem("tykloAddress")!;

  const routerHandler = () => {
    if (walletAddress && walletAddress !== "") {
      history.push("/wallet/details");
    } else {
      history.push("/wallet/tyklo");
    }
  }

  const metamaskRouteHandler = () => {
    if (window.web3 || window.ethereum) {
    const selectedWalllet = localStorage.setItem('selectedWallet', 'Metamask');
    history.push("/wallet/metamask");
    } else {
      window.open("https://metamask.io/", "_blank")
    }
  }
  return (
    < >
      <Grid className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.infoText}>
            {t('WALLET_CARD_HEADER1')}
            <br />
            {t('WALLET_CARD_HEADER2')}
          </div>
          <div className={classes.tagLine}>  {t('WALLET_CARD_DESC')} </div>
        </Paper>
      </Grid>

      <div className={classes.walletContainer}>
        <div className={classes.heading}>{screenText.walletHeader}</div>
        <div className={classes.wrapper}>
          <button className={`${classes.wallet} ${classes.buttonWallet}`}
            onClick={metamaskRouteHandler} type="button">
            <img
              src={require('assets/icon-metamask.png').default}
              alt="Metamask Icon"
              className={classes.metamask_icon}
            />
            <div className={classes.wallet_text}>{screenText.walletMetamask}</div>
          </button>
          <div className={classes.partition} />
          <button className={`${classes.wallet} ${classes.buttonWallet}`}
            onClick={routerHandler} type="button">
            <img
              src={require('assets/main-logo.png').default}
              alt="Metamask Icon"
              className={classes.tyklo_icon}
            />
            <div className={classes.wallet_text}>{screenText.walletTyklo}</div>
          </button>
        </div>
      </div>
      {/* <PortfolioTrack /> */}
    </>
  );
};

export default React.memo(Wallet);
