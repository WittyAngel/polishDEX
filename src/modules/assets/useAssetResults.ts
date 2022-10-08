import { useMemo } from 'react';
import { useCoinContext } from '../../context/CoinContext';
import { Assets, TokenValue } from './getAssetsFromTransactions';
import { useMultipleCoinDetails } from '../tokens/useCoinDetails';
import { notEmpty, sum } from '../../utils/array';
import { calculateTokenValue } from '../tokens/calculateTokenValue';
import { findCoinGeckoTokenId } from '../tokens/findCoinGeckoTokenId';

export interface TokensAndPrice {
  value: TokenValue;
  priceInUsd: number | undefined;
  tokenPrice: number | undefined;
}
export type TokensAndPrices = TokensAndPrice[] | null;

export const useAssetResults = (
  assets: Assets | null,
  date: Date,
  chain = 'ethereum',
) => {
  const { coins } = useCoinContext();

  const coinGeckoTokenIds = useMemo(() => {
    if (!assets) {
      return [];
    }

    return Object.values(assets).map((asset) => {
      const tokenId = findCoinGeckoTokenId(
        coins!,
        asset.name,
        asset.symbol,
        asset.tokenAddress,
        asset.chain ?? chain,
      );
      return tokenId;
    });
  }, [assets, coins]);


  const { coinPrices, coinImages, isFetching, hasFetched, error } = useMultipleCoinDetails(
    coinGeckoTokenIds,
    date,
  );


  const totalValueOfAllTokens = useMemo(() => {
    if (!assets) {
      return 0;
    }

    return Object.values(assets)
      .map((value, index) => {
        const tokenPrice = coinPrices[index];

        const priceInUsd = calculateTokenValue(
          value.value,
          value.decimals,
          tokenPrice,
        );
        return priceInUsd;
      })
      .filter(notEmpty)
      .reduce(sum, 0);
  }, [assets, coinPrices]);

  const tokensAndPrices: TokensAndPrices = useMemo(() => {
    if (isFetching || !assets) {
      return null;
    }

    const formattedCoin: any = Object.values(assets).map((value, index) => {
      const tokenPrice = coinPrices[index];
      const tokenIcon = coinImages[index];
      let coinWithMeta: any = {...value, icon: tokenIcon};
      const priceInUsd = calculateTokenValue(
        value.value,
        value.decimals,
        tokenPrice,
      );
      if(!tokenPrice || !priceInUsd || priceInUsd <= 0) return null;

      if (!value.name && !value.symbol) {
        const coinMeta = coins?.find(
          (coin) => coin?.platforms?.[chain] === value.tokenAddress,
        );
        if (coinMeta) {
          coinWithMeta = {
            ...value,
            name: coinMeta.name.toUpperCase(),
            symbol: coinMeta.symbol.toUpperCase(),
            icon: tokenIcon
          };
        }
      }
      return { value: coinWithMeta, priceInUsd, tokenPrice };
    })
    const filtteredValues = formattedCoin.filter((val: any) => val);

    return filtteredValues.sort(
      (a: any, b: any) => (b.priceInUsd ?? 0) - (a.priceInUsd ?? 0),
    );
  }, [assets, coinPrices, isFetching, coinImages, coins, chain]);

  return {
    error,
    isFetching,
    hasFetched,
    tokensAndPrices,
    totalValueOfAllTokens,
  };
};
