import React from 'react'
import Footer from '../Footer/Footer';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Button, Image } from 'antd';
import IN500 from '../../assets/token-icons/IN500.png';
import INXC from '../../assets/token-icons/INXC.png';
import IUSD from '../../assets/token-icons/IUSD+.png';
import INEX from '../../assets/token-icons/INEX.png';
import INXP from '../../assets/token-icons/INXP.png';
// import fortuneLadyCoin from "../../assets/arts/fortuneLadyCoin.png";
// import careersIcon from "../../assets/arts/careersIcon.png";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider
    }
}

const ImportTokens = () => {

    const importIN500Token = async () => {
        const tokenAddress = "0xa18f33e2C63C0A781f6836f9Ae8F5f6517Ce4e90";
        const tokenSymbol = "IN500";
        const tokenDecimals = 18;
        const tokenImage = "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/in500.png";


        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window?.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const importINXCToken = async () => {
        const tokenAddress = "0x7325E062EA31E7b977fbEBBcC45De30c3e894988";
        const tokenSymbol = "INXC";
        const tokenDecimals = 18;
        const tokenImage = "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/crypto.png";


        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window?.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const importIUSPToken = async () => {
        const tokenAddress = "0xa18f33e2C63C0A781f6836f9Ae8F5f6517Ce4e90";
        const tokenSymbol = "IUSD+";
        const tokenDecimals = 18;
        const tokenImage = "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/usd%2B.png";


        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window?.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const importINEXToken = async () => {
        const tokenAddress = "0xD0D8c92c577E58AA2d77481F51557fd10AC76232";
        const tokenSymbol = "INEX";
        const tokenDecimals = 18;
        const tokenImage = "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/INEX.png";


        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window?.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const importINXPToken = async () => {
        const tokenAddress = "0xd2BE78E43aeB9135259D9A5362ff13B8557E172c";
        const tokenSymbol = "INXP";
        const tokenDecimals = 18;
        const tokenImage =
            "https://indexx-exchange.s3.ap-northeast-1.amazonaws.com/INXP.png";

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window?.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='scan-container flex-direction-column'>
                <p><h2 style={{ marginTop: 30, textAlign: "center" }}> You can import indexx tokens to metamask wallet by clicking on your preferred token </h2></p>
                <br />
                <br />
                <br />
                <div className="row " style={{ textAlign: "center", marginLeft: -300 }}>

                    <div className="col " style={{ textAlign: "right" }}>
                        <Image preview={false} style={{ width: 50, marginTop: -4 }} src={IN500}></Image>
                    </div>

                    <div className="col " style={{ textAlign: "left" }}>
                        <Button type="primary" danger onClick={importIN500Token} size="large" style={{ width: 300, borderRadius: 4 }}>Import Indexx 500 (IN500)</Button> <br />
                    </div>

                </div>




                <br />
                <br />
                <br />
                <br />
                <div className="row " style={{ textAlign: "center", marginLeft: -300 }}>

                    <div className="col " style={{ textAlign: "right" }}>
                        <Image preview={false} style={{ width: 50, marginTop: -4 }} src={INXC}></Image>
                    </div>

                    <div className="col " style={{ textAlign: "left" }}>
                        <Button type="primary" danger onClick={importINXCToken} size="large" style={{ width: 300, borderRadius: 4 }}>Import Indexx Crypto (INXC)</Button> <br />
                    </div>

                </div>

                <br />
                <br />
                <br />
                <br />
                <div className="row " style={{ textAlign: "center", marginLeft: -300 }}>

                    <div className="col " style={{ textAlign: "right" }}>
                        <Image preview={false} style={{ width: 50, marginTop: -4 }} src={IUSD}></Image>
                    </div>

                    <div className="col " style={{ textAlign: "left" }}>
                        <Button type="primary" danger onClick={importIUSPToken} size="large" style={{ width: 300, borderRadius: 4 }}>Import Indexx USD+ (IUSD+)</Button> <br />
                    </div>

                </div>



                <br />
                <br />
                <br />
                <br />

                <div className="row " style={{ textAlign: "center", marginLeft: -300 }}>

                    <div className="col " style={{ textAlign: "right" }}>
                        <Image preview={false} style={{ width: 50, marginTop: -4 }} src={INEX}></Image>
                    </div>

                    <div className="col " style={{ textAlign: "left" }}>
                        <Button type="primary" danger onClick={importINEXToken} size="large" style={{ width: 300, borderRadius: 4 }}>Import Indexx Exchange (INEX)</Button> <br />
                    </div>

                </div>

                <br />
                <br />
                <br />
                <br />

                <div className="row " style={{ textAlign: "center", marginLeft: -300 }}>

                    <div className="col " style={{ textAlign: "right" }}>
                        <Image preview={false} style={{ width: 55, marginTop: -4 }} src={INXP}></Image>
                    </div>

                    <div className="col " style={{ textAlign: "left" }}>
                        <Button type="primary" danger onClick={importINXPToken} size="large" style={{ width: 300, borderRadius: 4 }}>Import Indexx Phoenix (INXP)</Button> <br />
                    </div>

                </div>

                <br />
                <br />
            </div>

            <Footer />
        </>
    )
}

export default ImportTokens