import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '24px',
    fontWeight: 500,
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '10px',
  },
  secondaryHeading: {
    fontSize: '16px',
    marginBottom: '8px',
    fontWeight: 400,
    color: `${theme.palette.text.secondary} !important`,
  },
  greenText: {
    color: `${theme.palette.primary.main} !important`,
  },
  redText: {
    color: 'red !important',
  },
  contentContainer: {
    height: '100%',
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
}));

const ChartDetail = ({ chartData }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentContainer}>
      <h1 className={classes.heading}>Markets</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <div>
          <h2 className={classes.secondaryHeading}>Popularity</h2>
          <p className={classes.heading}>{chartData.popularity}</p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>Market Cap</h2>
          <p className={classes.heading}>{chartData.marketCap}</p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>Volume</h2>
          <p className={classes.heading}>{chartData.volume}</p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>Circulation Supply</h2>
          <p className={classes.heading}>{chartData.circulationSupply}</p>
        </div>
      </div>
      <p className={classes.secondaryHeading}>{chartData.text1}</p>
      <p className={classes.secondaryHeading}>{chartData.text2}</p>
      <div style={{ margin: '30px' }}></div>
      <h1 className={classes.heading}>Conversion Tables</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <div>
          <h2 className={classes.secondaryHeading}>7 days exchange rate</h2>
          <p className={`${classes.heading} ${classes.redText}`}>
            {chartData.SevenDaysexchangeRate}
          </p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>24-hour exchange rate</h2>
          <p className={`${classes.heading} ${classes.greenText}`}>
            {chartData.tewentyFourhourExchangeRate}
          </p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>1 month exchange rate</h2>
          <p className={`${classes.heading} ${classes.greenText}`}>
            {chartData.onemonthExchangeRate}
          </p>
        </div>
        <div>
          <h2 className={classes.secondaryHeading}>3 month exchange rate</h2>
          <p className={`${classes.heading} ${classes.greenText}`}>
            {chartData.threemonthExchangeRate}
          </p>
        </div>
      </div>
      <p className={classes.secondaryHeading}>{chartData.text3}</p>
      <p className={classes.secondaryHeading}>{chartData.text4}</p>
    </div>
  );
};

export default ChartDetail;
