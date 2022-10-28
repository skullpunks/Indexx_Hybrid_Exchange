import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
// import RecordedIcon from "../../assets/arts/RecordedIcon.svg";
import { Link, useNavigate } from 'react-router-dom';
export const BSDWAmount = () => {
    const navigate = useNavigate();
    return (
        <div className='scan-container bs_main wd_container'>
             <div className='d-flex w_fiat flex-justify-between flex-align-center deposit_ontainer'>
           <div className='d-flex flex-align-center top_heading'>
        Withdraw Fiat</div>
        <div className='flex-justify-between flex-grow-1 d-flex'> <div className='order_history'> <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
          <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}>
          Withdraw Crypto<ArrowRightOutlined /></Button></div>
        </div>
            <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container'>
                <h1 className='padding-lr-2x padding-t-2x'>2. Enter Amount</h1>
                <div className='padding-t-2x'>
                    <div className='d-flex flex-justify-between'><label>Amount</label><label>Transaction Requirements</label></div>
                    <div className='d-flex flex-justify-between border-1x flex-align-center padding-1x'>
                        <div className='font_23x flex-align-center brand_opacity_5'>Enter 20-50000</div>
                        <div className="font_13x">Balance:  <span className='text_link'>0.00 iUSD+</span>
                        </div>
                    </div>
                </div>

                <div className='margin-t-2x padding-tb-2x'>
                    <div className='font_!3x'>You receive:</div>
                    <div className='font_23x'>20.00 iUSD+</div>
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
                        <div className='font_13x brand_opacity_5'>0.00 iUSD+  </div>
                    </div>
                </div>
                <div className='d-flex flex_buttons flex-justify-between margin-b-2x margin-t-auto'>
                    <Button disabled className='disabled_button font_23x'>
                        Previous
                    </Button>

                    <Button type="primary"  >
                        <Link to="/indexx-exchange/buy-sell/withdraw/recorded">Continue</Link>
                    </Button>
                </div>
            </div>
            <div className='margin-lr-auto row'> <p className='margin-lr-auto padding-t-2x max_400 col-md-12'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
            </div>

        </div>

    )
}

export default BSDWAmount;
