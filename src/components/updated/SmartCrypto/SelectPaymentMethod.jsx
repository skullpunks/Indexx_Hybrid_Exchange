import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import transactionIcon from '../../../assets/updated/buySell/transactionMethod.svg';
import usd from '../../../assets/token-icons/USD.png';
import creditCard from '../../../assets/updated/popup/credit-card.svg';
import venmo from '../../../assets/updated/popup/venmo.svg';
import ach from '../../../assets/updated/popup/ach.png';
import paypal from '../../../assets/updated/popup/paypal.svg';
import zelle from '../../../assets/updated/popup/zelle.svg';
import tygpay from '../../../assets/updated/tyga_icon.png';
import wireTransfer from '../../../assets/updated/popup/wiretransfer.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    margin: '30px 0px',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '46px 16px',
    background: 'transparent',
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
    }`,
    borderRadius: '8px',
    textTransform: 'none',
    width: '100%',
  },
  blueHover: {
    '&:hover': {
      background: 'transparent',
      border: `1px solid #07A6FC`,
    },
  },
  yellowHover: {
    '&:hover': {
      background: 'transparent',
      border: `1px solid #FFB300
        `,
    },
  },
  iconTextContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
  },
  btnText: {
    color: theme.palette.text.primary,
    fontSize: '18px',
  },
}));

const PaymentMethodSelection = ({
  label = 'Pay With',
  buttonText = 'Select Transaction Method',
  onClick,
  selectedPaymentMethod,
  errorMsg,
  type,
  blueBorders,
  yellowBorders,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <p className={classes.label}>
        {type === 'Buy' ? label : 'Received Method'}{' '}
        {errorMsg && (
          <span style={{ color: 'red', marginLeft: '5px' }}> {errorMsg} </span>
        )}
      </p>
      <button
        className={`${classes.button} ${blueBorders && classes.blueHover} ${
          yellowBorders && classes.yellowHover
        }`}
        onClick={onClick}
      >
        <Box className={classes.iconTextContainer}>
          <img
            src={
              buttonText === 'Credit Card'
                ? creditCard
                : buttonText === 'Paypal'
                ? paypal
                : buttonText === 'Zelle'
                ? zelle
                : buttonText === 'Venmo'
                ? venmo
                : buttonText === 'ACH'
                ? ach
                : buttonText === 'TygaPay'
                ? tygpay
                : buttonText === 'Wire'
                ? wireTransfer
                : buttonText === 'USD'
                ? usd
                : transactionIcon
            }
            alt="Transaction Method"
            style={{ width: '50px' }}
          />
          <p className={classes.btnText}>
            {selectedPaymentMethod || buttonText}
          </p>
        </Box>
        <ArrowForwardIosIcon sx={{ width: '16px' }} />
      </button>
    </Box>
  );
};

export default PaymentMethodSelection;
