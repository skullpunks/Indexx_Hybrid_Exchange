import React, { useEffect } from 'react';

import Check from '../../../../../assets/authentication/Check';

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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
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

const CreatePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [passwordCriteria, setPasswordCriteria] = React.useState({
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values: ', values);
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

  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Create Password</h3>
      <div style={{ margin: '15px auto' }}>
        <InputField
          label={'Password'}
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.errors.password}
        />
      </div>

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

      <GenericButton text={'Next'} onClick={formik.handleSubmit} />
    </div>
  );
};

export default CreatePassword;
