import axios from 'axios';

const MASTER_KEY = 'KTafmQv5UDTwbjFkR1NxZXKjbHxnnC9r0HXPRo0N';
export const BSC_SERVER = 'https://deep-index.moralis.io/api/v2/';
const config = { 'x-api-key': 'G1EGoGBgkNhBf9CVNtGvdbnxIUcJMERtC3youo8vqUmqIBbLwbLaJcot6yuiEfy7' };

export const generateToken = async () => {
  try {
    const jwt = await axios.post(
      `${BSC_SERVER}account/generateToken?key=${MASTER_KEY}`,
    );
    if (!jwt?.data) {
      return null;
    }
    localStorage.setItem('MORALIS_TOKEN', jwt.data);
    return jwt.data;
  } catch (e) {
    console.log('error connecting to moralis server', e);
    return null;
  }
};


export const getNativeTokenBalance = async (address: any, chain: any) => {
  try {
    const tokenPrice = await axios.get(
      `${BSC_SERVER}${address}/balance?chain=${chain}`,
      { headers: config }
    );
    return tokenPrice;
  } catch (e) {
    console.log('error connecting to moralis server', e);
    return null;
  }
}

export const getOtherTokenBalance = async (address: any, chain: any) => {
  try {
    const tokenPrice = await axios.get(
      `${BSC_SERVER}${address}/erc20?chain=${chain}`,
      { headers: config }
    );
    return tokenPrice;
  } catch (e) {
    console.log('error connecting to moralis server', e);
    return null;
  }
}

export const getTokenMetaData = async (address: any, chain: any) => {
  try {
    const tokenPrice = await axios.get(
      `${BSC_SERVER}erc20/metadata?chain=${chain}&addresses=${address}`,
      { headers: config }
    );
    return tokenPrice;
  } catch (e) {
    console.log('error connecting to moralis server', e);
    return null;
  }
}