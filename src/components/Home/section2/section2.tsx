import "./sections2.css"
import BnbIcon from "../../../assets/bnb-icon.svg";
import BitCoin from "../../../assets/bitcoin-icon.svg";
import Etherum from "../../../assets/etherum-icon.svg";
import IUSD from "../../../assets/token-icons/35.png";
import IN500 from "../../../assets/token-icons/33.png";
import Crypto from "../../../assets/token-icons/34.png";

import chart1 from "../../../assets/arts/chart1.svg";
import chart2 from "../../../assets/arts/chart2.svg";
import chart3 from "../../../assets/arts/chart3.svg";
import chart4 from "../../../assets/arts/chart4.svg";
import chart5 from "../../../assets/arts/chart5.svg";
import { Button } from 'antd';


const Section2 = () => {

    return (
        <div className="section2-container">
            <div className="section2-table">
                <div className="table-row">
                    <div className="table-header-element">
                        Cryptocurrency
                    </div>
                    <div className="table-header-element">
                        Price
                    </div>
                    <div className="table-header-element">
                        24hr % Change
                    </div>
                    <div className="table-header-element">
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={BnbIcon} alt="coin-icon" />
                        <b className="coin-initials">BNB</b>
                        BNB
                    </div>
                    <div className="table-header-element price">
                        $277.098
                    </div>
                    <div className="table-header-element hourChange">
                        -3.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart1} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={BitCoin} alt="coin-icon" />
                        <b className="coin-initials">BTC</b>
                        Bitcoin
                    </div>
                    <div className="table-header-element price">
                        $200.098
                    </div>
                    <div className="table-header-element hourChange">
                        -1.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart2} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={Etherum} alt="coin-icon" />
                        <b className="coin-initials">ETH</b>
                        Ethereum
                    </div>
                    <div className="table-header-element price">
                        $27.098
                    </div>
                    <div className="table-header-element hourChange">
                        -12.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart3} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={IUSD} alt="coin-icon" />
                        <b className="coin-initials">IUSD+</b>
                        INDEXXUSD+
                    </div>
                    <div className="table-header-element price">
                        $127.098
                    </div>
                    <div className="table-header-element hourChange">
                        -2.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart5} alt="Chart" className="chart-icon" style={{ paddingLeft: 40 }} />
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={IN500} alt="coin-icon" />
                        <b className="coin-initials">IN500</b>
                        INDEXX500
                    </div>
                    <div className="table-header-element price">
                        $17.098
                    </div>
                    <div className="table-header-element hourChange">
                        -3.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart4} alt="Chart" className="chart-icon" style={{ paddingLeft: 40 }} />
                    </div>
                </div>
                <div className="table-row no-border">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={Crypto} alt="coin-icon" />
                        <b className="coin-initials">INXC</b>
                        INDEXXCRYPTO
                    </div>
                    <div className="table-header-element price">
                        $16.098
                    </div>
                    <div className="table-header-element hourChange">
                        -1.75%
                    </div>
                    <div className="table-header-element">
                        <img src={chart3} alt="Chart" className="chart-icon" />
                    </div>
                </div>
            </div>
            <div className="all_markets">
                <Button danger size="large" className="actionButton view_all_btn">View all Markets</Button>
            </div>
        </div>
    );
};

export default Section2;
