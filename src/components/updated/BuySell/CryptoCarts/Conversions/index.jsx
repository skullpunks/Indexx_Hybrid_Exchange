import { makeStyles } from '@mui/styles';
import React from 'react';
import ConversionCards from './Card';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '50px auto',
    gap: '24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const Conversion = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ConversionCards heading={'INEX to USD'} type="inextousdt" />
      <ConversionCards heading={'USD to INEX'} type="usdtoinex" />
    </div>
  );
};

export default Conversion;
