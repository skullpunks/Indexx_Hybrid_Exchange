import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarGroup, Button, useTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';
import congratulationIcon from '../../../assets/updated/smartCrypto/congratulationIcon.png';

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
      maxWidth: '560px',
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
    marginBottom: '30px',
    gap: '10px',
    '& img': {
      height: '120px',
    },
    '& h2': {
      fontSize: '42px',
      margin: 0,
      fontWeight: '500',
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
    marginBottom: '30px',
    '& p': {
      fontSize: '20px',
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

const SellCongratulations = ({
  onClose,
  category,
  userSellPlanReformed,
  userSellPlan,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  console.log(
    'userSellPlanReformed, userSellPlan',
    userSellPlanReformed,
    userSellPlan
  );
  const getPlanImage = (planName) => {
    if (planName.includes('Surge')) return surge;
    if (planName.includes('Wave')) return wave;
    if (planName.includes('Ripple')) return ripple;
    if (planName.includes('Blooming')) return bloomingIcon;
    if (planName.includes('Bull-Run')) return bullRunIcon;
    if (planName.includes('Rush')) return rushIcon;
  };

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          {/* <img src={passwordChanged} height="100px" /> */}
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
            <img src={congratulationIcon} />
            <h2>Congratulations!</h2>
          </div>

          <div className={classes.planDetails}>
            <p>Your Smart Crypto plan is sold</p>
            <img src={getPlanImage(userSellPlan)} />
            <p>{userSellPlanReformed}</p>
          </div>

          <div className={classes.btnContainer}>
            <Button
              variant="outlined"
              className={
                category === 'x-Bitcoin'
                  ? classes.yellowOutlinedBtn
                  : classes.blueOutlinedBtn
              }
              onClick={() => {
                navigate('/smart-crypto');
              }}
            >
              Explore Smart Crypto
            </Button>
            <GenericButton
              text={'View Asset Wallet'}
              className={
                category === 'x-Bitcoin'
                  ? classes.yellowButton
                  : classes.blueButton
              }
              onClick={() => {
                onClose();
                if (window.location.pathname === '/wallet/overview') {
                  window.location.reload(); // Force reload if already on the same page
                } else {
                  navigate('/wallet/overview');
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCongratulations;
