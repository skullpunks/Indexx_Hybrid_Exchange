// import React, { useEffect, useState } from "react";
// import LineGraph from "../LineGraph/LineGraph";
// import useFetch from "../Hooks/use-fetch";
// import styles from "./Graph.module.css";
// import { getCryptoPrice, getIndexxTokenPrices } from "../../services/api";

// const url = "https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=";
// const currencyName = "Polygon";
// const currencySymbol = "MATIC"

// const MATICGraph = () => {
//   //State to update any fetch errors
//   const [error, setError] = useState();
//   const [date, setDate] = useState(Date);
//   const [MATICPrice, setMATICPrice] = useState() as any;
//   const [MATICPriceChange, setMATICPriceChange] = useState() as any;
//   //Custom Hook for Fetching Data using Fetch API
//   const {
//     monthClickHandler,
//     weekClickHandler,
//     dayClickHandler,
//     hourClickHandler,
//     value: data,
//     api,
//   } = useFetch();

//   useEffect(() => {
//     setDate(Date);
//     getMATICCoinPrice();
//     api(url).catch((error) => {
//       setError(error.message);
//     });
//   }, [api]);

//   const getMATICCoinPrice = async () => {
//     const res = await getCryptoPrice('MATIC');
//     setMATICPrice(res.data.lastPrice);
//     setMATICPriceChange(res.data.priceChangePercent)
//   }

//   return (
//     <React.Fragment>
//       {!error ? (
//         <LineGraph
//           currencyName={currencyName}
//           yearClickHandler={monthClickHandler}
//           monthClickHandler={monthClickHandler}
//           weekClickHandler={weekClickHandler}
//           dayClickHandler={dayClickHandler}
//           hourClickHandler={hourClickHandler}
//           data={data}
//           date={date}
//           currencyPrice={MATICPrice}
//           currencyPriceChange={MATICPriceChange}
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
// export default MATICGraph;

import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=";
const currencyName = "Ethereum";
const currencySymbol = "ETH";
const MATICGraph = () => {
  //State to update any fetch errors
  const [error, setError] = useState();
  const [date, setDate] = useState(Date);
  const [ETHPrice, setETHPrice] = useState() as any;
  const [ETHPriceChange, setETHPriceChange] = useState() as any;
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
    getETHCoinPrice();
    api(url).catch((error) => {
      setError(error.message);
    });
  }, [api]);

  const getETHCoinPrice = async () => {
    const res = await getCryptoPrice('ETH');
    setETHPrice(res.data.lastPrice);
    setETHPriceChange(res.data.priceChangePercent)
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
          currencyPrice={ETHPrice}
          currencyPriceChange={ETHPriceChange}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div className={styles.error}>
          <h5>{error}</h5>
        </div>
      )} */}

      <AdvancedRealTimeChartComponent coin={"MATIC"} />
    </React.Fragment>
  );
};

export default MATICGraph;