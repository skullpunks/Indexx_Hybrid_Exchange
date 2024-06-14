import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';

import transfer from '../../assets/updated/transfer.svg';
import CustomSelectBox from '../../components/updated/Deposit/CustomSelect';
import { useNavigate } from 'react-router-dom';
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
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
  },
  depositContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    display: 'flex',
    gap: '10px',
    padding: '20px 15px',
    alignItems: 'center',

    width: '100%',
    '& h6': {
      fontSize: '16px',
      color: `${theme.palette.text.primary} !important`,
    },
    '& p': {
      fontSize: '12px',
      color: `${theme.palette.text.secondary} !important`,
    },
  },
}));
const DepositSelectCurrency = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setShowWarning(false);
  };

  const handleContinue = () => {
    if (selectedCurrency) {
      navigate('/deposit-enter-amount');
    } else {
      setShowWarning(true);
    }
  };

  return (
    <DepositLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>1. Select Currency</h3>
        <h4 className={classes.label}>Currency</h4>
        <CustomSelectBox items={['USD']} type={'Currency'} onCurrencyChange={handleCurrencyChange} />
        <div style={{ margin: '10px' }}></div>
        <h4 className={classes.label}>Deposit with</h4>
        <div className={classes.depositContainer}>
          <div>
            <img src={transfer} alt="transfer" />
          </div>
          <div>
            <h6>Bank Transfer (SWIFT)</h6>
            <p>0 Fee, 1-4 Business days</p>
          </div>
        </div>
        <div style={{ margin: '30px' }}></div>
        {showWarning && <div className={classes.warning}>Please select a currency.</div>}
        <GenericButton text={'Continue'} styles={{ marginTop: 'auto' }} onClick={handleContinue} />
      </div>
    </DepositLayout>
  );
};

export default DepositSelectCurrency;
