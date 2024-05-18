import { useTheme } from '@mui/material/styles';
import React from 'react';
import LoginComponent from '../../../components/updated/authentication/loginPassword';
import Popup from '../../../components/updated/shared/Popup';

const Login = () => {
  const theme = useTheme();
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
      <LoginComponent />
      <Popup />
    </div>
  );
};

export default Login;
