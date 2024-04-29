import React from 'react';
import { useLocation } from 'react-router-dom';
import PowerPackHeader from './components/PowerPack/PowerPackHeader/PowerPackHeader';

const SecondaryHeader = () => {
  let location = useLocation();
  console.log(location, 'path');
  if (
    location.pathname === '/indexx-exchange/power-hive/honey-bee-selection' ||
    location.pathname === '/indexx-exchange/power-hive/captain-bee-selection' ||
    location.pathname === '/indexx-exchange/power-hive' ||
    location.pathname === '/indexx-exchange/captain-bee/power-pack' ||
    location.pathname === '/indexx-exchange/captain-bee/crypto-pack' ||
    location.pathname === '/indexx-exchange/honey-bee/action-pack' ||
    location.pathname === '/indexx-exchange/honey-bee/token-pack'
  )
    return null;
  return (
    <div>
      {!location.pathname.includes('login') &&
      !location.pathname.includes('elite-learn') &&
      !location.pathname.includes('dashboard') &&
      !(location.pathname === '/indexx-exchange/buy-sell') &&
      !(location.pathname === '/') &&
      !location.pathname.includes('get-started') &&
      !(
        (localStorage.getItem('access_token') === undefined ||
          localStorage.getItem('access_token') === null) &&
        location.pathname === '/'
      ) ? (
        <PowerPackHeader />
      ) : null}
    </div>
  );
};

export default SecondaryHeader;
