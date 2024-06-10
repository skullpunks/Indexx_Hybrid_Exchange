import { makeStyles } from '@mui/styles';
import React from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';

const useStyle = makeStyles((theme) => ({
  enterAmountRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'left',
  },
}));
const DepositSelectCurrency = () => {
  const classes = useStyle();
  return (
    <DepositLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>1. Select Currency</h3>
        <InputField
          label={'Bank Account Holder Name'}
          placeholder="Enter account holder name"
          type={'text'}
        />
        <div style={{ margin: '30px' }}></div>

        <div style={{ margin: '30px' }}></div>
        <GenericButton text={'Continue'} styles={{ marginTop: 'auto' }} />
      </div>
    </DepositLayout>
  );
};

export default DepositSelectCurrency;
