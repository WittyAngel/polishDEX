import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { InputField, ActionButton, Label } from 'components/UI';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { useFormik } from 'formik';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { PreLoader } from 'components/UI/PreLoader';
import { useTranslation } from 'react-i18next';

import FiatGatewayResult from 'components/FiatGatewayResult';
import SelectTokenModal from './SelectTokenModal';
import Ethicon from '../../assets/ethereum-icon.png';
import DisclaimerIcon from '../../assets/dislaimer-inactive.png';
import FiatGatewaySchema from './schema';
import { getPrice } from './rampNetwork';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
      marginBottom: '2em',
      flex: '1'
    },
    heading: {
      font: 'normal normal bold 30px/41px Arial',
      color: theme.colors.white,
    },
    fiatWrapper: {
      background: '#000000',
      color: '#ffffff',
      borderRadius: '5px',
      maxWidth: '420px',
      margin: 'auto',
      padding: '30px 30px 20px 30px',
      width: '100%',
    },
    title: {
      font: 'normal normal normal 20px/27px Arial',
      color: '#FFFFFF',
      marginBottom: 40,
      marginTop: 0,
      fontWeight: 700,
    },
    ethIcon: {
      width: 38,
      marginRight: 15,
    },
    iconCurrWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    iconCurr: {
      font: 'normal normal normal 28px/38px Arial',
      color: '#FFFFFF',
      margin: 0,
    },
    pointsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: 'normal normal 600 14px/19px Open Sans',
      padding: '5px 0',
    },
    pointCurrency: {
      display: 'flex',
      alignItems: 'center',
    },
    disclaimerIcon: {
      width: 15,
      marginLeft: 10,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      textTransform: 'capitalize',
      marginTop: '20px',
      color: theme.colors.secondary,
    },
    tokenButton: {
      padding: "0px",
      color: theme.colors.white,
      display: 'flex',
      justifyContent: 'space-between',
      flexBasis: '55px',
      backgroundColor: theme.colors.darkGray,
      borderRadius: "0px"
    },
    tokenImage: {
      height: "20px",
      width: '20px'
    },
    symbol: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%'

    },
    dropdownIcon: {
      fill: theme.colors.white,
    },
    formControl: {
      flexBasis: "30%",
      background: theme.colors.darkGray
    }
  }),
);

const MyNativeSelect = withStyles({
  root: {
    width: 60,
    height: 37,
  },
  icon: {
    color: 'white',
    marginRight: 5,
  },
})(NativeSelect);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      position: 'relative',
      backgroundColor: theme.colors.darkGray,
      color: 'white',
      fontSize: 14,
      width: '100%',
      padding: '10px 26px 10px 12px',
    },

  }),
)(InputBase);

