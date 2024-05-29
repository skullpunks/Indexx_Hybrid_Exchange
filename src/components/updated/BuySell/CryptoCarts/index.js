import React, { useEffect, useState } from 'react';
import Conversion from './Conversions';
import { makeStyles } from '@mui/styles';
import TradingViewChart from './TradingViewCart';
import { getCryptoHistoricalData } from './ChartData/getChartData';
import DurationTabs from './RangeSwitcher';
import ChartHeader from './ChartHeader';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '50px auto 24px auto',
    gap: '24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  Mainheading: {
    width: '100%',
    margin: '100px 0px 30px 0px !important',
    fontSize: '40px !important',
    fontWeight: '600 !important',
    color: `${theme.palette.text.primary} !important`,
  },

  cardContainer: {
    width: '100%',
    borderRadius: '16px',
    padding: '20px',
    textalign: 'left',
    border: `1px solid ${theme.palette.divider}`,
    height: '532px',

    // backgroundColor: theme.palette.background.paper,
  },
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
}));

const CryptoCarts = () => {
  const classes = useStyles();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoHistoricalData('bitcoin');
      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className={classes.Mainheading}>INEX Markets</h3>
      <div className={classes.container}>
        <div
          className={classes.cardContainer}
          style={{ border: 'none', padding: 0 }}
        >
          <ChartHeader />
          <DurationTabs />
          <TradingViewChart data={chartData} />
        </div>
        <div className={classes.cardContainer}>
          <div style={{ height: '100%', overflowY: 'auto' }}>
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
                <p className={classes.heading}>#3</p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>Market Cap</h2>
                <p className={classes.heading}>$111.94B</p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>Volume</h2>
                <p className={classes.heading}>$52.26B</p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>Circulation Supply</h2>
                <p className={classes.heading}>111.94B</p>
              </div>
            </div>
            <p className={classes.secondaryHeading}>
              Tether USDt is experiencing a decline in value this week.
              Currently, Tether USDt is priced at $0.9999988 per USDT, with a
              circulating supply of 111.94B USDT, resulting in a total market
              capitalisation of $111.94B.
            </p>
            <p className={classes.secondaryHeading}>
              Over the past 24 hours, the trading volume for Tether USDt has
              increased by $-2,425,573,942,181.26, representing a -46.417% rise.
              Moreover, USDT worth $52.26B has been traded in the last day.
            </p>
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
                <h2 className={classes.secondaryHeading}>
                  7 days exchange rate
                </h2>
                <p className={`${classes.heading} ${classes.redText}`}>
                  -0.04%
                </p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>
                  24-hour exchange rate
                </h2>
                <p className={`${classes.heading} ${classes.greenText}`}>
                  +0.08%
                </p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>
                  1 month exchange rate
                </h2>
                <p className={`${classes.heading} ${classes.greenText}`}>
                  +0.05%
                </p>
              </div>
              <div>
                <h2 className={classes.secondaryHeading}>
                  3 month exchange rate
                </h2>
                <p className={`${classes.heading} ${classes.greenText}`}>
                  +0.01%
                </p>
              </div>
            </div>
            <p className={classes.secondaryHeading}>
              Tether USDt's exchange rate is experiencing a decline.
            </p>
            <p className={classes.secondaryHeading}>
              Currently, the value of 1 USDT is 1.0000252 USD, indicating that
              purchasing 5 USDT would cost 5.0001259 USD. Conversely, 1.00 USD
              can be exchanged for 0.9999748 USDT, and 50.00 USD can be
              exchanged for 50.00 USDT, exclusive of platform or gas fees.
            </p>
          </div>
        </div>
      </div>
      <Conversion />
    </div>
  );
};

export default CryptoCarts;
