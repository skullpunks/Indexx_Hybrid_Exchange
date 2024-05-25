import { makeStyles } from '@mui/styles';
import React from 'react';
import BuyCrypto from './BuyCrypto';
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

  return (
    <div className={classes.Container}>
      <BuyCrypto />
      <HowToBuyCrypto />
      <Conversion />
      <PopularConversion />
    </div>
  );
};

export default BuySell;
