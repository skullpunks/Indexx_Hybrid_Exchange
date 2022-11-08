import { Segmented } from 'antd';
// import {
//   Line, LineChart, Tooltip,
//   XAxis,
//   YAxis
// } from "recharts";

import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import moment from "moment";
//0import numeral from "numeral";
import styles from "./LineGraph.module.css";

//const numberFormatter = (item : any) => numeral(item).format("0,00");
const dateFormatter = (item :any ) => moment(item).format("MMM DD");

//Checks if max width is 560px and then sets new values to graph width and height
const LineGraph = (props: any) => {
  let width = 0;
  let height = 0;
  const media = () => {
    const mobile = window.matchMedia("(max-width: 560px)");
    if (mobile.matches) {
      width = 250;
      height = 250;
    } else {
      width = 650;
      height = 420;
    }
  };
  media();
  return (
    <div className='card chart_buy' style={{ minWidth: 745, maxWidth: 745, marginRight: 20, padding: 21 }}>

      <div className="chart_header d-flex flex-align-center">
        <img src={require(`../../assets/arts/bsDollar.svg`).default} alt="usdollor" width="30" className='me-1' />
        <img src={require(`../../assets/token-icons/${props.currencySymbol}.png`).default} alt="bitcoin" width="30" />

        <h1 className="chart_title">{props.currencyPrice} USD/{props.currencySymbol}</h1>
        {/* <div className="arrow_container">
          <div><img src={ArrowRight} alt="Arrow Here" /></div>
          <div><img src={ArrowLeft} alt="Arrow Here" /></div>
        </div> */}
      </div>
      <div className="Chart_inner">
        <div className="chart_inner_left">
          <div className="chart_inner_left_top d-flex">
            {/* <div style={{ fontSize: 45, color: "#5f5f5f" }}>{props.currencyPrice} */}
            {/* <div className="chart_inner_middle">
                ({props.currencyPriceChange})
              </div> */}
            {/* </div> */}
            {/* <div style={{ fontSize: 30, color: "rgba(95, 95, 95, 0.5)", display: "flex", alignItems: "end" }}>IN500/IUSD+</div> */}
          </div>
          {/* <div style={{ color: "#006DFF", fontSize: 13, paddingTop: 2 }}>{formatDate}</div> */}
        </div>
        {/* <div className="chart_inner_middle">
          -5.274 (-1.88%)
        </div> */}
        <div className="chart_inner_right">
          <Segmented className="chart_dynamic" options={[
            {
              label: (<span onClick={props.dayClickHandler}>
                1 Day
              </span>),
              value: 1
            },
            {
              label: (<span onClick={props.weekClickHandler}>
                1 Week
              </span>),
              value: 2
            },
            {
              label: (<span onClick={props.monthClickHandler}>
                1 Month
              </span>),
              value: 3
            },
            {
              label: (<span onClick={props.yearClickHandler}>
                1 Year
              </span>),
              value: 4
            },
          ]} >
          </Segmented>
        </div>
      </div>
      <AreaChart
        margin={{ left: 17, right: 6, top: 10 }}
        className={styles.graphBackground}
        width={width}
        height={height}
        data={props.data}
      >

        <Area
          dot={false}
          type="monotone"
          dataKey="price"
          strokeWidth={1.5}
          isAnimationActive={false}
          stroke="rgba(246, 96, 54 , 1)"
          fill="rgba(246, 96, 54 , 0.16)"
        />
        <XAxis
          padding={{ right: 40 }}
          dataKey={"time"}
          stroke="#5f5f5f"
          tick={{ fill: "#5f5f5f" }}
          tickFormatter={dateFormatter}
        />
        <YAxis
          stroke="#5f5f5f" padding={{ top: 60 }} tick={{ fill: "#5f5f5f" }} />
        <Tooltip labelFormatter={dateFormatter} />

      </AreaChart>
      {/* <LineChart
        margin={{ left: 17, right: 6, top: 10 }}
        className={styles.graphBackground}
        width={width}
        height={height}
        data={props.data}
      >

        <Line
          dot={false}
          type="monotone"
          dataKey="price"
          stroke="#f66036"
          strokeWidth={1.5}
          isAnimationActive={false}
        />
        <XAxis
          padding={{ right: 40 }}
          dataKey={"time"}
          stroke="#5f5f5f"
          tick={{ fill: "#5f5f5f" }}
        />
        <YAxis
          stroke="#5f5f5f" padding={{ top: 60 }} tick={{ fill: "#5f5f5f" }} />
        <Tooltip />

      </LineChart> */}



    </div>
  );
};
export default LineGraph;
