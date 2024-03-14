import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const AdvancedRealTimeChartComponent = ({ coin }) => {
  const [size, setSize] = useState({ width: 870, height: 500 });
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  ); // default theme from localStorage

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 560px)').matches) {
        setSize({ width: 350, height: 490 });
      } else if (window.matchMedia('(max-width: 990px)').matches) {
        setSize({ width: 450, height: 690 });
      } else {
        setSize({ width: 900, height: 655 });
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
    // If the coin is a known stock symbol, return it as is. Otherwise, append 'USD'.
    return STOCK_SYMBOLS.includes(coin.toUpperCase()) ? coin : `${coin}USD`;
  };

  return (
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none overflow-x-hidden">
      <AdvancedRealTimeChart
        //style={{ display: 'block' }}
        style={'1'}
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
  );
};

export default AdvancedRealTimeChartComponent;
