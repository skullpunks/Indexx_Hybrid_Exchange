import { useTheme } from '@mui/material/styles';
import React from 'react';

import SignUpEmailVerification from '../../../components/updated/authentication/signup/SignupEmailVerification';

const SignUpEmailVerificationPage = () => {
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
      <SignUpEmailVerification />
    </div>
  );
};

export default SignUpEmailVerificationPage;
