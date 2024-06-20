import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';

import transfer from '../../assets/updated/transfer.svg';
import CustomSelectBox from '../../components/updated/Deposit/CustomSelect';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/updated/shared/TextField';
import DepositCryptoLayout from '../../components/updated/DepositCrypto';
import { useTheme } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
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
  heading: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  text: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  gridHeading: {
    color: theme.palette.text.secondary,
  },
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
}));
const DepositSelectCoin = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const theme = useTheme();
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
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <DepositCryptoLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>1. Select Coin</h3>
        <h4 className={classes.label}>Coin</h4>
        <CustomSelectBox
          items={['USD']}
          type={'Coin'}

          // onCurrencyChange={handleCurrencyChange}
        />
        <div style={{ margin: '10px' }}></div>

        <h3 className={classes.heading}>Deposit to</h3>
        <h4 className={classes.label}>Network</h4>
        <CustomSelectBox
          items={['USD']}
          type={'network'}
          // onCurrencyChange={handleCurrencyChange}
        />
        <p className={classes.heading}>Address</p>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginBottom: theme.spacing(2),
          }}
        >
          <span
            style={{ color: theme.palette.text.primary, fontWeight: '500' }}
          >
            1LmkQDpGvx1FBygJCPG6hpjcH7ryMDSwGD{' '}
          </span>
          <div
            className={classes.copyButton}
            onClick={() =>
              copyToClipboard('1LmkQDpGvx1FBygJCPG6hpjcH7ryMDSwGD')
            }
          >
            <ContentCopy
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
              fontSize="small"
            />
          </div>
        </div>
        <div container className={classes.gridContainer}>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Expected arrival</p>
              <p className={classes.gridText}>1 network confirmations</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Expected Unlock</p>
              <p className={classes.gridText}>
                <span style={{ color: theme.palette.primary.main }}>1</span>{' '}
                network confirmations
              </p>
            </div>
          </div>
          <div item xs={6} className={classes.gridItem}>
            <div>
              <p className={classes.gridHeading}>Minimum deposit</p>
              <p className={classes.gridText}>0.00000001 ETH</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={classes.gridHeading}>Selected Wallet</p>
              <p className={classes.gridText}>
                Spot Wallet{' '}
                <span
                  style={{
                    color: theme.palette.primary.main,
                    cursor: 'pointer',
                  }}
                >
                  Change
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
        <ul>
          <li className={classes.listItem}>
            Send only ETH to this deposit address.
          </li>
          <li className={classes.listItem}>
            Ensure the network is
            <span
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {' '}
              Ethereum.
            </span>{' '}
          </li>
          <li className={classes.listItem}>
            Do not send NFTs to this address.{' '}
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Learn how to deposit NFTs
            </span>{' '}
          </li>
        </ul>
        <InputField
          type={'text'}
          placeholder="Enter deposit transaction hash"
          style={{ height: '55px' }}
        />
        <div style={{ margin: '10px' }}></div>
        {showWarning && (
          <div className={classes.warning}>Please select a currency.</div>
        )}
        <GenericButton
          text={'Submit deposit transaction hash'}
          styles={{ marginTop: 'auto' }}
          // onClick={handleContinue}
        />
      </div>
    </DepositCryptoLayout>
  );
};

export default DepositSelectCoin;
