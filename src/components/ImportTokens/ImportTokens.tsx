import React from 'react'
import Footer from '../Footer/Footer';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Button } from 'antd';
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

    return (
        <>
            <div className='scan-container flex-direction-column'>
                <p><h2> You can import indexx tokens to metamask wallet buy clicking on your preferred token </h2></p>
                <br />
                <br />
                <br />
                <br />
                <Button danger onClick={importIN500Token}>Import Indexx 500(IN500)</Button> <br />
                <br />
                <br />
                <br />
                <br />
                <Button danger onClick={importINXCToken}>Import Indexx Crypto(INXC)</Button> <br />
                <br />
                <br />
                <br />
                <br />
                <Button danger onClick={importIUSPToken}>Import Indexx USD+(IUSD+)</Button> <br />
                <br />
                <br />
                <br />
                <br />
                <Button danger onClick={importINEXToken}>Import Indexx Exchange(INEX)</Button> <br />
                <br />
            </div>

            <Footer />
        </>
    )
}

export default ImportTokens