import { useTheme } from '@mui/material/styles';
import React from 'react';

import CreatePassword from '../../../components/updated/authentication/signup/CreatePassword';
const CreatePasswordPage = () => {
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
      <CreatePassword />
    </div>
  );
};

export default CreatePasswordPage;
