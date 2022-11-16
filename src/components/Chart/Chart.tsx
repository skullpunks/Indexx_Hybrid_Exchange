
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
import ArrowLeft from "../../assets/arts/ArrowLeft.svg";
import ArrowRight from "../../assets/arts/ArrowRight.svg";
import curvedChart from "../../assets/arts/curvedChart.svg";
import "./Chart.css";
import { Segmented } from 'antd';
import initialTokens from "../../utils/Tokens.json";
// import { useState } from "react";
import { useFromTokenContext, useToTokenContext } from '../../utils/SwapContext';

const Chart = () => {
    // const [fromTokenVal, setFromTokenVal] = useState(0);
    // const [toTokenVal, setToTokenVal] = useState(0);
    const { fromToken } = useFromTokenContext();
    const { toToken } = useToTokenContext();

    let fromImage, fromTitle, image, title;

    const filteredFromArray = initialTokens.filter(function (obj) {
        return obj?.address === fromToken;
    });

    const filteredArray = initialTokens.filter(function (obj) {
        return obj?.address === toToken;
    });

    if (filteredFromArray && filteredFromArray.length) {
        fromImage = filteredFromArray[0].image;
        fromTitle = filteredFromArray[0].title;
    }
    else {
        fromImage = "IN500";
        fromTitle = "IN500";
    }

    if (filteredArray && filteredArray.length) {
        image = filteredArray[0].image;
        title = filteredArray[0].title;
    }
    else {
        image = "IUSD";
        title = "IUSD+";
    }


    return (
        <div className='card' style={{ minWidth: 745, maxWidth: 745, marginRight: 20, padding: 21 }}>
            <div className="chart_header d-flex flex-align-center">
                {/* <img src={IN500} alt="IN500 Here" width="30" /> */}
                {/* <img src={IUSD} alt="IUSD Here" width="30" style={{ marginLeft: 5 }} /> */}
                <img src={require(`../../assets/token-icons/${fromImage}.png`).default} alt="bit coin" width="30" className="me-1" />
                <img src={require(`../../assets/token-icons/${image}.png`).default} alt="bit coin" width="30" />
                <h1 className="chart_title">{fromTitle}/{title}</h1>
                <div className="arrow_container">
                    <div><img src={ArrowRight} alt="Arrow Here" /></div>
                    <div><img src={ArrowLeft} alt="Arrow Here" /></div>
                </div>
            </div>
            <div className="Chart_inner">
                <div className="chart_inner_left">
                    <div className="chart_inner_left_top d-flex">
                        <div style={{ fontSize: 45, color: "#5f5f5f" }}>257.04</div>
                        <div style={{ fontSize: 30, color: "rgba(95, 95, 95, 0.5)", display: "flex", alignItems: "end" }}>IN500/IUSD+</div>
                    </div>
                    <div style={{ color: "#006DFF", fontSize: 13, paddingTop: 2 }}>Sep 15, 2022, 06:55 AM</div>
                </div>
                <div className="chart_inner_middle">
                    -5.274 (-1.88%)
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