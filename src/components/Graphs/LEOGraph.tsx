import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/leo-token/market_chart?vs_currency=usd&days=";
const currencyName = "UNUS SED LEO";
const currencySymbol = "LEO"
const LEOGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [LEOPrice, setLEOPrice] = useState() as any;
  const [LEOPriceChange, setLEOPriceChange] = useState() as any;
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
    getLEOCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getLEOCoinPrice = async () => {
    const res = await getCryptoPrice('LEO');
    setLEOPrice(res.data.lastPrice);
    setLEOPriceChange(res.data.priceChangePercent)
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
          currencyPrice={LEOPrice}
          currencyPriceChange={LEOPriceChange}
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
export default LEOGraph;
