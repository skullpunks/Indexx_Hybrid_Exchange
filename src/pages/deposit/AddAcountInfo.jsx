import { makeStyles } from '@mui/styles';
import React from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';

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
const DepositAddAccountInfo = () => {
  const classes = useStyle();
  return (
    <div>
      <DepositLayout>
        <h3 className={classes.heading}>Add Account Information</h3>
        <h4 className={classes.secondaryHeading}>
          Please enter your bank account details below for all future USD
          transactions. If your bank account is from EU, UK or Middle East,
          please enter the IBAN in the Account Number field.
        </h4>
        <InputField
          label={'Bank Account Holder Name'}
          placeholder="Enter account holder name"
          type={'text'}
        />
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Bank Name'}
          placeholder="Enter bank name"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <InputField
          label={'Bank Account Number'}
          placeholder="Enter bank account number"
          type={'text'}
        />{' '}
        <div style={{ margin: '30px' }}></div>
        <GenericButton text={'Continue'} />
      </DepositLayout>
    </div>
  );
};

export default DepositAddAccountInfo;
