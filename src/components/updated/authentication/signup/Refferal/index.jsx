import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import InputField from '../../../shared/TextField';
import GenericButton from '../../../shared/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../../assets/authentication/lightMode_logo.svg';
import googleLogo from '../../../../../assets/authentication/logogoogle.svg';
import appleLogo from '../../../../../assets/authentication/ios.svg';
import iosDark from '../../../../../assets/authentication/ios-dark.svg';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { signupAPI } from '../../../../../services/api';

const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '30px',
    },
  },
  socialButton: {
    background: 'none !important',
    border: `1px solid ${theme.palette.divider} !important`,
    margin: '10px 0px !important',
    color: `${theme.palette.text.primary} !important`,
  },
  loginText: {
    fontSize: '32px',
    fontWeight: 600,
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
  },
  logoText: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  createLink: {
    color: `${theme.palette.primary.main} !important`,
    background: `${theme.palette.background.default} !important`,
  },
  messageText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
  successText: {
    color: theme.palette.success.main,
    marginTop: '8px',
  },
}));

const Refferal = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [loadings, setLoadings] = React.useState(false);
  const [message, setMessage] = useState('');
  const { email, password } = location.state || '';

  const isPhoneNo = /^\d+$/.test(email);

  const validationSchema = Yup.object().shape({
    referralId: Yup.string().optional(),
    emailId: Yup.string()
      .email('Invalid email address')
      .when('isPhoneNo', {
        is: (isPhoneNo) => !isPhoneNo,
        then: (schema) => schema.required('Email is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    marketingUpdates: Yup.boolean().required(
      'You must accept marketing updates to proceed'
    ),
  });

  const formik = useFormik({
    initialValues: {
      referralId: '',
      emailId: '',
      marketingUpdates: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadings(true);
      const res = await signupAPI(email, password, '', values.referralId);
      if (res.status === 200) {
        setLoadings(false);
        setMessage('Successfully registered');
        window.dispatchEvent(new Event('storage'));
        navigate('/auth/login', {
          state: { email: email, password: values.password },
        });
      } else {
        setLoadings(false);
        setMessage(res.data);
      }
    },
  });

  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Set up your account</h3>
      <h4>Your account has been created successfully. Set it up now</h4>

      {isPhoneNo && (
        <div style={{ margin: '0px auto 15px auto' }}>
          <InputField
            label={'Email ID '}
            type="text"
            {...formik.getFieldProps('emailId')}
            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
            helperText={formik.touched.emailId && formik.errors.emailId}
          />
        </div>
      )}

      <div style={{ margin: '0px auto 15px auto' }}>
        <InputField
          label={'Referral ID (Optional)'}
          type="text"
          {...formik.getFieldProps('referralId')}
          error={formik.touched.referralId && Boolean(formik.errors.referralId)}
          helperText={formik.touched.referralId && formik.errors.referralId}
        />
      </div>
      <FormControlLabel
        value="start"
        sx={{
          marginLeft: '0px',
          color: theme.palette.text.primary,
          marginBottom: '30px',
          marginTop: '20px',
        }}
        control={
          <Switch
            color="primary"
            {...formik.getFieldProps('marketingUpdates')}
            checked={formik.values.marketingUpdates}
          />
        }
        label="I agree to receive marketing updates from Indexx about rewards and special offers"
        labelPlacement="start"
      />
      {formik.touched.marketingUpdates && formik.errors.marketingUpdates && (
        <Typography color="error" variant="caption">
          {formik.errors.marketingUpdates}
        </Typography>
      )}

      {message && (
        <Typography
          className={
            message.includes('Successfully')
              ? classes.successText
              : classes.messageText
          }
          variant="caption"
        >
          {message}
        </Typography>
      )}

      <GenericButton
        text={'Next'}
        onClick={formik.handleSubmit}
        loading={loadings}
      />
      <div style={{ margin: '10px auto' }}></div>
    </div>
  );
};

export default Refferal;
