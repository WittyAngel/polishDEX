import { ChainType, CHAIN_TYPES } from "constants/tokens";

declare let window: any;
const { ethereum } = window;

const selectedWallet = localStorage.getItem('selectedWallet');
if (selectedWallet === 'Metamask') {
  ethereum.on('accountsChanged', (accounts: string[]) => {
    const metamaskAddress = localStorage.getItem('metamaskAddress');
    if (metamaskAddress !== accounts[0]) {
      localStorage.setItem('metamaskAddress', accounts[0]);
      window.location.reload();
    }
  });

  ethereum.on('chainChanged', (chainId: any) => {
    const metamaskChainId = localStorage.getItem('metamaskChainId');
    if (metamaskChainId !== chainId) {
      localStorage.setItem('metamaskChainId', chainId);
      window.location.reload();
    }
  });
}

export const checkMetaMaskInstallation = () => {
  if (typeof ethereum === 'undefined') {
    return false;
  }
  return true;
};

export const getAccounts = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    return accounts;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getChainId = async () => {
  try {
    const chainId = await ethereum.request({
      method: 'eth_chainId',
    });

    return chainId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getBalance = async (address: string) => {
  try {
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return parseInt(balance, 16) / 1000000000000000000;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendTransaction = async (tx: any) => {
  const transactionParameters = {
    ...tx,
    gas: tx.gas ? `0x${Number(tx.gas).toString(16)}` : '0xea60',
    gasPrice: tx.gasPrice ? `0x${Number(tx.gasPrice).toString(16)}` : '0x0',
    value: tx.value ? `0x${Number(tx.value).toString(16)}` : '0x0'
  };
  try {
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return txHash;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const changeNetwork = async (chain: ChainType) => {
  try {
    const chainId = chain === CHAIN_TYPES.bsc ? `0x56` : '0x1'
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    });
    localStorage.setItem('metamaskChainId', chainId);
    return true
  } catch (error) {
    return false;
  }
};
