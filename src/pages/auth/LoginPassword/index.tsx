import { useTheme } from '@mui/material/styles';
import React from 'react';
import LoginPasswordComponent from '../../../components/updated/authentication/loginPassword';
import Popup from '../../../components/updated/shared/Popup';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('email') || ''

  console.log("I am in login password location.state", location.state);
  console.log("I am here", email);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <LoginPasswordComponent email={email} />
      {/* <Popup /> */}
    </div>
  );
};

export default Login;
