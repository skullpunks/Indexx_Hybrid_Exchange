import React from 'react';
// import ResetPassword from '../../../components/updated/authentication/resetPassowordEmailConfirm';
import { useTheme } from '@mui/material/styles';
import ResetPassword from '../../../components/updated/authentication/resetPassowordNewPassword';

const ResetPass = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',

        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <ResetPassword />
      {/* <ResetPassword /> */}
    </div>
  );
};

export default ResetPass;
