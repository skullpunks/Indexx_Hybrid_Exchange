import React, {useEffect, useState} from "react";
import "./Header.css"
import Dropdown from "../DropDown/DropDown";
import {NavLink, useLocation} from 'react-router-dom'


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
            url: "/indexx-exchange/swap"
        },
        {
            label: "Buy & Sell",
            url: "/indexx-exchange/buy_sell"
        },
        {
            label: "indexxScan",
            url: "indexx-exchange/indexxscan"
        },
        {
            label: "Chart",
            url: "indexx-exchange/charts"
        },
    ]

    return (
        <div className="main-header">
            {isInsideApp ?
                (
                    <div className="link-container">
                        <div className="app-link-container">
                            {Links.map(link => (
                                <NavLink
                                    to={link.url}
                                    className={({isActive}) => (isActive ? ' app-link td-none active' : 'app-link td-none')}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                        <div className="header-connect-wallet">
                            Connect Wallet
                        </div>
                    </div>
                ) : (
                    <Dropdown label="Products" items={[
                        {label: "Buy"}, {label: "Sell"}, {label: "Swap"}
                    ]}/>
                )}
        </div>
    );
};

export default Header;
