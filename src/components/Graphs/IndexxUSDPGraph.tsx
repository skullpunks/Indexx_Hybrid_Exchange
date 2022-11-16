import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=";
const currencyName = "IndexxUSD+";
const currencySymbol = "IUSD+";

const IndexxUSDPGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [IUSDPPrice, setIUSDPPrice] = useState() as any;
  const [IUSDPPriceChange, setIUSDPPriceChange] = useState() as any;
  //Custom Hook for Fetching Data using Fetch API
  const {
    // yearClickHandler,
    monthClickHandler,
    weekClickHandler,
    dayClickHandler,
    value: data,
    api,
  } = useFetch();

  useEffect(() => {
    setDate(Date);
    getIUSDPCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getIUSDPCoinPrice = async () => {
    const res = await getIndexxTokenPrices();
    setIUSDPPrice(res.data?.IUSDPPrice);
    setIUSDPPriceChange(res.data?.IUSDPpriceChangePercent)
}

  return (
    <React.Fragment>
      {!error ? (
        <LineGraph
          currencyName={currencyName}
          // yearClickHandler={yearClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          data={data}
          date={date}
          currencyPrice={Math.round(IUSDPPrice * 100) / 100}
          currencyPriceChange={IUSDPPriceChange}
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
export default IndexxUSDPGraph;
