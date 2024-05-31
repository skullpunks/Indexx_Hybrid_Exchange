import { useTheme } from '@mui/material/styles';
import React from 'react';

import CreatePassword from '../../../components/updated/authentication/signup/CreatePassword';
import { useLocation } from 'react-router-dom';
const CreatePasswordPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const { email } = location.state || '';
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
      <CreatePassword email={email}/>
    </div>
  );
};

export default CreatePasswordPage;
