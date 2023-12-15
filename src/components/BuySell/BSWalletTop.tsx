import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import wallet from '../../assets/BSheader/funding grey 1.svg';
// import comingSoon from "../../assets/coming_soon.png";
import { decodeJWT, getUserWallets, getCoinPriceByName } from '../../services/api';

const BSWalletTop = () => {
    const navigate = useNavigate();
    const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
    let access_token = String(localStorage.getItem("access_token"));
    let decoded: any = decodeJWT(access_token);

    useEffect(() => {
        getAllUserWallet();
    }, []);


    const getAllUserWallet = async () => {
        try {
            const userWallets = await getUserWallets(decoded.email);
            const usersWallet = userWallets.data;
            let totalBalInUSD = 0;
    
            usersWallet.forEach((wallet: any) => {
                const balance = Number(wallet.coinBalance);
                if (wallet.coinType === "Crypto" && wallet.coinPrice) {
                    const price = Number(wallet.coinPrice);
                    if (!isNaN(price)) {
                        totalBalInUSD += balance * price;
                    }
                } else {
                    totalBalInUSD += balance;
                }
            });
    
            setTotalBalanceInUSD(totalBalInUSD);
        } catch (err) {
            console.error("Error in getAllUserWallet", err);
        }
    };
    

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className='border-b-1x orange width-100 padding-t-2x padding-b-2x d-flex flex-direction-column align-items-center'>
                <h1 className='padding-b-1x padding-t-1x fw-bold font_40x'>
                    <img src={wallet} alt="logo" style={{ marginRight: "20px", width: "71px" }} />
                    Funding Wallet
                </h1>
                <div className='font_20x padding-b-3x'>
                    Your trusted financial companion for managing, saving, and investing your money.
                </div>
            </div>
            <div className='padding-t-1x width-100 bs_wallet_top_banner position-relative' >
                <h2>Estimated Balance</h2>
                <div className='d-flex flex-align-center color_general'>
                    <h2 className='margin-b-0'>$</h2>
                    {isVisible ?
                        <h1 className='margin-b-0 '>{(Math.floor(totalBalanceInUSD * 100) / 100).toLocaleString()}&nbsp;&nbsp;&nbsp;</h1>
                        :
                        <h1 className='margin-b-0 '>{(Math.floor(totalBalanceInUSD * 100) / 100).toLocaleString().replace(/./g, '•')}&nbsp;&nbsp;&nbsp;</h1>
                    }
                    <div onClick={toggleVisibility}>
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </div>

                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <img className='padding-l-1x' src={comingSoon} alt="comingSoon" style={{  objectFit: 'cover' }} />
                </div> */}

                <div className='bs_wallet_buttons d-flex d-md-flex d-none'>
                    {/* <Button type="primary" danger>Withdraw</Button> */}
                    {/* <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x" onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button> */}
                    <Button type="primary" className='margin-r-1x buy_crypto_btn' danger onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button>
                    <Button type="primary" className='margin-r-1x buy_crypto_btn' danger onClick={() => navigate("/indexx-exchange/buy-sell?type=sell")}>Sell Crypto</Button>
                    <Button type="primary" className='margin-r-1x buy_crypto_btn' danger onClick={() => navigate("/indexx-exchange/buy-sell?type=convert")}>Convert Crypto</Button>
                    {/* <Link to="/indexx-exchange/buy-sell/withdraw-crypto"></Link> */}
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn margin-r-1x' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}> Deposit </Button>
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn withdraw_btn margin-r-1x' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}> Withdraw </Button>
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn send_btn' onClick={() => navigate("/indexx-exchange/send")}> Send </Button>

                </div>
            </div>
        </>
    )
}

export default BSWalletTop