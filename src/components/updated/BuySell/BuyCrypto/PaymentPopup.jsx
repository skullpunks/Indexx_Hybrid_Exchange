import React from 'react';

import { makeStyles } from '@mui/styles';
import GenericButton from '../../shared/Button/index';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import transactionIcon from '../../../../assets/updated/buySell/transactionMethod.svg';
import { Box } from '@mui/material';

import creditCard from '../../../../assets/updated/popup/credit-card.svg';
import wireTransfer from '../../../../assets/updated/popup/wiretransfer.svg';
import venmo from '../../../../assets/updated/popup/venmo.svg';
import paypal from '../../../../assets/updated/popup/paypal.svg';
import zelle from '../../../../assets/updated/popup/zelle.svg';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },

  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      maxWidth: '518px',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '100%',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '0px',
      marginBottom: '20px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '36px 16px',
    background: 'transparent',
    marginBottom: '15px',
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
    '&:active': {
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
  paymentSelectionImg: {
    width: '50px',
  },
}));

const Popup = () => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <h3>Pay With</h3>

          <Box className={classes.container} style={{ width: '100%' }}>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img
                  className={classes.paymentSelectionImg}
                  src={transactionIcon}
                />
                <p className={classes.btnText}>Asset Wallet</p>
              </Box>
              <p>$3.0</p>
            </button>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img className={classes.paymentSelectionImg} src={creditCard} />
                <p className={classes.btnText}>Credit Card</p>
              </Box>
              <p>$3.0</p>
            </button>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img className={classes.paymentSelectionImg} src={paypal} />
                <p className={classes.btnText}>Paypal</p>
              </Box>
              <p>$3.0</p>
            </button>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img className={classes.paymentSelectionImg} src={zelle} />
                <p className={classes.btnText}>Zelle</p>
              </Box>
              <p>$3.0</p>
            </button>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img className={classes.paymentSelectionImg} src={venmo} />
                <p className={classes.btnText}>Venmo</p>
              </Box>
              <p>$3.0</p>
            </button>
            <button className={classes.button}>
              <Box className={classes.iconTextContainer}>
                <img
                  className={classes.paymentSelectionImg}
                  src={wireTransfer}
                />
                <p className={classes.btnText}>Wire Transfer</p>
              </Box>
              <p>$3.0</p>
            </button>
          </Box>
          <div className={classes.btnContainer}>
            <GenericButton text="Confirm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
