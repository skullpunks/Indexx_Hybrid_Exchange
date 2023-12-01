// import React, { useEffect, useState } from "react";
// import LineGraph from "../LineGraph/LineGraph";
// import useFetch from "../Hooks/use-fetch";
// import styles from "./Graph.module.css";
// import { getCryptoPrice } from "../../services/api";

// const url = "https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=";
// const currencyName = "Binance Coin";
// const currencySymbol = "BNB";
// const BinanceGraph = () => {
//   //State to update any fetch errors
//   const [error, setError] = useState();
//   const [date, setDate] = useState(Date);
//   const [BNBPrice, setBNBPrice] = useState() as any;
//   const [BNBPriceChange, setBNBPriceChange] = useState() as any;
//   //Custom Hook for Fetching Data using Fetch API
//   const {
//     yearClickHandler,
//     monthClickHandler,
//     weekClickHandler,
//     dayClickHandler,
//     hourClickHandler,
//     value: data,
//     api,
//   } = useFetch();

//   useEffect(() => {
//     setDate(Date);
//     getBNBCoinPrice();
//     api(url).catch((error) => {
      
//       setError(error.message);
//     });
//   }, [api]);

//   const getBNBCoinPrice = async () => {
//     const res = await getCryptoPrice('BNB');
//     setBNBPrice(res.data.lastPrice);
//     setBNBPriceChange(res.data.priceChangePercent)
//   }

//   return (
//     <React.Fragment>
//       {!error ? (
//         <LineGraph
//           currencyName={currencyName}
//           yearClickHandler={yearClickHandler}
//           monthClickHandler={monthClickHandler}
//           weekClickHandler={weekClickHandler}
//           dayClickHandler={dayClickHandler}
//           hourClickHandler={hourClickHandler}
//           data={data}
//           date={date}
//           currencyPrice={BNBPrice}
//           currencyPriceChange={BNBPriceChange}
//           currencySymbol={currencySymbol}
//         />
//       ) : (
//         <div className={styles.error}>
//           <h5>{error}</h5>
//         </div>
//       )}
//     </React.Fragment>
//   );
// };

// export default BinanceGraph;


import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const BinanceGraph = () => {
  const [size, setSize] = useState({ width: 870, height: 500 });

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 560px)').matches) {
        setSize({ width: 250, height: 250 });
      } else {
        setSize({ width: 900, height: 650 });
      }
    };

    // Call the function initially
    handleResize();

    // Set up event listener for resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <AdvancedRealTimeChart
        symbol={"BNBUSD"}
        autosize={false}
        theme={'light'}
        width={size.width}
        height={size.height}
      />
    </div>
  );
};

export default BinanceGraph;
