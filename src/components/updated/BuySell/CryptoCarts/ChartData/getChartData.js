import axios from 'axios';

export const getCryptoHistoricalData = async (symbol) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days: '30',
      },
    }
  );

  return response.data.prices.map(([time, value]) => ({
    time: time / 1000,
    value,
  }));
};
