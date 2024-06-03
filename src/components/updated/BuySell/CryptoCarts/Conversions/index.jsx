import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import ConversionCards from './Card';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '0px auto 100px auto',
    gap: '24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const Conversion = ({ receiveToken = 'INEX' }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log('Selected receiveToken:', receiveToken);
    // Perform necessary operations with receiveToken
  }, [receiveToken]);

  return (
    <div className={classes.container}>
      <ConversionCards heading={`${receiveToken} to USD`} type="inextousdt" receiveToken={receiveToken}/>
      <ConversionCards heading={`USD to ${receiveToken}`} type="usdtoinex" receiveToken={receiveToken}/>
    </div>
  );
};

export default Conversion;
