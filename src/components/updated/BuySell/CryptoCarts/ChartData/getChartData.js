import axios from 'axios';

export const getCryptoHistoricalData = async (symbol, days = 30) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );

    // Ensure the response data has prices
    if (!response.data || !response.data.prices) {
      throw new Error('Invalid response data');
    }

    // Handle large datasets by reducing the number of data points if needed
    const dataPoints = response.data.prices;
    const maxDataPoints = dataPoints.length; // Limit to a maximum number of data points

    const filteredDataPoints = dataPoints.length > maxDataPoints 
      ? dataPoints.filter((_, index) => index % Math.ceil(dataPoints.length / maxDataPoints) === 0)
      : dataPoints;

    return filteredDataPoints.map(([time, value]) => ({
      time: time / 1000,
      value,
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};
