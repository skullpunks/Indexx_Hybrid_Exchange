import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";

const url = "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=";
const currencyName = "tether";

const IndexxUSDPGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  //Custom Hook for Fetching Data using Fetch API
  const {
    yearClickHandler,
    monthClickHandler,
    weekClickHandler,
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
export default IndexxUSDPGraph;
