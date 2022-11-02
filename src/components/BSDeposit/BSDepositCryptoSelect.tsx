import React, { useState } from 'react';

import { ArrowRightOutlined, LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Popover, Select } from 'antd';
import bsDollar from "../../assets/arts/bsDollar.svg";
import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";
// import IN500 from "../../assets/token-icons/33.png";

import copyIcon from "../../assets/arts/copyIcon.svg";
import { Link, useNavigate } from 'react-router-dom';
import initialTokens from "../../utils/Tokens.json";
import { BSContext, BSContextType } from '../../utils/SwapContext';

export const BSDepositCryptoSelect = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("");
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const { Option } = Select;

  const handleChange = (value: string) => {
    setNetwork(value)
    console.log(`selected ${value}`);
  };

  const handleChangeCurrency = (value: string) => {
    if (setBSvalue && BSvalue) {
      setBSvalue({ ...BSvalue, fromToken: value });
    }
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

      <div className='d-flex w_fiat flex-justify-between flex-align-center d_crypto_Container'><div className='d-flex flex-align-center top_heading'>
        <span onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Deposit Crypto</span>
      </div>
        <div className='crypto_con_button'><Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-fiat")}>Deposit Fiat<ArrowRightOutlined /></Button></div>
      </div>

      <div className='card responsive_container bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container'>
        <h1 className='font_20x padding-t-2x padding-b-1x'>Select Coin</h1>
        <div className=''>
          <label>Currency</label>
          <Select className='width-100'
            onChange={handleChangeCurrency} value={BSvalue?.fromToken}>
            {
              initialTokens.map((token) => {

                return <Select.Option key={token.address} value={token.address} className='common__token d-flex bs_token_container' data-address={token.address} >
                  <div className='d-flex bs_token_num'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className=' padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                </Select.Option>
              })
            }

          </Select>
          {/* <div className='select_container d-flex flex-justify-between flex-align-center' style={{ paddingLeft: 10 }}>

            <div className='d-flex'><img src={IN500} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div>
            <CaretDownOutlined />

          </div> */}
          <br />
          <h1 className='font_20x padding-t-2x' >Deposit to</h1>
          <div className='padding-t-1x'>
            <label>Network</label>


            <Select className='width-100' onChange={handleChange} >
              <Option value="BSC"><div className='font_20x'>BSC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Smart Chanin (BEP20)</span> </div></Option>
              <Option value="BTC"><div className='font_20x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option>
              <Option value="BNB"><div className='font_20x'>BNB <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Beacon Chanin (BEP2)</span> </div></Option>
              <Option value="ETH"><div className='font_20x'>ETH <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Ethereum (ERC20)</span> </div></Option>
              <Option value="LTC"><div className='font_20x'>LTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Litecoin</span> </div></Option>
            </Select>
          </div>
          {network &&
            <div className='sensitive_data margin-t-2x'>
              <div>Address</div>
              <div className='margin-t-2x d-flex flex-align-center font_weight_800'>1LmkQDpGvx1FBygJCPG6hpjcH7ryMDSwGD<img src={copyIcon} alt="QRCodeIcon" width="21" height="11" className='padding-l-1x' />      <Popover placement="bottom" content={content} trigger="click">
                <QrcodeOutlined className='padding-l-1x' />
              </Popover>
              </div>

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
                  <div> Funding Wallet <span className="text_link">
                    <Link className='text_link' to="/indexx-exchange/buy-sell/deposit-crypto/deposit-wallet">Change</Link></span></div>
                </div>
              </div>



              <ul className="margin-t-2x disc_ul">
                <li>Send only BTC to this deposit address.</li>
                <li>
                  Ensure the network is <span className='text_link'>Bitcoin.</span>
                </li>
                <li>Do not send NFTs to this address.<Link to="" className='popover_container_link'>Learn how to deposit NFTs</Link> </li>
              </ul>
            </div>
          }
        </div>



      </div>
      <div className='w_fiat pt-5'>
        <h1 className='font_48x font_40x padding-b-1x'>Recent Deposit</h1>
        <div className='recent_deposit_container border-1x padding-2x '>

          <div className='d-flex d_crypto_status'><div className='d-flex'><img src={bsDollar} alt="bsDollar" width="38" height="38" /><div className='font_20x padding-l-1x'>0.07 BNB</div></div><Button danger className='margin-l-2x'>Completed</Button></div>
          <div className='d-flex flex-justify-between padding-t-1x responsive_recent_deposits '>

            <div className='d-flex '><div className='wallet_funding'>
              <div className='font_15x'>2022-10-03</div>
              <div className='font_15x '><span className='brand_opacity_5'>Deposit</span> wallet Funding Wallet</div>
            </div>
              <div className='font_15x padding-l-2x padding-b-2x'><span className='brand_opacity_5'>Network</span> BSC</div></div>
            <div className='font_15x'><span className='brand_opacity_5 '>Address</span> 0x56092d7daffc1691662e7383c8ebc5f75247ca19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
            <div className='font_15x'><span className='brand_opacity_5 '>TxID</span> 0x56092d7daffc....19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
          </div>

        </div>
      </div>

    </div>


  )
}

export default BSDepositCryptoSelect;