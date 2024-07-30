import React from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../updated/shared/Button';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import gift1 from '../../../assets/redeem/gift1.svg';
import IconicHeader from '../shared/IconicHeader';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    marginTop: '50px',
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
  const { state } = location;
  const selectedImg = state?.selectedImg;

  return (
    <div>
      <div className={classes.contentContainer}>
        <IconicHeader />
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
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Quantity: 1
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Amount: 100.00 INEX
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '30px',
                marginBottom: '15px',
              }}
            >
              Gift Card Number: 1234567890ANHUW
            </p>
          </div>
        </div>

        <div className={classes.btnContainer}>
          <GenericButton
            text="Send Another card"
            onClick={() => navigate('/redeem/')}
          />
        </div>
      </div>
    </div>
  );
};

export default SendCardSuccessfully;
