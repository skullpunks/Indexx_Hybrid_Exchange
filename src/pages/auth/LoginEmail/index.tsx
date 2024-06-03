import { useTheme } from '@mui/material/styles';
import React from 'react';
import LoginComponent from '../../../components/updated/authentication/loginEmail';

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
    </div>
  );
};

export default Login;
