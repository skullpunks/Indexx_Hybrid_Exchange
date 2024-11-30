import React, { useState, useEffect } from 'react';
import '../../../BuySell/BS-Sell.css';
import './BuySellDummy.css';
// import Footer from '../../../Footer/Footer';
import BeeWalletTable from './BeeWalletTable';
import BeeWalletTop from './BeeWalletTop';
// import { Link } from 'react-router-dom';
// import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

// import PlainCircle from "../../assets/arts/PlainCircle.svg";

interface BeeWalletTableProps {
  honeyBeeEmail: string;
}

const BeeWallet: React.FC<BeeWalletTableProps> = ({ honeyBeeEmail }) => {
  return (
    <div className="">
      <div className="scan-container d-flex flex-direction-column card not_so_large_card orange pb-0 wallet-bee">
        <BeeWalletTop BeeEmail={honeyBeeEmail} />
        <div className="width-100 bs_wallet_table">
          <BeeWalletTable BeeEmail={honeyBeeEmail} />
        </div>
      </div>
      {/* <Footer footerArt="flipWoman" /> */}
    </div>
  );
};

export default BeeWallet;
