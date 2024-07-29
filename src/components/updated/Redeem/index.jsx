import React from 'react';
import FirstScreen from './FirstScreen';
import Popup from './RedeemPopup';
import CreateCards from './CreateCards';
import SendCard from './SendCard';
import SendCardSuccessfully from './CardSentSuccessfully';
import IconicHeader from '../shared/IconicHeader';

const Redeem = () => {
  return (
    <div>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader />
      {/* <FirstScreen /> */}
      {/* <CreateCards /> */}
      <SendCard />
      {/* <SendCardSuccessfully /> */}
      {/* <Popup /> */}
    </div>
  );
};

export default Redeem;
