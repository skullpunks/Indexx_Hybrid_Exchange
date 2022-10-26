import { Button } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";
// import indexText from "../../assets/arts/indexText.svg";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from 'antd';
// import loaderGif from "../../assets/arts/loaderIcon.gif";


const menuProducts = (<Menu className="main_navigation"
    items={[
        { key: 2, label: <Link to="/indexx-exchange/buy-sell">Buy & Sell</Link> },
        { key: 1, label: <Link to="/indexx-exchange/coming-soon?page=decentralized">Decentralized</Link> },
        { key: 3, label: <a href="https://tokens.indexx.ai/" target="_blank" rel="noreferrer">indexx Tokens</a> },
    ]}
/>);
const menuEarn = (<Menu className="main_navigation"
    items={[
        { key: 1, label: <Link to="/indexx-exchange/trade-to-earn">Trade to earn</Link> },
        { key: 2, label: <Link to="/indexx-exchange/coming-soon?page=Farms">Farms</Link> },
        { key: 3, label: <Link to="/indexx-exchange/coming-soon?page=Pools">Pools</Link> }
    ]}
/>);
const menuCompany = (<Menu className="main_navigation"
    items={[
        { key: 1, label: <Link to="/indexx-exchange/help">About</Link> },
        { key: 2, label: <Link to="/indexx-exchange/coming-soon?page=Hybrid Exchange">Hybrid Exchange</Link> },
        { key: 3, label: <a href="https://register.affiliate.indexx.ai/" target="_blank" rel="noreferrer">Affiliate Program</a> },
        { key: 4, label: <Link to="/indexx-exchange/blog">Blog</Link> }
    ]}
/>);


const menuNavigation = () => {
    return <>

        <nav className="navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid">
                <div className="width-100 hamburger-icon">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/" target="_blank" rel="noopener noreferrer">
                                <Dropdown overlay={menuProducts} trigger={['click']}>
                                    <Link to="" className="text-white font_18x padding-r-1_x nav-item" onClick={e => e.preventDefault()}>
                                        <Space className="nav-link dropdown-toggle">Products</Space> </Link>
                                </Dropdown>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" target="_blank" rel="noopener noreferrer">
                                <Dropdown overlay={menuEarn} trigger={['click']}>
                                    <Link to="" className="text-white font_18x padding-r-1_x nav-item" onClick={e => e.preventDefault()}>
                                        <Space className="nav-link dropdown-toggle">Earn</Space> </Link>
                                </Dropdown></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" target="_blank" rel="noopener noreferrer"> <Dropdown overlay={menuCompany} trigger={['click']}>
                                <Link to="" className="text-white font_18x padding-r-1_x nav-item" onClick={e => e.preventDefault()}>
                                    <Space className="nav-link dropdown-toggle">Company</Space> </Link>
                            </Dropdown></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
}

const Header = () => {
    let location = useLocation();
    let navigate = useNavigate()
    const [isInsideApp, setIsInsideApp] = useState(false);

    // (localStorage.getItem("user")) ? "" : 

    const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        localStorage.removeItem("user"); //remove one item
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.clear(); //clear all localstorage
        window.location.reload();
        // navigate("/indexx-exchange/buy-sell/login");

    }
    const userMenu = (
        <Menu className="main_navigation"
            items={[
                { key: 1, label: <Link to="/indexx-exchange/about">Dashboard</Link> },
                { key: 2, label: <Link to="/indexx-exchange/hybrid-exchange">Account & Settings</Link> },
                // { key: 3, label: <Link to="/indexx-exchange/affliate">Security</Link> },
                // { key: 4, label: <Link to="/indexx-exchange/blog">Refer a Friend</Link> },
                // { key: 5, label: <Link to="/indexx-exchange/blog">Export Reports </Link> },
                { key: 6, label: <Link to="/indexx-exchange/buy-sell/wallet">Wallet</Link> },
                { key: 7, label: <Link to="/indexx-exchange/buy-sell/withdraw-crypto">Withdraw</Link> },
                { key: 8, label: <Link to="/indexx-exchange/buy-sell/deposit-crypto">Deposit</Link> },
                { key: 9, label: <Link to="/indexx-exchange/buy-sell/transaction-history">Transaction History</Link> },
                { key: 10, label: <Link to="" onClick={logOutUser}>Log out</Link> }
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
        },
        {
            label: "Markets",
            value: "markets",
            url: "/indexx-exchange/markets"
        },
        {
            label: "Tokens",
            value: "tokens",
            url: "/indexx-exchange/tokens"
        }
    ]

    const showText: any = Links.filter((link) => location.pathname.includes(link.value)).map(obj => obj.label);
    const showUrl: any = Links.filter((link) => location.pathname.includes(link.value)).map(obj => obj.url);
    return (
        <div className="main-header">
            {isInsideApp ?
                (
                    <div className="link-container">
                        <div className="d-flex flex-align-center">
                            <h1 className="logo mb-0 d-flex">
                                <Link to="/" className="logo__icon">
                                    {/* <img src={indexText} className="index_logo" alt="index logo" /> */}
                                </Link>
                                {((location.pathname.includes("get-started")) || (location.pathname.includes("login"))) ?
                                    <></> :
                                    <a href={showUrl[0]} className="logo__text">{showText[0]}</a>
                                }
                            </h1>
                            <div className="d-flex padding-l-3x main_navigation">
                                {((location.pathname.includes("get-started")) || (location.pathname.includes("login"))) ?
                                    <></> :
                                    menuNavigation()
                                }
                            </div>
                        </div>
                        {(location.pathname.includes("help")) &&
                            <Button type="primary" shape="round" size="large" className="btn_xl header_connect_wallet" onClick={() => window.open(window.location.origin, "_blank")}>Launch App</Button>
                        }
                        {(location.pathname.includes("buy-sell") || location.pathname.includes("tokens") || location.pathname.includes("trade-to-earn")) &&
                            <div className="d-flex flex-align-center">
                                {(localStorage.getItem("user")) ?
                                    <>
                                        <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x buy_crypto_btn" onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button>
                                        <BellOutlined className="padding-l-2x" style={{ fontSize: 20 }} />
                                        <Dropdown overlay={userMenu} trigger={['click']}>
                                            <Link to="" onClick={e => e.preventDefault()} className="padding-l-1x text-white">
                                                <Space> {localStorage.getItem("user")} <DownOutlined /> </Space>
                                            </Link>
                                        </Dropdown>
                                    </>
                                    :
                                    (location.pathname.includes("login") || location.pathname.includes("get-started")) ?
                                        <></>
                                        :
                                        <>
                                            <Link to="/indexx-exchange/buy-sell/login" className=" text-white" style={{ width: 80 }}>Log In</Link>
                                            <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x" onClick={() => navigate("/indexx-exchange/buy-sell/get-started")}>Get Started</Button>
                                        </>
                                }
                            </div>
                        }

                        {(location.pathname.includes("swap")) &&
                            <Button type="primary" shape="round" size="large" className="btn_xl header_connect_wallet">Connect Wallet</Button>
                        }

                    </div>
                ) : (
                    <div className="d-flex main_navigation index_page_nav">
                        {menuNavigation()}
                    </div>
                )
            }
            {/* <div className="loader" id="loaderLayer"> <img src={loaderGif} alt="loader" /></div> */}
        </div >
    );
};

export default Header;
