import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  AdvancedRealTimeChart,
  TickerTape,
  TechnicalAnalysis,
  CryptoCurrencyMarket,
  CryptoCoinsHeatmap,
} from 'react-ts-tradingview-widgets';
import IconicHeader from '../../components/updated/shared/IconicHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    position: 'relative',
    zIndex: 0,
    overflowY: 'auto',
    outline: 'none',
    overflowX: 'hidden',
    marginTop: '100px',
  },
  tickerContainer: {
    marginTop: 50,
    pointerEvents: 'none',
  },
  widgetContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  chartSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    minHeight: 780,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  chart: {
    flex: 3,
    minHeight: '700px',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'space-between',
    '&>div': {
      flex: 1,
    },
    [theme.breakpoints.down('md')]: {
      '&>div': {
        height: '500px',
      },
    },
  },
  heatmapSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    minHeight: '100vh',
  },
}));

const NewAdvancedRealTimeChartComponent = ({ coin }) => {
  const classes = useStyles();
  const [size, setSize] = useState({ width: 1200, height: 800 }); // Larger chart size
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  ); // Default theme from localStorage

  const [selectedTab, setSelectedTab] = useState('Markets');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 560px)').matches) {
        setSize({ width: 350, height: 490 });
      } else if (window.matchMedia('(max-width: 990px)').matches) {
        setSize({ width: 450, height: 690 });
      } else {
        setSize({ width: 1200, height: 800 }); // Adjusted size for larger screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getSymbol = (coin) => {
    return `${coin.toUpperCase()}USDT`;
  };

  return (
    <div className={classes.root}>
      {/* Ticker Tape */}
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <div className={classes.tickerContainer}>
        <TickerTape
          colorTheme={theme}
          symbols={[
            { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
            { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
            { proName: 'BINANCE:BNBUSDT', title: 'Binance Coin' },
            { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
            { proName: 'BINANCE:LINKUSDT', title: 'Chainlink' },
            { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
            { proName: 'BINANCE:ADAUSDT', title: 'Cardano' },
            { proName: 'BINANCE:DOGEUSDT', title: 'Dogecoin' },
            { proName: 'BINANCE:DOTUSDT', title: 'Polkadot' },
            { proName: 'NASDAQ:AMZN', title: 'Amazon' },
            { proName: 'NASDAQ:AAPL', title: 'Apple' },
            { proName: 'NASDAQ:GOOGL', title: 'Google' },
            { proName: 'NASDAQ:META', title: 'Meta' },
            { proName: 'NASDAQ:TSLA', title: 'Tesla' },
          ]}
        />
      </div>

      {/* Flex container for widgets */}
      <div className={classes.widgetContainer}>
        {/* Chart Section */}
        <div className={classes.chartSection}>
          <div className={classes.chart}>
            <AdvancedRealTimeChart
              toolbar_bg={'#f1f3f6'}
              symbol={getSymbol(coin)}
              width={'auto'}
              height={'820'}
              theme={theme}
              allow_symbol_change={false}
              settings={true}
            />
          </div>

          {/* Right section: Additional widgets */}
          <div className={classes.rightSection}>
            <div>
              <TechnicalAnalysis
                colorTheme={theme}
                symbol={`BINANCE:${coin.toUpperCase()}USDT`}
                width={'auto'}
                height={'381'}
                interval="1D"
                showIntervalTabs={true}
              />
            </div>
            <div>
              <CryptoCurrencyMarket
                colorTheme={theme}
                width={'auto'}
                height={'382'}
              />
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className={classes.heatmapSection}>
          <CryptoCoinsHeatmap colorTheme={theme} width="auto" height="800" />
        </div>
      </div>
    </div>
  );
};

export default NewAdvancedRealTimeChartComponent;
