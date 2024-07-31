import React, { useState } from 'react';
import Redeem from './Redeem';

import IconicHeader from '../shared/IconicHeader';

const RedeemPage = () => {
  const [selectedTab, setSelectedTab] = useState('Send Gift');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <Redeem />
    </div>
  );
};

export default RedeemPage;
