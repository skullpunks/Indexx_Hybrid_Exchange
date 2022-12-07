import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/ftx-token/market_chart?vs_currency=usd&days=";
const currencyName = "Indexx Phoenix";
const currencySymbol = "INXP";
const IndexxPhoenixGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [INXPPrice, setINXPPrice] = useState() as any;
  const [INXPPriceChange, setINXPPriceChange] = useState() as any;
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
    getBNBCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getBNBCoinPrice = async () => {
    const res = await getIndexxTokenPrices();
    setINXPPrice(res.data?.INXPPrice);
    setINXPPriceChange(res.data?.INXPpriceChangePercent)
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
          currencyPrice={INXPPrice}
          currencyPriceChange={INXPPriceChange}
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

export default IndexxPhoenixGraph;
