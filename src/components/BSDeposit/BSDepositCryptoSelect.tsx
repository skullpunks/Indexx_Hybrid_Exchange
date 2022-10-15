import React from 'react';

import { ArrowRightOutlined, CaretDownOutlined, LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import bsDollar from "../../assets/arts/bsDollar.svg";

import copyIcon from "../../assets/arts/copyIcon.svg";
import { Link, useNavigate } from 'react-router-dom';

export const BSDepositCryptoSelect = () => {
  const navigate = useNavigate();
  const { Option } = Select;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  return (
    <div className='scan-container bs_main wd_container'>

      <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{ fontSize: 40 }}>Deposit Crypto</span>
      </div>
        <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-fiat")}>Deposit Fiat<ArrowRightOutlined /></Button></div>

      <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
        <h1 className='font_20x padding-tb-2x'>Select Coin</h1>
        <div className='margin-t-2x'>
          <label>Currency</label>
          <div className='select_container d-flex flex-justify-between flex-align-center'>

            <div className='d-flex'><img src={bsDollar} alt="bsDollar" /><div className='font_23x padding-l-1x'>USD<span style={{ color: "rgba(95, 95, 95, 0.5)" }}>US Dollar</span> </div></div>
            <CaretDownOutlined />

            {/* <RightOutlined /> */}
          </div>

          <h1 className='font_20x padding-t-2x' >Deposit to</h1>
          <div className='padding-t-1x'>
            <label>Network</label>


            <Select defaultValue="lucy" className='width-100' onChange={handleChange} >
              <Option value="jack"><div className='font_23x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
          <div className='sensitive_data margin-t-2x'>
            <div>Address</div>
            <div className='margin-t-2x d-flex flex-align-center font_weight_800'>1LmkQDpGvx1FBygJCPG6hpjcH7ryMDSwGD<img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /><QrcodeOutlined className='margin-l-0_5x' /></div>

            <div className='d-flex flex-justify-between flex_buttons margin-t-2x "'>

              <div className='w_50'>
                <div className='brand_opacity_5'>Expected arrival </div>
                <div>1 network confirmations </div>
              </div>
              <div className='w_50'>
                <div className='brand_opacity_5'>Expected unlock</div>
                <div> <span className="text_link">1</span> network confirmations</div>
              </div>
            </div>
            <div className='d-flex flex-justify-between padding-t-1x'>
              <div className='w_50'>
                <div className='brand_opacity_5'> Minimum deposit </div>
                <div>0.00000001 BTC </div>
              </div>
              <div className='w_50'>
                <div className='brand_opacity_5'>Selected wallet</div>
                <div> Spot Wallet <span className="text_link"><Link to="/indexx-exchange/buy-sell/deposit-crypto/deposit-wallet">Change</Link></span></div>
              </div>
            </div>



            <ul style={{ listStyleType: "disc", marginLeft: 20 }} className="margin-t-2x">
              <li>Send only BTC to this deposit address.</li>
              <li>
                Ensure the network is <span className='text_link'>Bitcoin.</span>
              </li>
              <li>Do not send NFTs to this address. Learn how to deposit NFTs</li>
            </ul>
          </div>
        </div>



      </div>
      <div className='w_fiat'>
        <h1 className='font_48x font_weight_800 font_40x padding-b-1x'>Recent Deposit</h1>
        <div className='recent_deposit_container border-1x padding-2x'>

          <div className='d-flex'><img src={bsDollar} alt="bsDollar" width="30" height="30" /><div className='font_20x padding-l-1x'>0.07 BNB</div><Button danger className='margin-l-2x'>Completed</Button></div>
          <div className='d-flex flex-justify-between padding-t-1x'>
            <div>
              <div className='font_15x'>2022-10-03</div>
              <div className='font_15x'><span className='brand_opacity_5'>Deposit</span> wallet Spot Wallet</div>
            </div>
            <div className='font_15x'><span className='brand_opacity_5'>Network</span> BSC</div>
            <div className='font_15x'><span className='brand_opacity_5'>Address</span> 0x56092d7daffc1691662e7383c8ebc5f75247ca19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
            <div className='font_15x'><span className='brand_opacity_5'>TxID</span> 0x56092d7daffc....19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
          </div>

        </div>
      </div>

    </div>


  )
}

export default BSDepositCryptoSelect;