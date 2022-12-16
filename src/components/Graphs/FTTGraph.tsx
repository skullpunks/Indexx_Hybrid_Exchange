import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCoinPriceByName } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/ftx-token/market_chart?vs_currency=usd&days=";
const currencyName = "FTX Token";
const currencySymbol = "FTT";
const FTTGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [FTTPrice, setFTTPrice] = useState() as any;
  const [FTTPriceChange, setFTTPriceChange] = useState() as any;
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
    getBNBCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getBNBCoinPrice = async () => {
    const res = await getCoinPriceByName('FTT');
    setFTTPrice(res.data?.results?.data);
    setFTTPriceChange(res.data.priceChangePercent)
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
          currencyPrice={FTTPrice}
          currencyPriceChange={FTTPriceChange}
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

export default FTTGraph;
