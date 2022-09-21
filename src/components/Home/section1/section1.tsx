import React from "react";
import "./sections1.css"
import BackgroundImage from "../../../assets/background.jpg";
import IndexxText from "../../../assets/indexxLogo.svg";
import {Link} from "react-router-dom";

const Section1 = () => {
    return (
        <div style={{backgroundImage: `url(${BackgroundImage})`}} className="home-container">
            <div>
                <img src={IndexxText} alt="Indexx Logo" className="center-Image"/>
            </div>
            <div className="section-heading">Swap, Buy and Sell Cryptocurrency</div>
            <div className="section-helper-text"> Hybrid Platform</div>
            <div className="section-usp"><span className="font-big">0% fees</span> &nbsp;  for all transactions</div>
            <div className="actions">
                <Link className="td-none" to="/indexx-exchange/swap">
                    <div className="launch-app-button cut_button">
                        <div className="launch-app-button-text">Swap</div>
                    </div>
                </Link>
                <Link className="td-none" to="/indexx-exchange/buy_sell">
                    <div className="login-button cut_button">
                        <div className="login-button_text">Buy and Sell</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Section1;
