import React, { useMemo, useState, useEffect, useContext } from 'react';
import { AddressContext } from 'context/AddressContext';

import { Link, useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import WalletMenuModal from 'components/WalletMenu/WalletMenuModal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';
import { PreLoader } from 'components/UI/PreLoader';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCoinMarketPrices } from 'api/coingecko/coins';
import dayjs from 'dayjs';
import { useCoinContext } from 'context/CoinContext';
import { findCoinGeckoTokenId } from 'modules/tokens/findCoinGeckoTokenId';
import ErrorModal from './ErrorModal';

import { useWalletDetailStyles } from './styles';
import { checkMetaMaskInstallation, getAccounts } from './metamask';
import WalletDetailsCurrency from './WalletDetailsCurrency';
import WalletDetailsCurrencyDetails from './WalletDetailsCurrencyDetails';
import { generateToken } from '../../api/moralis/base';
import { getERC20Balances } from '../../api/moralis/accounts';

// const Moralis = require('moralis');
const WALLET_TYPE = [
  {
    name: 'Ethereum',
    value: 'Eth',
  },
  {
    name: 'Binance Smart chain',
    value: 'bsc',
  },
  {
    name: 'Polygon',
    value: 'Matic',
  },
];
const WalletDetails = () => {
  const classes = useWalletDetailStyles();
  const [currencyList, setCurrencyList] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('bsc');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReceiveModalOpen, toggleReceiveModal] = useState(false);
  const [isErrorModal, toggleErrorModal] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState({
    name: 'Ethereum',
    value: 'Eth',
  });
  const { t } = useTranslation();
  const history = useHistory();
  const context = useContext(AddressContext);
  const { coins } = useCoinContext();
  const endDate = dayjs(new Date()).endOf('day').toDate();

  if (!checkMetaMaskInstallation()) {
    history.push('/wallet');
  }



  useEffect(() => {
    const localSelctedWalletType = localStorage.getItem(
      'localSelctedWalletType',
    );
    if (!localSelctedWalletType || localSelctedWalletType === '') {
      localStorage.setItem(
        'localSelctedWalletType',
        JSON.stringify({
          name: 'Ethereum',
          value: 'Eth',
        }),
      );
    } else {
      setSelectedWalletType(JSON.parse(localSelctedWalletType!));
    }
    // eslint-disable-next-line
  }, [localStorage.getItem(
    'localSelctedWalletType',
  )!]);

  useEffect(() => {
    const localSelectedWallet = localStorage.getItem('selectedWallet');
    setSelectedWallet(localStorage.getItem('selectedWallet')!);
    if (localSelectedWallet === 'KRYPTO Wallet') {
      const tykloAddress = localStorage.getItem('tykloAddress');
      setAddress(tykloAddress!);
    } else if (localSelectedWallet === 'Metamask') {
      (async () => {
        const accounts = await getAccounts();
        if (!accounts) {
          console.error('Metamask is not connected.!');
          history.push('/wallet');
        }
      })();
      const metamaskAddress = localStorage.getItem('metamaskAddress');
      if (!metamaskAddress) {
        console.error('Unable to detect address');
        history.push('/wallet');
      }
      setAddress(metamaskAddress!);

      const metamaskChainId = localStorage.getItem('metamaskChainId');
      if (!metamaskChainId) {
        console.error('Unable to detect chain id');
        history.push('/wallet');
      }
      setChainId(metamaskChainId!);
    }
  });

  const decideChain = () => {
    let chain: any = null;
    if (selectedWalletType.value === 'bsc') {
      chain = 'binance-smart-chain'
    } else if (selectedWalletType.value === 'Eth') {
      chain = 'ethereum'
    } else {
      chain = 'polygon-pos'
    }
    return chain
  }


  const mapCurrencyWithIcon = async (currency: any) => {
    const mapData: any = [];
    setCurrencyList([]);

    if (!currency) {
      return
    }

    currency.forEach(async (element: any) => {
      const temp = element;
      const tokenId = findCoinGeckoTokenId(
        coins!,
        element.name === 'Matic Token' ? 'Polygon' : element.name,
        element.symbol,
        element.tokenAddress,
        decideChain()
      );

      if (tokenId) {
        getLogoFromHistory(tokenId).then(data => {
          setIsLoading(true);

          temp.logo = data;
          if (temp.name === 'Binance Coin' || temp.name === 'Ether' || temp.name === 'Matic Token') {
            mapData.unshift(temp);
          } else {
            mapData.push(temp);
          }
          setCurrencyList([...mapData]);
          setIsLoading(false);
        }, error => {
          setIsLoading(false);
        });
      }
    });
  }

  const getLogoFromHistory = async (id: any) => {
    let historyData: any = await getCoinMarketPrices(id, endDate);

    try {
      historyData = await getCoinMarketPrices(id, endDate);
    } catch (error) {
      toggleErrorModal(!isErrorModal)
    }
    if (historyData.error) {
      toggleErrorModal(true)
      return null;
    }
    return historyData?.image?.small;
  }

  const getLogoBasedOnWallet = () => {
    let logo = require(`assets/ethereum.png`).default;
    if (selectedWalletType.value === 'bsc') {
      logo = require(`assets/binance-chain-icon.png`).default;
    } else if (selectedWalletType.value === 'Matic') {
      logo = require(`assets/polygon.png`).default;
    }
    return logo;
  }

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (address && selectedWalletType.value) {
          const balances = (await getERC20Balances(address, selectedWalletType.value)).map(
            (bal: any) => ({
              name: bal.name,
              balance: (+bal.balance / 1000000000000000000).toFixed(5),
              symbol: bal.symbol,
              logo: require(`assets/ethereum.png`).default,
              tokenAddress: bal.tokenAddress
            }),
          );
          if (balances) {
            setIsLoading(false);
            mapCurrencyWithIcon(balances);

          } else {
            throw new Error('Unable to fetch balance');
          }
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
    })();
  }, [
    context?.isAddressAvailable,
    localStorage.getItem('selectedWallet')!,
    localStorage.getItem('tykloAddress')!,
    selectedWallet,
    address,
    chainId,
    selectedWalletType,
  ]);

  const handleMenuOpen = () => {
    toggleReceiveModal(!isReceiveModalOpen);
  };

  return isLoading ? <PreLoader /> : (
    <div className={classes.container}>
      <WalletMenuModal
        walletList={WALLET_TYPE}
        isOpen={isReceiveModalOpen}
        setSelectedWalletType={setSelectedWalletType}
        selectedWalletType={selectedWalletType}
        openRegisterModal={toggleReceiveModal}
        toggleForgotPwdModal={toggleReceiveModal}
        toggleModal={toggleReceiveModal}
      />

      <ErrorModal isOpen={isErrorModal} toggleModal={toggleErrorModal} />
      <div className={classes.heading}>
        <div
          className={clsx(classes.initialsWrapper)}
          onMouseDown={handleMenuOpen}
          aria-hidden="true"
        >
          <div className={classes.addressDetails}>
            <div className={classes.userNameDetails}>
              <span className={classes.userName}>{selectedWalletType?.name}</span>
            </div>
          </div>
          <ArrowDropDownIcon className={classes.dropdownIcon} />
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.your_holding_box}>
          <h5 className={classes.box_heading}>{t('YOUR_HOLDING')}</h5>
          <div className={classes.currency_container}>
            {currencyList && currencyList.map((currency: any, i: number) => (
              <div key={currency.name}>
                <WalletDetailsCurrency
                  currency={currency}
                  active={i === 0}
                  selectedWalletType={selectedWalletType}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.coin_details_box}>
          {currencyList && currencyList.length > 0 ? (
            <WalletDetailsCurrencyDetails
              address={address}
              chainId={chainId}
              currency={currencyList[0]}
              selectedWalletType={selectedWalletType?.value}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WalletDetails);
