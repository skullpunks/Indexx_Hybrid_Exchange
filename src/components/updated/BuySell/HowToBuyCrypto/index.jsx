import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo1 from '../../../../assets/updated/buySell/buy_01.png';
import logo2 from '../../../../assets/updated/buySell/cart.png';
import logo3 from '../../../../assets/updated/buySell/receive token.png';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignItems: 'stretch',
  },
  heading: {
    width: '100%',
    margin: '100px 0px 30px 0px !important',
    fontSize: '40px !important',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  card: {
    flex: '1 1 30%', // Adjust the basis value to control how many cards are shown per row
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
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
    fontSize: '20px',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  cardText: {
    fontSize: '14px',
    marginTop: '8px !important',
    color: theme.palette.text.secondary,
  },
}));

const HowToBuyCrypto = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>How to Buy Crypto</Typography>
      <Box className={classes.card}>
        <div className={classes.logo}>
          <img src={logo1} />
        </div>
        <Typography className={classes.cardHeading}>
          1.Enter Amount & Select Payment
        </Typography>
        <Typography className={classes.cardText}>
          Enter the amount, select the available payment method, and choose the
          payment account or bind the payment card.
        </Typography>
      </Box>
      <Box className={classes.card}>
        <div className={classes.logo}>
          <img src={logo2} />
        </div>
        <Typography className={classes.cardHeading}>2.Confirm Order</Typography>
        <Typography className={classes.cardText}>
          Confirmation of transaction detail information, including trading pair
          quotes, fees, and other explanatory tips.
        </Typography>
      </Box>
      <Box className={classes.card}>
        <div className={classes.logo}>
          <img src={logo3} />
        </div>
        <Typography className={classes.cardHeading}>
          3.Receive Crypto
        </Typography>
        <Typography className={classes.cardText}>
          After successful payment, the purchased crypto to will reach Spot
          Wallet.
        </Typography>
      </Box>
    </Box>
  );
};

export default HowToBuyCrypto;
