import React, { useEffect, useState } from "react";
import "./Header.css"
import Dropdown from "../DropDown/DropDown";
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'antd';
import indexText from "../../assets/arts/indexText.svg";


const Header = () => {
    let location = useLocation()
    const [isInsideApp, setIsInsideApp] = useState(false)

    useEffect(() => {
        if (location) {
            setIsInsideApp(location.pathname.includes("/indexx-exchange/"))
        }
    },
        [location]
    )

    const Links = [
        {
            label: "Swap",
            value: "swap",
            url: "/indexx-exchange/swap"
        },
        {
            label: "Buy & Sell",
            value: "buy-sell",
            url: "/indexx-exchange/buy-sell"
        },
        {
            label: "Trade to Earn",
            value: "trade-to-earn",
            url: "/indexx-exchange/trade-to-earn"
        }
    ]

    const showText: any = Links.filter((link) => location.pathname.includes(link.value)).map(obj => obj.label);
    return (
        <div className="main-header">
            {isInsideApp ?
                (
                    <div className="link-container">
                        <div className="d-flex">
                            <h1 className="logo mb-0 d-flex">
                                <Link to="/"><img src={indexText} alt="index logo" /></Link>
                                <span className="logo__text">{showText[0]}</span>
                            </h1>
                            <div className="d-flex padding-l-3x">
                                <Dropdown label="Products" items={[
                                    { key: 1, label: "Swap", path: "/indexx-exchange/swap" }, { key: 2, label: "Buy & Sell", path: "/indexx-exchange/buy-sell" }
                                ]} />
                                <Dropdown label="Earn" items={[
                                    { key: 3, label: "Trade to earn", path: "/indexx-exchange/trade-to-earn" }, { key: 4, label: "Farms" }, { key: 5, label: "Pools" }
                                ]} />
                                <Dropdown label="Company" items={[
                                    { key: 6, label: "About" }, { key: 7, label: "Hybrid exchange" }, { key: 8, label: "Affiliate Program" }, { key: 9, label: "Blog" }
                                ]} />
                            </div>
                        </div>
                        {(location.pathname.includes("help")) &&
                            <Button type="primary" shape="round" size="large" className="btn_xl header_connect_wallet" onClick={() => window.open(window.location.origin, "_blank")}>Launch App</Button>
                        }
                        {(location.pathname.includes("buy-sell")) &&
                            <div className="d-flex flex-align-center">
                                <Link to="/indexx-exchange/buy-sell/login" style={{ color: "#fff", width: 80 }}>Log In</Link>
                                <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x">Get Started</Button>
                            </div>
                        }
                        {(location.pathname.includes("trade-to-earn")) &&
                            <div className="d-flex flex-align-center">
                                <Link to="/" style={{ color: "#fff", width: 80 }}>Trade To Earn</Link>
                                <Button danger type="primary" shape="round" size="large" className="btn_xl trade_button margin-l-3x">Buy Crypto</Button>
                            </div>
                        }
                        {(location.pathname.includes("swap")) &&
                            <Button type="primary" shape="round" size="large" className="btn_xl header_connect_wallet">Connect Wallet</Button>
                        }

                    </div>
                ) : (
                    <div className="d-flex">
                        <Dropdown label="Products" items={[
                            { key: 1, label: "Swap", path: "/indexx-exchange/swap" }, { key: 2, label: "Buy & Sell", path: "/indexx-exchange/buy-sell" }
                        ]} />
                        <Dropdown label="Earn" items={[
                            { key: 3, label: "Trade to earn", path: "/indexx-exchange/trade-to-earn" }, { key: 4, label: "Farms" }, { key: 5, label: "Pools" }
                        ]} />
                        <Dropdown label="Company" items={[
                            { key: 6, label: "About" }, { key: 7, label: "Hybrid exchange" }, { key: 8, label: "Affiliate Program" }, { key: 9, label: "Blog" }
                        ]} />
                    </div>
                )
            }
        </div >
    );
};

export default Header;
