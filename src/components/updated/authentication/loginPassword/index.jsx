import React from 'react';

import { makeStyles } from '@mui/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../assets/authentication/lightMode_logo.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import {
  checkByemail,
  decodeJWT,
  getUserDetails,
  loginAPI,
  loginHive,
  resetPassword,
} from '../../../../services/api';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
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
}));

const LoginPassword = ({ email }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [loadings, setLoadings] = React.useState(false);

  console.log('email', email);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    console.log('value', value);
    setPassword(value);
  };

  const handleEmailCheck = async (values) => {
    setLoadings(true);
    const res = await checkByemail(email);
    console.log('res', res);
    if (res.userType === 'HoneyBee' || res.userType === 'Indexx Exchange') {
      let res1 = await loginAPI(email, values.password);
      console.log('res', res1);

      if (res1.status === 200) {
        setLoadings(false);
        //OpenNotification('success', 'Login Successful');
        alert('Login Successful');
        let resObj = await decodeJWT(res1.data.access_token);

        debugger;
        localStorage.setItem('user', resObj?.email);
        const userKey = cryptr.encrypt(password);
        localStorage.setItem('userkey', userKey);
        localStorage.setItem('userpass', password);
        localStorage.setItem('access_token', res1.data.access_token);
        localStorage.setItem('refresh_token', res1.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('username', resObj?.username);
        localStorage.setItem(
          'userlogged',
          resObj?.userType === 'Indexx Exchange'
            ? 'normal'
            : resObj?.userType === 'CaptainBee'
            ? 'captain'
            : 'honeyb'
        );

        let redirectUrl = window.localStorage.getItem('redirect');
        window.localStorage.removeItem('redirect');
        let userDetails = await getUserDetails(resObj?.email);

        // Check if there's a saved route in localStorage
        const redirectRoute = localStorage.getItem('redirectRoute');

        if (redirectRoute) {
          // Redirect to the saved route after successful login
          window.location.href = redirectRoute;
        } else {
          redirectUrl
            ? navigate(redirectUrl)
            : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
        }
      } else {
        console.log('I am here');
        setLoadings(false);
        // OpenNotification('error', res.data.message);
        alert(res1.data.message);
      }
    } else if (res.userType === 'CaptainBee') {
      let res2 = await loginHive(email, values.password);
      console.log('res', res2);

      if (res2.status === 200) {
        setLoadings(false);
        //OpenNotification('success', 'Login Successful');
        let resObj = await decodeJWT(res2.data.access_token);
        localStorage.setItem('userpass', password);
        localStorage.setItem('user', resObj?.email);
        const userKey = cryptr.encrypt(password);
        localStorage.setItem('userkey', userKey);
        localStorage.setItem('access_token', res2.data.access_token);
        localStorage.setItem('refresh_token', res2.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem(
          'userlogged',
          resObj?.userType === 'Indexx Exchange'
            ? 'normal'
            : resObj?.userType === 'CaptainBee'
            ? 'captain'
            : 'honeyb'
        );
        let redirectUrl = window.localStorage.getItem('redirect');
        window.localStorage.removeItem('redirect');
        let userDetails = await getUserDetails(resObj?.email);

        redirectUrl
          ? navigate(redirectUrl)
          : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
      } else {
        setLoadings(false);
        alert(res2.data.message);
      }
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values: ', values);
      await handleEmailCheck(values);
    },
  });

  const resetPasswordPage = () => {
    navigate('/auth/reset-password', {
      state: { email: email },
    });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Enter your password</h3>
      <div style={{ margin: '15px auto' }}>
        <InputField
          label={'Password'}
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.errors.password}
          // style={{
          //   borderRadius: 10,
          //   position: 'relative',
          //   backgroundColor: 'none',
          //   border: '1px solid red',
          //   borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
          //   fontSize: 16,
          //   minHeight: '26px',
          //   width: '100%',
          //   padding: '10px 12px',
          //   transition: theme.transitions.create([
          //     'border-color',
          //     'background-color',
          //   ]),
          //   // Use the system font instead of the default Roboto font.

          //   '&:focus': {
          //     borderColor: theme.palette.primary.main,
          //   },
          //   '&:hover': {
          //     borderColor: theme.palette.primary.main,
          //   },

          //   '& .MuiInputBase-input': {
          //     borderRadius: 0,
          //     position: 'relative',
          //     backgroundColor: 'none',
          //     border: 'none !important',
          //     fontSize: 16,
          //     minHeight: '26px',
          //     width: '100%',
          //     padding: '10px 12px',
          //     transition: theme.transitions.create([
          //       'border-color',
          //       'background-color',
          //     ]),
          //     // Use the system font instead of the default Roboto font.
          //   },
          // }}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       aria-label="toggle password visibility"
          //       onClick={handleClickShowPassword}
          //       onMouseDown={handleMouseDownPassword}
          //       edge="end"
          //     >
          //       {showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
        />
      </div>

      <GenericButton
        text={loadings ? 'Loading...' : 'Next'}
        onClick={formik.handleSubmit}
        loading={loadings}
      />

      <div style={{ margin: '10px auto' }}></div>

      <GenericButton
        text={'Forgot password?'}
        className={classes.createLink}
        onClick={resetPasswordPage}
      />
    </div>
  );
};

export default LoginPassword;
