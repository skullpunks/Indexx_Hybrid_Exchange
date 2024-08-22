import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { useTheme, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InfoCircleFilled } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import OpenNotification from '../OpenNotification/OpenNotification';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import { decodeJWT, loginHive, getUserDetails } from '../../services/api';
import hiveLogo from '../../assets/updated/hiveAuth/hive logo HD.png';
import './BuySellLoginContentHive.css';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const useStyles = makeStyles((theme: any) => ({
  rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '120px',
  },
  Container: {
    border: `1px solid ${theme?.palette?.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '30px 25px',
    maxWidth: '425px',
    width: '100%',
    [theme?.breakpoints?.down('md')]: {
      border: 'none',
      width: '100%',
    },
  },
  socialButton: {
    background: 'none !important',
    border: `1px solid ${theme?.palette?.divider} !important`,
    margin: '10px 0px !important',
    color: `${theme?.palette?.text?.primary} !important`,
  },
  loginText: {
    fontSize: '32px',
    fontWeight: 600,
    color: `${theme?.palette?.text?.primary} !important`,
    marginBottom: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
  },
  logoText: {
    color: `${theme?.palette?.text?.primary} !important`,
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  createLink: {
    color: `${theme?.palette?.primary?.main} !important`,
    background: `${theme?.palette?.background?.default} !important`,
  },
  errorText: {
    color: theme?.palette?.error?.main,
    marginTop: '8px',
  },
  loginButton: {
    background: '#FFB300 !important',
    '&:hover': {
      opacity: '.8',
    },
  },
}));

const BuySellLoginContentHive = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onFinish = async (values: any) => {
    console.log(values.email_or_username, values.password, 'valuesss');
    setLoadings(true);

    let res = await loginHive(values.email_or_username, values.password);

    if (res.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Login Successful');
      let resObj = await decodeJWT(res.data.access_token);

      localStorage.setItem('user', resObj?.email);
      const userKey = cryptr.encrypt(values.password);
      localStorage.setItem('userkey', userKey);
      localStorage.setItem('userpass', values.password);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('userType', resObj?.userType);
      localStorage.setItem('username', resObj?.username);
      localStorage.setItem('userlogged', 'captain');
      let redirectUrl = window.localStorage.getItem('redirect');
      window.localStorage.removeItem('redirect');
      let userDetails = await getUserDetails(resObj?.email);
      window.location.href = '/indexx-exchange/dashboard';
    } else {
      setLoadings(false);
      setErrorMessage(res.data.message);
      OpenNotification('error', res.data.message);
    }
  };

  useEffect(() => {
    async function loginUser() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const userEmail = urlSearchParams.get('useremail');
      const userKey = urlSearchParams.get('userkey');
      const userType = urlSearchParams.get('usertype');

      if (
        userEmail &&
        userKey &&
        userEmail !== undefined &&
        userType !== undefined
      ) {
        let userPassword = String(userKey);
        let res = await loginHive(userEmail, userPassword);

        if (res.status === 200) {
          setLoadings(false);
          OpenNotification('success', 'Login Successful');
          let resObj = await decodeJWT(res.data.access_token);
          localStorage.setItem('userpass', userPassword);
          localStorage.setItem('user', resObj?.email);
          const userKey = cryptr.encrypt(userPassword);
          localStorage.setItem('userkey', userKey);
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('userType', resObj?.userType);
          let redirectUrl = window.localStorage.getItem('redirect');
          window.localStorage.removeItem('redirect');
          let userDetails = await getUserDetails(resObj?.email);

          redirectUrl
            ? navigate(redirectUrl)
            : (window.location.href = '/indexx-exchange/buy-sell');
        } else {
          setLoadings(false);
          setErrorMessage(res.data.message);
          OpenNotification('error', res.data.message);
        }
      }
    }
    loginUser();
  }, []);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.rootContainer}>
      <div className={classes.Container}>
        <div className={classes.logoContainer}>
          <img src={hiveLogo} alt="" width={'40px'} />
          <h2 className={classes.logoText}>Hive Exchange</h2>
        </div>

        <h3 className={classes.loginText}>Captain Bee Log in</h3>
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <div style={{ margin: '10px auto' }}>
            <Form.Item
              label="Email / Username"
              name="email_or_username"
              rules={[
                { required: true, message: 'Email or Username is required' },
              ]}
            >
              <InputField
                placeholder="Email id or Username"
                type="text"
                label={undefined}
                defaultValue={undefined}
                id={undefined}
                startAdornment={undefined}
                endAdornment={undefined}
                className={undefined}
                style={{ margin: '10px 0px 0px ' }}
                helperText={undefined}
                error={undefined}
                secondaryLabel={undefined}
                rows={undefined}
                yellowBorders
              />
            </Form.Item>
          </div>

          <div style={{ margin: '0px auto' }}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <InputField
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <span
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </span>
                  </InputAdornment>
                }
                label={undefined}
                defaultValue={undefined}
                id={undefined}
                startAdornment={undefined}
                className={undefined}
                style={{ margin: '10px 0px' }}
                helperText={undefined}
                error={undefined}
                secondaryLabel={undefined}
                rows={undefined}
                yellowBorders
              />
            </Form.Item>
          </div>

          {errorMessage && <p className={classes.errorText}>{errorMessage}</p>}

          <Form.Item shouldUpdate>
            <GenericButton
              text="Log In"
              loading={loadings}
              type="submit"
              className={classes.loginButton}
              IconComponent={undefined}
              onClick={undefined}
              styles={undefined}
              disabled={undefined}
            />
          </Form.Item>
        </Form>

        <Link
          to="/indexx-exchange/buy-sell/hive-login/forgot-password"
          className="default-link text-underline-forgot"
        >
          Forgot password
        </Link>

        <div style={{ margin: '10px auto' }}></div>
        <Divider>or</Divider>
        <GenericButton
          text="Signup as Captain Bee"
          className={classes.socialButton}
          onClick={() =>
            (window.location.href = 'https://hive.indexx.ai/sign-up')
          }
          IconComponent={undefined}
          styles={undefined}
          disabled={undefined}
          loading={undefined}
        />

        <div style={{ margin: '20px auto' }}></div>

        <GenericButton
          text="Create an Indexx Account"
          className={classes.createLink}
          onClick={() =>
            (window.location.href = 'https://indexx.ai/auth/signup-email')
          }
          IconComponent={undefined}
          styles={undefined}
          disabled={undefined}
          loading={undefined}
        />
      </div>
    </div>
  );
};

export default BuySellLoginContentHive;
