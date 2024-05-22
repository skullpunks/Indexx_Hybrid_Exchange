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
} from '../../../../services/api';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { useNavigate } from 'react-router-dom';
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
    setPassword(value);
  };

  const handleEmailCheck = async () => {
    setLoadings(true);
    const res = await checkByemail(email);
    console.log('res', res);
    if (res.userType === 'HoneyBee' || res.userType === 'Indexx Exchange') {
      let res1 = await loginAPI(email, password);
      console.log('res', res1);

      if (res1.status === 200) {
        setLoadings(false);
        //OpenNotification('success', 'Login Successful');
        alert('Login Successful');
        let resObj = await decodeJWT(res.data.access_token);

        debugger;
        localStorage.setItem('user', resObj?.email);
        const userKey = cryptr.encrypt(password);
        localStorage.setItem('userkey', userKey);
        localStorage.setItem('userpass', password);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('username', resObj?.username);
        localStorage.setItem('userlogged', 'captain');
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
        alert(res.data.message);
      }
    } else if (res.userType === 'CaptainBee') {
      let res2 = await loginHive(email, password);
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
        let redirectUrl = window.localStorage.getItem('redirect');
        window.localStorage.removeItem('redirect');
        let userDetails = await getUserDetails(resObj?.email);

        redirectUrl
          ? navigate(redirectUrl)
          : (window.location.href = '/indexx-exchange/buy-sell'); // navigate("/indexx-exchange/buy-sell")
      } else {
        setLoadings(false);
        OpenNotification('error', res.data);
      }
    }
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
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <GenericButton
        text={loadings ? 'Loading...' : 'Next'}
        onClick={handleEmailCheck}
        loading={loadings}
      />

      <div style={{ margin: '10px auto' }}></div>

      <GenericButton text={'Forgot password?'} className={classes.createLink} />
    </div>
  );
};

export default LoginPassword;
