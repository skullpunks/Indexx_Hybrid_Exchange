import React from 'react';

import './BSDepositWithdraw.css';

import bsDollar from  "../../assets/arts/bsDollar.svg";
import { RightOutlined,ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const BSDepositWithdarwSelect = () => {
  return (
    <div className='scan-container bs_main wd_container'>
<div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{fontSize:40}}>Withdraw Fiat</span> <Button danger className='margin-l-2x'>Danger Default<ArrowRightOutlined /></Button></div><Button danger className='danger_disabled'>Danger Default<ArrowRightOutlined /></Button></div>
<div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
    <div className=' padding-t-2x'><h1>1.Select Currency</h1></div>

    <div className='margin-t-2x'>
        <label>Currency</label>
        <div className='select_container d-flex flex-justify-between flex-align-center'>
          <div className='d-flex flex-align-center'><img src={bsDollar} alt="bsDollar" /><div className='font_23x padding-l-1x'>USD<span style={{color:"rgba(95, 95, 95, 0.5)"}}>US Dollar</span> </div></div> <RightOutlined />
        </div>
    </div>
    <label className='padding-t-3x'>Deposit with</label>
    <Button  disabled className='disabled_button font_23x'>
    Recommended
    </Button>

    <Button type="primary" disabled className='margin-t-2x'>
    Continue
    </Button>
    
</div>
    </div>
    
  )
}
export default BSDepositWithdarwSelect;