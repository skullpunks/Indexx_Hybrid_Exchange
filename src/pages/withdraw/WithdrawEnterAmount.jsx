import { Button, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';
import iusd from '../../assets/updated/buySell/usd.svg';
import WithdrawLayout from '../../components/updated/Withdraw';
import {
  decodeJWT,
  getUserWallets,
  createFiatWithdraw,
} from '../../services/api';

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
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  isAnswerBoldText: {
    fontSize: '20px',
    fontWeight: '600',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '80px', // Adjust margin as needed
  },
  secondaryHeading: {
    fontSize: '14px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'left',
    marginTop: '20px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
}));

const TransactionDetails = ({
  question,
  answer,
  isAnswerBold,
  editable,
  onEdit,
}) => {
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
        {editable && (
          <Button
            sx={{
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'underline',
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};
const WithdrawEnterAmount = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const {
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
  } = location.state || {};
  const [amount, setAmount] = useState('');
  const [serverError, setServerError] = useState('');
  const [error, setError] = useState('');
  const [singleWallet, setSingleWallet] = useState();
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [loading, setLoading] = useState(false);

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
    navigate('/withdraw-add-information', {
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

  const handleContinue = async () => {
    if (amount >= 20 && amount <= 50000) {
      setLoading(true);
      try {
        const res = await createFiatWithdraw(
          email,
          'USD',
          beneficiaryName,
          accountNumber,
          bankName,
          routingNumber,
          swiftCode,
          addressLine1,
          city,
          state,
          country,
          zipCode,
          amount
        );
        if (res.status === 200) {
          navigate('/withdraw-success', {
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
              amount,
            },
          });
        } else {
          setServerError(
            'Failed to withdraw. Please try again or contact support'
          );
        }
      } catch (error) {
        setServerError(
          'Failed to withdraw. Please try again or contact support'
        );
      } finally {
        setLoading(false);
      }
    } else {
      setError('Amount must be between 20 and 50,000');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    let emailFromToken = '';

    if (accessToken) {
      const decoded = decodeJWT(String(accessToken));
      emailFromToken = decoded.email;
      setEmail(emailFromToken);
    }

    const emailToUse = emailFromToken || email;

    if (emailToUse) {
      getUserWallets(emailToUse).then((res) => {
        let requiredCoin = res.data.find((x) => x.coinSymbol === 'USD');
        setSingleWallet(requiredCoin);
      });
    }
  }, [email]);

  return (
    <WithdrawLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>Enter Amount</h3>
        <InputField
          label={'Currency'}
          placeholder="Enter 20-50000"
          type={'number'}
          value={amount}
          onChange={handleAmountChange}
          secondaryLabel={'Transaction Requirements'}
          endAdornment={
            <InputAdornment position="end">
              <span className={classes.endAdornmentContainer}>
                <p>
                  Balance :{Math.floor(singleWallet?.coinBalance * 100) / 100}{' '}
                  USD
                </p>
              </span>
            </InputAdornment>
          }
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div style={{ margin: '10px' }}></div>
        <TransactionDetails
          question={'Bank Account:'}
          answer={accountNumber}
          editable
          onEdit={handlePrevious}
        />
        <div style={{ margin: '0px' }}></div>
        <TransactionDetails
          question={'Transaction method:'}
          answer="Bank Transfer(SWIFT)"
        />
        <div style={{ margin: '5px' }}></div>
        <TransactionDetails question={'Transaction Fee:'} answer="0.00 USD" />
        <div style={{ margin: '5px' }}></div>
        <TransactionDetails
          question={'You receive:'}
          answer={`${amount} USD`}
          isAnswerBold
        />
        <div className={classes.buttonWrapper}>
          <Button
            variant="outlined"
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
            onClick={handleContinue}
            disabled={amount < 20 || amount > 50000 || loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
        {serverError && <div className={classes.errorMessage}>{serverError}</div>}
        <h4 className={classes.secondaryHeading}>
          NOTE: The arrival time of withdrawal depends on the region of your
          receiving bank. Usually it takes 2-4 business days.
        </h4>
      </div>
    </WithdrawLayout>
  );
};

export default WithdrawEnterAmount;
