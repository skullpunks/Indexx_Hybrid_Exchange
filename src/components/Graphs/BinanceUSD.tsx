import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/binance-usd/market_chart?vs_currency=usd&days=";
const currencyName = "Binance USD";
const currencySymbol = "BUSD"
const BinanceUSD = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [BUSDPrice, setBUSDPrice] = useState() as any;
  const [BUSDPriceChange, setBUSDPriceChange] = useState() as any;
  //Custom Hook for Fetching Data using Fetch API
  const {
    yearClickHandler,
    monthClickHandler,
    weekClickHandler,
    dayClickHandler,
    value: data,
    api,
  } = useFetch();

  useEffect(() => {
    setDate(Date);
    getBUSDCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getBUSDCoinPrice = async () => {
    const res = await getCryptoPrice('BUSD');
    setBUSDPrice(res.data.lastPrice);
    setBUSDPriceChange(res.data.priceChangePercent)
}

  return (
    <React.Fragment>
      {!error ? (
        <LineGraph
          currencyName={currencyName}
          yearClickHandler={yearClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          data={data}
          date={date}
          currencyPrice={BUSDPrice}
          currencyPriceChange={BUSDPriceChange}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )}
    </React.Fragment>
  );
};
export default BinanceUSD;
