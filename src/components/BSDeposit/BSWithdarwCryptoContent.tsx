import { useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Radio, RadioChangeEvent, Select, Space } from 'antd';
import initialTokens from "../../utils/Tokens.json";

// import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";
import AddressIcon from "../../assets/arts/AddressIcon.svg";

import { useNavigate } from 'react-router-dom';

export const BSWithdarwCryptoContent = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState<any>();
  const [value, setValue] = useState("funding");


  const { Option } = Select;

  const handleChange = (value: string) => {
    setNetwork(value)
    console.log(`selected ${value}`);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  return (
    <div className='scan-container bs_main wd_container'>

      <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center top_heading'><span onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Withdraw Crypto</span>
      </div>
        <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw")}>Withdraw Fiat<ArrowRightOutlined /></Button></div>

      <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x'>
        <h1 className='font_20x padding-t-2x padding-b-1x'>Select Coin</h1>
        <div className=''>
          <label>Currency</label>
          <div className=' d-flex flex-justify-between flex-align-center'>
          <Select className='width-100'
              onChange={handleChange}>
      
      
       {
                    initialTokens.map((token, index) => {

                        return <Option key={index} value={token.subTitle}type="link" className='common__token d-flex bs_token_container' data-address={token.address} >
                          
                           
                            <div className='d-flex'><img src={require(`../../assets/token-icons/${token.image}.png`).default} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>{token.title} <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">{token.subTitle}</span> </div></div>
                        </Option>
                    })
                }

    </Select>
            {/* <div className='d-flex'><img src={IN500} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div> */}
            {/* <CaretDownOutlined /> */}

            {/* <RightOutlined /> */}

          
          </div>
          <br />
          <h1 className='font_20x padding-t-2x' >Send to</h1>
          <div className='padding-t-1x'>
            <label>Address</label>
            <br />
            <div className='select_container d-flex flex-justify-between flex-align-center' style={{ paddingLeft: 10 }}>
              <input type="text" placeholder='Enter address' className='width-100 font_20x' style={{ border: "none" }} /><img src={AddressIcon} alt="AddressIcon" /></div>
          </div>
          <div className='padding-t-2x'>
            <label>Network</label>


            <Select className='width-100' onChange={handleChange} placeholder="Select withdrawal network" >
              <Option value="BSC"><div className='font_20x'>BSC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Smart Chanin (BEP20)</span> </div></Option>
              <Option value="BTC"><div className='font_20x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option>
              <Option value="BNB"><div className='font_20x'>BNB <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Beacon Chanin (BEP2)</span> </div></Option>
              <Option value="ETH"><div className='font_20x'>ETH <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Ethereum (ERC20)</span> </div></Option>
              <Option value="LTC"><div className='font_20x'>LTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Litecoin</span> </div></Option>
            </Select>
          </div>
          {network &&
            <>
              <div className='padding-t-1x'>
                <label>Amount</label>
                <br />
                <div className='select_container d-flex flex-justify-between flex-align-center' style={{ paddingLeft: 10 }}>
                  <input type="text" placeholder='Enter address' className='width-100 font_20x' style={{ border: "none" }} /><div className='d-flex'><span className="border-r-1x padding-r-1x text_link">MAX</span><span className="padding-l-1x">iN500</span></div></div>
              </div>
              <div>

                <Radio.Group onChange={onChange} value={value} className='orange margin-t-2x font_15x'>
                  <Space direction="vertical">
                    <Radio value="funding" className='orange margin-t-2x font_15x d-flex'>
                      <span className='d-flex flex-align-center'>
                        <span style={{ minWidth: 200 }}>Funding Wallet</span>

                      </span>
                    </Radio>

                  </Space>
                </Radio.Group>
                <label className='margin-t-2x d-flex'>Receive amount</label>
                <div className='d-flex flex-justify-between '>
                  <div className='w_50 '>
                    <div className='font_weight_800'>0.01 iN500</div>
                    <div>0.00 Fee</div>
                  </div>
                  <Button type="primary" className='w_50'>withdraw</Button>
                </div>
              </div>
            </>
          }
          {!network &&
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
          }



        </div>



      </div>
      <div className='w_fiat padding-t-2x border-b-1x'>
        <h1 className='font_48x font_40x padding-b-1x padding-t-3x'>Recent Withdrawals</h1>
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