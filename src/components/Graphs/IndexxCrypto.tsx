import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/uma/market_chart?vs_currency=usd&days=";
const currencyName = "IndexxCrypto";
const currencySymbol = "INXC"

const IndexxCryptoGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [INXCPrice, setINXCPrice] = useState() as any;
  const [INXCPriceChange, setINXCPriceChange] = useState() as any;
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
    getINXCCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getINXCCoinPrice = async () => {
    const res = await getIndexxTokenPrices();
    setINXCPrice(res.data?.INXCPrice);
    setINXCPriceChange(res.data?.INXCpriceChangePercent)
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
          currencyPrice={Math.round(INXCPrice * 100) / 100}
          currencyPriceChange={INXCPriceChange}
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
export default IndexxCryptoGraph;
