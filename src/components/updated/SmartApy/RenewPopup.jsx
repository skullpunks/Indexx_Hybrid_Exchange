import React from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import InputField from '../shared/TextField';
import CustomSelectBox from './CustomSelectBox';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bnMask: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)',
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    '& h3': {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0 15px 0',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0, 0, 0, .1)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '660px',
      width: '100%',
      padding: '10px',
      marginTop: '100px',

      [theme.breakpoints.down('sm')]: {
        marginTop: '100px',
        height: '100vh',
      },
    },
  },
  enterAmountContainer: {
    marginBottom: '20px',
    marginTop: '10px',
    '& label': {
      textAlign: 'left',
      fontSize: '12px',
      width: '100%',
      marginBottom: '10px',
    },
  },
  selectTypeContainer: {
    marginBottom: '20px',
    width: '100%',
    '& label': {
      width: '100%',
      fontSize: '12px',
      marginBottom: '10px',
      textAlign: 'left',
    },
  },
  apyYeildContainer: {
    display: 'flex',
    gap: '10px',
    width: '100%',
  },
  apyContainer: {
    flex: '30%',
  },
  yieldContainer: {
    flex: '70%',
  },
}));

const RenewPopup = ({ onClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}`}
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
            <Typography variant="h6" fontWeight={600}>
              Renew
            </Typography>
            <CloseIcon
              onClick={onClose}
              style={{ cursor: 'pointer', color: theme.palette.text.secondary }}
              sx={{ '&:hover': { color: theme.palette.text.primary } }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Enter amount</label>
              <InputField
                placeholder="Minimum deposit is $3000"
                type="text"
                style={{ marginTop: '0px', marginBottom: '10px' }}
                endAdornment={
                  <InputAdornment position="end">USD</InputAdornment>
                }
              />
            </div>
          </div>

          <div className={classes.selectTypeContainer}>
            <label>Deposit Duration</label>
            <CustomSelectBox
              items={[
                { name: '3 months', value: '3 months' },
                { name: '6 months', value: '6 months' },
                { name: '12 months', value: '12 months' },
              ]}
              hasborder
            />
          </div>

          <div className={classes.apyYeildContainer}>
            <div className={classes.apyContainer}>
              <div className={classes.enterAmountContainer}>
                <label>APY</label>
                <InputField
                  type="text"
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  value={'9%'}
                  disabled
                />
              </div>
            </div>

            <div className={classes.yieldContainer}>
              <div className={classes.enterAmountContainer}>
                <label>Yield</label>
                <InputField
                  type="text"
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  endAdornment={
                    <InputAdornment position="end">USD</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          <FormControlLabel
            control={<Checkbox />}
            sx={{ width: '100%' }}
            label={
              <Typography variant="body2" textAlign="left">
                I agree to the Terms and Conditions
              </Typography>
            }
          />

          <div style={{ marginTop: '20px', width: '100%' }}>
            <GenericButton text="Renew" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewPopup;
