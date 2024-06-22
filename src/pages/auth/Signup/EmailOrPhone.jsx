import { useTheme } from '@mui/material/styles';
import React from 'react';
import LoginComponent from '../../../components/updated/authentication/loginEmail';
import SignUpEmail from '../../../components/updated/authentication/signup/SignupEmail';

const SignUpEmailPage = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <SignUpEmail />
    </div>
  );
};

export default SignUpEmailPage;
