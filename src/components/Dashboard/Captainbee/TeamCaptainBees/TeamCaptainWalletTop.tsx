import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import openEye from "../../../../assets/arts/openEye.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import comingSoon from "../../../../assets/coming_soon.png";
import { decodeJWT, getUserWallets } from '../../../../services/api';

type TeamCaptWalletTableProps = {
    email: string;
};

const TeamCaptainWalletTop: React.FC<TeamCaptWalletTableProps> = ({ email }) => {
    const navigate = useNavigate();
    const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
    let access_token = String(localStorage.getItem("access_token"));
    let decoded: any = decodeJWT(access_token);

    useEffect(() => {
        getAllUserWallet();
        //     getUserWallets(decoded.email).then((userWallets) => { 
        //     let usersWallet = userWallets.data;
        //     let totalBalInUSD = 0;
        //     for (let i = 0; i < usersWallet.length; i++) {
        //         if(usersWallet[i].coinType === "Crypto") {
        //           getCoinPriceByName(usersWallet[i]?.coinSymbol).then((res) => {
        //                 let coinPrice = res.data;
        //                 let totalCoinBalance = usersWallet[i].coinBalance * coinPrice;
        //                 totalBalInUSD += totalCoinBalance;
        //                 setTotalBalanceInUSD(totalBalInUSD);
        //            });
        //         } else {
        //             totalBalInUSD += Number(usersWallet[i]?.coinBalance);
        //         }
        //     }
        //     setTotalBalanceInUSD(totalBalInUSD)
        // });
    }, []);



    const getAllUserWallet = async () => {
        if (email) {
            // let userWallets = await getUserWallets(email);
            // let usersWallet = userWallets.data;
            // let totalBalInUSD = 0;
            // for (let i = 0; i < usersWallet.length; i++) {
            //     if (usersWallet[i].coinType === "Crypto") {
            //         let res = await getCoinPriceByName(usersWallet[i]?.coinSymbol);
            //         let price = Number(res.data.results.data);
            //         totalBalInUSD += Number(usersWallet[i]?.coinBalance) * price;
            //     } else {
            //         totalBalInUSD += Number(usersWallet[i]?.coinBalance);
            //     }
            // }
            // setTotalBalanceInUSD(totalBalInUSD)

            const userWallets = await getUserWallets(email);
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
        } else {
            // let userWallets = await getUserWallets(decoded.email);
            // let usersWallet = userWallets.data;
            // let totalBalInUSD = 0;
            // for (let i = 0; i < usersWallet.length; i++) {
            //     if (usersWallet[i].coinType === "Crypto") {
            //         let res = await getCoinPriceByName(usersWallet[i]?.coinSymbol);
            //         let price = Number(res.data.results.data);
            //         totalBalInUSD += Number(usersWallet[i]?.coinBalance) * price;
            //     } else {
            //         totalBalInUSD += Number(usersWallet[i]?.coinBalance);
            //     }
            // }
            // setTotalBalanceInUSD(totalBalInUSD)

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
        }
    }

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className='border-b-1x orange width-100 pt-3 font_15x'>
                <h1 className='font_15x'>Funding Wallet</h1>
            </div>
            <div className='padding-t-1x width-100 position-relative' >
                <h2 className='font_15x'>Estimated Balance</h2>
                <div className='d-flex flex-align-center color_general'>
                    <h2 className='margin-b-0 font_15x'>$</h2>
                    {isVisible ?
                        <h1 className='margin-b-0 font_15x'>{Math.floor(totalBalanceInUSD * 100) / 100}&nbsp;&nbsp;&nbsp;</h1>
                        :
                        <h1 className='margin-b-0 font_15x'>{(Math.floor(totalBalanceInUSD * 100) / 100).toString().replace(/./g, '•')}&nbsp;&nbsp;&nbsp;</h1>
                    }
                    <div onClick={toggleVisibility}>
                        {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </div>
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className='mt-3 mb-2'>
                    <img className='padding-l-1x' src={comingSoon} alt="comingSoon" style={{  width:"650px", height:"150px", objectFit: 'cover' }} />
                </div> */}

                <div className='bs_wallet_buttons d-flex d-md-flex d-none'>
                    {/* <Button type="primary" danger>Withdraw</Button> */}
                    {/* <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x" onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button> */}
                    <Button type="primary" className='margin-r-1x buy_crypto_btn font_15x small-btn' danger onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button>
                    <Button type="primary" className='margin-r-1x buy_crypto_btn font_15x small-btn' danger onClick={() => navigate("/indexx-exchange/buy-sell?type=sell")}>Sell Crypto</Button>
                    <Button type="primary" className='margin-r-1x buy_crypto_btn font_15x small-btn' danger onClick={() => navigate("/indexx-exchange/buy-sell?type=convert")}>Convert Crypto</Button>

                    {/* <Link to="/indexx-exchange/buy-sell/withdraw-crypto"></Link> */}
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn margin-r-1x font_15x small-btn' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}> Deposit </Button>
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto withdraw_btn font_15x small-btn' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}> Withdraw </Button>

                </div>
            </div>
        </>
    )
}

export default TeamCaptainWalletTop