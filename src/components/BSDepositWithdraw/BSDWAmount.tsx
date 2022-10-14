import React from 'react';
import { Button } from 'antd';
import { RightOutlined, ArrowRightOutlined } from '@ant-design/icons';
import RecordedIcon from "../../assets/arts/RecordedIcon.svg";
export const BSDWAmount = () => {
    return (
        <div className='scan-container bs_main wd_container'>
            <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{ fontSize: 40 }}>Withdraw Fiat</span> <Button danger className='margin-l-2x'>Danger Default<ArrowRightOutlined /></Button></div><Button danger className='danger_disabled'>Danger Default<ArrowRightOutlined /></Button></div>
            <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
                <h1 className='padding-lr-2x padding-t-2x'>2. Enter Amount</h1>
                <div className='padding-t-2x'>
                    <div className='d-flex flex-justify-between'><label>Amount</label><label>Transaction Requirements</label></div>
                    <div className='d-flex flex-justify-between border-1x flex-align-center padding-1x'><div className='font_23x flex-align-center brand_opacity_5'>Enter 20-50000</div><div className="font_13x">Balance:  <span className='text_link'>0.00 BUSD</span></div></div>
                </div>

                <div className='margin-t-2x padding-tb-2x'>
                    <div className='font_!3x'>You receive:</div>
                    <div className='font_23x'>20.00 BUSD</div>
                </div>
                <div className='d-flex padding-tb-2x'> 
                    <div> 
                        <div className='font_13x brand_opacity_5'>Bank Account:</div>
                        <div className='font_13x brand_opacity_5 padding-tb-1x'>Transaction method:</div>
                        <div className='font_13x brand_opacity_5'>Transaction Fee:   </div>
                    </div>
                    <div className='padding-l-1x'>
                        <div className='font_13x brand_opacity_5'>412*****123 <span className='text_link'>Edit Account</span></div>
                        <div className='font_13x brand_opacity_5 padding-tb-1x'>Bank Transfer(SWIFT)</div>
                        <div className='font_13x brand_opacity_5'>0.00 BUSD  </div>
                    </div>
                </div>
                <div className='d-flex flex_buttons flex-justify-between margin-t-3x'>
                <Button  disabled className='disabled_button font_23x'>
                Previous
    </Button>

    <Button type="primary" disabled >
    Continue
    </Button>
                </div>
            </div>
           <div className='margin-lr-auto'> <p className='margin-lr-auto padding-t-2x max_400'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
         </div>
            <br />
            <div className='card bs_container sell_screens margin-lr-auto  margin-t-3x'>
                <h1 className='text-center padding-lr-2x padding-t-2x'>Your transaction has recorded </h1>
                <div className='text-center w-100 padding-tb-2x'><img src={RecordedIcon} className="padding-tb-2x" alt="RecordedIcon" width="100" height="121" /></div>
                <p className='border-t-1x padding-lr-2x padding-t-2x'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
                <div className='padding-lr-2x padding-t-2x'><Button type="primary" disabled className='margin-t-2x' >
                        Home</Button>
                </div>
            </div>
        </div>

    )
}

export default BSDWAmount;
