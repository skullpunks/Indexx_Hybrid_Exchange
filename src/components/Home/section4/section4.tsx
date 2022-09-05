import React, {useState} from "react";
import "./sections4.css"
import security from "../../../assets/security.png";
import PlentifulPairs from "../../../assets/PlentifulPairs.png";
import lowFees from "../../../assets/lowFees.png";

import getInTouch from "../../../assets/getInTouch.png";
import indexxai from "../../../assets/indexxai.png";
import community from "../../../assets/community.png";
import careers from "../../../assets/careers.png";

const Section4 = () => {

    const data = [
        {
            icon: security,
            heading: "Advanced Security",
            info: "We use state-of-the-art storage technology to protect your cryptocurrency and USD assets"

        },
        {
            icon: PlentifulPairs,
            heading: "Plentiful Pairs",
            info: "Access a variety of cryptocurrencies and trading pairs"

        },
        {
            icon: lowFees,
            heading: "Low fees",
            info: "Low fees empower you to buy, sell, and trade cryptocurrencies"

        },
    ]

    const data2 = [
        {
            icon: getInTouch,
            heading: "Dedicated Support",
            info: "Our support team is here to keep you trading happily",
            link : "Get in touch",

        },
        {
            icon: indexxai,
            heading: "indexx.ai  Blog",
            info: "Get the latest news and updates or level up your trading skills",
            link : "Visit the Blog",

        },
        {
            icon: community,
            heading: "Community",
            info: "Join other Binancians for discussions in our community",
            link : "Explore the Community",

        },
        {
            icon: careers,
            heading: "Careers",
            info: "Help us to build more opportunities for financial freedom in the United States",
            link : "See Open Positions",

        },
    ]

    return (
        <>
            <div className="section4-container">
                <div className="d-flex">
                    {data.map(item => (
                        <div className="item-container">
                            <img className="icon-class" src={item.icon} alt="icon"/>
                            <p className="item-heading">{item.heading}</p>
                            <p className="item-info">{item.info}</p>
                        </div>
                    ))}
                </div>
            </div>



            <div className="section4-container">
                <div className="section4-container-heading">
                    Get in Touch <br/>
                    Stay in Touch
                </div>
                <div className="d-flex">
                    {data2.map(item => (
                        <div className="item-container">
                            <img className="icon-class" src={item.icon} alt="icon"/>
                            <p className="item-heading">{item.heading}</p>
                            <p className="item-info">{item.info}</p>
                            <p className="item-link">{item.link}</p>
                        </div>
                    ))}
                </div>

            </div>

        </>

    );
};

export default Section4;
