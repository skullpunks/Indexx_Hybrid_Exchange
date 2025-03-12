import React from 'react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

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
  },
  bnModalWrap: {
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
    borderRadius: '16px',
    boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: '560px',
    width: '100%',
    padding: '24px',
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
      fontSize: '24px',
      margin: 0,
      fontWeight: '500',
      textAlign: 'center',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  contactButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
    fontWeight: 'bold',
  },
}));

const ContactAccountManagerPopup = ({ onClose, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.bnMask}>
      <div className={classes.bnModalWrap}>
        <CloseIcon className={classes.closeBtn} onClick={onClose} />
        <div className={classes.header}>
          <h2>Please contact the Account Manager to {type} this plan</h2>
        </div>
      </div>
    </div>
  );
};

export default ContactAccountManagerPopup;
