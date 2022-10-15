import React from 'react';

import './BSWithdraw.css';

import bsDollar from "../../assets/arts/bsDollar.svg";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import { Link } from 'react-router-dom';

export const BSDepositWithdarwSelect = () => {
  return (
    <div className='scan-container bs_main wd_container'>
      <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{ fontSize: 40 }}>Withdraw Fiat</span>
        <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
        <Button danger className='danger_disabled'>Withdraw Crypto<ArrowRightOutlined /></Button></div>
      <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
        <div className=' padding-t-2x'><h1>1.Select Currency</h1></div>

        <div className='margin-t-2x'>
          <label>Currency</label>
          <div className='select_container d-flex flex-justify-between flex-align-center'>
            <div className='d-flex flex-align-center'><img src={bsDollar} alt="bsDollar" /><div className='font_23x padding-l-1x'>USD<span style={{ color: "rgba(95, 95, 95, 0.5)" }}>US Dollar</span> </div></div>
            {/* <RightOutlined /> */}
          </div>
        </div>
        <label className='padding-t-3x'>Deposit with</label>
        <Button disabled className='disabled_button font_23x'>
          Recommended
        </Button>
        <Radio checked className='orange margin-t-2x font_15x' >
          <span className='radio_text'>Bank Transfer(SWIFT) <br />
            <span className='helper_text'>0 Fee, 1-4 Business days</span>
          </span></Radio>
        <Button type="primary" className='margin-b-2x margin-t-auto'>
          <Link to="/indexx-exchange/buy-sell/withdraw/info">Continue</Link>
        </Button>

      </div>
    </div>

  )
}
export default BSDepositWithdarwSelect;