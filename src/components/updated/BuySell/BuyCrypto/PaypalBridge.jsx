import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Button, useTheme } from '@mui/material';
import partnershipDark from '../../../../assets/paypalPartnership/indexxPaypalForDarkMode.svg';
import partnershipLight from '../../../../assets/paypalPartnership/indexxPaypalForWhiteMode.svg';
import partnershipFirst from '../../../../assets/paypalPartnership/paypalTopBanner.svg';
import GenericButton from '../../shared/Button';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: 'auto',
    marginTop: '50px',

    maxWidth: '1280px',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: '20px 0',
  },
  imagetwo: {
    maxWidth: '525px',
    width: '100%',
    height: 'auto',
    margin: '10px 0',
  },
  welcomeText: {
    fontSize: '36px',
    fontWeight: '500',
    color: theme.palette.text.primary,
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  instructionsText: {
    fontSize: '24px',

    color: theme.palette.text.primary,
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  proceedButton: {
    display: 'inline-block',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    padding: '10px 20px',
    margin: '20px 0',
    borderRadius: '8px',
  },
  cardPaymentButton: {
    display: 'inline-block',
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
    padding: '10px 20px',
    margin: '20px 0',
    borderRadius: '8px',
  },
}));

const PaypalBridge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const { payPalPaymentLink } = location.state || {};

  const handleProceedToPaypal = () => {
    console.log("payPalPaymentLink", payPalPaymentLink)
    if (payPalPaymentLink) {
      window.location.href = payPalPaymentLink;
    } else {
      // Handle the case where the link is not available
      console.log('PayPal payment link is not available');
      console.error('PayPal payment link is not available');
    }
  };

  return (
    <Box className={classes.container}>
      <img src={partnershipFirst} alt="Example" className={classes.image} />

      <p className={classes.welcomeText}>Welcome to our Partnership</p>
      <img
        src={theme.palette.mode === 'dark' ? partnershipDark : partnershipLight}
        alt="Example"
        className={classes.imagetwo}
      />

      <div style={{ margin: '30px 0px' }}>
        <GenericButton
          text={'Proceed to Paypal'}
          styles={{ padding: '10px 30px' }}
          onClick={handleProceedToPaypal}
        />
      </div>

      <div style={{ textAlign: 'left', width: '100%' }}>
        <p className={classes.instructionsText}>Instructions:</p>

        <p variant="body1">
          1.Please Click on{' '}
          <span className={classes.cardPaymentButton}>
            Pay with Debit or Credit Card
          </span>{' '}
          on the payment page to proceed with debit card payment.
        </p>
        <p variant="body1">
          2. Click the green button to proceed to the PayPal payment page.
        </p>
      </div>
    </Box>
  );
};

export default PaypalBridge;
