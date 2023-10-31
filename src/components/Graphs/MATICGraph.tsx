import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice, getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=";
const currencyName = "Polygon";
const currencySymbol = "MATIC"

const MATICGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [MATICPrice, setMATICPrice] = useState() as any;
  const [MATICPriceChange, setMATICPriceChange] = useState() as any;
  //Custom Hook for Fetching Data using Fetch API
  const {
    monthClickHandler,
    weekClickHandler,
    dayClickHandler,
    hourClickHandler,
    value: data,
    api,
  } = useFetch();

  useEffect(() => {
    setDate(Date);
    getMATICCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getMATICCoinPrice = async () => {
    const res = await getCryptoPrice('MATIC');
    setMATICPrice(res.data.lastPrice);
    setMATICPriceChange(res.data.priceChangePercent)
  }

  return (
    <React.Fragment>
      {!error ? (
        <LineGraph
          currencyName={currencyName}
          yearClickHandler={monthClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          hourClickHandler={hourClickHandler}
          data={data}
          date={date}
          currencyPrice={MATICPrice}
          currencyPriceChange={MATICPriceChange}
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
export default MATICGraph;
