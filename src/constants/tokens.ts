import keyMirror from 'keymirror';


export type ChainType = 'eth' | 'bsc';

export const CHAIN_TYPES = keyMirror<{ [key in ChainType]: null }>({
  eth: null,
  bsc: null,
});

export const DEFAULT_CHAIN: ChainType = CHAIN_TYPES.bsc;

export interface Platform {
  name: string;
  defaultImg: any;
  chain: ChainType;
};

export const PLATFORM_ITEMS: Platform[] = [
  {
    name: 'Ethereum',
    defaultImg: require('assets/ethereum-icon.png'),
    chain: CHAIN_TYPES.eth,
  },
  {
    name: 'BSC Mainnet',
    defaultImg: require('assets/binance-coin-logo-png-transparent.png'),
    chain: CHAIN_TYPES.bsc,
  },
];

export const DEFAULT_PLATFORM = PLATFORM_ITEMS.find(p => p.chain === DEFAULT_CHAIN) || PLATFORM_ITEMS[0];

export const DEFAULT_TOKENS = [
  {
    platforms: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoUrl: "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
    symbol: "BNB",
    id: 'binancecoin'
  },
  {
    platforms: '0x55d398326f99059ff775485246999027b3197955',
    decimals: 6,
    logoUrl: "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    symbol: "USDT",
    id: 'tether'
  },
  {
    platforms: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    decimals: 18,
    logoUrl: "https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
    symbol: "BUSD",
    id: 'binance-usd'
  },
  {
    platforms: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    decimals: 18,
    logoUrl: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    symbol: "ETH",
    id: 'ethereum'
  },
  {
    platforms: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    decimals: 18,
    logoUrl: "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    symbol: "DAI",
    id: 'dai'
  },
  {
    platforms: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    decimals: 18,
    logoUrl: "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    symbol: "USDC",
    id: 'usd-coin'
  }
];