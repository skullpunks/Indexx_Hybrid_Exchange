import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, useTheme } from '@mui/material';
import Inex from '../../../assets/updated/buySell/INEX.svg';
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

const CreateAPlanPopup = ({ onClose, category, allocationData }) => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState();
  const [usdAmount, setUsdAmount] = useState();
  const [planName, setPlanName] = useState('');
  const classes = useStyles();
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAmountChange = (e) => {
    setUsdAmount(e.target.value);
  };

  console.log('allocationData', allocationData);
  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };

  const renderCoinAllocationInputs = () => {
    return allocationData.cryptocurrencies.map((coin) => (
      <InputField
        key={coin._id}
        type="text"
        value={coin.percentage} // Display the percentage allocation dynamically
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
                src={getImage(coin.token)}
                alt={coin.name}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  marginRight: 8,
                }}
              />
              <span>{coin.name}</span>
            </div>
          </InputAdornment>
        }
        endAdornment={<InputAdornment position="end">%</InputAdornment>}
        fullWidth
      />
    ));
  };

  const reformPlanName = (name, managedBy) => {
    if (name.includes('Surge'))
      return `Smart Crypto x-Blue Surge - ${managedBy}`;
    if (name.includes('Ripple'))
      return `Smart Crypto x-Blue Ripple - ${managedBy}`;
    if (name.includes('Wave'))
      return `Smart Crypto x-Blue Ripple - ${managedBy}`;
    if (name.includes('Blooming'))
      return `Smart Crypto x-Bitcoin Blooming - ${managedBy}`;
    if (name.includes('Rush'))
      return `Smart Crypto x-Bitcoin Rush - ${managedBy}`;
    if (name.includes('Bull-Run'))
      return `Smart Crypto x-Bitcoin Bull-Run - ${managedBy}`;
  };

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
            {/* Plan Name Section */}
            <div className={classes.enterAmountContainer}>
              <label>Plan's Name</label>
              <InputField
                placeholder={'Buy a plan name here (Optional)'}
                type="text"
                value={reformPlanName(
                  allocationData?.portfolioName,
                  allocationData?.managedBy
                )}
                //onChange={(e) => setPlanName(e.target.value)}
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                style={{ marginTop: '0px' }}
              />
            </div>

            {/* Coin Allocation Section */}
            <div className={classes.coinAllocationRoot}>
              <label>Coin Allocation</label>
              <div className={classes.inputContainer}>
                {renderCoinAllocationInputs()}
              </div>
            </div>
          </div>

          {/* Amount Per Period Section */}
          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Amount Per Period</label>
              <InputField
                placeholder="The minimum amount is 1 USDT"
                type="text"
                style={{ marginTop: '0px', marginBottom: '10px' }}
                value={usdAmount}
                onChange={handleAmountChange}
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                endAdornment={
                  <InputAdornment position="end">USD</InputAdornment>
                }
              />
            </div>
          </div>

          {/* Payment Method Section */}
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

          {/* Action Buttons */}
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
