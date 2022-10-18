import React, { useState } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
// import RecordedIcon from "../../assets/arts/RecordedIcon.svg";
import { Link, useNavigate } from 'react-router-dom';
import doubleArrow from "../../assets/arts/doubleArrow.svg";
export const BSDepositFiatAmount = () => {
    const navigate = useNavigate();
    const [amount, SetAmount] = useState('');
    const onchange = (e: any) => {

        SetAmount(e.target.value);
        console.log(amount);
    }
    return (
        <div className='scan-container bs_main wd_container'>
            <div className='d-flex w_fiat flex-justify-between flex-align-center '>
                <div className='d-flex flex-align-center top_heading'>
                    <span>Deposit Fiat</span>
                    <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button>
                </div>
                <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Deposit Crypto<ArrowRightOutlined /></Button>
            </div>
            <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
                <h1 className=' padding-t-2x'> Enter Amount</h1>
                <div className='padding-t-2x'>
                    <div className='d-flex flex-justify-between'><label>Amount</label><label>Transaction Requirements</label></div>
                    <div className='d-flex flex-justify-between border-1x flex-align-center padding-1x'><div className='font_23x flex-align-center brand_opacity_5 amount_container'><input placeholder="Enter 20-50000" value={amount} onChange={onchange} /></div><div className="font_13x" style={{
                        borderLeft: "1px solid hsl(0deg 0% 37% / 40%)",
                        paddingLeft: 10
                    }}>USD</div></div>
                </div>

                <div className='margin-t-2x padding-tb-2x'>
                    <div className='font_!3x'>You receive:</div>
                    <div className='font_23x font_weight_800'>20.00 BUSD</div>
                </div>
                <div className='d-flex padding-tb-2x'>
                    <div>

                        <div className='font_13x brand_opacity_5 padding-tb-1x'>Transaction method:</div>
                        <div className='font_13x brand_opacity_5'>Transaction Fee:   </div>
                    </div>
                    <div className='padding-l-1x'>

                        <div className='font_13x brand_opacity_5 padding-tb-1x'><img src={doubleArrow} alt="doubleArrow" className='bg_icon margin-r-0_5x' />Bank Transfer(SWIFT)</div>
                        <div className='font_13x brand_opacity_5'>0.00 BUSD  </div>
                    </div>
                </div>
                <div className='d-flex flex_buttons flex-justify-between margin-b-2x margin-t-auto'>
                    <Button className='disabled_button font_23x'>
                        <Link to="/indexx-exchange/buy-sell/deposit-fiat">Previous</Link>
                    </Button>

                    <Button type="primary"  >
                        <Link to="/indexx-exchange/buy-sell/deposit-fiat/deposit-fiat-info">Continue</Link>
                    </Button>
                </div>
            </div>
            <div className='margin-lr-auto'> <p className='margin-lr-auto padding-t-2x max_400'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
            </div>

        </div>

    )
}

export default BSDepositFiatAmount;
