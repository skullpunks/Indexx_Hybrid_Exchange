import Etherum from "../../../assets/arts/ethereum.svg";
import IN500 from "../../../assets/token-icons/33.png";
import INEX from "../../../assets/token-icons/INEX.png";
import Crypto from "../../../assets/token-icons/34.png";
import IUSD from "../../../assets/token-icons/35.png";
import BnbIcon from "../../../assets/token-icons/BNB.png";
import BitCoin from "../../../assets/token-icons/BTCB.png";
import "./sections2.css";

import { Button } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chart1 from "../../../assets/arts/chart1.svg";
import chart2 from "../../../assets/arts/chart2.svg";
import chart3 from "../../../assets/arts/chart3.svg";
import chart4 from "../../../assets/arts/chart4.svg";
import chart5 from "../../../assets/arts/chart5.svg";
import { getCryptoPrice, getIndexxTokenPrices } from "../../../services/api";

const Section2 = () => {
    const navigate = useNavigate();

    const [indexxTokenPrices, setIndexxTokenPrices] = useState() as any;
    const [BNBPrice, setBNBPrice] = useState() as any;
    const [BTCPrice, setBTCPrice] = useState() as any;
    const [ETHPrice, setETHPrice] = useState() as any;
    // const [LTCPrice, setLTCPrice] = useState() as any;
    // const [BUSDPrice, setBUSDPrice] = useState() as any;
    useEffect(() => {
        getAllIndexxTokenPrices();
        getBNBCoinPrice();
        getBTCCoinPrice();
        getETHCoinPrice();
        // getLTCCoinPrice();
        // getBUSDCoinPrice();
    }, [indexxTokenPrices])


    const getAllIndexxTokenPrices = async () => {
        const res = await getIndexxTokenPrices();
        setIndexxTokenPrices(res.data);
    }

    const getBNBCoinPrice = async () => {
        const res = await getCryptoPrice('BNB');
        setBNBPrice(res.data);
    }

    const getBTCCoinPrice = async () => {
        const res = await getCryptoPrice('BTC');
        setBTCPrice(res.data);
    }

    // const getLTCCoinPrice = async () => {
    //     const res = await getCryptoPrice('LTC');
    //     setLTCPrice(res.data);
    // }
    // const getBUSDCoinPrice = async () => {
    //     const res = await getCryptoPrice('BUSD');
    //     setBUSDPrice(res.data);
    // }

    const getETHCoinPrice = async () => {
        const res = await getCryptoPrice('ETH');
        setETHPrice(res.data);
    }

    return (
        <div className="section2-container container margin-lr-auto">
            <div className="section2-table">
                <div className="table-row" >
                    <div className="table-header-element">
                        Cryptocurrency
                    </div>
                    <div className="table-header-element ">
                        Price
                    </div>
                    <div className="table-header-element  d-none d-sm-block">
                        24hr % Change
                    </div>
                    <div className="table-header-element">
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={INEX} alt="coin-icon" />
                        <b className="coin-initials">INEX</b>
                        <span>IndexxExchange</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(indexxTokenPrices?.INEXPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {(indexxTokenPrices?.INEXpriceChangePercent)}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart4} alt="Chart" className="chart-icon" style={{ paddingLeft: 40 }} />
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={IN500} alt="coin-icon" />
                        <b className="coin-initials">IN500</b>
                        <span>Indexx500</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(indexxTokenPrices?.IN500Price * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {(indexxTokenPrices?.IN500priceChangePercent)}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart4} alt="Chart" className="chart-icon" style={{ paddingLeft: 40 }} />
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={IUSD} alt="coin-icon" />
                        <b className="coin-initials">IUSD+</b>
                        <span>IndexxUSD+</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(indexxTokenPrices?.IUSDPPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {(indexxTokenPrices?.IUSDPpriceChangePercent)}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart5} alt="Chart" className="chart-icon" style={{ paddingLeft: 40 }} />
                    </div>
                </div>
                <div className="table-row no-border">
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={Crypto} alt="coin-icon" />
                        <b className="coin-initials">INXC</b>
                        <span>IndexxCrypto</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(indexxTokenPrices?.INXCPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {(indexxTokenPrices?.INXCpriceChangePercent)}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart3} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={BnbIcon} alt="coin-icon" />
                        <b className="coin-initials">BNB</b>
                        <span>Binance</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(BNBPrice?.lastPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {Math.round(BNBPrice?.priceChangePercent * 100) / 100}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart1} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={BitCoin} alt="coin-icon" />
                        <b className="coin-initials">BTC</b>
                        <span>Bitcoin</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(BTCPrice?.lastPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {Math.round(BTCPrice?.priceChangePercent * 100) / 100}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart2} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                <div className="table-row cursor-pointer" onClick={() => navigate(`/indexx-exchange/markets`)}>
                    <div className="table-header-element coinName">
                        <img style={{ height: 30, width: 30 }} src={Etherum} alt="coin-icon" />
                        <b className="coin-initials">ETH</b>
                        <span>Ethereum</span>
                    </div>
                    <div className="table-header-element price">
                        ${Math.round(ETHPrice?.lastPrice * 100) / 100}
                    </div>
                    <div className="table-header-element hourChange d-none d-sm-block">
                        {Math.round(ETHPrice?.priceChangePercent * 100) / 100}%
                    </div>
                    <div className="table-header-element">
                        <img src={chart3} alt="Chart" className="chart-icon" />
                    </div>
                </div>
                
            </div>
            <div className="all_markets">
                <Button danger size="large" className="actionButton view_all_btn" onClick={() => navigate(`/indexx-exchange/markets`)}>View all Markets</Button>
            </div>
        </div>
    );
};

export default Section2;
