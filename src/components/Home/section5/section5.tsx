import React from "react";
import "./sections5.css"
import BackgroundImage from "../../../assets/background.jpg";
import Icon1 from "../../../assets/token-icons/1.png";
import Icon2 from "../../../assets/token-icons/2.png";
// import Icon3 from "../../../assets/token-icons/3.png";
import Icon4 from "../../../assets/token-icons/4.png";
import Icon5 from "../../../assets/token-icons/5.png";
import Icon6 from "../../../assets/token-icons/6.png";
import Icon7 from "../../../assets/token-icons/7.png";
import Icon8 from "../../../assets/token-icons/8.png";
import Icon9 from "../../../assets/token-icons/9.png";
import Icon10 from "../../../assets/token-icons/10.png";
import Icon11 from "../../../assets/token-icons/11.png";
import Icon12 from "../../../assets/token-icons/12.png";
import Icon13 from "../../../assets/token-icons/13.png";
import Icon14 from "../../../assets/token-icons/14.png";
import Icon15 from "../../../assets/token-icons/15.png";
import Icon16 from "../../../assets/token-icons/16.png";
import Icon17 from "../../../assets/token-icons/17.png";
import Icon18 from "../../../assets/token-icons/18.png";
import Icon19 from "../../../assets/token-icons/19.png";
import Icon20 from "../../../assets/token-icons/20.png";
import Icon21 from "../../../assets/token-icons/21.png";
import Icon22 from "../../../assets/token-icons/22.png";
import Icon24 from "../../../assets/token-icons/24.png";
import Icon25 from "../../../assets/token-icons/25.png";
import Icon26 from "../../../assets/token-icons/26.png";
import Icon27 from "../../../assets/token-icons/27.png";
import Icon28 from "../../../assets/token-icons/28.png";
import Icon29 from "../../../assets/token-icons/29.png";

const Section5 = () => {
    const IconsSet1 = [
        Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9, Icon10, Icon11, Icon12, Icon13, Icon14, Icon15,
        Icon16, Icon17, Icon18, Icon19, Icon20, Icon21, Icon22, Icon24, Icon25, Icon26, Icon26, Icon27, Icon28, Icon29,
        Icon9, Icon10, Icon11, Icon12, Icon13, Icon14, Icon15, Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8,
        Icon24, Icon25, Icon26, Icon26, Icon27, Icon28, Icon29, Icon16, Icon17, Icon18, Icon19, Icon20, Icon21, Icon22,
        Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8, Icon9, Icon10, Icon11, Icon12, Icon13, Icon14, Icon15,
        Icon16, Icon17, Icon18, Icon19, Icon20, Icon21, Icon22, Icon24, Icon25, Icon26, Icon26, Icon27, Icon28, Icon29,
        Icon9, Icon10, Icon11, Icon12, Icon13, Icon14, Icon15, Icon1, Icon2, Icon4, Icon5, Icon6, Icon7, Icon8,
        Icon24, Icon25, Icon26, Icon26, Icon27, Icon28, Icon29, Icon16, Icon17, Icon18, Icon19, Icon20, Icon21, Icon22,
    ]
    return (
        <div style={{ backgroundImage: `url(${BackgroundImage})` }} className="last-container">
            <div className="currencies">
                <div className="currencies-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    {IconsSet1.map((icon, key) => <img key={key} className="graphic-image ml-25" src={icon} alt="coin-icon" />)}
                </div>
                <div className="currencies-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 100 }}>
                    {IconsSet1.reverse().map((icon, key) => <img key={key} className="graphic-image mr-25" src={icon} alt="coin-icon" />)}
                </div>
            </div>

            <div className="section-heading">Select From Over 100 Cryptocurrencies</div>
            <div className="section-helper-text">  Trade BTC, ETH and other cryptocurrencies in minutes.</div>
            <div className="actions">
                <div className="getStarted">
                    Get Started
                </div>
            </div>
        </div>
    );
};

export default Section5;
