import axios from "axios";
import { NOMICS_API_KEY } from "constants/config";

export const NOMICS_BASE_URL = 'https://api.nomics.com/v1/';

type CandleParams = {
  interval: string,
  base: string,
  quote: string,
  start?: string,
  end?: string,
};

export const getCandles = (params: CandleParams) => {
  return axios.get(`${NOMICS_BASE_URL}markets/candles`, {
    params: {
      key: NOMICS_API_KEY,
      ...params,
    }
  });
}