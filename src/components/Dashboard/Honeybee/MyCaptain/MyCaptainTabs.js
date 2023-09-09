import React from 'react'

// import "../../../AccountSettings/Account.css";
import { Tabs } from 'antd';
import './MyCaptainTabs.css'

import CaptGrowth from './CaptGrowth';
import GivePermissions from './GivePermissions';
import CaptTransactionHistoryLayout from './CaptTransactionHistory/CaptTransactionHistoryLayout';


const MyCaptainTabs = () => {
    return (
        <div 
        // style={{ paddingTop: 90 }} 
        className="capt-tabs"
        >
            <Tabs defaultActiveKey="1" className='tab-list'>
                <Tabs.TabPane tab="Growth" key="1">
                   <CaptGrowth/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Permissions" key="2">
                  <GivePermissions/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Transactions" key="3">
                <CaptTransactionHistoryLayout/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default MyCaptainTabs;