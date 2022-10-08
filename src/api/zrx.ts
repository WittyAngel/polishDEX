import axios from 'axios';
import Web3 from 'web3';
import {
  sendTransaction
} from 'components/Wallets/metamask';

import { BigNumber } from '@0x/utils';

const zrxBaseUrl = 'api.0x.org';

declare let window: any;
export const getQuoteZrx = async (chain: any, currentTrade: any, sellAmount: any) => {
  let quote: any = {};
  let mainChain: any;
  if (chain === 1) {
    mainChain = ''
  } else if (chain === 56) {
    mainChain = 'bsc.'
  }
  try {
    const response = await axios.get(`https://${mainChain}${zrxBaseUrl}/swap/v1/quote`, {
      params: {
        allowanceTarget: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F",
        buyToken: currentTrade.to,
        sellToken: currentTrade.from,
        sellAmount: sellAmount.toLocaleString('fullwide', {useGrouping:false}),
      }
    });
    if (response.status === 200) {
      quote = response.data;
      console.log(quote)
    }
  }
  catch (err) {
    console.error(err);
  }
  return quote;
}

export const getSwapZrx = async (
  chain: any,
  sellToken: any,
  buyToken: any,
  sellAmount: any,
  takerAddress: any,
  slippagePercentage: any,
  gasPrice: any
) => {
  let swapData: any = {};
  const web3 = new Web3(window.ethereum);
  try {
    let mainChain: any;
    let includedSources: any;
    if (chain === 1) {
      mainChain = ''
    } else if (chain === 56) {
      mainChain = 'bsc.'
      includedSources = 'PancakeSwap_v2'
    }
    const params = {
      buyToken,
      sellToken,
      sellAmount,
      takerAddress,
      slippagePercentage,
      feeRecipient: "0x353bd3Ac80f6A2C602F96b255B920bf4669Ce344",
      buyTokenPercentageFee: 0.15,
    }
    const qs = require('qs');
    const response = await fetch(`https://${mainChain}${zrxBaseUrl}/swap/v1/quote?${qs.stringify(params)}`);

    swapData = await response.json();
  }
  catch (err) {
    console.error(err);
  }
  return swapData;
}

export const getSwapAllowance = async (
  chain: any,
  sellToken: any,
  buyToken: any,
  sellAmount: any,
  takerAddress: any,
  slippagePercentage: any,
  gasPrice: any
) => {
  let swapData: any = {};
  try {
    let mainChain: any;
    let includedSources: any;
    if (chain === 1) {
      mainChain = ''
    } else if (chain === 56) {
      mainChain = 'bsc.'
      includedSources = 'PancakeSwap'
    }
    const params = {
      buyToken,
      sellToken,
      sellAmount,
      // takerAddress,
      slippagePercentage,
      feeRecipient: "0x353bd3Ac80f6A2C602F96b255B920bf4669Ce344",
      buyTokenPercentageFee: 1,
    }
    const qs = require('qs');
    const response = await fetch(`https://${mainChain}${zrxBaseUrl}/swap/v1/quote?${qs.stringify(params)}`);
    
    const quote = await response.clone().json();
    swapData = quote;

    
  }
  catch (err) {
    console.error(err);
  }
  return swapData;
}



export const getTokenListZrx = async () => {
  let tokenList: any = [];
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
    if (response.status === 200) {
      tokenList = response.data;
    }
  }
  catch (err) {
    console.error(err);
  }
  return tokenList;
}

