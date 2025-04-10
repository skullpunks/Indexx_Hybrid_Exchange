import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../updated/shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import gift1 from '../../../assets/redeem/gift1.svg';
import IconicHeader from '../shared/RedeemIconicHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCardContext } from './CardContext';

const useStyles = makeStyles((theme) => ({
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
      marginTop: '10px',
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
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1000px',
    width: '100%',
    margin: '50px auto',
    border: `1px solid ${theme.palette.divider}`,
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginTop: '25px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '20px',
    },
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
}));

const SendCardSuccessfully = ({ onClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { giftCardData, selectedImg, amountInUsd } = location.state || {};
  const [selectedTab, setSelectedTab] = useState('Send');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={classes.contentContainer}>
        <img src={greenCheck} height="100px" />
        <h3>Sent Successfully</h3>
        <h4>
          We will send an email on your behalf. He/she will receive the Gift
          card number, and your message.
        </h4>
        <div className={classes.boxContainer}>
          <div style={{ flex: '50%' }}>
            <img src={selectedImg} width={'100%'} />
          </div>
          <div
            style={{
              flex: '50%',
              textAlign: 'left',
              padding: '20px',
              fontSize: '28px',
            }}
          >
            {/* <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Quantity: 1
            </p> */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Token Amount:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }).format(giftCardData?.amount)}{' '} {giftCardData?.type}
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Amount in USD: $
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }).format(amountInUsd)}
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Gift Card Number:{giftCardData?.voucher}
            </p>
          </div>
        </div>

        <div className={classes.btnContainer}>
          <GenericButton
            text="Send Another card"
            onClick={() => navigate('/redeem/create-card')}
            styles={{ minWidth: '200px' }}
          />
          <GenericButton
            text="View Shopping History"
            onClick={() => navigate('/redeem/shopping-history')}
            styles={{ minWidth: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SendCardSuccessfully;
