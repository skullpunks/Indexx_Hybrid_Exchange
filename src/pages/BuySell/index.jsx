import React from 'react';
import BuySell from '../../components/updated/BuySell';
import { useTheme } from '@mui/material/styles';
const BuySellPage = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <BuySell />
    </div>
  );
};

export default BuySellPage;
