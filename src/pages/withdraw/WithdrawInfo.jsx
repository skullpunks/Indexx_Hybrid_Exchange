import { makeStyles } from '@mui/styles';
import React from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';
import WithdrawLayout from '../../components/updated/Withdraw';

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
  return (
    <div>
      <WithdrawLayout>
        <h3 className={classes.heading}>Withdrawal Information</h3>
        <h4 className={classes.secondaryHeading}>
          Please enter your bank account details below for all future USD
          transactions. If your bank account is from EU, UK or Middle East,
          please enter the IBAN in the Account Number field.
        </h4>
        <InputField
          label={'Benificiary Name'}
          placeholder="Enter account holder name"
          type={'text'}
        />
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Benificiary Account Number'}
          placeholder="Enter IBAN for bank accounts of UK/UE/Middle East"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Bank Name'}
          placeholder="Enter name"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'SWIFT?BIC Code'}
          placeholder="Enter name"
          type={'text'}
        />
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Benificiary Address Line 1'}
          placeholder="Street Address, District, City"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Benificiary Address Line 2'}
          placeholder="State/Pronince, County"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <GenericButton text={'Continue'} />
      </WithdrawLayout>
    </div>
  );
};

export default WithdrawAddAccountInfo;
