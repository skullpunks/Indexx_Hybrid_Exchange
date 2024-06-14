import { Button, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';
import iusd from '../../assets/updated/buySell/usd.svg';
import { useLocation, useNavigate } from 'react-router-dom';

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
  endAdornmentContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
    borderLeft: `1px solid ${theme.palette.divider}`,
    '& img': {
      width: '25px',
      height: '25px',
    },
  },
  questionText: {
    fontSize: '18px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'left',
  },
  answerText: {
    fontSize: '18px',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'right',
  },
  isAnswerBoldText: {
    fontSize: '20px',
    fontWeight: '600',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: 'auto', // Adjust margin as needed
  },
}));

const TransactionDetails = ({ question, answer, isAnswerBold }) => {
  const classes = useStyle();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className={classes.questionText}>{question}</div>
      <div
        className={`${classes.answerText} ${
          isAnswerBold && classes.isAnswerBoldText
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const DepositEnterAmount = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const { currency } = location.state || {};

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    if (value < 20 || value > 50000) {
      setError('Amount must be between 20 and 50,000');
    } else {
      setError('');
    }
  };

  const handlePrevious = () => {
    navigate('/deposit-select-currency');
  };

  const handleContinue = () => {
    if (amount >= 20 && amount <= 50000) {
      navigate('/deposit-add-account-information', {
        state: { currency, amount },
      });
    } else {
      setError('Amount must be between 20 and 50,000');
    }
  };
  return (
    <DepositLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>2. Enter Amount</h3>
        <InputField
          label={'Amount'}
          placeholder="Enter 20-50000"
          type={'number'}
          value={amount}
          onChange={handleAmountChange}
          secondaryLabel={'Transaction Requirements'}
          endAdornment={
            <InputAdornment position="end">
              <span className={classes.endAdornmentContainer}>
                <img src={iusd} alt={'IUSD'} />
                <p>{currency}</p>
              </span>
            </InputAdornment>
          }
        />

        {error && <div className={classes.errorText}>{error}</div>}
        <div style={{ margin: '30px' }}></div>
        <TransactionDetails
          question={'Transaction method:'}
          answer="Bank Transfer(SWIFT)"
        />
        <div style={{ margin: '10px' }}></div>
        <TransactionDetails question={'Transaction Fee:'} answer="0.00 IUSD+" />
        <div style={{ margin: '10px' }}></div>
        <TransactionDetails
          question={'You receive:'}
          answer={`${amount} IUSD+`}
          isAnswerBold
        />
        <div className={classes.buttonWrapper}>
          <GenericButton
            variant="outlined"
            text={'Previous'}
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
            onClick={handlePrevious}
          />
          <GenericButton
            variant="contained"
            text={'Continue'}
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
            onClick={handleContinue}
            disabled={amount < 20 || amount > 50000}
          />
        </div>
      </div>
    </DepositLayout>
  );
};

export default DepositEnterAmount;
