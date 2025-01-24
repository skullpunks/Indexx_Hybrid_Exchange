import React, { useState, useEffect } from 'react';
import {
  AdvancedRealTimeChart,
  TickerTape,
  TechnicalAnalysis,
  CryptoCurrencyMarket,
  EconomicCalendar,
  CryptoCoinsHeatmap,
  SymbolOverview,
  MarketOverview,
} from 'react-ts-tradingview-widgets';

const NewAdvancedRealTimeChartComponent = ({ coin }) => {
  const [size, setSize] = useState({ width: 1200, height: 800 }); // Larger chart size
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  ); // Default theme from localStorage

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
    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none overflow-x-hidden">
      {/* Ticker Tape */}
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

      {/* Flex container for widgets */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        {/* Chart Section */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <div style={{ flex: 3 }}>
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

          {/* Right section: Additional widgets */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              justifyContent: 'space-between',
            }}
          >
            {/* Technical Analysis Widget */}
            <TechnicalAnalysis
              colorTheme={theme}
              symbol={`BINANCE:${coin.toUpperCase()}USDT`}
              width={size.width / 2}
              height={size.height / 2}
              interval="1D"
              showIntervalTabs={true}
            />

            {/* CryptoCurrency Market */}
            <CryptoCurrencyMarket
              colorTheme={theme}
              width={size.width / 2}
              height={size.height / 2}
            />
          </div>
        </div>

        {/* Heatmap Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <CryptoCoinsHeatmap
            colorTheme={theme}
            width="auto" // Adjusted for left and right gaps
            height={size.height}
          />
        </div>
      </div>
    </div>
  );
};

export default NewAdvancedRealTimeChartComponent;
