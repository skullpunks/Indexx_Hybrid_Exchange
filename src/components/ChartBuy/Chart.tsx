
import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import ArrowLeft from "../../assets/arts/ArrowLeft.svg";
// import ArrowRight from "../../assets/arts/ArrowRight.svg";
import { Segmented } from 'antd';
import { useState } from "react";
import curvedChart from "../../assets/arts/curvedChart.svg";
import { getAppSettings } from '../../services/api';
import "./Chart.css";

let appSettingArr: any[] = [];


const Chart = () => {
    const getAllSetting = async () => {
        const res = await getAppSettings();
        appSettingArr = res.data;
        let in500Obj = appSettingArr.find((item: any) => item.key === "Indexx500Price");
        setBuyVal(in500Obj.value)
    }
    const [buyVal, setBuyVal] = useState("");
    getAllSetting();
    return (
        <div className='card chart_mobile d-none d-md-flex  ' style={{ minWidth: 745, maxWidth: 745, marginRight: 20, padding: 21 }}>
            <div className="chart_header d-flex flex-align-center">
                <img src={IN500} alt="IN500 Here" width="30" className="me-1" />
                {/* <img src={IUSD} alt="IUSD Here" width="30" style={{ marginLeft: 5 }} /> */}
                <h1 className="chart_title">IN500/USD</h1>
                {/* <div className="arrow_container">
                    <div><img src={ArrowRight} alt="Arrow Here" /></div>
                    <div><img src={ArrowLeft} alt="Arrow Here" /></div>
                </div> */}
            </div>
            <div className="Chart_inner">
                <div className="chart_inner_left">
                    <div className="chart_inner_left_top d-flex flex-align-center">
                        <div style={{ fontSize: 45, color: "#5f5f5f" }}>${buyVal} </div>
                        {/* <div style={{ fontSize: 30, color: "rgba(95, 95, 95, 0.5)", display: "flex", alignItems: "end" }}>IN500/IUSD+</div> */}
                        <div className="chart_inner_middle">
                            -0.274%
                        </div>
                    </div>
                    {/* <div style={{ color: "#006DFF", fontSize: 13, paddingTop: 2 }}>Sep 15, 2022, 06:55 AM</div> */}

                </div>

                <div className="chart_inner_right">
                    <Segmented options={['24H', '1W', '1M', '1Y']} />
                </div>
            </div>
            <div className="chart_image">
                <img src={curvedChart} alt="Arrow Here" />
                <div className="time d-flex flex-justify-between">
                    <div>10:00AM</div>
                    <div>01:00PM</div>
                    <div>04:00PM</div>
                    <div>08:00PM</div>
                    <div>11:00PM</div>
                    <div>02:00AM</div>
                </div>
            </div>
        </div>
    )
}

export default Chart