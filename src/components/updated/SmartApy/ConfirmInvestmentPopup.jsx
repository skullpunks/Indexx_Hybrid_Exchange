import React from 'react';
import { makeStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import greenCheck from '../../../assets/redeem/check green 6.svg';
import GenericButton from '../shared/Button';
import smartApyIcon from '../../../assets/updated/SmartApy/smartApyLogo.svg';
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
      fontSize: '30px',
      fontWeight: 600,
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '32px',
      fontWeight: 400,

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
  heading: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  marginBottom: '20px',
  subHeading: { fontSize: '48px', fontWeight: '500' },
  paragraph: {
    fontSize: '16px',
    opacity: '.8',
    marginBottom: '20px',
  },
}));

const ConfirmInvestmentPopup = ({
  onClose,
  onConfirm,
  amount,
  duration,
  loading,
}) => {
  const theme = useTheme();

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
          {/* <img src={greenCheck} height="60px" /> */}
          <h3 className={classes.heading}>Confirm Your Investment</h3>
          <h4 className={classes.subHeading}>
            You’re about to stake $
            {new Intl.NumberFormat('en-US').format(amount)} for {duration}.
          </h4>
          <p className={classes.paragraph}>
            Your funds will be converted to IUSD+ and securely staked to
            generate guaranteed returns. Once the lock-in period is complete,
            your principal and yield will be available in IUSD+ or USD.
          </p>
          <div style={{ margin: '30px' }}></div>
          <p className={classes.paragraph}> Please confirm to proceed.</p>
          <div className={classes.btnContainer}>
            <GenericButton
              text="Confirm and Stake"
              onClick={onConfirm}
              loading={loading}
            />

            <GenericButton
              text="Invest"
              onClick={onClose}
              className={classes.outlineBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInvestmentPopup;
