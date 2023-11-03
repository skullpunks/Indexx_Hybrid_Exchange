import React from "react";
import "./Home.css"
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Section3 from "./section3/section3";
import Section4 from "./section4/section4";
import Section5 from "./section5/section5";
// import Footer from "../Footer/Footer";

import TradeToEarnBanner from "./TradeToEarnBanner/TradeToEarnBanner";

const Home = () => {
    return (
        <>
            <Section1 />
            <Section2 />
            <TradeToEarnBanner />
            <Section3 />
            <Section4 />
            <Section5 />
            {/* <Footer helpIcon={false} /> */}
        </>
    );
};

export default Home;
