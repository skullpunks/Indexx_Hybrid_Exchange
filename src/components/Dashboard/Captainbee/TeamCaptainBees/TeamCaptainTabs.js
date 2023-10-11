import React from 'react'

// import "../../../AccountSettings/Account.css";
import { Tabs } from 'antd';
import './TeamCaptainTabs.css'

import TeamCaptainGrowth from './TeamCaptainGrowth';
import TeamCaptWallet from './TeamCaptWallet';
import TeamCaptainPermissions from './TeamCaptainPermissions';
import TCaptTransactionHistoryLayout from './TeamCaptainTransactionHistory/TCaptTransactionHistoryLayout';


const TeamCaptainTabs = () => {
    return (
        <div 
        // style={{ paddingTop: 90 }} 
        className="capt-tabs"
        >
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Growth" key="1">
                   <TeamCaptainGrowth/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Wallet" key="2">
                  <TeamCaptWallet />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Permissions" key="3">
                  <TeamCaptainPermissions/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Transactions" key="4">
                <TCaptTransactionHistoryLayout/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default TeamCaptainTabs;