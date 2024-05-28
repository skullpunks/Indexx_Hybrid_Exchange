import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getCoinPriceByName } from '../../../../../services/api';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    borderRadius: '16px',
    padding: '24px',
    textalign: 'left',
    border: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: '24px',
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '16px',
    fontWeight: 600,
    textAlign: 'left',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    padding: '16px 0',
    color: `${theme.palette.text.primary} !important`,
  },
}));

const ConversionCards = ({ heading, type }) => {
  const classes = useStyles();
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await getCoinPriceByName('INEX');
      if (response.status === 200) {
        setPrice(response.data.results.data);
      } else {
        console.error('Error fetching price:', response);
      }
      setLoading(false);
    };

    fetchPrice();
  }, []);

  if (loading) {
    return (
      <Box className={classes.container}>
        <h3 className={classes.heading}>{heading}</h3>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const inexTousdt = [
    ['0.5 INEX', `${(0.5 * price).toFixed(2)} USD`],
    ['1 INEX', `${price.toFixed(2)} USD`],
    ['2 INEX', `${(2 * price).toFixed(2)} USD`],
    ['5 INEX', `${(5 * price).toFixed(2)} USD`],
    ['10 INEX', `${(10 * price).toFixed(2)} USD`],
    ['20 INEX', `${(20 * price).toFixed(2)} USD`],
  ];

  const usdtToinex = [
    [`${price.toFixed(2)} USD`, '1 INEX'],
    [`${(2 * price).toFixed(2)} USD`, '2 INEX'],
    [`${(5 * price).toFixed(2)} USD`, '5 INEX'],
    [`${(10 * price).toFixed(2)} USD`, '10 INEX'],
    [`${(20 * price).toFixed(2)} USD`, '20 INEX'],
    [`${(50 * price).toFixed(2)} USD`, '50 INEX'],
  ];

  const typeConversion = type === 'inextousdt' ? inexTousdt : usdtToinex;

  return (
    <Box className={classes.container}>
      <h3 className={classes.heading}>{heading}</h3>
      {typeConversion.map((el, index) => (
        <Box className={classes.content} key={index}>
          <Typography>{el[0]}</Typography>
          <Typography>{el[1]}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ConversionCards;
