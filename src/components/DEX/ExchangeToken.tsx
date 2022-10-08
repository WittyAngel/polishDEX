import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { readZrxTokens, setPlatformVisible } from 'redux/actions';
import { Action } from 'redux';
import { RootState } from 'redux/types';
import { approveCallData, approveSpender } from 'api/1Inch/oneInch';
import { getQuoteZrx, getSwapZrx, getSwapAllowance } from 'api';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { PreLoader } from 'components/UI/PreLoader';
import FormControl from '@material-ui/core/FormControl';
import { InputField } from 'components/UI';
import './index.css';
import { CHAIN_TYPES } from 'constants/tokens';

import { BigNumber } from '@0x/utils';
import SelectTokenModal from 'components/FiatGateWay/SelectTokenModal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AddressContext } from 'context/AddressContext';
import {
  checkMetaMaskInstallation,
  getAccounts,
  getChainId,
  sendTransaction,
} from 'components/Wallets/metamask';
import { getNativeTokenBalance, getOtherTokenBalance, getTokenMetaData } from 'api/moralis/base';
import axios from 'axios';


// @ts-ignore
import dayjs from 'dayjs';
import { getCoinHistoric } from 'api/coingecko/coins';
import ExchangeCost from './ExchangeCost';
import SuccessSwap from './SuccessSwap';
import TradingViewChart from './TradingViewChart';

declare let window: any;

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
    labelContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: "-15px"
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
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
    },
    label: {
      margin: '10px 0px',
      fontSize: '12px'
    },
    exportIcon: {
      fontSize: 'large',
      backgroundColor: '#191919',
      width: '25px',
      height: '25px',
      cursor: 'pointer'
    },
    disabledExportIcon: {
      color: '#4e5051'
    }
  }),
);


const baseAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const toAddress = '0x55d398326f99059ff775485246999027b3197955';

const bscPlatform = {
  platforms: baseAddress,
  decimals: 18,
  logoUrl: "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
  symbol: "BNB",
  chain: "bsc",
  id: 'binancecoin'
};

const bscUSDTPlatform = {
  platforms: toAddress,
  decimals: 6,
  logoUrl: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  symbol: "USDT",
  chain: "bsc",
  id: 'tether'
};

const ethPlatform = {
  symbol: "ETH",
  logoUrl: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  platforms: baseAddress,
  decimals: 18,
  chain: "eth",
  id: 'ethereum'
}

