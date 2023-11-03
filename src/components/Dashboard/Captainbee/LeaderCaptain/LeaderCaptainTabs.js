import React from 'react'

// import "../../../AccountSettings/Account.css";
import { Tabs } from 'antd';
import './LeaderCaptainTabs.css'

// import CaptTransactionHistoryLayout from './CaptTransactionHistory/CaptTransactionHistoryLayout';
import LeaderCaptGrowth from './LeaderCaptGrowth';
import GivePermissionsLeader from './GivePermissionsLeader';


const LeaderCaptainTabs = ({leaderEmail}) => {
    return (
        <div 
        // style={{ paddingTop: 90 }} 
        className="capt-tabs"
        >
            <Tabs defaultActiveKey="1" className='tab-list'>
                <Tabs.TabPane tab="Growth" key="1">
                   <LeaderCaptGrowth leaderEmail={leaderEmail}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Permissions" key="2">
                  <GivePermissionsLeader/>
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Transactions" key="3">
                <CaptTransactionHistoryLayout/>
                </Tabs.TabPane> */}
            </Tabs>
        </div>
    );
}

export default LeaderCaptainTabs;