import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/toncoin/market_chart?vs_currency=usd&days=";
const currencyName = "Toncoin";
const currencySymbol = "TON";
const ToncoinGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [TONPrice, setTONPrice] = useState() as any;
  const [TONPriceChange, setTONPriceChange] = useState() as any;
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
    getTONCoinPrice();
    api(url).catch((error) => {
      
      setError(error.message);
    });
  }, [api]);

  const getTONCoinPrice = async () => {
    const res = await getCryptoPrice('TON');
    setTONPrice(res.data.lastPrice);
    setTONPriceChange(res.data.priceChangePercent)
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
          currencyPrice={TONPrice}
          currencyPriceChange={TONPriceChange}
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

export default ToncoinGraph;
