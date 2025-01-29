import React from 'react';
import { makeStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import GenericButton from '../shared/Button';
import smartApyIcon from '../../../assets/updated/SmartApy/smartApyLogo.svg';
import { useNavigate } from 'react-router-dom';
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
      maxWidth: '90vw',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '460px',
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
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
    '&>div': {
      flex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      '& p': {
        display: 'none',
      },
    },
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  outlineBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.text.primary} !important`,
    '&:hover': {
      background: 'none !important',
      border: `1px solid ${theme.palette.primary.main} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

const SuccessfullDepostPopup = ({ onClose, orderData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div></div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                color={theme.palette.text.secondary}
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>
          <img src={greenCheck} height="60px" />
          <h3>
            Thank you for investing ${orderData?.breakdown?.inAmount} with{' '}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            <img src={smartApyIcon} height={'50px'} />
            <h3 style={{ fontStyle: 'italic' }}>Smart APY</h3>
          </div>
          <div className={classes.btnContainer}>
            <div>
              <p style={{ fontSize: '10px' }}>
                Click Asset to check your investment
              </p>
              <GenericButton
                text="Asset Wallet"
                onClick={() => {
                  onClose();
                  navigate('/wallet/overview');
                }}
              />
            </div>
            <div>
              <p style={{ fontSize: '10px' }}>Click "Invest"</p>
              <GenericButton
                text="Invest"
                onClick={onClose}
                className={classes.outlineBtn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullDepostPopup;
