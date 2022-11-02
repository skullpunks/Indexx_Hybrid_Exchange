import React from "react";
import {
  LineChart,
  //   Brush,
  Line,
  Tooltip,
  // CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./LineGraph.module.css";
import { Segmented } from 'antd';
import Moment from 'moment';

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
      width = 700;
      height = 450;
    }
  };
  media();
  const formatDate = Moment().format('MMM Do YY')
  return (
    <div className='card' style={{ minWidth: 745, maxWidth: 745, marginRight: 20, padding: 21 }}>
      {/* <h3>{props.currencyName}/USD</h3> */}
      <div className="chart_header d-flex flex-align-center">
        {/* <img src={IN500} alt="IN500 Here" width="30" /> */}
        {/* <img src={IUSD} alt="IUSD Here" width="30" style={{ marginLeft: 5 }} /> */}
        <img src={require(`../../assets/token-icons/${props.currencySymbol}.png`).default} alt="bitcoin" width="30" />
        <img src={require(`../../assets/arts/bsDollar.svg`).default} alt="usdollor" width="30" />
        <h1 className="chart_title">{props.currencySymbol}/USD</h1>
        {/* <div className="arrow_container">
          <div><img src={ArrowRight} alt="Arrow Here" /></div>
          <div><img src={ArrowLeft} alt="Arrow Here" /></div>
        </div> */}
      </div>
      <div className="Chart_inner">
        <div className="chart_inner_left">
          <div className="chart_inner_left_top d-flex">
            <div style={{ fontSize: 45, color: "#5f5f5f" }}>{props.currencyPrice}
              {/* <div className="chart_inner_middle">
                ({props.currencyPriceChange})
              </div> */}
            </div>
            {/* <div style={{ fontSize: 30, color: "rgba(95, 95, 95, 0.5)", display: "flex", alignItems: "end" }}>IN500/IUSD+</div> */}
          </div>
          <div style={{ color: "#006DFF", fontSize: 13, paddingTop: 2 }}>{formatDate}</div>
        </div>
        {/* <div className="chart_inner_middle">
          -5.274 (-1.88%)
        </div> */}
        <div className="chart_inner_right">
          <Segmented className="chart_dynamic" options={[{
            label: (<span onClick={props.yearClickHandler}>
              1 Year
            </span>),
            value: 1
          },
          {
            label: (<span onClick={props.monthClickHandler}>
              1 Month
            </span>),
            value: 2
          },
          {
            label: (<span onClick={props.weekClickHandler}>
              1 Week
            </span>),
            value: 3
          },
          {
            label: (<span onClick={props.dayClickHandler}>
              1 Day
            </span>),
            value: 4
          }
          ]} >
          </Segmented>
        </div>
      </div>
      <LineChart
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
          stroke="#4592af"
          strokeWidth={1.5}
        />
        {/* <CartesianGrid stroke="grey" /> */}
        <XAxis
          padding={{ right: 40 }}
          dataKey={"time"}
          tick={{ fill: "black" }}
        />
        <YAxis padding={{ top: 60 }} tick={{ fill: "black" }} />
        {/* <Brush startIndex={0} dataKey="time" height={20} stroke="#4a4844" /> */}
        <Tooltip />
        {/* <div>
          <button  onClick={props.yearClickHandler}>
            1 Year
          </button>
          <button  onClick={props.monthClickHandler}>
            1 Month
          </button>
          <button  onClick={props.weekClickHandler}>
            1 Week
          </button>
          <button  onClick={props.dayClickHandler}>
            1 Day
          </button>
        </div> */}
      </LineChart>
      {/* <div>
        <button  onClick={props.yearClickHandler}>
          1 Year
        </button>
        <button  onClick={props.monthClickHandler}>
          1 Month
        </button>
        <button  onClick={props.weekClickHandler}>
          1 Week
        </button>
        <button  onClick={props.dayClickHandler}>
          1 Day
        </button>
      </div> */}

      {/* <div className="chart_inner_right">
                    <Segmented options={['24H', '1W', '1M', '1Y']} />
                </div> */}
    </div>
  );
};
export default LineGraph;
