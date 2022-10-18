import React from "react";
import "./sections1.css"
import BackgroundImage from "../../../assets/background.jpg";
import IndexxText from "../../../assets/indexxLogo.svg";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const Section1 = () => {
    let comingSoonText = <p className="font_13x brand_color">Coming soon 31st Oct</p>;
    return (
        <div style={{ backgroundImage: `url(${BackgroundImage})` }} className="home-container">
            <div>
                <img src={IndexxText} alt="Indexx Logo" className="center-Image" style={{ paddingLeft: 60 }} />
            </div>
            <div className="section-heading" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Swap, Buy and Sell Cryptocurrency</div>
            <div className="section-helper-text">Hybrid Platform</div>
            <div className="section-usp" style={{ paddingTop: 120, paddingBottom: 70 }}>
                <span className="font-big">
                    <Link to="/indexx-exchange/trade-to-earn">
                        <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>Trade to</span>
                        <span style={{ fontSize: 120, color: "#fff", display: "inline-block" }}>
                            Earn
                            <sub style={{ fontSize: 15, color: "#fff", position: "relative", bottom: 0 }}>TM</sub>
                            ,
                        </span>
                    </Link>
                    <span style={{ fontSize: 120 }}> 0%</span>
                    <span style={{ color: "rgba(255, 255, 255, 0.6)" }}> Transaction fee</span>

                </span>
            </div>
            <div className="actions">
                <Link className="td-none" to="">
                    <Tooltip title={comingSoonText} color="#fff" key="#fff" >
                        <div className="launch-app-button cut_button">
                            <div className="launch-app-button-text">Decentralized</div>
                        </div>
                    </Tooltip>
                </Link>
                <Link className="td-none" to="/indexx-exchange/buy-sell">
                    <div className="login-button cut_button">
                        <div className="login-button_text">Centralized</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Section1;
