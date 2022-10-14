import { Button } from 'antd';
import React from 'react'
import openEye from "../../assets/arts/openEye.svg";
const BSWalletTop = () => {
    return (
        <>
            <div className='border-b-1x orange width-100 padding-t-2x'>
                <h1 className='padding-l-3x'>Funding</h1>
            </div>
            <div className='padding-l-3x padding-t-1x width-100 bs_wallet_top_banner position-relative' >
                <h2>Estimated Balance</h2>
                <div className='d-flex flex-align-center color_general'>
                    <h2 className='margin-b-0'>$</h2>
                    <h1 className='margin-b-0'>11.33</h1>
                    <img className='padding-l-1x' src={openEye} alt="eye" />
                </div>
                <div className='bs_wallet_buttons'>
                    <Button type="primary" danger>Withdraw</Button>
                </div>
            </div>
        </>
    )
}

export default BSWalletTop