import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/stellar/market_chart?vs_currency=usd&days=";
const currencyName = "IndexxExchange";
const currencySymbol = "INEX";

const IndexxExchangeGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [INEXPrice, setINEXPrice] = useState() as any;
  const [INEXPriceChange, setINEXPriceChange] = useState() as any;
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
    getINEXCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getINEXCoinPrice = async () => {
    const res = await getIndexxTokenPrices();
    setINEXPrice(res.data?.INXCPrice);
    setINEXPriceChange(res.data?.INXCpriceChangePercent)
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
          currencyPrice={Math.round(INEXPrice * 100) / 100}
          currencyPriceChange={INEXPriceChange}
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
export default IndexxExchangeGraph;
