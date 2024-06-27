import React, { useState } from 'react';
import ResetPasswordEmailConfirm from '../../../components/updated/authentication/resetPassowordEmailConfirm';
import { useTheme } from '@mui/material/styles';
import ResetPassword from '../../../components/updated/authentication/resetPassowordNewPassword';
import { useLocation } from 'react-router-dom';

const ResetPass = () => {
  const theme = useTheme();
  const location = useLocation();
  const { email } = location.state || '';
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {isOtpVerified ? (
        <ResetPassword email={email} />
      ) : (
        <ResetPasswordEmailConfirm
          email={email}
          onOtpVerified={() => setIsOtpVerified(true)}
        />
      )}
    </div>
  );
};

export default ResetPass;
