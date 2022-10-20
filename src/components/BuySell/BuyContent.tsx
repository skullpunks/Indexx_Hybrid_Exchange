import React, { useState } from 'react';
import IN500 from "../../assets/token-icons/33.png";
import arrowAddress from "../../assets/arts/arrowAddress.svg";
import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import bsDollar from "../../assets/arts/bsDollar.svg";
import { ReloadOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const menu = (
    <Menu
        items={[
            {
                label: <span>
                    One-time purchase </span>,
                key: '0',
            },
            {
                label: <span>Daily <span>(coming soon)</span> <br />Every day starting today </span>,
                key: '1',
                disabled: true,
            },
            {
                label: <span>Weekly <span>(coming soon)</span> <br />Every Tuesday starting today</span>,
                key: '2',
                disabled: true,
            },
            {
                label: <span>Every 1st and 15th <span>(coming soon)</span> <br />Today and every 1st and 15th</span>,
                key: '3',
                disabled: true,
            },
            {
                label: <span>Monthly <span>(coming soon)</span> <br /> Purchase recurs every month</span>,
                key: '4',
                disabled: true,
            },
        ]}
    />
);
const BuyContent: React.FC<(Props)> = ({ setScreenName }) => {
    const [buyVal, setBuyVal] = useState("");

    const updateBuyVal = (e: React.FormEvent<HTMLInputElement>) => {
        let testVal: string = "";
        if (e.currentTarget != null) {
            testVal = e?.currentTarget?.value;
            setBuyVal(testVal);
        }
    }
    return (
        <div><div className="bs_container_main">
            <div className="bs_curreny d-flex position-relative ">
                <div className="bs_curreny_left padding-b-2x" style={{ transform: "scale(1)" }}>
                    <span className="font_20x">$</span>
                    {/* <input placeholder="0" className=" " type="text" value={val} onChange={() => updateBuyVal} style={{ width: "207px" }} /> */}
                    <input placeholder="0" className="input_currency" type="text" value={buyVal} onChange={updateBuyVal} />
                </div>
                <div className='swap_Arrow_icon'>
                    <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                </div>
            </div>
            <div className="bs_purchase d-flex">
                <Dropdown overlay={menu} trigger={['click']} >
                    <Space style={{ color: "#F66036" }}>
                        <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                        One-time purchase
                    </Space>
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
                <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div>
            </div>

            <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                <div className="bs_token_left d-flex justify-between">
                    <div className="bs_token_num d-flex flex-align-center" >
                        <img src={bsDollar} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                        USD  <span className="token_grey">US Dollar</span>
                    </div>
                </div>

            </div>
            <div className="bs_footer_action">
                <button>Preview Purchase </button>
            </div></div>
    )
}

export default BuyContent