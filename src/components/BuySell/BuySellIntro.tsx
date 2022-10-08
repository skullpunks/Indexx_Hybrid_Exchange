import IN500 from "../../assets/token-icons/33.png";
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { ReloadOutlined } from '@ant-design/icons';
import { Dropdown, Input, Menu, Space, Tabs } from "antd";
import { useState } from "react";
import BSConvertIntro from "./BSConvertIntro";
import BSSellIntro from "./BSSellIntro";

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const menu = (
    <Menu
        items={[
            {
                label: <a href="https://www.antgroup.com">
                    One-time purchase </a>,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">Daily <br />Every day starting today</a>,
                key: '1',
            },
            {
                label: <a href="https://www.aliyun.com">Weekly <br />Every Tuesday starting today</a>,
                key: '2',
            },
            {
                label: <a href="https://www.aliyun.com">Every 1st and 15th <br />Today and every 1st and 15th</a>,
                key: '3',
            },
            {
                label: <a href="https://www.aliyun.com">Monthly <br /> Purchase recurs every month</a>,
                key: '4',
            },
            // {
            //     type: 'divider',
            // },
            // {
            //     label: '3rd menu item',
            //     key: '3',
            // },
        ]}
    />
);


const BuySellIntro: React.FC<(Props)> = ({ setScreenName }) => {
    const userId = localStorage.getItem("user");
    const [cryptoVal, setCryptoVal] = useState(0);
    const updateCryptoVal = (e: React.MouseEvent<HTMLElement>) => {
        // console.log(setCryptoVal);
        setCryptoVal((e.target as any).value);
    }

    const BuyContent = () => {
        return <>
            <div className="bs_container_main">
                {/* <div className="bs_curreny d-flex ">
                     <div className="bs_curreny_left"><span className="bs_currency_symbol">$ </span>0</div> 
                    <div className="bs_curreny_left"><span className="bs_currency_symbol">$ </span><Input placeholder="0" bordered={false} value={cryptoVal} onClick={updateCryptoVal} /></div>
                    <div><img src={SwapArrowIcon} alt="ddd" /></div>
                </div> */}
                <div className="bs_curreny d-flex position-relative ">
                    <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)" }}>
                        <span className="font_20x">$</span>
                        <input placeholder="0" className=" " type="text" value="" style={{ width: "57px" }} />

                    </div>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div>
                </div>
                <div className="bs_purchase d-flex">
                    <Dropdown overlay={menu} trigger={['click']} >
                        <a onClick={e => e.preventDefault()}>
                            <Space style={{ color: "#F66036" }}>
                                <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                                One-time purchase

                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }} onClick={() => setScreenName("select")}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={IN500} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        IN500 <span className="token_grey">Indexx500</span>
                    </div>
                </div>
                <div>  <img src={arrowAddress} alt="arrow icon" style={{}} /></div>
            </div>
            <div className="bs_footer_action">
                <button>Preview Purchase </button>
            </div>
        </>
    }

    return (<div className="bs_container card">
        {(userId) ?

            <Tabs defaultActiveKey="1" className="bs_tab_item">
                <Tabs.TabPane tab="Buy" key="1" >
                    <BuyContent />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sell" key="2" >
                    <h1 style={{ padding: 20 }}>
                        <BSSellIntro setScreenName={setScreenName} />
                    </h1>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Convert" key="3" >
                    <h1 style={{}}>
                        <BSConvertIntro setScreenName={setScreenName} />
                    </h1>
                </Tabs.TabPane>
            </Tabs>
            :
            <>
                <div className="bs_container_header">
                    <h1>Buy Crypto</h1>
                </div>
                <BuyContent />
            </>
        }


    </div>
    )

}


export default BuySellIntro;