const ExchangeToken = () => {
  const endDate = dayjs(new Date()).endOf('day').toDate();
  const history = useHistory();
  const dispatch: ThunkDispatch<RootState, unknown, Action<any>> = useDispatch();
  const tokenListData = useSelector((state: RootState) => state.main.zrxTokens);
  const selectedPlatform = useSelector((state: RootState) => state.main.platform);

  const { t } = useTranslation();
  const [isTokenModalOpen, toggleTokenModalOpen] = useState(false);
  const [isReceiveModalOpen, toggleReceiveModalOpen] = useState(false);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSwapSuccessModal, toggleSwapSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(true);
  const [tokenFilterList, setTokenFilterList] = useState<any[]>([]);
  const [tradeTokenPrice, setTradeTokenPrice] = useState<number>(0);
  const [receiveTokenPrice, setReceiveTokenPrice] = useState<number>(0);
  const [tradePriceDollar, setTradePriceDollar] = useState<number>(0);
  const [receivePriceDollar, setReceivePriceDollar] = useState<number>(0);
  const [tradeBalance, setTradeBalance] = useState<number>(0);
  const [receiveBalance, setReceiveBalance] = useState<number>(0);
  const [tradeDecimal, setTradeDecimal] = useState<number>(18);
  const [receiveDecimal, setReceiveDecimal] = useState<number>(6);
  const [isSwap, setSwap] = useState(false);
  const platformId = useMemo<number>(() => selectedPlatform.chain === CHAIN_TYPES.bsc ? 56 : 1, [selectedPlatform]);
  const [from, setFrom] = useState(bscPlatform);
  const [to, setTo] = useState(bscUSDTPlatform);

  const handleMenuOpen = () => {
    toggleTokenModalOpen(!isTokenModalOpen)
  }

  const handleReceiveMenuOpen = () => {
    toggleReceiveModalOpen(!isReceiveModalOpen)
  }

  useEffect(() => {
    setCurrentTradeValue('');
    setEstimatedResult({ ...estimatedResult, estimatedGas: '', toTokenAmount: '' })

    if (selectedPlatform.chain === CHAIN_TYPES.bsc) {
      setFrom(bscPlatform);
      setTo(bscUSDTPlatform);
    } else if (selectedPlatform.chain === CHAIN_TYPES.eth) {
      setFrom(ethPlatform);
    }

  }, [selectedPlatform])

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(setPlatformVisible(true));
    dispatch(readZrxTokens());

    return () => {
      dispatch(setPlatformVisible(false));
    }
  }, []);

  useEffect(() => {
    const validTokens = tokenListData.filter(token => {
      if (selectedPlatform.chain === CHAIN_TYPES.eth && !token.platforms?.ethereum) {
        return false;
      }
      if (selectedPlatform.chain === CHAIN_TYPES.bsc && !token.platforms?.['binance-smart-chain']) {
        return false;
      }
      return true;
    }).map(token => ({
      ...token,
      platforms: selectedPlatform.chain === CHAIN_TYPES.eth ? token.platforms.ethereum : token.platforms['binance-smart-chain'],
    }));
    setTokenFilterList(validTokens);
  }, [tokenListData, selectedPlatform]);

  const addressHandler = (event: any, isTradeValue: any, isReceiveValue: any) => {
    setSwap(false);
    setCurrentTradeValue('');
    setEstimatedResult({ ...estimatedResult, estimatedGas: '', toTokenAmount: '' });
    setTradePriceDollar(0);
    setReceivePriceDollar(0);

    if (isTradeValue) {
      setFrom(event);
    } else if (isReceiveValue) {
      setTo(event);
    }
  }

  const [estimatedResult, setEstimatedResult] = useState<any>({
    estimatedGas: "",
    toTokenAmount: ''
  });

  const [currentTradeValue, setCurrentTradeValue] = useState<any>('');

  const getVal = async (value: number) => {
    if (!from.platforms || !to.platforms || !value) {
      return
    }
    // @ts-ignore
    const amount = Math.floor(Number(value * 10 ** receiveDecimal));
    setIsFetching(true);
    let quote: any;
    try {
      setIsFetching(true);
      quote = await getQuoteZrx(platformId, { from: from.platforms, to: to.platforms }, amount);
      setDexgas(quote.gasPrice);
      setIsFetching(false);
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
    setEstimatedResult({
      ...estimatedResult,
      estimatedGas: quote.estimatedGas,
      estimatedGasPrice: quote.gasPrice,
      toTokenAmount: (quote.price * value).toFixed(4),
    });

    setIsFetching(false);
    setReceivePriceDollar(quote.price * receiveTokenPrice)
  }

  const flatDeep: any = (arr: any, d = 1) => {
    let flatArray = [];
    if (arr && arr.length) {
      flatArray = d > 0 ? arr.reduce((acc: any, val: any) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
    }
    return flatArray
  };
  const context = useContext(AddressContext);

  const login = () => {
    if (!checkMetaMaskInstallation()) {
      window.location.replace('https://metamask.io/');
    }
    (async () => {
      try {
        const accounts = await getAccounts();
        if (accounts) {
          localStorage.setItem('metamaskAddress', accounts[0] || '');
          context?.setIsAddressAvailable(accounts[0]);
          const chainId = await getChainId();
          localStorage.setItem('metamaskChainId', chainId);
        }
      } catch (errorData: any) {
        console.error(errorData);
        setIsFetching(false);
      }
    })();
  }

  const [dexslippage, setDexslippage] = useState(1);
  const [dexgas, setDexgas] = useState("");

  const trySwap = async () => {
    login();
    setIsFetching(true);
    const metaMaskAddress = localStorage.getItem('metamaskAddress');
    const slippage = dexslippage
    const gasPrice = estimatedResult.estimatedGas

    if (metaMaskAddress) {
      const amount = Math.floor(Number(
        currentTradeValue * 10 ** receiveDecimal
      ))

      if (checkToApproveNativeToken()) {
        // const approveResult = await approveToken(from.platforms, amount, metaMaskAddress)
        // if (approveResult) {
        //   console.log(approveResult)
          // await swapToken(metaMaskAddress, amount, slippage, gasPrice);
          await swapTokenWithAllowance(metaMaskAddress, amount, slippage, gasPrice);
        // }
      } else {
        await swapToken(metaMaskAddress, amount, slippage, gasPrice);
      }
    }
  }

  const swapToken = async (metaMaskAddress: any, amount: any, slippage: any, gasPrice: any) => {
    try {
      setIsFetching(true);
      const receipt = await doSwapZrx(metaMaskAddress, amount, slippage, gasPrice);

      if (receipt.code >= 100 && receipt.code <= 110) {
        if (receipt.reason === "Validation Failed") {
          const errorReceipt = receipt.validationErrors;
          setMessage(errorReceipt[0].reason);
        } else if(receipt.reason === "Error"){
          const errorReceipt = receipt.values;
          console.log(errorReceipt)
          setMessage(errorReceipt.message);
        }
         else {
          setMessage(receipt.reason);
        }
        setError(true);
      }

      if (receipt && Object.keys(receipt).length) {
        const txHash = await sendTransaction(receipt);
        if (txHash) {
          setMessage(t('EXCHANGE_SWAP_SUCCESS'));
          setError(false);
        }
      }
    } catch (errorData) {
      setMessage("Something Went Wrong");
      setError(true);
    }

    setIsFetching(false);
    toggleSwapSuccessModal(true);
  }

  const swapTokenWithAllowance = async (metaMaskAddress: any, amount: any, slippage: any, gasPrice: any) => {
    try {
      const web3 = new Web3(window.ethereum);
      setIsFetching(true);
      const receipt = await doSwapZrxAllowance(metaMaskAddress, amount, slippage, gasPrice);
      console.log(receipt)
      console.log(metaMaskAddress)
      if (receipt.code >= 100 && receipt.code <= 110) {
        setIsFetching(false);
        if (receipt.reason === "Validation Failed") {
          const errorReceipt = receipt.validationErrors;
          setMessage(errorReceipt[0].reason);
          setError(true);
        } else if(receipt.reason === "Error"){
          const errorReceipt = receipt.values;
          setMessage(errorReceipt.message);
          setError(true);
        }else {
          setMessage(receipt.reason);
          setError(true);
        }

      }else{        
        const BscABI = await axios.get(`https://api.bscscan.com/api`, {
            params: {
              module: 'contract',
              action: 'getabi',
              address: receipt.sellTokenAddress,
            }
        })
        const TokenAbi = JSON.parse(BscABI.data.result);
        const Tokencontract = new web3.eth.Contract(TokenAbi, receipt.sellTokenAddress);
        const maxApproval = new BigNumber(2).pow(256).minus(1);
        await Tokencontract.methods.approve(receipt.allowanceTarget, maxApproval).send({from: metaMaskAddress, chainId: 56})
        .then((data: any) => {
          setMessage("Token Spend Allowed");
          toggleSwapSuccessModal(true)
          setError(false);
        })
        .then(async () => {
          const txHash = await web3.eth.sendTransaction({
            from: metaMaskAddress,
            data: receipt.data,
            gas: receipt.gas,
            to: receipt.allowanceTarget,
            chainId: 56
          });
          if (txHash) {
            setMessage(t('EXCHANGE_SWAP_SUCCESS'));
            setError(false);
          }else{
            setMessage("Something Went Wrong!");
            setError(true);
          }
        })
        .catch(() => {
            setMessage("Token Spend Allowance Failed");
            setError(true);
        });
      }
    } catch (errorData) {
      setMessage("Something Went Wrong");
      setError(true);
    }

    setIsFetching(false);
    toggleSwapSuccessModal(true);
  }

  const checkToApproveNativeToken = () => {
    let isCheckNativeToken = true;
    if ((platformId === 1 && from.symbol === "ETH") || (platformId === 56 && from.symbol === "BNB")) {
      isCheckNativeToken = false;
    }
    return isCheckNativeToken
  }

  const approveToken = async (tokenAddress: any, amount: any, account: any) => {
    try {
      const approveCallDataResponse = await approveCallData(platformId, tokenAddress, amount);
      const approveSenderResponse = await approveSpender(platformId);

      if (approveCallDataResponse &&
        Object.keys(approveCallDataResponse).length &&
        approveSenderResponse &&
        Object.keys(approveSenderResponse).length
      ) {
        approveCallDataResponse.from = account;
        return await sendTransaction(approveCallDataResponse);
      }

      return false
    } catch (e) {
      return false
    }
  }

  const doSwapZrx = (address: any, amount: any, slippage: any, gasPrice: any) => {
    return getSwapZrx(
      platformId,
      from.platforms,
      to.platforms,
      amount,
      address,
      slippage,
      gasPrice,
    );
  }
  const doSwapZrxAllowance = (address: any, amount: any, slippage: any, gasPrice: any) => {
    return getSwapAllowance(
      platformId,
      from.platforms,
      to.platforms,
      amount,
      address,
      slippage,
      gasPrice,
    );
  }

  const currentTradeHandler = (e: any) => {
    // eslint-disable-next-line
    const value = e.target.value.replace(/[^-(?!0*\.?0+$)\d*\.?\d+$]/, '');
    if (value === '') {
      setCurrentTradeValue('')
    }

    if (parseInt(value, 10) >= 0) {
      const tokenValue = value * tradeTokenPrice;
      setTradePriceDollar(tokenValue);
      setCurrentTradeValue(value);
      getVal(parseFloat(value));
    }
  }

  const calculateBalance = async (token: any) => {
    const addressDetails: any = localStorage.getItem('metamaskAddress');
    let balance = 0;

    if (!addressDetails || addressDetails === 'undefined') {
      history.push('/wallet/metamask/dex');
      return 0;
    }

    setIsFetching(true);

    try {
      if (token.symbol.toLowerCase() === "bnb" || token.symbol.toLowerCase() === "eth") {
        const res = await getNativeTokenBalance(addressDetails, selectedPlatform.chain);
        balance = parseInt(res?.data.balance, 10) || 0;
      } else {
        const res: any = await getOtherTokenBalance(addressDetails, selectedPlatform.chain);
        if (res.data.length) {
          balance = parseInt(res.data.find((e: any) => (e.token_address === token.platforms))?.balance, 10) || 0;
        }
      }
    } catch (err: any) {
      console.log(err);
    }

    setIsFetching(false);
    return balance;
  }

  useEffect(() => {
    getCoinHistoric(from.id, endDate).then((res: any) => {
      setTradeTokenPrice(parseFloat(res?.market_data?.current_price?.usd) || 0);
    });

    getTokenMetaData(from.platforms, selectedPlatform.chain).then((res: any) => {
      setTradeDecimal(parseInt(res?.data?.[0]?.decimals, 10) || 18);
    });

    calculateBalance(from).then(balance => {
      setTradeBalance(balance);
    });
  }, [from, selectedPlatform])

  useEffect(() => {
    getCoinHistoric(to.id, endDate).then((res: any) => {
      setReceiveTokenPrice(parseFloat(res?.market_data?.current_price?.usd) || 0)
    });

    getTokenMetaData(to.platforms, selectedPlatform.chain).then((res: any) => {
      setReceiveDecimal(parseInt(res.data?.[0]?.decimals, 10) || 18);
    });

    calculateBalance(to).then(balance => {
      setReceiveBalance(balance);
    });
  }, [to, selectedPlatform])

  const [isSwitch, setSwitch] = useState(false);

  const handleTokenSwitch = () => {
    if (isSwap) {
      return
    }
    setTo(from);
    setFrom(to);
    setSwap(true);
    setSwitch(true);
  }

  useEffect(() => {
    if (isSwitch) {
      const toData = Number(tradePriceDollar / tradeTokenPrice).toFixed(4);
      setCurrentTradeValue(toData)
      setSwitch(false);
      currentTradeHandler({ target: { value: toData.toString() } })
    }
  }, [isSwitch]);

  return (isLoading ? (
    <div style={{
      position: 'relative',
      left: '45%', top: '40%',
      width: '10px'
    }}>
      <PreLoader />
    </div>
  ) : (
    <div className='exchange-token-container'>
      <div className="right-Section" >
        <TradingViewChart 
          base={from.symbol}
          quote={to.symbol}
        />
      </div>
      <div className='exchange-token'>
        <div>
          <div className={classes.labelContainer}>
            <div className={classes.label}>Trade</div>
            <div className={classes.label}>Balance : {(tradeBalance / 10 ** tradeDecimal).toFixed(4)}</div>
          </div>
          <div className={classes.priceContainer} style={{ justifyContent: 'end' }}>
            <div className={classes.label}>Price : $ {(Math.round(tradePriceDollar * 100) / 100).toFixed(4)}
            </div>
          </div>
          <div style={{ marginBottom: '20px', display: "flex" }}>
            <InputField
              hiddenLabel
              variant="outlined"
              type="number"
              name="amount"
              step='0.01'
              value={currentTradeValue}
              onChange={(e: any) => currentTradeHandler(e)}
              style={{ width: 'calc(100% - 80px)', flexBasis: "67%" }}
            />
            <SelectTokenModal
              isTrade
              isSelectedAddress
              setAddress={addressHandler}
              tokenList={tokenFilterList}
              isOpen={isTokenModalOpen}
              setSelectedToken={setFrom}
              selectedToken={from}
              toggleModal={toggleTokenModalOpen}
            />
            <FormControl style={{ flexBasis: "33%" }}>
              <Button className={classes.tokenButton} onClick={handleMenuOpen}>
                {from.logoUrl ? <img className={classes.tokenImage} src={from.logoUrl} alt="logourl" /> : null}
                <div className={classes.symbol} title={from.symbol}>{from.symbol}</div>
                <ArrowDropDownIcon className={classes.dropdownIcon} />
              </Button>
            </FormControl>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '0px' }}>
          {isFetching ? <PreLoader /> : <ImportExportIcon onClick={handleTokenSwitch}
            className={isSwap ? classes.disabledExportIcon : classes.exportIcon} />}
        </div>
        <div>
          <div className={classes.labelContainer}>
            <div className={classes.label}>Receive</div>
            <div className={classes.label}>Balance :{(receiveBalance / 10 ** receiveDecimal).toFixed(4)}</div>
          </div>
          <div className={classes.priceContainer} style={{ justifyContent: 'end' }}>
            <div className={classes.label}>Price : $ {(Math.round(receivePriceDollar * 100) / 100).toFixed(4)}
            </div>
          </div>
          <div style={{ marginBottom: '20px', display: "flex" }}>
            <InputField
              hiddenLabel
              variant="outlined"
              type="number"
              name="amount"
              step='0.01'
              value={estimatedResult.toTokenAmount}
              style={{ width: 'calc(100% - 80px)', flexBasis: "67%" }}
            />
            <SelectTokenModal
              isReceive
              isSelectedAddress
              setAddress={addressHandler}
              tokenList={tokenFilterList}
              isOpen={isReceiveModalOpen}
              setSelectedToken={setTo}
              selectedToken={to}
              toggleModal={toggleReceiveModalOpen}
            />
            <FormControl style={{ flexBasis: "33%" }}
            >
              <Button className={classes.tokenButton} onClick={handleReceiveMenuOpen}>
                {to.logoUrl ? <img className={classes.tokenImage} src={to.logoUrl} alt="logourl" /> : null}
                <div className={classes.symbol} title={to.symbol}>{to.symbol}</div>
                <ArrowDropDownIcon className={classes.dropdownIcon} />
              </Button>
            </FormControl>
          </div>
        </div>
        <div className='slippage-select'>
          <div style={{ fontSize: "13px", color: "white", opacity: "0.8" }}>Slippage</div>
          <select style={{
            border: "none",
            width: "100%",
            marginTop: "10px",
            background: "#191919",
            padding: "20px 10px",
            color: "#fff",
          }} onChange={e => setDexslippage(+e.target.value)}>
            {Array.from(Array(10), (e, i = 1) => {
              return (
                <option value={i + 1} key={i}>{i + 1}%</option>
              )
            })}
          </select>
        </div>
        <div className='gas-select' style={{ marginTop: "20px" }}>
          <div style={{ fontSize: "13px", color: "white", opacity: "0.8" }}>Gas Option</div>
          <input
            // type="number"
            value={estimatedResult?.estimatedGas}
            style={{
              border: "none",
              width: "100%",
              marginTop: "10px",
              background: "#191919",
              padding: "20px 10px",
              color: "#fff",
            }} onChange={e => setDexgas(e.target.value)} />
        </div>

        <ExchangeCost estimatedResult={estimatedResult} />
        <br />
        <Button disabled={(estimatedResult.toTokenAmount === '' && currentTradeValue === '') || isLoading || isFetching} style={{ width: '100%', backgroundColor: '#FFC765' }} variant="contained" onClick={trySwap} >{t('EXCHANGE')}</Button>
      </div>
      <SuccessSwap error={error} message={message} isOpen={isSwapSuccessModal} setShowModal={toggleSwapSuccessModal} />
    </div >
  ));
}

export default ExchangeToken;
