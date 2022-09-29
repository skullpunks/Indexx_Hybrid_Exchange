import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useState } from 'react';
// import downArrow from "../../assets/arts/downArrow.svg";
import Chart from "../ChartBuy/Chart";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import historyIcon from "../../assets/arts/historyIcon.svg";
// import initialTokens from "../../utils/Tokens.json";
import IN500 from "../../assets/token-icons/33.png";
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const BuySellMain: React.FC<(Props)> = ({ setStatus }) => {
    const [toggleChart, setToggleChart] = useState(true);
    console.log(setToggleChart);
    // let chartIconVisible = toggleChart ? chartIcon : chartHiddenIcon;
    return (
        <div className="scan-container flex-align-stretch">
            {toggleChart && <Chart />}
            <div className="bs_container card">
                <div className="bs_container_header">
                    <h1>Buy Crypto</h1>
                </div>
                <div className="bs_container_main">
                    <div className="bs_curreny ">
                        <span className="bs_currency_symbol">$ </span>0
                    </div>
                    <div className="bs_purchase d-flex">
                        <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                        One-time purchase
                    </div>
                </div>
                <div className="bs_token d-flex">
                    <div className="bs_token_left d-flex justify-between">
                        <div className="bs_token_num d-flex flex-align-center">
                            <img src={IN500} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                            IN500 <span className="token_grey">Indexx500</span>
                            <img src={arrowAddress} alt="arrow icon" style={{}} />
                        </div>
                    </div>
                </div>
                <div className="bs_footer_action">
                    <button>Preview Purchase </button>
                </div>
            </div>
        </div>

    )
}

export default BuySellMain