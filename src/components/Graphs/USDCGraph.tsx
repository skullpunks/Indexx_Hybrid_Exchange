// import React, { useEffect, useState } from "react";
// import LineGraph from "../LineGraph/LineGraph";
// import useFetch from "../Hooks/use-fetch";
// import styles from "./Graph.module.css";
// import { getCryptoPrice } from "../../services/api";

// const url = "https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=usd&days=";
// const currencyName = "USDC";
// const currencySymbol = "USDC";
// const USDCGraph = () => {
//   //State to update any fetch errors
//   const [error, setError] = useState();
//   const [date, setDate] = useState(Date);
//   const [USDCPrice, setUSDCPrice] = useState() as any;
//   const [USDCPriceChange, setUSDCPriceChange] = useState() as any;
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
//     const res = await getCryptoPrice('USDC');
//     setUSDCPrice(res.data.lastPrice);
//     setUSDCPriceChange(res.data.priceChangePercent)
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
//           currencyPrice={USDCPrice}
//           currencyPriceChange={USDCPriceChange}
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

// export default USDCGraph;

import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=";
const currencyName = "Ethereum";
const currencySymbol = "ETH";
const USDCGraph = () => {
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

      <AdvancedRealTimeChartComponent coin={"USDC"} />
    </React.Fragment>
  );
};

export default USDCGraph;