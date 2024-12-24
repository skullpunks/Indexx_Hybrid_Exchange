import React, { useState } from 'react';
import IconicHeader from '../shared/RedeemIconicHeader';
import ShoppingHistoryTable from './ShoppingHistoryTable';

const CardShoppingHistory = () => {
  const [selectedTab, setSelectedTab] = useState('Shopping History');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '100px auto',
          padding: '15px',
        }}
      >
        <h2>Shopping History</h2>
        <ShoppingHistoryTable />
      </div>
    </div>
  );
};

export default CardShoppingHistory;
