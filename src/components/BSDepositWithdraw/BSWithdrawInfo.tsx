import { useEffect, useState } from 'react';
import './BSWithdraw.css';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { Country, IState, State } from 'country-state-city';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [city, setCity] = useState(initialState.city || '');
  const [state, setState] = useState(initialState.state || '');
  const [country, setCountry] = useState(initialState.country || '');
  const [zipCode, setZipCode] = useState(initialState.zipCode || '');
  const [states, setStates] = useState<IState[]>([]);


  const handleContinue = () => {
    navigate("/indexx-exchange/buy-sell/withdraw/amount", {
      state: {
        beneficiaryName,
        accountNumber,
        bankName,
        swiftCode,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode
      }
    });
  };

  // useEffect(() => {
  //   if (country) {
  //     setStates(State.getStatesOfCountry(country));
  //   }
  // }, [country]);

  useEffect(() => {
    // Function to fetch states for a country
    const fetchStates = (countryCode: string) => {
      const states = State.getStatesOfCountry(countryCode) || [];
      setStates(states);
      return states;
    };

    if (country) {
      const states = fetchStates(country);

      // Check if the previously selected state exists in the new country's states
      if (states.some(st => st.isoCode === state)) {
        setState(state); // Set to user-selected state if it's valid
      } else {
        setState(''); // Reset the state if it's not valid for the new country
      }
    } else {
      setStates([]); // Reset states if no country is selected
    }
  }, [country]);

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
              <Input placeholder="Benificiary Address Line 1" value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)} />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Form.Item label="Benificiary Address Line 2">
              <Input placeholder="Benificiary Address Line 2" value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)} />
              <span className='placeholder_info'>Please input the address in English</span>
            </Form.Item>
            <Form.Item label="City">
              <Input placeholder="City" value={city}
                onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            <Form.Item label="State">
              <Select
                placeholder="Select State"
                value={state}
                onChange={(value) => setState(value)}
                disabled={!country}
              >
                {states.map((st: any) => (
                  <Option key={st?.isoCode} value={st?.isoCode}>{st.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Country">
              <Select
                placeholder="Select Country"
                value={country}
                onChange={(value) => setCountry(value)}
              >
                {Country.getAllCountries().map((cntry: any) => (
                  <Option key={cntry.isoCode} value={cntry.isoCode}>{cntry.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Zip Code">
              <Input placeholder="Zip Code" value={zipCode}
                onChange={(e) => setZipCode(e.target.value)} />
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
