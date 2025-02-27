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

const DemoPopup = ({ onClose, text }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isFeeAcknowledged, setIsFeeAcknowledged] = useState(false);
  const navigate = useNavigate();
  const handleSubmitSellPlan = () => {
    navigate('/smart-crypto');
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
            onClick={handleSubmitSellPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoPopup;
