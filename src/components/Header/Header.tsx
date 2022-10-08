import React, { useEffect, useState } from "react";
import "./Header.css"
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'antd';
import indexText from "../../assets/arts/indexText.svg";
import { Dropdown, Menu, Space } from 'antd';
import { BellOutlined, CaretDownOutlined, DownOutlined } from "@ant-design/icons";

const menuProducts = (<Menu className="main_navigation"
    items={[
        { key: 1, label: <Link to="/indexx-exchange/swap">Swap</Link> },
        { key: 2, label: <Link to="/indexx-exchange/buy-sell">Buy & Sell</Link> }
    ]}
/>);
const menuEarn = (<Menu className="main_navigation"
    items={[
        { key: 1, label: <Link to="/indexx-exchange/trade-to-earn">Trade to earn</Link> },
        { key: 2, label: <Link to="/indexx-exchange/farms">Farms</Link> },
        { key: 3, label: <Link to="/indexx-exchange/pools">Pools</Link> }
    ]}
/>);
const menuCompany = (<Menu className="main_navigation"
    items={[
        { key: 1, label: <Link to="/indexx-exchange/about">About</Link> },
        { key: 2, label: <Link to="/indexx-exchange/hybrid-exchange">Hybrid exchange</Link> },
        { key: 3, label: <Link to="/indexx-exchange/affliate">Affiliate Program</Link> },
        { key: 4, label: <Link to="/indexx-exchange/blog">Blog</Link> }
    ]}
/>);


const menuNavigation = () => {
    return <>
        <Dropdown overlay={menuProducts} trigger={['click']}>
            <Link to="" className="text-white font_18x padding-r-1_x" onClick={e => e.preventDefault()}>
                <Space>Products<CaretDownOutlined /></Space> </Link>
        </Dropdown>
        <Dropdown overlay={menuEarn} trigger={['click']}>
            <Link to="" className="text-white font_18x padding-r-1_x" onClick={e => e.preventDefault()}>
                <Space>Earn<CaretDownOutlined /></Space> </Link>
        </Dropdown>
        <Dropdown overlay={menuCompany} trigger={['click']}>
            <Link to="" className="text-white font_18x padding-r-1_x" onClick={e => e.preventDefault()}>
                <Space>Company<CaretDownOutlined /></Space> </Link>
        </Dropdown>
    </>
}

const Header = () => {
    let location = useLocation()
    // let navigate = useNavigate()
    const [isInsideApp, setIsInsideApp] = useState(false);

    // (localStorage.getItem("user")) ? "" : 

    const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        localStorage.removeItem("user"); //remove one item
        // localStorage.clear(); //clear all localstorage
        window.location.reload();

    }
    const userMenu = (
        <Menu className="main_navigation"
            items={[
                { key: 1, label: <Link to="/indexx-exchange/about">Dashboard</Link> },
                { key: 2, label: <Link to="/indexx-exchange/hybrid-exchange">Account & Settings</Link> },
                { key: 3, label: <Link to="/indexx-exchange/affliate">Security</Link> },
                { key: 4, label: <Link to="/indexx-exchange/blog">Refer a Friend</Link> },
                { key: 5, label: <Link to="/indexx-exchange/blog">Export Reports </Link> },
                { key: 6, label: <Link to="/indexx-exchange/blog">API Management</Link> },
                { key: 7, label: <Link to="" onClick={logOutUser}>Log out</Link> }
            ]}
        />
    );

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
                                <Link to="/"><img src={indexText} className="index_logo" alt="index logo" /></Link>
                                <span className="logo__text">{showText[0]}</span>
                            </h1>
                            <div className="d-flex padding-l-3x padding-t-2x main_navigation">
                                {menuNavigation()}
                            </div>
                        </div>
                        {(location.pathname.includes("help")) &&
                            <Button type="primary" shape="round" size="large" className="btn_xl header_connect_wallet" onClick={() => window.open(window.location.origin, "_blank")}>Launch App</Button>
                        }
                        {(location.pathname.includes("buy-sell")) &&
                            <div className="d-flex flex-align-center">
                                {(localStorage.getItem("user")) ?
                                    <>

                                        <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x">Buy Crypto</Button>
                                        <BellOutlined className="padding-l-2x" style={{ fontSize: 20 }} />
                                        <Dropdown overlay={userMenu} trigger={['click']}>
                                            <Link to="" onClick={e => e.preventDefault()} className="padding-l-1x text-white">
                                                <Space> {localStorage.getItem("user")} <DownOutlined /> </Space>
                                            </Link>
                                        </Dropdown>
                                    </>
                                    :
                                    (location.pathname.includes("login")) ?
                                        <></>
                                        :
                                        <>
                                            <Link to="/indexx-exchange/buy-sell/login" className="text-underline" style={{ color: "#fff", width: 80 }}>Log In</Link>
                                            <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x">Get Started</Button>
                                        </>
                                }
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
                    <div className="d-flex main_navigation">
                        {menuNavigation()}
                    </div>
                )
            }
        </div >
    );
};

export default Header;
