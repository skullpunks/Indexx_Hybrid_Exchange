import React, { useState } from 'react';

import { ArrowRightOutlined, CaretDownOutlined, LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';

import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";
import IN500 from "../../assets/token-icons/33.png";


import { Link, useNavigate } from 'react-router-dom';

export const BSWithdarwCryptoContent = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("");

  const { Option } = Select;

  const handleChange = (value: string) => {
    setNetwork(value)
    console.log(`selected ${value}`);
  };

  const content = (
    <div className='popover_container ' style={{}}>
      <div className='font_13x text-center brand_color'>Scan the code on the withdrawal page of the trading platform APP or wallet APP</div>
      <div className='text-center margin-tb-2x'><img src={QRCodeIcon} alt="qrCode" width="200" height="200" /></div>
      <ul className='brand_color disc_ul'>
        <li>Send only BTC to this deposit address.</li>
        <li>Ensure the network is Bitcoin.</li>
        <li>Do not send NFTs to this address.</li>
        <Link to="" className='popover_container_link'>Learn how to deposit NFTs</Link>
      </ul>
    </div>
  )


  return (
    <div className='scan-container bs_main wd_container'>

      <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{ fontSize: 40 }} onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Withdraw Crypto</span>
      </div>
        <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-fiat")}>Withdraw Fiat<ArrowRightOutlined /></Button></div>

      <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
        <h1 className='font_20x padding-t-2x padding-b-1x'>Select Coin</h1>
        <div className=''>
          <label>Currency</label>
          <div className='select_container d-flex flex-justify-between flex-align-center' style={{ paddingLeft: 10 }}>

            <div className='d-flex'><img src={IN500} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div>
            <CaretDownOutlined />

            {/* <RightOutlined /> */}
          </div>
          <br />
          <h1 className='font_20x padding-t-2x' >Send to</h1>
          <div className='padding-t-1x'>
            <label>Address</label>
<br/>

            <input type="text" placeholder='Enter address' className='select_container width-100 font_20x' />
          </div>
          <div className='padding-t-2x'>
            <label>Network</label>


            <Select className='width-100' onChange={handleChange} placeholder="Select  withdrawal network" >
              <Option value="BSC"><div className='font_20x'>BSC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Smart Chanin (BEP20)</span> </div></Option>
              <Option value="BTC"><div className='font_20x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option>
              <Option value="BNB"><div className='font_20x'>BNB <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Beacon Chanin (BEP2)</span> </div></Option>
              <Option value="ETH"><div className='font_20x'>ETH <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Ethereum (ERC20)</span> </div></Option>
              <Option value="LTC"><div className='font_20x'>LTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Litecoin</span> </div></Option>
            </Select>
          </div>
         
            <div className='sensitive_data margin-t-2x'>
              

              <div className='d-flex flex-justify-between flex_buttons margin-t-2x "'>

                <div className='w_50'>
                  <div className='brand_opacity_5'>iN500 Balance </div>
                  <div>0 iN500 </div>
                </div>
               
                <div className='w_50'>
                  <div className='brand_opacity_5'>Minimum withrawal  </div>
                  <div>0.00000084 iN500 </div>
                </div>
              </div>
              <div className='d-flex flex-justify-between padding-t-1x'>
              <div className='w_50'>
                  <div className='brand_opacity_5'>Network Fee</div>
                  <div> 0 </div>
                </div>
                <div className='w_50'>
                 
                  <div className='brand_opacity_5'> Funding Wallet </div>
                   <div>0,000,000.00/8,000,000.00 BUSD</div>
                
              </div>
              </div>



             
            </div>
        
        </div>



      </div>
      <div className='w_fiat'>
        <h1 className='font_48x font_40x padding-b-1x'>Recent Withdrawals</h1>
        <Button type="primary">Crypto Address</Button>
        {/* <div className='recent_deposit_container border-1x padding-2x'>

          <div className='d-flex'><img src={bsDollar} alt="bsDollar" width="30" height="30" /><div className='font_20x padding-l-1x'>0.07 BNB</div><Button danger className='margin-l-2x'>Completed</Button></div>
          <div className='d-flex flex-justify-between padding-t-1x'>
            <div>
              <div className='font_15x'>2022-10-03</div>
              <div className='font_15x'><span className='brand_opacity_5'>Deposit</span> wallet Funding Wallet</div>
            </div>
            <div className='font_15x'><span className='brand_opacity_5'>Network</span> BSC</div>
            <div className='font_15x'><span className='brand_opacity_5'>Address</span> 0x56092d7daffc1691662e7383c8ebc5f75247ca19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
            <div className='font_15x'><span className='brand_opacity_5'>TxID</span> 0x56092d7daffc....19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
          </div>

        </div> */}
      </div>

    </div>


  )
}

export default BSWithdarwCryptoContent;