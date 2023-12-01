import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getIndexxTokenPrices } from "../../services/api";

const url = "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=";
const currencyName = "IndexxExchange";
const currencySymbol = "INEX";

interface IData {
  time: Date;
  price: number;
}

const IndexxExchangeGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [modifiedData, setModifiedData] = useState<IData[]>([]);
  const [INEXPrice, setINEXPrice] = useState() as any;
  const [INEXPriceChange, setINEXPriceChange] = useState() as any;
  //Custom Hook for Fetching Data using Fetch API
  const {
    // yearClickHandler,
    monthClickHandler,
    weekClickHandler,
    dayClickHandler,
    hourClickHandler,
    value,
    api,
    day
  } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      // Add a condition to avoid unnecessary fetching
      if (!modifiedData || modifiedData.length === 0) {
        try {
          await api(url);
          if (value && value.length > 0) {
            const modified = value.map((item: any) => ({
              ...item,
              price: item.price + 1
            }));
            setModifiedData(modified);
          }
        } catch (error: any) {
          setError(error.message);
        }
      }
    };

    const fetchINEXPrice = async () => {
      // Fetch price data only if not already fetched
      if (!INEXPrice || !INEXPriceChange) {
        try {
          const res = await getIndexxTokenPrices();
          setINEXPrice(res.data?.INEXPrice);
          setINEXPriceChange(res.data?.INEXpriceChangePercent);
        } catch (error: any) {
          setError(error.message);
        }
      }
    };

    if (!date) {
      setDate(Date);
    }
    fetchData();
    fetchINEXPrice();
  }, [api, url, value, modifiedData, INEXPrice, INEXPriceChange, date, day]);


  return (
    <React.Fragment>
      {!error ? (
        <LineGraph
          currencyName={currencyName}
          // yearClickHandler={yearClickHandler}
          monthClickHandler={monthClickHandler}
          weekClickHandler={weekClickHandler}
          dayClickHandler={dayClickHandler}
          hourClickHandler={hourClickHandler}
          data={modifiedData} // Pass the modified data here
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
