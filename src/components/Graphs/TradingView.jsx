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

  const getSymbol = (coin) => {
    return coin + 'USD'; // Example: 'BTC' becomes 'BTCUSD'
  };

  return (
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <AdvancedRealTimeChart
        style={{ display: 'block' }}
        symbol={getSymbol(coin)}
        autosize={false}
        theme={theme}
        width={size.width}
        height={size.height + 35}
      />
    </div>
  );
};

export default AdvancedRealTimeChartComponent;
