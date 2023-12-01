import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice, getIndexxTokenPrices } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=usd&days=";
const currencyName = "Polkadaot";
const currencySymbol = "DOT"

const DOTGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [DOTPrice, setDOTPrice] = useState() as any;
  const [DOTPriceChange, setDOTPriceChange] = useState() as any;
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
    getDOTCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getDOTCoinPrice = async () => {
    const res = await getCryptoPrice('DOT');
    setDOTPrice(res.data.lastPrice);
    setDOTPriceChange(res.data.priceChangePercent)
  }

  return (
    <React.Fragment>
      {/* {!error ? (
        <LineGraph
          currencyName={currencyName}
          yearClickHandler={monthClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          hourClickHandler={hourClickHandler}
          data={data}
          date={date}
          currencyPrice={DOTPrice}
          currencyPriceChange={DOTPriceChange}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )} */}
      <AdvancedRealTimeChartComponent coin={"DOT"} />

    </React.Fragment>
  );
};
export default DOTGraph;
