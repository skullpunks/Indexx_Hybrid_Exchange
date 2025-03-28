import React from "react";
import "./sections1.css"
import BackgroundImage from "../../../assets/background.jpg";
import IndexxText from "../../../assets/indexxLogo.svg";
import { Link } from "react-router-dom";
import { baseDEXURL } from "../../../services/api";

const Section1 = () => {
    return (
        <div style={{ backgroundImage: `url(${BackgroundImage})` }} className="home-container">
            <div>
                <img src={IndexxText} alt="Indexx Logo" className="center-Image" />
            </div>
            <div className="section-heading" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Cryptocurrency Exchange</div>
            <div className="section-helper-text">Hybrid Platform</div>
            <div className="section-usp" >
                <span className="font-big">
                    <Link className="trade_to_earn_link" to="/indexx-exchange/trade-to-earn">
                        <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>Trade to</span>
                        <span className="big_trade_font" style={{ color: "#fff", display: "inline-block" }}>
                            Earn
                            <sub style={{ fontSize: 15, color: "#fff", position: "relative", bottom: 0 }}>TM</sub>
                            ,
                        </span>
                    </Link>
                    <span className="big_trade_font"> 30%</span>
                    <span style={{ color: "rgba(255, 255, 255, 0.6)" }}> Trade reward</span>

                </span>
            </div>
            <div className="actions">
               
                <a href={baseDEXURL} target="_blank" rel="noopener noreferrer">
                    <span  className="td-none">
                        {/* <Tooltip title={comingSoonText} color="#fff" key="#fff" > */}
                            <div className="launch-app-button cut_button">
                                <div className="launch-app-button-text">Decentralized</div>
                            </div>
                        {/* </Tooltip> */}
                    </span>
                   
                </a>
                <Link className="td-none" to="/indexx-exchange/buy-sell/login">
                    <div className="login-button cut_button">
                        <div className="login-button_text">Centralized</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Section1;
