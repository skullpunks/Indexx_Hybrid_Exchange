import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import failedIcon from '../../../../assets/updated/smartCrypto/failedImage.svg';
import indexxTokens from '../../../../assets/updated/buySell/nonIndexxTokens.svg';
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
    marginBottom: '10px',
    flexDirection: 'column',
    gap: '15px',
    '& img': {
      height: '80px',
    },
    '& h2': {
      fontSize: '36px',
      margin: 0,
      fontWeight: '500',
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
    marginBottom: '20px',
    marginTop: '20px',
  },
  planFirstText: {
    fontSize: '22px',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '10px',
  },
  planSecText: {
    fontSize: '16x',
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: '10px',
    marginTop: '30px',
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

const NonIndexxFailPopup = ({ onClose, category }) => {
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
            <img src={failedIcon} />
            <h2>SORRY!</h2>
          </div>

          <div className={classes.planDetails}>
            <p className={classes.planFirstText}>
              {' '}
              Selling of Indexx Tokens is not available yet.
            </p>

            <p className={classes.planSecText}>
              Currently, selling of Indexx Tokens is unavailable yet. We’ll
              inform you once the option is open.
            </p>
          </div>
          <div className={classes.btnContainer}>
            <GenericButton
              text={'OK'}
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonIndexxFailPopup;
