import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import Check from '../../../../assets/authentication/Check';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../../../../services/api';
import Popup from '../../shared/Popup';

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
  },
  leftEmpty: {
    flexBasis: '20%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightContainer: {
    flexBasis: '80%',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  rightContentContainer: {
    [theme.breakpoints.down('md')]: {},
    maxWidth: '384px',
    '& h3': {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
    },
    '& .infoWindow': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '13px',
      fontWeight: 400,
      background:
        theme.palette.mode === 'light' ? '#EAECEF' : '#163b2f !important',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '25px',
    },
  },
  conditionRoot: {
    margin: '20px 0px',
  },
  conditionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '15px',
    '& p': {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
}));

const ResetPassword = ({ email }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loadings, setLoadings] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
  });

  console.log('Email in resetPassword full', email);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadings(true);
      console.log('values: ', values);
      await onFinish(values);
    },
  });

  useEffect(() => {
    const password = formik.values.password;
    setPasswordCriteria({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
    });
  }, [formik.values.password]);

  const onFinish = async (values) => {
    await resetPassword(String(email), values.password).then((res) => {
      if (res.status === 200) {
        setLoadings(false);
        setShowPopup(true);
      } else {
        setLoadings(false);
        alert('Failed to reset the password');
      }
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/auth/login');
  };

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <Link
          className={classes.link}
          to={{
            pathname: '/auth/login-password',
            state: { email: email },
          }}
        >
          &lt; Back
        </Link>
      </div>
      <div className={classes.contentContent}>
        <div className={classes.leftEmpty}></div>
        <div className={classes.rightContainer}>
          <div className={classes.rightContentContainer}>
            <h3>Reset Password</h3>
            <div className="infoWindow">
              In order to protect your account, withdrawals, payment services
              will be disabled for 24 hours after you change your password.
            </div>
            <InputField
              label={'New Password'}
              type="password"
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.errors.password}
            />
            <div className={classes.conditionRoot}>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    passwordCriteria.minLength
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: passwordCriteria.minLength
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 8 characters
                </p>
              </div>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    passwordCriteria.hasNumber
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: passwordCriteria.hasNumber
                      ? `${theme.palette.primary.main}`
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 1 number
                </p>
              </div>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    passwordCriteria.hasUpperCase
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: passwordCriteria.hasUpperCase
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 1 upper case letter
                </p>
              </div>
            </div>
            <div style={{ margin: '15px' }}></div>
            <InputField
              label={'Confirm Password'}
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              helperText={formik.errors.confirmPassword}
            />
            <div style={{ margin: '25px 0px' }}></div>
            <GenericButton
              text={'Submit'}
              onClick={formik.handleSubmit}
              loading={loadings}
            />
          </div>
        </div>
      </div>
      {showPopup && <Popup onClose={handlePopupClose} />}
    </div>
  );
};

export default ResetPassword;
