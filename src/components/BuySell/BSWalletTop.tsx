import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import openEye from "../../assets/arts/openEye.svg";
const BSWalletTop = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='border-b-1x orange width-100 padding-t-2x'>
                <h1 className='padding-l-3x padding-b-1x'>Funding Wallet</h1>
            </div>
            <div className='padding-t-1x width-100 bs_wallet_top_banner position-relative' >
                <h2>Estimated Balance</h2>
                <div className='d-flex flex-align-center color_general'>
                    <h2 className='margin-b-0'>$</h2>
                    <h1 className='margin-b-0'>11.33</h1>
                    <img className='padding-l-1x' src={openEye} alt="eye" />
                </div>
                <div className='bs_wallet_buttons d-flex d-md-flex d-none'>
                    {/* <Button type="primary" danger>Withdraw</Button> */}
                    {/* <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x" onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button> */}
                    <Button type="primary" className='margin-r-1x buy_crypto_btn' style={{backgroundColor:"#F66036"}}danger onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button>
                    {/* <Link to="/indexx-exchange/buy-sell/withdraw-crypto"></Link> */}
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn margin-r-1x' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}> Deposit </Button>
                    <Button className='light_button ant-btn ant-btn-dangerous danger_disabled width_auto deposit_btn withdraw_btn' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}> Withdraw </Button>

                </div>
            </div>
        </>
    )
}

export default BSWalletTop