// import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import RecordedIcon from "../../assets/arts/RecordedIcon.svg";
import { Link, useNavigate } from 'react-router-dom';
export const BSDepositCryptoConfim = () => {
    const navigate = useNavigate();
    return (
        <div className='scan-container bs_main wd_container'>
            {/* <div className='d-flex w_fiat flex-justify-between flex-align-center '>
                <div className='d-flex flex-align-center top_heading'><span >Withdraw Fiat</span>
                    <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
                <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}>Withdraw Crypto<ArrowRightOutlined /></Button></div> */}

<div className='d-flex w_fiat flex-justify-between flex-align-center d_crypto_Container'><div className='d-flex flex-align-center top_heading'>
        <span onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Deposit Crypto</span>
       </div>
        <div className='crypto_con_button'><Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-fiat")}>Deposit Fiat<ArrowRightOutlined /></Button></div>
      </div>

            {/* <div className='margin-lr-auto'> <p className='margin-lr-auto padding-t-2x max_400'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
            </div> */}
            <br />
            <div className='card responsive_container bs_container sell_screens margin-lr-auto  margin-t-3x'>
                <h1 className='text-center padding-lr-2x padding-t-2x'>Your transaction has recorded </h1>
                <div className='text-center w-100 padding-tb-2x'><img src={RecordedIcon} className="padding-tb-2x" alt="RecordedIcon" width="100" height="121" /></div>
                <p className='border-t-1x padding-lr-2x padding-t-2x'>NOTE: The arrival time of deposit depends on the region. Usually it takes 24 hours.</p>
                <div className='padding-lr-2x padding-t-2x margin-b-2x margin-t-auto'>
                    <Button type="primary" className='margin-t-2x' >
                        <Link to="/indexx-exchange/buy-sell/deposit-crypto">Home</Link>
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default BSDepositCryptoConfim;
