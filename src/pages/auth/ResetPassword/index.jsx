import React from 'react';
// import ResetPassword from '../../../components/updated/authentication/resetPassowordEmailConfirm';
import { useTheme } from '@mui/material/styles';
import ResetPassword from '../../../components/updated/authentication/resetPassowordNewPassword';
import { useLocation } from 'react-router-dom';

const ResetPass = () => {
  const theme = useTheme();
  const location = useLocation();
  const { email } = location.state || '';
  console.log("I am in reset location.state", location.state)
  console.log("I am in reset pass", email)
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',

        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <ResetPassword email={email}/>
      {/* <ResetPassword /> */}
    </div>
  );
};

export default ResetPass;
