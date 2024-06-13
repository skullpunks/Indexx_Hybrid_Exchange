import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import SignUpEmailVerification from '../../../components/updated/authentication/signup/SignupEmailVerification';

const SignUpEmailVerificationPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const { email } = location.state || '';
  console.log("SignUpEmailVerificationPage email", email)
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
      <SignUpEmailVerification email={email}/>
    </div>
  );
};

export default SignUpEmailVerificationPage;
