import React, { useState, useEffect } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
let url = "";

url = "https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=";
// url = "https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=1&interval=";
const currencyName = "Bitcoin";

const LitecoinGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
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
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);
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
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )}
    </React.Fragment>
  );
};

export default LitecoinGraph;
