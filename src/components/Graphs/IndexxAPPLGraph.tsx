// import { Segmented } from "antd";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
// import baseAPIURL from "../../services/api";
// import styles from "./Graph.module.css";

// const IndexxAPPLGraph = () => {
//     const [interval, setChartInterval] = useState('1day'); // Default interval
//     const [chartData, setChartData] = useState([]);
//     const [coinValue, setCoinValue] = useState(0);

//     let width = 0;
//     let height = 0;
//     const media = () => {
//         const mobile = window.matchMedia('(max-width: 560px)');
//         if (mobile.matches) {
//             width = 250;
//             height = 250;
//         } else {
//             width = 870;
//             height = 500;
//         }
//     };
//     media();
//     useEffect(() => {
//         // Fetch data based on interval
//         fetch(`${baseAPIURL}/api/v1/inex/basic/stockdata?interval=${interval}&symbol=${"AAPL"}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === 'ok') {
//                     let array = data.values.reverse();
//                     setCoinValue((Math.round((array[0].close / 1000) * 1000)));
//                     setChartData(array);
//                 }
//             });
//     }, [interval]);


//     const dateFormatter3 = (item: any) => {
//         return moment(item).format("ddd, MMM DD, YYYY, HH:mm A");
//     };

//     const CustomTooltip = ({ active, payload, label }: any) => {
//         if (active && payload && payload.length) {
//             setCoinValue((Math.round((payload[0]?.payload?.open / 1000) * 1000)));
//             return (
//                 <div className="custom-tooltip dark:text-lighthover">
//                     <p className="label">{`${dateFormatter3(label)}`}</p>
//                 </div>
//             );
//         } else {
//             if (label === undefined) {
//                 label = new Date(Date.now() - 1000 * 53 * 60);
//             }
//         }
//         return null;
//     };

//     const dateFormatter = (tickItem: any) => {
//         return moment(tickItem).format("MMM DD");
//     };

//     const dateFormatter2 = (tickItem: any) => {
//         return moment(tickItem).format("HH:mm A");
//     };
//     return (
//         <React.Fragment>
//             <div>
//                 <div
//                     className="card chart_buy"
//                     style={{
//                         minWidth: 900,
//                         maxWidth: 900,
//                         padding: 15,
//                         borderColor: '#D7D7D7',
//                         borderRight: 'none',
//                     }}
//                 >
//                     <div
//                         className="chart_header d-flex flex-align-center"
//                         style={{ marginLeft: 2 }}
//                     >

//                         <img
//                             src={
//                                 require(`../../assets/token-icons/APPL.png`)
//                                     .default
//                             }
//                             alt="bitcoin"
//                             width="40"
//                         />
//                         &emsp;
//                         <h1>
//                             {coinValue} USD/{"APPL"}
//                         </h1>
//                     </div>
//                     <div
//                         className="chart_inner_right"
//                         style={{ marginTop: -35, marginRight: -25 }}
//                     >
//                         <Segmented
//                             className="chart_dynamic"
//                             options={[
//                                 {
//                                     label: (
//                                         <span
//                                             onClick={() => {
//                                                 setChartInterval("1hour");
//                                             }}
//                                         >
//                                             1H
//                                         </span>
//                                     ),
//                                     value: 1,
//                                 },
//                                 {
//                                     label: (
//                                         <span
//                                             onClick={() => {
//                                                 setChartInterval("1day");
//                                             }}
//                                         >
//                                             24H
//                                         </span>
//                                     ),
//                                     value: 2,
//                                 },
//                                 {
//                                     label: (
//                                         <span
//                                             onClick={() => {
//                                                 setChartInterval("1week");
//                                             }}
//                                         >
//                                             1W
//                                         </span>
//                                     ),
//                                     value: 3,
//                                 },
//                                 {
//                                     label: (
//                                         <span
//                                             onClick={() => {
//                                                 setChartInterval("1month");
//                                             }}
//                                         >
//                                             1M
//                                         </span>
//                                     ),
//                                     value: 4,
//                                 },
//                                 {
//                                     label: (
//                                         <span
//                                             onClick={() => {
//                                                 setChartInterval("1year");
//                                             }}
//                                         >
//                                             1Y
//                                         </span>
//                                     ),
//                                     value: 5,
//                                 },
//                             ]}
//                         ></Segmented>
//                     </div>

//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     {/* Chart Display */}
//                     <AreaChart
//                         //margin={{ left: -9, right: -40, top: 10 }}
//                         margin={{ left: -5, right: -19, top: 10 }}
//                         className={styles.graphBackground}
//                         width={width}
//                         height={height}
//                         data={chartData}
//                     >
//                         <defs>
//                             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.5} />
//                                 <stop offset="90%" stopColor="var(--primary-color)" stopOpacity={0} />
//                             </linearGradient>
//                         </defs>
//                         <Area
//                             dot={false}
//                             type="monotone"
//                             dataKey="close"
//                             strokeWidth={1.5}
//                             isAnimationActive={false}
//                             stroke="var(--highlight-color)"
//                             fill="url(#colorUv)"
//                         />
//                         <XAxis
//                             dataKey="datetime"
//                             domain={["dataMin", "dataMax"]}
//                             interval="preserveStartEnd"
//                             stroke="#5f5f5f"
//                             tick={{ fill: "#5f5f5f" }}
//                             style={{ fontSize: 13 }}
//                             minTickGap={92}
//                             tickFormatter={!(interval === "1day") ? dateFormatter : dateFormatter2}
//                             padding={{ right: 20 }}
//                         />
//                         <YAxis
//                             // stroke="#5f5f5f"
//                             // padding={{ top: 20 }}
//                             // tick={{ fill: '#5f5f5f' }}
//                             // domain={['auto', 'auto']}
//                             // // remove this line or set it to false
//                             // // hide={true} 
//                             // minTickGap={90}

//                             stroke="var(--body_color)"
//                             padding={{ top: 20 }}
//                             tick={{ fill: 'var(--body_color)' }}
//                             domain={['auto', 'auto']}
//                             // remove this line or set it to false
//                             // hide={true} 
//                             minTickGap={90}
//                         />
//                         <Tooltip
//                             // className={styles.customTooltip}
//                             position={{ y: -15 }}
//                             content={<CustomTooltip />}
//                             wrapperStyle={{ visibility: "visible" }}
//                         />
//                     </AreaChart>
//                     {/* </span> */}
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// };
// export default IndexxAPPLGraph;


import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph/LineGraph";
import useFetch from "../Hooks/use-fetch";
import styles from "./Graph.module.css";
import { getCryptoPrice } from "../../services/api";
import AdvancedRealTimeChartComponent from "./TradingView";

const url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=";
const currencyName = "Ethereum";
const currencySymbol = "ETH";
const IndexxAPPLGraph = () => {
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

      <AdvancedRealTimeChartComponent coin={"AAPL"} />
    </React.Fragment>
  );
};

export default IndexxAPPLGraph;