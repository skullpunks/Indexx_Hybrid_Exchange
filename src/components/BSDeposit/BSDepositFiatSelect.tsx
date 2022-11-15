import React from 'react';

import '../BSDepositWithdraw/BSWithdraw.css';

import bsDollar from "../../assets/arts/bsDollar.svg";
import doubleArrow from "../../assets/arts/doubleArrow.svg";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export const BSDepositFiatSelect = () => {
  const navigate = useNavigate();
  return (
    <div className='scan-container bs_main wd_container'>
      <div className='d-flex w_fiat flex-justify-between flex-align-center deposit_ontainer'>
        <div className='d-flex flex-align-center top_heading'>
          Deposit Fiat</div>
        <div className='flex-justify-between flex-grow-1 d-flex'> <div className='order_history'> <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
          <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>
            Deposit Crypto<ArrowRightOutlined /></Button></div>
      </div>
      <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container'>
        <div className=' padding-t-2x'><h1>1.Select Currency</h1></div>

        <div className='margin-t-2x'>
          <label>Currency</label>
          <div className='select_container d-flex flex-justify-between flex-align-center'>
            <div className='d-flex flex-align-center'><img src={bsDollar} alt="bsDollar" width="38" height="38" /><div className='font_23x padding-l-1x'>USD<span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">US Dollar</span> </div></div>
            {/* <RightOutlined /> */}
          </div>
        </div>
        <label className='padding-t-3x'>Deposit with</label>
        <Button disabled className='disabled_button font_23x' style={{
          height: 36,
          lineHeight: "24px"
        }}>
          Recommended
        </Button>
        <Radio checked className='orange margin-t-2x font_15x' >
          <div className='d-flex'><img src={doubleArrow} alt="doubleArrow" className='bg_icon margin-r-0_5x' style={{ marginTop: 5 }} /><div> <span className='radio_text'>Bank Transfer(SWIFT) <br />
            <span className='helper_text'>1-4 Business days</span>
          </span></div></div></Radio>
        <Button type="primary" className='margin-b-2x margin-t-2x'>
          <Link to="/indexx-exchange/buy-sell/deposit-fiat/deposit-fiat-amount">Continue</Link>
        </Button>

      </div>
    </div>

  )
}
export default BSDepositFiatSelect;