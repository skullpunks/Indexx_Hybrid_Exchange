import React, { useState, useEffect } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice}  from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=";
const currencyName = "Bitcoin";
const currencySymbol = "BTCB";

const BitcoinGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [BTCPrice, setBTCPrice] = useState() as any;
  const [BTCPriceChange, setBTCPriceChange] = useState() as any;
  //Custom Hook for Fetching Data using Fetch API
  const {
    yearClickHandler,
    monthClickHandler,
    weekClickHandler,
    dayClickHandler,
    hourClickHandler,
    value: data,
    api,
  } = useFetch();

  useEffect(() => {
    setDate(Date);
    getBTCCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getBTCCoinPrice = async () => {
    const res = await getCryptoPrice('BTC');
    setBTCPrice(res.data.lastPrice);
    setBTCPriceChange(res.data.priceChangePercent)
    console.log(res.data)
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
          hourClickHandler={hourClickHandler}
          data={data}
          date={date}
          currencyPrice={BTCPrice}
          currencyPriceChange={BTCPriceChange}
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

export default BitcoinGraph;
