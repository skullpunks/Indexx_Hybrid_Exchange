import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../shared/TextField';
import GenericButton from '../shared/Button';
import CustomTextField from './CustomTextField';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import IconicHeader from './IconicHeader';
import CoinsPopup from './CoinsPopup';
const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1280px',
    margin: '50px auto',
    padding: '10px 20px',
  },
  header: {
    height: '80px',
    padding: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      padding: '0px 0px',
    },
  },
  heading: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.text.primary,
    textAlign: 'left',
    background: 'none',
  },
  link: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  contentContent: {
    display: 'flex',
    justifyContent: 'center',
  },

  rightContainer: {},
  rightContentContainer: {
    maxWidth: '584px',
    width: '100%',
    '& h3': {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
    },
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '50px',
    },
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
}));

const ConvertCrypto = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [showCoinsDropdown, setShowCoinsDropdown] = useState(false);
  const validationSchema = Yup.object({
    verificationCode: Yup.number()
      .test(
        'len',
        'Must be exactly 6 digits',
        (val) => val && val.toString().length === 6
      )
      .required('Verification code is required'),
  });

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <Link className={classes.link} to="/auth/login-password">
          Convert
        </Link>
      </div>
      <div className={classes.contentContent}>
        <div className={classes.rightContainer}>
          <IconicHeader />
          <h6 className={classes.heading}>Wallet</h6>
          <div className={classes.rightContentContainer}>
            <CustomTextField
              label="From"
              placeholder="0.01 - 2500000"
              type="sell"
              setShowCoinsDropdown={setShowCoinsDropdown}
              //   onAmountChange={handleSpendAmountChange}
              //   onReceiveAmountChange={handleReceiveAmountChange}
              //   onPriceChange={handlePriceChange}
              //   amount={spendAmount}
              //   receiveAmount={receiveAmount}
              //   tokenType={tokenType}
              disableDropdown={false}
              loggedIn
              //   defaultReceiveToken={defaultSelectedToken}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ImportExportIcon />
            </div>
            <CustomTextField
              label="To"
              placeholder="0.000000017 - 43"
              type="sell"
              setShowCoinsDropdown={setShowCoinsDropdown}
              //   onAmountChange={handleSpendAmountChange}
              //   onReceiveAmountChange={handleReceiveAmountChange}
              //   onPriceChange={handlePriceChange}
              //   amount={spendAmount}
              //   receiveAmount={receiveAmount}
              //   tokenType={tokenType}
              disableDropdown={false}
              loggedIn
              //   defaultReceiveToken={defaultSelectedToken}
            />
            <div style={{ margin: '25px 0px' }}></div>
            <GenericButton
              text="Preview Conversion"
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </div>
      {showCoinsDropdown && (
        <CoinsPopup onClose={() => setShowCoinsDropdown(false)} />
      )}
    </div>
  );
};

export default ConvertCrypto;
