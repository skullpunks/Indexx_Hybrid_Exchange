import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=usd&days=";
const currencyName = "Dogecoin";
const currencySymbol = "DOGE";
const DogecoinGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [DOGEPrice, setDOGEPrice] = useState() as any;
  const [DOGEPriceChange, setDOGEPriceChange] = useState() as any;
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
    getDOGECoinPrice();
    api(url).catch((error) => {

      setError(error.message);
    });
  }, [api]);

  const getDOGECoinPrice = async () => {
    const res = await getCryptoPrice('DOGE');
    setDOGEPrice(res.data.lastPrice);
    setDOGEPriceChange(res.data.priceChangePercent)
  }

  return (
    <React.Fragment>
      {/* {!error ? (
        <LineGraph
          currencyName={currencyName}
          yearClickHandler={yearClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          hourClickHandler={hourClickHandler}
          data={data}
          date={date}
          currencyPrice={DOGEPrice}
          currencyPriceChange={DOGEPriceChange}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )} */}

      <AdvancedRealTimeChartComponent coin={"DOGE"} />
    </React.Fragment>
  );
};

export default DogecoinGraph;
