import React, { useState, useEffect } from 'react';
import {
  AdvancedRealTimeChart,
  TickerTape,
  TechnicalAnalysis,
} from 'react-ts-tradingview-widgets';

const NewAdvancedRealTimeChartComponent = ({ coin }) => {
  const [size, setSize] = useState({ width: 1000, height: 600 }); // Increased chart width and set height
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  ); // default theme from localStorage

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 560px)').matches) {
        setSize({ width: 350, height: 490 });
      } else if (window.matchMedia('(max-width: 990px)').matches) {
        setSize({ width: 450, height: 690 });
      } else {
        setSize({ width: 1000, height: 700 }); // Adjusted chart size for larger screens
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

  const STOCK_SYMBOLS = [
    'AMZN',
    'AAPL',
    'AVGO',
    'GOOGL',
    'META',
    'MSFT',
    'NVDA',
    'PEP',
    'SNP500',
    'TSLA',
  ];

  const getSymbol = (coin) => {
    return STOCK_SYMBOLS.includes(coin.toUpperCase()) ? coin : `${coin}USD`;
  };

  // Modify this function to correctly format symbols for Technical Analysis Widget
  const getSymbolForTAnalysis = (coin) => {
    if (STOCK_SYMBOLS.includes(coin.toUpperCase())) {
      return `NASDAQ:${coin}`; // Stock symbols prefixed with NASDAQ for US stocks
    }
    return `BINANCE:${coin.toUpperCase()}USDT`; // Cryptocurrency symbols prefixed with BINANCE
  };

  return (
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none overflow-x-hidden">
      {/* TickerTape for a better visual effect */}
      <div style={{ marginTop: '100px', pointerEvents: 'none' }}>
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

      <br />

      <div>
          <AdvancedRealTimeChart
            toolbar_bg={'#f1f3f6'}
            symbol={getSymbol(coin)}
            autosize={false}
            theme={theme}
            width={size.width} 
            height={size.height} 
            allow_symbol_change={false}
            settings={true}
          />
        </div>

      {/* Flex container for the chart and technical analysis widget */}
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px', 
          marginTop: '20px',
        }}
      >
        <div style={{ flex: 3, marginRight: '20px' }}>
          <AdvancedRealTimeChart
            toolbar_bg={'#f1f3f6'}
            symbol={getSymbol(coin)}
            autosize={false}
            theme={theme}
            width={size.width} 
            height={size.height} 
            allow_symbol_change={false}
            settings={true}
          />
        </div>

        <div style={{ flex: 1 }}>
          <TechnicalAnalysis
            colorTheme={theme}
            width={size.width / 3} 
            height={size.height} 
            symbol={getSymbolForTAnalysis(coin)}
            interval="1D"
            isTransparent={false}
            showIntervalTabs={true}
          />
        </div>
      </div> */}
    </div>
  );
};

export default NewAdvancedRealTimeChartComponent;
