import "./sections4.css"
import security from "../../../assets/security.png";
import PlentifulPairs from "../../../assets/PlentifulPairs.png";
import lowFees from "../../../assets/lowFees.png";

import getInTouch from "../../../assets/getInTouch.png";
import indexxai from "../../../assets/indexxai.png";
import community from "../../../assets/community.png";
import careers from "../../../assets/careers.png";
import footer_banner from "../../../assets/arts/footer_banner.png";
import { Link } from "react-router-dom";

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
            heading: "Exchange Fee",
            info: "0.075% for other cryptocurrencies and 0.055% for indexx tokens."

        },
    ]

    const data2 = [
        {
            icon: getInTouch,
            heading: "Dedicated Support",
            info: "Our support team is here to keep you trading happily",
            link: "Get in touch",
            url: "/indexx-exchange/blog"

        },
        {
            icon: indexxai,
            heading: "indexx.ai  Blog",
            info: "Get the latest news and updates or level up your trading skills",
            link: "Visit the Blog",
            url: "/indexx-exchange/blog"

        },
        {
            icon: community,
            heading: "Community",
            info: "Join other Binancians for discussions in our community",
            link: "Explore the Community",
            url: "/indexx-exchange/blog"

        },
        {
            icon: careers,
            heading: "Careers",
            info: "Help us to build more opportunities for financial freedom in the United States",
            link: "See Open Positions",
            url: "/indexx-exchange/blog"

        },
    ]

    return (
        <>
            <div className="section4-container container">
                <div className="d-flex flex-align-start row">
                    {data.map((item, key) => (
                        <div className="item-container col-md-4" key={key}>
                            <img className="icon-class" src={item.icon} alt="icon" />
                            <p className="item-heading">{item.heading}</p>
                            <p className="item-info">{item.info}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section4_banner">
                <img src={footer_banner} alt="Banner" />
            </div>

            <div className="container ">
                <div className="section4-container-heading">
                    Get in Touch <br />
                    Stay in Touch
                </div>
                <div className="d-flex stay_in_touch row">
                    {data2.map((item, key) => (
                        <div className="item-container col-md-3 col-sm-6 item-container" key={key} >
                            <img className="icon-class" src={item.icon} alt="icon" />
                            <p className="item-heading">{item.heading}</p>
                            <p className="item-info">{item.info}</p>
                            <Link to={item?.url} className="item-link">{item.link}</Link>
                        </div>
                    ))}
                </div>

            </div>

        </>

    );
};

export default Section4;
