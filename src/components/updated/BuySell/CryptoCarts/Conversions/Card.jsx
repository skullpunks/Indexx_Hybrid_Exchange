import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  const inexTousdt = [
    ['0.5 INEX', '30,558.07 USD'],
    ['0.5 INEX', '30,558.07 USD'],
    ['0.5 INEX', '30,558.07 USD'],
    ['0.5 INEX', '30,558.07 USD'],
    ['0.5 INEX', '30,558.07 USD'],
    ['0.5 INEX', '30,558.07 USD'],
  ];

  const usdtToinex = [
    ['30,558.07 USD', '0.5 INEX'],
    ['30,558.07 USD', '0.5 INEX'],
    ['30,558.07 USD', '0.5 INEX'],
    ['30,558.07 USD', '0.5 INEX'],
    ['30,558.07 USD', '0.5 INEX'],
    ['30,558.07 USD', '0.5 INEX'],
  ];
  const typeConversion = type === 'inextousdt' ? inexTousdt : usdtToinex;
  return (
    <Box className={classes.container}>
      <h3 className={classes.heading}>{heading}</h3>
      {typeConversion.map((el) => (
        <Box className={classes.content}>
          <Typography>{el[0]}</Typography>
          <Typography>{el[1]}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ConversionCards;
