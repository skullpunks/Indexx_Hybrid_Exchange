import { Segmented } from 'antd';
// import {
//   Line, LineChart, Tooltip,
//   XAxis,
//   YAxis
// } from "recharts";
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import moment from 'moment';
//0import numeral from "numeral";
import styles from './LineGraph.module.css';

//const numberFormatter = (item : any) => numeral(item).format("0,00");
const dateFormatter = (item: any) => moment(item).format('MMM DD');
const dateFormatter2 = (item: any) => {
  return moment(item).format("HH:mm A")
};
const dateFormatter3 = (item: any) => {
  return moment(item).format("ddd, MMM DD, YYYY, HH:mm A")
};
//Checks if max width is 560px and then sets new values to graph width and height
const LineGraph = (props: any) => {
  const [value, setValue] = useState(1);
  const [coinValue, setCoinValue] = useState(props?.currencyPrice);
  let width = 0;
  let height = 0;
  const media = () => {
    const mobile = window.matchMedia('(max-width: 560px)');
    if (mobile.matches) {
      width = 250;
      height = 250;
    } else {
      width = 870;
      height = 500;
    }
  };
  const changeValue = (value: number) => {
    setValue(value);
  }

  useEffect(() => {
    setCoinValue(props?.currencyPrice);
  }, [props?.currencyPrice]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      setCoinValue((Math.round(payload[0]?.payload?.price * 100) / 100));
      return (
        <div className="custom-tooltip">
          <p className="label">{`${dateFormatter3(label)}`}</p>
        </div>
      );
    }
    return null;
  };
  media();
  return (
    <div >
      {props.data !== undefined ? (
        <div
          className="card chart_buy"
          style={{ minWidth: 900, maxWidth: 900, padding: 15, borderColor: '#D7D7D7', borderRight: 'none' }}
        >

          <div className="chart_header d-flex flex-align-center" style={{ marginLeft: 2 }}>
            <img
              src={
                require(`../../assets/token-icons/${props.currencySymbol}.png`)
                  .default
              }
              alt="bitcoin"
              width="30"
            />
            &emsp;
            <h1>
              {coinValue} USD/{props.currencySymbol}
            </h1>
          </div>

          <div className="chart_inner_right" style={{ marginTop: -35, marginRight: -25 }}>
            <Segmented className="chart_dynamic" options={[
              {
                label: (<span onClick={() => { props.hourClickHandler(); changeValue(1) }}>
                  1H
                </span>),
                value: 1,
              },
              {
                label: (<span onClick={() => { props.dayClickHandler(); changeValue(2) }}>
                  24H
                </span>),
                value: 2
              },
              {
                label: (<span onClick={() => { props.weekClickHandler(); changeValue(3) }}>
                  1W
                </span>),
                value: 3
              },
              {
                label: (<span onClick={() => { props.monthClickHandler(); changeValue(4) }}>
                  1M
                </span>),
                value: 4
              },
              {
                label: (<span onClick={() => { props.yearClickHandler(); changeValue(5) }}>
                  1Y
                </span>),
                value: 5
              },
            ]}
            ></Segmented>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <AreaChart
            margin={{ left: -60, right: -19, top: 10 }}
            className={styles.graphBackground}
            width={width}
            height={height}
            data={props.data}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f66036" stopOpacity={0.5} />
                <stop offset="90%" stopColor="#f66036" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area

              dot={false}
              type="monotone"
              dataKey="price"
              strokeWidth={1.5}
              isAnimationActive={false}
              stroke="rgba(246, 96, 54 , 1)"
              // fill="rgba(246, 96, 54 , 0.09)"
              fill="url(#colorUv)"
            />
            {value > 2 ?
              <XAxis
                padding={{ right: 20 }}
                dataKey={"time"}
                stroke="#5f5f5f"
                // domain={['auto', 'auto']}
                domain={["dataMin", "dataMax"]}
                interval="preserveStartEnd"
                tick={{ fill: "#5f5f5f" }}
                tickFormatter={value > 2 ? dateFormatter : dateFormatter2}
                style={{ fontSize: 13 }}
                minTickGap={92}
              /> :
              <XAxis
                padding={{ right: 20 }}
                dataKey={"time"}
                stroke="#5f5f5f"
                // domain={['auto', 'auto']}
                domain={["dataMin", "dataMax"]}
                interval="preserveStartEnd"
                tick={{ fill: "#5f5f5f" }}
                tickFormatter={value > 2 ? dateFormatter : dateFormatter2}
                style={{ fontSize: 13 }}
                minTickGap={90}
              />

            }
            <YAxis
              stroke="#5f5f5f" padding={{ top: 20 }} tick={{ fill: "#5f5f5f" }} domain={['auto', 'auto']} hide={true} />
            {/* <Tooltip position={{ y: -10 }}
              labelFormatter={dateFormatter3}
              formatter={function (value: any) {
                return `${(Math.round(value * 100) / 100).toFixed(3) + ' USD'}`;
              }}
            /> */}
            <Tooltip position={{ y: -10 }} content={<CustomTooltip />} />
          </AreaChart>
        </div>
      ) : null
      }
    </div>
  );



}
export default LineGraph;
