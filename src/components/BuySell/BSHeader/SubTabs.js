import React from 'react';
import stock from '../../../assets/BSheader/Stock token icon_black.svg';
import stock_white from '../../../assets/BSheader/Stock token bnw 3.svg';
import etf from '../../../assets/BSheader/etf logo 3.svg';
import etf_white from '../../../assets/BSheader/etf white.svg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const SubTabs = ({ value, change, theme }) => {
  return (
    <div>
      <Tabs
        value={value}
        onChange={change}
        centered
        aria-label="icon label tabs example"
        className="tabs-tab"
        style={{
          opacity: 0.6,
        }}
      >
        <Tab
          label="Stock Tokens"
          value={0}
          icon={
            theme === 'dark' ? (
              <img
                src={stock_white}
                alt="Home"
                width={'50px'}
                style={{ marginBottom: 13, marginTop: 6 }}
              />
            ) : (
              <img
                src={stock}
                alt="Home"
                width={'50px'}
                style={{ marginBottom: 13, marginTop: 6 }}
              />
            )
          }
          className="tab-format"
          disableTouchRipple
        />
        <Tab
          label="ETF"
          value={1}
          icon={
            theme === 'dark' ? (
              <img
                src={etf_white}
                alt="Home"
                width={'63px'}
                style={{ marginBottom: '5px' }}
              />
            ) : (
              <img
                src={etf}
                alt="Home"
                width={'63px'}
                style={{ marginBottom: '5px' }}
              />
            )
          }
          // component={Link}
          // to='/indexx-exchange/coming-soon-etf'
          className="tab-format"
          disableTouchRipple
        />
      </Tabs>
    </div>
  );
};

export default SubTabs;
