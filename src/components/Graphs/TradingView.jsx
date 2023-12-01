import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const AdvancedRealTimeChartComponent = (coin) => {
  const [size, setSize] = useState({ width: 870, height: 500 });

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 560px)').matches) {
        setSize({ width: 250, height: 250 });
      } else {
        setSize({ width: 900, height: 650 });
      }
    };

    // Call the function initially
    handleResize();

    // Set up event listener for resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSymbol = (coin) => {
    console.log(coin);
    // Add logic here if you have specific symbol mappings
    return coin.coin + 'USD'; // Example: 'BTC' becomes 'BTCUSD'
  };

  return (
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <AdvancedRealTimeChart
        style={{ display: 'block' }}
        symbol={getSymbol(coin)}
        autosize={false}
        theme={'light'}
        width={size.width}
        height={size.height}
      />
    </div>
  );
};

export default AdvancedRealTimeChartComponent;
