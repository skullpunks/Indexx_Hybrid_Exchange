import React from 'react';
import MarketsTable from './MarketTable';
import { makeStyles } from '@mui/styles';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1280px',
    width: '100%',
    padding: '20px',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
const Markets = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <MarketsTable title="All Coins" />
        <MarketsTable title="Hot Coins" />
      </div>
      <div className={classes.container}>
        <MarketsTable title="Top Gainers" />
        <MarketsTable title="Top Losers" />
      </div>
      <div className={classes.container}>
        <MarketsTable title="Top Volume" />
        <MarketsTable title="New Listings" />
      </div>
    </div>
  );
};

export default Markets;
