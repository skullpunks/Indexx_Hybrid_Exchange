import React from "react";
import "./sections1.css"
import BackgroundImage from "../../../assets/background.jpg";
import IndexxText from "../../../assets/indexxText.png";

const Section1 = () => {
    return (
        <div style={{backgroundImage: `url(${BackgroundImage})`}} className="home-container">
            <div>
                <img src={IndexxText} alt="NewImage" className="center-Image"/>
            </div>
            <div className="section-heading">Buy, Sell, and Swap Cryptocurrency</div>
            <div className="section-helper-text">  Hybrid Platform</div>
            <div className="section-usp">  <span className="font-big">0% fees</span> &nbsp;  for all transactions</div>
            <div className="actions">
                <div className="launch-app-button cut_button">
                    <div className="launch-app-button-text">Launch App</div>
                </div>
                <div className="login-button cut_button">
                    <div className="login-button_text">LogIn</div>
                </div>
            </div>
        </div>
    );
};

export default Section1;
