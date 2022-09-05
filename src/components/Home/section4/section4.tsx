import React, {useState} from "react";
import "./sections2.css"
import BnbIcon from "../../../assets/bnb-icon.svg";
import BitCoin from "../../../assets/bitcoin-icon.svg";
import Etherum from "../../../assets/etherum-icon.svg";


const Section2 = () => {

    return (
        <div className="section2-container">
            <div className="section2-table">
                <div className="table-row">
                    <div className="table-header-element">
                        CryptoCurrency
                    </div>
                    <div className="table-header-element">
                        Price
                    </div>
                    <div className="table-header-element">
                        24hr % Change
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{height: 30, width: 30}} src={BnbIcon} alt="coin-icon"/>
                        <b className="coin-initials">BNB</b>
                        BNB
                    </div>
                    <div className="table-header-element price">
                        $277.098
                    </div>
                    <div className="table-header-element hourChange">
                        -3.75%
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-header-element coinName">
                        <img style={{height: 30, width: 30}} src={BitCoin} alt="coin-icon"/>
                        <b className="coin-initials">BTC</b>
                        Bitcoin
                    </div>
                    <div className="table-header-element price">
                        $200.098
                    </div>
                    <div className="table-header-element hourChange">
                        -1.75%
                    </div>
                </div>
                <div className="table-row no-border">
                    <div className="table-header-element coinName">
                        <img style={{height: 30, width: 30}} src={Etherum} alt="coin-icon"/>
                        <b className="coin-initials">ETH</b>
                        Ethereum
                    </div>
                    <div className="table-header-element price">
                        $27.098
                    </div>
                    <div className="table-header-element hourChange">
                        -12.75%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
