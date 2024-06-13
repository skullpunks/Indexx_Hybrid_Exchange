import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WithdrawLayout from '../../components/updated/Withdraw';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';
import { Country, State } from 'country-state-city';
import { MenuItem, Select } from '@mui/material';
import StyledSelect from '.';

const useStyle = makeStyles((theme) => ({
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'center',
  },
  secondaryHeading: {
    fontSize: '14px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'center',
    marginBottom: '30px',
  },
}));

const WithdrawAddAccountInfo = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [beneficiaryName, setBeneficiaryName] = useState(
    initialState.beneficiaryName || ''
  );
  const [accountNumber, setAccountNumber] = useState(
    initialState.accountNumber || ''
  );
  const [bankName, setBankName] = useState(initialState.bankName || '');
  const [swiftCode, setSwiftCode] = useState(initialState.swiftCode || '');
  const [routingNumber, setRoutingNumber] = useState(
    initialState.routingNumber || ''
  );
  const [addressLine1, setAddressLine1] = useState(
    initialState.addressLine1 || ''
  );
  const [addressLine2, setAddressLine2] = useState(
    initialState.addressLine2 || ''
  );
  const [city, setCity] = useState(initialState.city || '');
  const [state, setState] = useState(initialState.state || '');
  const [country, setCountry] = useState(initialState.country || '');
  const [zipCode, setZipCode] = useState(initialState.zipCode || '');
  const [states, setStates] = useState([]);
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode) || [];
      setStates(states);
      if (!states.some((st) => st.isoCode === state)) {
        setState('');
      }
    } else {
      setStates([]);
    }
  }, [countryCode, state]);

  const handleContinue = () => {
    navigate('/withdraw-enter-amount', {
      state: {
        beneficiaryName,
        accountNumber,
        bankName,
        routingNumber,
        swiftCode,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode,
      },
    });
  };

  return (
    <WithdrawLayout>
      <h3 className={classes.heading}>Withdrawal Information</h3>
      <h4 className={classes.secondaryHeading}>
        Please enter your bank account details below for all future USD
        transactions. If your bank account is from EU, UK, or Middle East,
        please enter the IBAN in the Account Number field.
      </h4>
      <InputField
        label={'Beneficiary Name'}
        placeholder="Enter account holder name"
        type={'text'}
        value={beneficiaryName}
        onChange={(e) => setBeneficiaryName(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Beneficiary Account Number'}
        placeholder="Enter IBAN for bank accounts of UK/UE/Middle East"
        type={'text'}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Bank Name'}
        placeholder="Enter Bank name"
        type={'text'}
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Routing Number (for ACH Transfer)'}
        placeholder="Enter routing number"
        type={'text'}
        value={routingNumber}
        onChange={(e) => setRoutingNumber(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'SWIFT/BIC Code (for International Transfers)'}
        placeholder="Enter value"
        type={'text'}
        value={swiftCode}
        onChange={(e) => setSwiftCode(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Beneficiary Address Line 1'}
        placeholder="Street Address, District, City"
        type={'text'}
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Beneficiary Address Line 2'}
        placeholder="State/Province, County"
        type={'text'}
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'City'}
        placeholder="City"
        type={'text'}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <StyledSelect
        label="Country"
        value={countryCode}
        onChange={(e) => {
          const selectedCountry = Country.getCountryByCode(e.target.value);
          setCountry(String(selectedCountry?.name));
          setCountryCode(String(selectedCountry?.isoCode));
        }}
        options={Country.getAllCountries().map((cntry) => ({
          value: cntry.isoCode,
          label: cntry.name,
        }))}
      />
      <div style={{ margin: '30px' }}></div>
        <StyledSelect
        label="State"
        value={state}
        onChange={(e) => {
          const selectedState = states.find(
            (st) => st.isoCode === e.target.value
          )?.isoCode;
          setState(selectedState || '');
        }}
        disabled={!countryCode}
        options={states.map((st) => ({
          value: st.isoCode,
          label: st.name,
        }))}
      />
      <div style={{ margin: '30px' }}></div>
      <InputField
        label={'Zip Code'}
        placeholder="Zip Code"
        type={'text'}
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <div style={{ margin: '30px' }}></div>
      <GenericButton text={'Continue'} onClick={handleContinue} />
    </WithdrawLayout>
  );
};

export default WithdrawAddAccountInfo;
