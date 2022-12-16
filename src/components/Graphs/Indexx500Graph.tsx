import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/gains-network/market_chart?vs_currency=usd&days=";
const currencyName = "Indexx500";
const currencySymbol = "IN500"

const Indexx500Graph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [IN500Price, setIN500Price] = useState() as any;
  const [IN500PriceChange, setIN500PriceChange] = useState() as any;
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
    getIN500CoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getIN500CoinPrice = async () => {
    const res = await getIndexxTokenPrices();
    setIN500Price(res.data?.IN500Price);
    setIN500PriceChange(res.data?.IN500priceChangePercent)
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
          currencyPrice={IN500Price}
          currencyPriceChange={IN500PriceChange}
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
export default Indexx500Graph;
