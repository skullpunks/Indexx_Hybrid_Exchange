import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaymentIcon from '@mui/icons-material/Payment'; // Replace with your desired icon
import transactionIcon from '../../../../assets/updated/buySell/transactionMethod.svg';
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
    '&:hover': {
      background: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
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
  label = 'Pay with',
  buttonText = 'Select Transaction Method',
  onClick,
  selectedPaymentMethod,
  errorMsg,
  type,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <p className={classes.label}>
        {label}{' '}
        {errorMsg && (
          <span style={{ color: 'red', marginLeft: '5px' }}> {errorMsg} </span>
        )}
      </p>
      <button className={classes.button} onClick={onClick}>
        <Box className={classes.iconTextContainer}>
          <img src={transactionIcon} alt="Transaction Method" />
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
