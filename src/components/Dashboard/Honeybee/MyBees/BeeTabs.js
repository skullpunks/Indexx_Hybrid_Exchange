import React from 'react'

// import "../../../AccountSettings/Account.css";
import { Tabs } from 'antd';
import './BeeTabs.css'

import Growth from './Growth';
import BeeWallet from './BeeWallet';
import BeeTransactionHistoryLayout from './BeeTransactionHistory/BeeTransactionHistoryLayout';
import Permissions from './Permissions';


const BeeTabs = () => {
    return (
        <div 
        // style={{ paddingTop: 90 }} 
        className="my-tabs"
        >
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Growth" key="1">
                   <Growth/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Wallet" key="2">
                  <BeeWallet />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Permissions" key="3">
                  <Permissions/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Transactions" key="4">
                <BeeTransactionHistoryLayout/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default BeeTabs;