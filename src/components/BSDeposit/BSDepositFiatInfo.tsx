import React from 'react';
import '../BSDepositWithdraw/BSWithdraw.css';

import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

export const BSDepositFiatInfo = () => {

  return (

    <div className='scan-container bs_main wd_container'>
      {/* <div className='d-flex w_fiat flex-justify-between flex-align-center '><div className='d-flex flex-align-center'><span style={{fontSize:40}}>Withdraw Fiat</span> <Button danger className='margin-l-2x'>Danger Default<ArrowRightOutlined /></Button></div><Button danger className='danger_disabled'>Danger Default<ArrowRightOutlined /></Button></div> */}
      <div className='card bs_container sell_screens margin-lr-auto margin-t-3x wd_form_container'>
        <div className=' padding-t-2x padding-lr-2x '><h1>Add Account Information</h1></div>
        <p className='padding-t-2x padding-lr-2x '> Please enter your bank account details below for all future USD transactions. If your bank account is from EU, UK or Middle East, please enter the IBAN in the Account Number field.</p>
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


        </div>
      </div>
    </div>
  )
}

export default BSDepositFiatInfo;
