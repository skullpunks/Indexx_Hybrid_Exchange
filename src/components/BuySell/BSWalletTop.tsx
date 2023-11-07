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
    });



    const getAllUserWallet = async () => {
        let userWallets = await getUserWallets(decoded.email);
        let usersWallet = userWallets.data;
        let totalBalInUSD = 0;
        for (let i = 0; i < usersWallet.length; i++) {
            if (usersWallet[i].coinType === "Crypto") {
                let res = await getCoinPriceByName(usersWallet[i]?.coinSymbol);
                let price = Number(res.data.results.data);
                totalBalInUSD += Number(usersWallet[i]?.coinBalance) * price;
            } else {
                totalBalInUSD += Number(usersWallet[i]?.coinBalance);
            }
        }
        setTotalBalanceInUSD(totalBalInUSD)
    }

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  
//     <Box sx={{ textAlign: "center" }}>
//     <Typography variant={"h3"}  fontSize={"40px"} textAlign="center" color="var(--primary_color)">
//       Power Pack
//     </Typography>
//   </Box>

// </Box>
// <Typography variant="body1" fontSize={"20px"} sx={{ mt: 2, color: 'var(--body_color)', textAlign: 'center', maxWidth: "1000px", mx: "auto", lineHeight: "1.5" }}>
//   To unlock the full potential of earning as a "Captain Bee," you must invest in a minimum of the Captain Bee Power Pack or a higher tier. This investment is your ticket to financial growth and success.
// </Typography>

    return (
        <>
            <div className='border-b-1x orange width-100 padding-t-2x padding-b-2x d-flex flex-direction-column align-items-center'>
                <h1 className='padding-b-1x padding-t-1x fw-bold font_40x'>
                    <img src={wallet} alt="logo" style={{marginRight:"20px"}}/>
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
                    <h1 className='margin-b-0 '>{Math.floor(totalBalanceInUSD * 100) / 100}&nbsp;&nbsp;&nbsp;</h1>
                    :
                    <h1 className='margin-b-0 '>{(Math.floor(totalBalanceInUSD * 100) / 100).toString().replace(/./g, '•')}&nbsp;&nbsp;&nbsp;</h1>
                    }
                    <div onClick={toggleVisibility}>
                        {isVisible ? <VisibilityIcon/> : <VisibilityOffIcon />} 
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
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn withdraw_btn' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}> Withdraw </Button>

                </div>
            </div>
        </>
    )
}

export default BSWalletTop