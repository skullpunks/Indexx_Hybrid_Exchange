import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice, getIndexxTokenPrices } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/bitcoin-cash/market_chart?vs_currency=usd&days=";
const currencyName = "Bitcoin Cash";
const currencySymbol = "BCH"

const BCHGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [BCHPrice, setBCHPrice] = useState() as any;
  const [BCHPriceChange, setBCHPriceChange] = useState() as any;
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
    getBCHCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getBCHCoinPrice = async () => {
    const res = await getCryptoPrice('BCH');
    setBCHPrice(res.data.lastPrice);
    setBCHPriceChange(res.data.priceChangePercent)
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
          currencyPrice={BCHPrice}
          currencyPriceChange={BCHPriceChange}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )} */}
      <AdvancedRealTimeChartComponent coin={"BCH"} />
    </React.Fragment>
  );
};
export default BCHGraph;
