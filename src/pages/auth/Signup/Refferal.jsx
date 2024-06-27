import { useTheme } from '@mui/material/styles';
import React from 'react';

import Refferal from '../../../components/updated/authentication/signup/Refferal';

const RefferalPage = () => {
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
      <Refferal />
    </div>
  );
};

export default RefferalPage;
