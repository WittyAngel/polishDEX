import axios from 'axios';

export const getPrice = async (currency: string) => {
  try {
    const response = await axios.get(
      'https://api-instant.ramp.network/api/host-api/assets',
    );
    if (
      response &&
      response.status === 200 &&
      response.data &&
      response.data.assets
    ) {
      const currencyAsset = response.data.assets.find(
        (asset: any) => asset.symbol === currency,
      );
      return currencyAsset.price.USD;
    }
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
