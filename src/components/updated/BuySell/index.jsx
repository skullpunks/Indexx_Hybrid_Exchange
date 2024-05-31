import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
import BuyCrypto from './BuyCrypto';
import CryptoCarts from './CryptoCarts';
import Conversion from './CryptoCarts/Conversions';
import HowToBuyCrypto from './HowToBuyCrypto';
import PopularConversion from './PopularConversion';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1248px',
    width: '100%',
    margin: '50px auto',
    padding: '24px',
  },
}));

const BuySell = () => {
  const classes = useStyles();
  const [receiveToken, setReceiveToken] = useState('');
  const [selectedTab, setSelectedTab] = useState('Tokens');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleReceiveTokenChange = (token) => {
    setReceiveToken(token);
  };

  return (
    <div className={classes.Container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <BuyCrypto
        tokenType={selectedTab}
        onReceiveTokenChange={handleReceiveTokenChange}
      />
      <HowToBuyCrypto tokenType={selectedTab} receiveToken={receiveToken} />
      <CryptoCarts receiveToken={receiveToken}/>
      <PopularConversion receiveToken={receiveToken}/>
    </div>
  );
};

export default BuySell;
