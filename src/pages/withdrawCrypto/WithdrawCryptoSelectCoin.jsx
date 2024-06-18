import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import GenericButton from '../../components/updated/shared/Button';

import CustomSelectBox from '../../components/updated/Deposit/CustomSelect';
import InputField from '../../components/updated/shared/TextField';
import { InputAdornment, useTheme } from '@mui/material';

import WithdrawCryptoLayout from '../../components/updated/WithdrawCrypto';
import inexLogo from '../../assets/updated/buySell/INEX-sm.svg';
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
  secHeading: {
    fontSize: '24px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    marginBottom: theme.spacing(2),
  },
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
    margin: '15px 0px',
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

  text: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
    margin: '15px 0px',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  gridHeading: {},
  gridText: {
    color: theme.palette.text.primary,
  },
  listItem: {
    fontSize: '15px',
    color: theme.palette.text.primary,
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
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
}));
const WithdrawCryptoSelectCoin = () => {
  const classes = useStyle();
  const theme = useTheme();
  const [showWarning, setShowWarning] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <WithdrawCryptoLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>1. Select Coin</h3>
        <h4 className={classes.label}>Coin</h4>
        <CustomSelectBox
          items={['USD']}
          type={'Coin'}

          // onCurrencyChange={handleCurrencyChange}
        />
        <div style={{ margin: '10px' }}></div>

        <h3 className={classes.secHeading}>Send to</h3>
        <h4 className={classes.label}>Address</h4>

        <InputField
          type={'text'}
          placeholder="Enter address"
          style={{ height: '55px', margin: 0 }}
        />

        <h4 className={classes.label}>Amount</h4>

        <InputField
          type={'text'}
          placeholder="Enter Amount"
          style={{ height: '55px', margin: 0 }}
          endAdornment={
            <InputAdornment position="end">
              <span className={classes.endAdornmentContainer}>
                <img src={inexLogo} alt={'INEX'} />
                <p>INEX</p>
              </span>
            </InputAdornment>
          }
        />

        <div container className={classes.gridContainer}>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>INEX Balance</p>
              <p className={classes.gridText}>44.13415256 INEX</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Asset Wallet</p>
              <p className={classes.gridText}>INEX</p>
            </div>
          </div>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Minimum withdrwal</p>
              <p className={classes.gridText}>5 INEX</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Maximum withdrwal</p>
              <p className={classes.gridText}>5000 INEX </p>
            </div>
          </div>

          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Network Fee</p>
              <p className={classes.gridText}>0.0005 INEX</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Final Receive Amount</p>
              <p className={classes.gridText}>INEX</p>
            </div>
          </div>
        </div>

        <div style={{ margin: '10px' }}></div>

        <GenericButton
          text={'Withdraw'}
          styles={{ marginTop: 'auto' }}
          // onClick={handleContinue}
        />
      </div>
    </WithdrawCryptoLayout>
  );
};

export default WithdrawCryptoSelectCoin;
