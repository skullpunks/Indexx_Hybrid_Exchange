import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import inex from '../../../../assets/updated/buySell/INEX-sm.svg';
import { getCoinPriceByName } from '../../../../services/api';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    borderRadius: '16px',
    margin: '50px 0px',
  },
  heading: {
    fontSize: '40px',
    color: `${theme.palette.text.primary} !important`,
    fontWeight: 600,
    textAlign: 'left',
  },
  subHeading: {
    fontSize: '16px',
    color: `${theme.palette.text.secondary} !important`,
    marginTop: '8px',
    textAlign: 'left',
  },
  gridContainer: {
    display: 'grid',
    gridGap: '16px',
    marginTop: '24px',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    },
  },
  gridItem: {
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
  },
  coinInfo: {
    '& h4': {
      fontSize: '16px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
    '& p': {
      fontSize: '16px',
      fontWeight: '400',
    },
  },
}));

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Brazilian Real' },
];

const PopularConversion = () => {
  const classes = useStyles();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const inexPriceInUSD = await getInexPriceInUSD();
      const exchangeRates = await getExchangeRates();
      
      const fetchedPrices = currencies.map(currency => ({
        ...currency,
        price: (inexPriceInUSD * exchangeRates[currency.code]).toFixed(2),
        logo: getCurrencyLogo(currency.code),
      }));
      
      setPrices(fetchedPrices);
    };

    fetchPrices();
  }, []);

  return (
    <Box className={classes.container}>
      <h2 className={classes.heading}>Popular INEX Conversions</h2>
      <h3 className={classes.subHeading}>
        A selection of other popular currency conversions of INEX to various
        fiat currencies.
      </h3>
      <Box className={classes.gridContainer}>
        {prices.map(currency => (
          <Box key={currency.code} className={classes.gridItem}>
            <div className={classes.coinInfo}>
              <h4>{`INEX to ${currency.code}`}</h4>
              <p>{`1 INEX = ${currency.price} ${currency.code}`}</p>
            </div>
            <div>
              <AvatarGroup max={2}>
                <Avatar alt="INEX" src={inex} />
                <Avatar alt={currency.name} src={currency.logo} />
              </AvatarGroup>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PopularConversion;

const getInexPriceInUSD = async () => {
  const res = await getCoinPriceByName(String("INEX"));
  let priceData = res.data.results.data;
  console.log('priceData', priceData);
  return priceData; // Example price
};

const getExchangeRates = async () => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data.rates;
};

const getCurrencyLogo = (currencyCode) => {
  return `https://wise.com/public-resources/assets/flags/rectangle/${currencyCode.toLowerCase()}.png`;
};
