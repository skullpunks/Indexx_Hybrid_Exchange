import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bnMask: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
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
  bnModal: {
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
    borderRadius: '16px',
    boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
    maxWidth: '500px',
    width: '100%',
    padding: '24px',
    textAlign: 'center',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
  },
  greyButton: {
    backgroundColor: theme.palette.divider,
    color: theme.palette.text.primary,
  },
  yellowButton: {
    backgroundColor: '#FEBA00',
    color: '#000',
  },
  blueButton: {
    backgroundColor: '#07A6FC',
    color: '#000',
  },
  closeBtn: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    position: 'absolute',
    right: '15px',
    top: '15px',
  },
}));

const DemoPopup = ({ onClose, text, plan }) => {
  console.log('plan', plan);
  const classes = useStyles();
  const theme = useTheme();
  const [isFeeAcknowledged, setIsFeeAcknowledged] = useState(false);
  const navigate = useNavigate();
  const planRoutes = {
    'Smart Crypto Surge': '/smart-crypto/plan-detail/surge',
    'Smart Crypto Ripple': '/smart-crypto/plan-detail/ripple',
    'Smart Crypto Wave': '/smart-crypto/plan-detail/wave',
    'Smart Crypto x-Bitcoin Blooming': '/smart-crypto/plan-detail/blooming',
    'Smart Crypto x-Bitcoin Rush': '/smart-crypto/plan-detail/rush',
    'Smart Crypto x-Bitcoin Bull-Run': '/smart-crypto/plan-detail/bull-run',
  };

  const handleNavigate = () => {
    const path = planRoutes[plan]
      ? `${planRoutes[plan]}?isFreeTrialUpgrade=true`
      : '/wallet/smart-crypto?isFreeTrialUpgrade=true';
    navigate(path);
    onClose();
  };
  return (
    <div className={classes.bnMask}>
      <div className={classes.bnModal}>
        <CloseIcon className={classes.closeBtn} onClick={onClose} />
        <HelpOutlineIcon
          style={{
            fontSize: '58px',
            marginBottom: '20px',
            color: theme.palette.primary.main,
          }}
        />
        <h3 style={{ fontSize: '22px' }}>{text}</h3>
        <div className={classes.btnContainer}>
          <GenericButton
            text={'Close'}
            className={classes.greyButton}
            onClick={onClose}
          />
          <GenericButton
            text={'Invest'}
            className={
              isFeeAcknowledged ? classes.blueButton : classes.yellowButton
            }
            onClick={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoPopup;
