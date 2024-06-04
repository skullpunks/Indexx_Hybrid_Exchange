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

const ConversionCards = ({ heading, type, receiveToken = "INEX" }) => {
  const classes = useStyles();
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      let response;
      try {
        response = await getCoinPriceByName(receiveToken || 'INEX');
        if (response.status === 200) {
          setPrice(response.data.results.data);
        } else {
          console.error('Error fetching price:', response);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
      setLoading(false);
    };

    fetchPrice();
  }, [receiveToken]);

  if (loading) {
    return (
      <Box className={classes.container}>
        <h3 className={classes.heading}>{heading}</h3>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const formatPrice = (value) => (value < 1 ? value.toFixed(6) : value.toFixed(2));

 const inexTousdt = [
    [`0.5 ${receiveToken}`, `${formatPrice(0.5 * price)} USD`],
    [`1 ${receiveToken}`, `${formatPrice(price)} USD`],
    [`2 ${receiveToken}`, `${formatPrice(2 * price)} USD`],
    [`5 ${receiveToken}`, `${formatPrice(5 * price)} USD`],
    [`10 ${receiveToken}`, `${formatPrice(10 * price)} USD`],
    [`20 ${receiveToken}`, `${formatPrice(20 * price)} USD`],
  ];

  const usdtToinex = [
    [`${formatPrice(price)} USD`, `1 ${receiveToken}`],
    [`${formatPrice(2 * price)} USD`, `2 ${receiveToken}`],
    [`${formatPrice(5 * price)} USD`, `5 ${receiveToken}`],
    [`${formatPrice(10 * price)} USD`, `10 ${receiveToken}`],
    [`${formatPrice(20 * price)} USD`, `20 ${receiveToken}`],
    [`${formatPrice(50 * price)} USD`, `50 ${receiveToken}`],
  ];
  console.log("receiveToken", receiveToken)

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