export default function FiatGateWay() {
  const classes = useStyles();
  const history = useHistory();
  let addressLS: any;
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [ETHPrice, setETHPrice] = useState(0);
  const [estimate, setEstimate] = useState(0.00);
  const [currency, setcurrency] = React.useState('usd');
  const [address, setAddress] = useState('');
  const [isFiatGatewayResultModalOpen, toggleFiatGatewayResultModal] =
    useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [tokenFilterList, setTokenFilterList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [isEstimateChange, setEstimateChange] = useState(false);
  const [isAmountChange, setAmountChange] = useState(false);

  const [isTokenModalOpen, toggleTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    symbol: 'BSC_BNB',
    logoUrl: "https://rampnetwork.github.io/assets/crypto-assets/bsc-bnb.svg"
  });

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setEstimate(0.00);
    setFieldValue('amount', 0);
    setSelectedWallet(localStorage.getItem('selectedWallet')!);
    (async () => {
      setIsLoading(true);
      setETHPrice(await getPrice(selectedToken.symbol));
      setIsLoading(false);

    })();
  }, [selectedToken]);

  const initialValues: any = {
    amount: '0.00',
  };

  const fiatGateway = async (formValues: any) => {
    setLoading(true);
    // window.open('https://buy.ramp.network/', '_blank');
    if (selectedWallet === 'KRYPTO Wallet') {
      const tykloAddress = localStorage.getItem('tykloAddress');
      addressLS = tykloAddress;
    } else {
      const metamaskAddress = localStorage.getItem('metamaskAddress');
      addressLS = metamaskAddress;
    }
    setAddress(addressLS);
    if (!addressLS) {
      localStorage.setItem('selectedRoute', 'wallet');
      history.push('/wallet');
    } else {
      new RampInstantSDK({
        hostAppName: 'Krypto Army',
        hostLogoUrl:
          'https://www.krypto.army/static/media/main-logo.37fef050.png',
        defaultAsset: 'BSC_BNB',
        swapAsset: 'DAI,ETH,USDC',
        userAddress: addressLS,
        fiatCurrency: 'USD',
        fiatValue: formValues.amount,
        // url: 'https://widget-instant.ramp.network/', // only specify the url if you want to use testnet widget versions,
        variant: 'auto',
        hostApiKey: "axe3g8ob2rqu4793jv6fcjwu35jffdjn3cx7qyqe"
      })
        .on('*', console.log)
        .show();
    }
    // toggleFiatGatewayResultModal(true);
    setLoading(false);
  };
  const handleAmountChange = (value: any) => {
    setFieldValue('amount', value);
    if (ETHPrice !== 0) {
      setEstimate(value / ETHPrice);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: FiatGatewaySchema,
    validateOnChange: true,
    onSubmit: fiatGateway,
  });

  const {
    values,
    setFieldValue,
    resetForm: resetFields,
    handleSubmit,
    errors,
    isSubmitting,
  } = formik;


  useEffect(() => {
    if (ETHPrice !== 0) {
      const v = values.amount / ETHPrice;
      const estValue = Number(parseFloat(String(v)).toFixed(2))

      setTimeout(() => {
        setEstimate(estValue);
      }, 500);
    }
  }, [isAmountChange])

  useEffect(() => {
    if (ETHPrice !== 0) {
      const v = estimate * ETHPrice;
      const amountValue = Number(parseFloat(String(v)).toFixed(2))

      setTimeout(() => {
        setFieldValue('amount', amountValue);
      }, 500);
    }
  }, [isEstimateChange])

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      'https://api-instant.ramp.network/api/host-api/assets',
    );
    setIsLoading(false);

    const formattedTokenData = response.data.assets.map((token: any) => {
      const tokenFormat = { symbol: '', logoUrl: '' };
      tokenFormat.symbol = token.symbol;
      tokenFormat.logoUrl = token.logoUrl;
      return tokenFormat;
    })
    setTokenList(formattedTokenData);
    setTokenFilterList(formattedTokenData);
  }



  const handleMenuOpen = () => {
    toggleTokenModalOpen(!isTokenModalOpen)
  }

  const tokenFilterHandler = (filter: string) => {
    if (filter !== "") {
      setTokenFilterList(tokenList.filter((token: { symbol: string }) => token.symbol.toLowerCase().includes(filter.toLowerCase())))
    } else {
      setTokenFilterList(tokenList)
    }
  }


  return isLoading ? <PreLoader /> : (
    <>
      <FiatGatewayResult
        isOpen={isFiatGatewayResultModalOpen}
        toggleModal={toggleFiatGatewayResultModal}
        txDetails={{
          address,
          txHash:
            '0xeef10fc5170f669b86c4cd0444882a96087221325f8bf2f55d6188633aa7be7c',
        }}
      />
      <div className={classes.wrapper}>
        <h2 className={classes.heading}>{t('BUY_KRYPTO_HEADER')}</h2>

        <div className={classes.fiatWrapper}>
          <h4 className={classes.title}>{t('PURCHASE_KRYPTO_HEADER')}</h4>
          {/* <div className={classes.iconCurrWrapper}>
            <img src={Ethicon} alt="Eth icon" className={classes.ethIcon} />
            <p className={classes.iconCurr}>
              <b style={{ marginRight: 10 }}>{estimate.toFixed(2)}</b>
              <span>BNB</span>
            </p>
          </div> */}

          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', marginBottom: 20, flexDirection: "column" }}>
              <div style={{ marginBottom: '20px', display: "flex" }}>
                <InputField
                  hiddenLabel
                  variant="outlined"
                  type="number"
                  name="amount"
                  step='0.01'
                  value={estimate}
                  style={{ width: 'calc(100% - 80px)', flexBasis: "67%" }}
                  onChange={(e: any) => { setEstimate(e.target.value); setEstimateChange(!isEstimateChange) }}
                />
                <SelectTokenModal tokenList={tokenFilterList} isOpen={isTokenModalOpen} setSelectedToken={setSelectedToken}
                  selectedToken={selectedToken} toggleModal={toggleTokenModalOpen} />
                <FormControl style={{ flexBasis: "33%" }}
                >
                  <Button className={classes.tokenButton} onClick={handleMenuOpen}>
                    <img className={classes.tokenImage} src={selectedToken.logoUrl} alt="logourl" />
                    <div className={classes.symbol} title={selectedToken.symbol}>{selectedToken.symbol}</div>
                    <ArrowDropDownIcon className={classes.dropdownIcon} />

                  </Button>

                </FormControl>
              </div>
              <div style={{ display: 'flex' }}>
                <InputField
                  hiddenLabel
                  variant="outlined"
                  type="number"
                  name="amount"
                  step='0.01'
                  value={values.amount}
                  style={{ width: 'calc(100% - 80px)', flexBasis: "70%" }}
                  onChange={(e: any) => { setFieldValue('amount', e.target.value); setAmountChange(!isAmountChange) }}
                />
                <FormControl className={classes.formControl}>
                  <MyNativeSelect
                    id="demo-customized-select-native"
                    value={currency}
                    color="primary"
                    //   onChange={setcurrency} 
                    input={<BootstrapInput />}
                  // style={{ width: '80px' }}
                  >
                    <option aria-label="None" value="" />
                    <option value="usd">$ USD</option>
                    {/* <option value="inr">₹ INR</option> */}
                  </MyNativeSelect>
                </FormControl>
              </div>
            </div>

            {/* <div className={classes.pointsWrapper}>
              <span style={{ opacity: 0.7 }}>Estimated Cost</span>
              <div className={classes.pointCurrency}>
                <span>US$0.00</span>
                <img
                  src={DisclaimerIcon}
                  alt="disclaimer icon"
                  className={classes.disclaimerIcon}
                />
              </div>
            </div>
            <div className={classes.pointsWrapper}>
              <span style={{ opacity: 0.7 }}>Price Impact</span>
              <div className={classes.pointCurrency}>
                <span>0.00 %</span>
                <img
                  src={DisclaimerIcon}
                  alt="disclaimer icon"
                  className={classes.disclaimerIcon}
                />
              </div>
            </div>
            <div className={classes.pointsWrapper}>
              <span style={{ opacity: 0.7 }}>Minimum Received</span>
              <div className={classes.pointCurrency}>
                <span>0 USDT</span>
                <img
                  src={DisclaimerIcon}
                  alt="disclaimer icon"
                  className={classes.disclaimerIcon}
                />
              </div>
            </div> */}

            <ActionButton
              className={classes.btn}
              showLoading={loading}
              onClick={() => handleSubmit()}
            >
              <Label variant="body1" text={t('PURCHASE_CONTINUE')} />
            </ActionButton>
          </form>
        </div>
      </div>
    </>
  );
}
