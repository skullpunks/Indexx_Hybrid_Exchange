import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, useTheme } from '@mui/material';

import coinImg from '../../../assets/updated/smartCrypto/coinimg.png';
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
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .6)',
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
      boxShadow: '0px 3px 6px rgba(0,0,0,.1)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '660px',
      width: '100%',
      padding: '10px',
      marginTop: '20px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '100px',
        height: '100vh',
      },
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
  coinAllocationRoot: {
    width: '100%',
    '& label': {
      width: '100%',
      fontSize: '12px ',
      textAlign: 'left',
      marginBottom: '10px',
    },
  },
  inputContainer: {
    marginTop: '-5px',
    marginBottom: '20px',
    height: '220px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  coinAllocationInput: {
    textAlign: 'right',
    '& .MuiInputBase-input ': {
      textAlign: 'right',
    },
  },
}));

const CreateAPlanPopup = ({ onClose, category }) => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState();
  const [planName, setPlanName] = useState('');
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const classes = useStyles();
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
            <div style={{ fontSize: '20px', fontWeight: '600' }}>
              Create your plan
            </div>

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
          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Plan's Name</label>

              <InputField
                placeholder={'Buy a plan name here (Optional)'}
                type="text"
                value={planName}
                onChange={(e) => {
                  setPlanName(e.target.value);
                }}
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                style={{ marginTop: '0px' }}
              />
            </div>
            <div className={classes.coinAllocationRoot}>
              <label>Coin Allocation</label>
              <div className={classes.inputContainer}>
                <InputField
                  type="text"
                  value="0.00" // Set a default or dynamic value here
                  onChange={() => {}} // Add a proper handler if needed
                  disabled
                  yellowBorders={category !== 'x-Blue'}
                  blueBorders={category === 'x-Blue'}
                  className={classes.coinAllocationInput}
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '10px',
                        }}
                      >
                        <img
                          src={coinImg}
                          alt="icon"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: 8,
                          }}
                        />
                        <span>Text</span>
                      </div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  // Align text to the right

                  fullWidth
                />
                <InputField
                  type="text"
                  value="0.00" // Set a default or dynamic value here
                  onChange={() => {}} // Add a proper handler if needed
                  disabled
                  yellowBorders={category !== 'x-Blue'}
                  blueBorders={category === 'x-Blue'}
                  className={classes.coinAllocationInput}
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '10px',
                        }}
                      >
                        <img
                          src={coinImg}
                          alt="icon"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: 8,
                          }}
                        />
                        <span>Text</span>
                      </div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  // Align text to the right

                  fullWidth
                />
                <InputField
                  type="text"
                  yellowBorders={category !== 'x-Blue'}
                  blueBorders={category === 'x-Blue'}
                  value="0.00" // Set a default or dynamic value here
                  onChange={() => {}} // Add a proper handler if needed
                  disabled
                  className={classes.coinAllocationInput}
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '10px',
                        }}
                      >
                        <img
                          src={coinImg}
                          alt="icon"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: 8,
                          }}
                        />
                        <span>Text</span>
                      </div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  // Align text to the right

                  fullWidth
                />
                <InputField
                  type="text"
                  yellowBorders={category !== 'x-Blue'}
                  blueBorders={category === 'x-Blue'}
                  value="0.00" // Set a default or dynamic value here
                  onChange={() => {}} // Add a proper handler if needed
                  disabled
                  className={classes.coinAllocationInput}
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '10px',
                        }}
                      >
                        <img
                          src={coinImg}
                          alt="icon"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: 8,
                          }}
                        />
                        <span>Text</span>
                      </div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  // Align text to the right

                  fullWidth
                />
                <InputField
                  type="text"
                  value="0.00" // Set a default or dynamic value here
                  onChange={() => {}} // Add a proper handler if needed
                  disabled
                  yellowBorders={category !== 'x-Blue'}
                  blueBorders={category === 'x-Blue'}
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  className={classes.coinAllocationInput}
                  startAdornment={
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '10px',
                        }}
                      >
                        <img
                          src={coinImg}
                          alt="icon"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            marginRight: 8,
                          }}
                        />
                        <span>Text</span>
                      </div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  // Align text to the right

                  fullWidth
                />
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Amount Per Period</label>
              <InputField
                placeholder={'The minimum amount is 1 USDT'}
                type="text"
                style={{ marginTop: '0px', marginBottom: '10px' }}
                value={''}
                onChange={() => {}}
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                endAdornment={
                  <InputAdornment position="end">USD</InputAdornment>
                }
              />
            </div>
          </div>
          <div className={classes.selectTypeContainer}>
            <label>Select Payment Option</label>
            <CustomSelectBox
              items={[
                { name: 'Credit Card', value: 'Credit Card' },
                { name: 'Paypal', value: 'Paypal' },
                { name: 'ACH', value: 'ACH' },
                { name: 'Wire transfer', value: 'Wire transfer' },
                { name: 'Zelle', value: 'Zelle' },
                { name: 'TygoPay', value: 'TygoPay' },
              ]}
              value={paymentMethod}
              onChange={handleChange}
              hasborder
            />
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              className={classes.greyButton}
              text="Cancel"
              onClick={onClose}
            />
            <GenericButton
              text="Buy plan"
              className={
                category === 'x-Blue'
                  ? classes.blueButton
                  : classes.yellowButton
              }
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAPlanPopup;
