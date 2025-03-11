import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import step3Image from '../../../assets/updated/smartCrypto/step3.svg';

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
    backgroundColor: ' rgba(0, 0, 0, .7)',
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
    padding: '10px',
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
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '460px',
      width: '100%',
      marginTop: '50px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  greyButton: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgb(71, 77, 87) !important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  yellowButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
    maxWidth: '80%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  blueButton: {
    maxWidth: '80%',
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  contentContainer: {
    padding: '24px',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    gap: '10px',
  },
  greyButton: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgb(71, 77, 87) !important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  yellowButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  flexContainer1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    flexDirection: 'column',
    gap: '15px',
    '& img': {
      height: '80px',
      marginBottom: 0,
    },
    '& h2': {
      fontSize: '28px',
      margin: 0,
      fontWeight: '600',
      textAlign: 'center',
    },
    '& h3': {
      fontSize: '24px',
      fontWeight: '500',
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginBottom: '15px',
    },
  },
  planNameRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 0,
    },
  },
  closeBtn: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  planDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px',
    marginTop: '20px',
    '& p': {
      fontSize: '12px',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
  yellowOutlinedBtn: {
    color: '#FEBA00 !important',
    borderColor: '#FEBA00 !important',
    borderRadius: '10px !important',
    '&:hover': {
      background: 'none !important',
      opacity: '.7',
    },
  },
  blueOutlinedBtn: {
    color: '#07A6FC !important',
    borderColor: '#07A6FC !important',
    borderRadius: '10px !important',
    '&:hover': {
      background: 'none !important',
      opacity: '.7',
    },
  },
}));

const RealInvestmentPopup = ({ onClose, category }) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
            <div style={{ fontSize: '20px', fontWeight: '600' }}></div>

            <div
              onClick={onClose}
              style={{ cursor: 'pointer', padding: '18px' }}
            >
              <CloseIcon className={classes.closeBtn} />
            </div>
          </div>
          <div className={classes.header}>
            <img src={step3Image} />
            <h3>Check Real Investment</h3>
          </div>

          <div className={classes.planDetails}>
            <p>
              You have successfully moved from demo to real investment. Go to your asset wallet to track your real investment growth.
            </p>
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              text={'Go to Asset Wallet'}
              onClick={() => {
                onClose();
                navigate('/wallet/smart-crypto');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealInvestmentPopup;
