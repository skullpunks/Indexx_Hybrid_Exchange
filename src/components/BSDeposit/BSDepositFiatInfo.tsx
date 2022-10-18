import React from 'react';
import '../BSDepositWithdraw/BSWithdraw.css';


import { ArrowRightOutlined ,CopyFilled} from '@ant-design/icons';
import bsDollar from "../../assets/arts/bsDollar.svg";

import { Button,Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

export const BSDepositFiatInfo = () => {
  const navigate = useNavigate();
 

  return (

    <div className='scan-container bs_main wd_container'>
      <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{ fontSize: 40 }} onClick={() => navigate("/indexx-exchange/buy-sell/deposit-crypto")}>Deposit Crypto</span>
      </div>
        <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/deposit-fiat")}>Deposit Fiat<ArrowRightOutlined /></Button></div> 
      <div className='card bs_container sell_screens margin-lr-auto margin-t-3x wd_form_container'>
      <div className='d-flex flex-align-center padding-tb-2x padding-lr-2x flex-justify-between'><div className='d-flex flex-align-center'><img src={bsDollar} alt="bsDollar" /><div className='font_23x padding-l-1x'>USD<span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">US Dollar</span> </div></div><div className='font_weight_800 font_23x'>$100</div></div>
        <div className=' padding-t-2x padding-lr-2x  border-t-1x'><h1 style={{fontSize:28}}>Biance Bank Account Details</h1></div>
         {/*<p className='padding-t-2x padding-lr-2x '> Please enter your bank account details below for all future USD transactions. If your bank account is from EU, UK or Middle East, please enter the IBAN in the Account Number field.</p>
        <div className='margin-t-2x  '>
          <Form
            name="basic"

            labelCol={{ span: 8 }}


            wrapperCol={{ span: 16 }}



            autoComplete="off"
            className='W_form padding-lr-2x'>



            <Form.Item label=" Benificiary Name">
              <Input placeholder="Enter account holder name" />
            </Form.Item>
            <Form.Item label="Benificairy Account Number">
              <Input placeholder="Enter IBAN for bank accounts of UK/UE/Middle East" />
            </Form.Item>
            <Form.Item label="Bank Name">
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item label="SWIFT/BIC Code">
              <Input placeholder="Enter value" />
            </Form.Item>
            <Form.Item label="Benificiary Address Line 1">
              <Input placeholder="Street Address, District, City" />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Form.Item label="Benificiary Address Line 1">
              <Input placeholder="State/Pronince, County" />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Button type="primary" className='margin-t-2x'>
              <Link to="">Continue</Link>
            </Button>
          </Form> 


        </div>*/}

        <div className='padding-lr-2x padding-t-2x'>
          <div className='d-flex flex-justify-between font_15x brand_color'>
            <span className=''>Reference Code</span>
            <Link to="" className='text_link text_line font_w_800'>VBJQP4DB <Tooltip title="Click To Copy">
      <span><CopyFilled className="margin-l-0_5x brand_color"/></span>
    </Tooltip></Link>
          </div>
          <div className='d-flex flex-justify-between font_15x padding-tb-2x'>
            <span className=''>Benificiary Account Name</span>
            <div className='font_w_800'> Key Vision Development Limited<Tooltip title="Click To Copy">
      <span><CopyFilled className="margin-l-0_5x brand_color"/></span>
    </Tooltip></div>
          </div>
          <div className='d-flex flex-justify-between font_15x'>
            <span className=''>Benificiary Account Number/IBAN</span>
            <div className='font_w_800'> 1504546221<Tooltip title="Click To Copy">
      <span><CopyFilled className="margin-l-0_5x brand_color"/></span>
    </Tooltip></div>
          </div>
          <div className='d-flex flex-justify-between font_15x padding-tb-2x'>
            <span className=''>Benificiary Address</span>
            <div className='font_w_800'> Office N 22 Alpha<br/> Seychells<Tooltip title="Click To Copy">
      <span><CopyFilled className="margin-l-0_5x brand_color"/></span>
    </Tooltip></div>
          </div>
          {/* <div className='d-flex flex-justify-between font_15x'>
            <span className=''>SWIFT/BIC Code</span>
            <div className='font_w_800'> SIGNUS33XXX<CopyFilled className="margin-l-0_5x brand_color"/></div>
          </div>
          <div className='d-flex flex-justify-between font_15x padding-tb-2x'>
            <span className=''>Recipient Bank Name</span>
            <div className='font_w_800'>Signature Bank<CopyFilled className="margin-l-0_5x brand_color"/></div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BSDepositFiatInfo;
