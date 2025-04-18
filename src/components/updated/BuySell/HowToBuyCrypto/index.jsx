import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo1 from '../../../../assets/updated/buySell/buy_01.png';
import logo2 from '../../../../assets/updated/buySell/cart.png';
import logo3 from '../../../../assets/updated/buySell/receive token.png';
const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'flex-start',
    alignItems: 'stretch',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr ',
    },
  },
  heading: {
    width: '100%',
    margin: '100px 0px 30px 0px !important',
    fontSize: '40px !important',
    fontWeight: '600 !important',
    color: theme.palette.text.primary,
  },
  card: {
    flex: '1 1 30%', // Adjust the basis value to control how many cards are shown per row
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    textAlign: 'left',
  },
  logo: {
    // Add your logo styles here
    width: '96px',
    height: '96px',

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  cardHeading: {
    marginTop: '24px !important',
    marginBottom: theme.spacing(1),
    fontSize: '20px !important',
    fontWeight: '600 !important',
    color: theme.palette.text.primary,
  },
  cardText: {
    fontSize: '14px !important',
    marginTop: '8px !important',
    color: theme.palette.text.secondary,
  },
}));

const HowToBuyCrypto = ({ tokenType, receiveToken }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log('Selected receiveToken:', receiveToken);
    // Perform necessary operations with receiveToken
  }, [receiveToken]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>
        How to Buy{' '}
        {tokenType === 'Tokens'
          ? 'Crypto'
          : tokenType === 'Stock Tokens'
          ? 'Stock Tokens'
          : 'ETF Tokens'}
      </Typography>

      <div className={classes.gridContainer}>
        <Box className={classes.card}>
          <div className={classes.logo}>
            <img src={logo1} />
          </div>
          <Typography className={classes.cardHeading}>
            1.Enter Amount & Select Payment
          </Typography>
          <Typography className={classes.cardText}>
            Enter the amount, select the available payment method, and choose
            the payment account or bind the payment card.
          </Typography>
        </Box>
        <Box className={classes.card}>
          <div className={classes.logo}>
            <img src={logo2} />
          </div>
          <Typography className={classes.cardHeading}>
            2.Confirm Order
          </Typography>
          <Typography className={classes.cardText}>
            Confirmation of transaction detail information, including trading
            pair quotes, fees, and other explanatory tips.
          </Typography>
        </Box>
        <Box className={classes.card}>
          <div className={classes.logo}>
            <img src={logo3} />
          </div>
          <Typography className={classes.cardHeading}>
            3.Receive{' '}
            {tokenType === 'Tokens'
              ? 'Crypto'
              : tokenType === 'Stock Tokens'
              ? 'Stock Tokens'
              : 'ETF Tokens'}
          </Typography>
          <Typography className={classes.cardText}>
            After successful payment, the purchased crypto will be deposited
            into your Asset Wallet.
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default HowToBuyCrypto;
