import React, { useState } from 'react';
import './BSWithdraw.css';

import { Button, Form, Input } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

export const BSWithdrawInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [beneficiaryName, setBeneficiaryName] = useState(initialState.beneficiaryName || '');
  const [accountNumber, setAccountNumber] = useState(initialState.accountNumber || '');
  const [bankName, setBankName] = useState(initialState.bankName || ''); useState('');
  const [swiftCode, setSwiftCode] = useState(initialState.swiftCode || '');
  const [addressLine1, setAddressLine1] = useState(initialState.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialState.addressLine2 || '');

  const handleContinue = () => {
    navigate("/indexx-exchange/buy-sell/withdraw/amount", {
      state: {
        beneficiaryName,
        accountNumber,
        bankName,
        swiftCode,
        addressLine1,
        addressLine2
      }
    });
  };


  return (

    <div className='scan-container bs_main wd_container'>
      <div className='d-flex w_fiat flex-justify-between flex-align-center deposit_ontainer'>
        <div className='d-flex flex-align-center top_heading'>
          Withdraw Fiat</div>
        <div className='flex-justify-between flex-grow-1 d-flex'> <div className='order_history'> <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
          <Button danger className='danger_disabled'>
            Withdraw Crypto<ArrowRightOutlined /></Button></div>
      </div>
      <div className='card bs_container sell_screens margin-lr-auto margin-t-3x wd_form_container responsive_container'>
        <div className=' padding-t-2x padding-lr-2x '><h1>Withdrawal Information</h1></div>
        <p className='padding-t-2x padding-lr-2x '> Please enter your bank account details below for all future USD transactions. If your bank account is from EU, UK or Middle East, please enter the IBAN in the Account Number field.</p>
        <div className='margin-t-2x  '>
          <Form
            name="basic"

            labelCol={{ span: 8 }}


            wrapperCol={{ span: 16 }}



            autoComplete="off"
            className='W_form padding-lr-2x'>



            <Form.Item label=" Benificiary Name">
              <Input
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder="Enter account holder name" />

            </Form.Item>
            <Form.Item label="Benificairy Account Number">
              <Input placeholder="Enter IBAN for bank accounts of UK/UE/Middle East"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)} />
            </Form.Item>
            <Form.Item label="Bank Name">
              <Input placeholder="Enter Bank name" value={bankName}
                onChange={(e) => setBankName(e.target.value)} />
            </Form.Item>
            <Form.Item label="SWIFT/BIC Code">
              <Input placeholder="Enter value" value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)} />
            </Form.Item>
            <Form.Item label="Benificiary Address Line 1">
              <Input placeholder="Street Address, District, City" value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)} />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Form.Item label="Benificiary Address Line 1">
              <Input placeholder="State/Pronince, County" value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)} />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Button type="primary" className='margin-t-2x' onClick={handleContinue}>
              Continue
            </Button>
          </Form>


        </div>
      </div>
    </div>
  )
}

export default BSWithdrawInfo;
