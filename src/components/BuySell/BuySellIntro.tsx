
import { Tabs } from "antd";
// import { useState } from "react";
import BSConvertIntro from "./BSConvertIntro";
import BSSellIntro from "./BSSellIntro";
import BuyContent from "./BuyContent";
// import { Link } from "react-router-dom";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}



const BuySellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const userId = localStorage.getItem("user");

    return (<div className="bs_container card">
        {(userId) ?

            <Tabs defaultActiveKey="1" className="bs_tab_item">
                <Tabs.TabPane tab="Buy" key="1" >
                    <BuyContent setScreenName={setScreenName} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sell" key="2" >
                    <>
                        <h1 style={{ padding: 20 }}>
                        </h1>
                        <BSSellIntro setScreenName={setScreenName} />
                    </>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Convert" key="3" >
                    <>
                        <h1 style={{}}>
                        </h1>
                        <BSConvertIntro setScreenName={setScreenName} />
                    </>
                </Tabs.TabPane>
            </Tabs>
            :
            <>
                <div className="bs_container_header">
                    <h1>Buy Crypto</h1>
                </div>
                <BuyContent setScreenName={setScreenName} />
            </>
        }


    </div>
    )

}


export default BuySellIntro;