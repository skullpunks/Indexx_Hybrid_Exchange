import React from 'react';

import './Account.css';
import { Tabs } from 'antd';

import BasicInfo from './BasicInfo';
import { PaymentMethod } from './PaymentMethod';
import Preferences from './Preferences';
import Security from './Security';
import Signup from './Signup';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  tabStyle: {
    color: `${theme.palette.text.primary} !important`,
    '&.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap': {
      background: `${theme.palette.divider}`,
      color: `${theme.palette.text.primary} !important`,
    },
    '& .ant-tabs-tab': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .ant-tabs-tab-active': {
      color: `${theme.palette.text.primary} !important`,
      border: 'none',
    },
    '& .ant-tabs-tab-btn': {
      color: `${theme.palette.text.primary} !important`,
      border: 'none',
    },
  },
})) as any;
const Account = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div style={{ paddingTop: 190 }} className="accounts_container">
      <Tabs defaultActiveKey="1" className={classes.tabStyle}>
        <Tabs.TabPane tab="Basic Info" key="1">
          <BasicInfo theme={theme} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Security" key="2">
          <Security />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preferences" key="3">
          <Preferences />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Payment Method" key="4">
          <PaymentMethod />
        </Tabs.TabPane>
        {localStorage.getItem('userlogged') === 'normal' && (
          <Tabs.TabPane tab="Convert to Captain Bee" key="5">
            <Signup />
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default Account;
