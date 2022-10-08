import { Platform } from "constants/tokens"

export type ZrxToken = {
  id: string
  name: string
  platforms: {
    ethereum?: string
    'binance-smart-chain'?: string
  }
  symbol: string
}

export type MainState = {
  zrxTokens: ZrxToken[];
  platform: Platform;
}

export type AuxState = {
  platformVisible: boolean;
};

export type RootState = {
  main: MainState;
  aux: AuxState;
}
