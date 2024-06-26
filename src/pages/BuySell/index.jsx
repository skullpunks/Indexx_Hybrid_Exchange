import React, { useEffect } from 'react';
import BuySell from '../../components/updated/BuySell';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const BuySellPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('buyToken')) {
      searchParams.set('buyToken', 'INEX');
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      }, { replace: true });
    }
  }, [location, navigate]);

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