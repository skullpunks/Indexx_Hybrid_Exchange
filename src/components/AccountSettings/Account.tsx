import React from 'react'

import "./Account.css";
import { Tabs } from 'antd';

import BasicInfo from './BasicInfo';
import { PaymentMethod } from './PaymentMethod';
import Preferences from './Preferences';
import Security from './Security';


const Account = () => {
    return (
        <div style={{ paddingTop: 90 }} className="accounts_container">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Basic Info" key="1">

                   <BasicInfo/>


                </Tabs.TabPane>
                <Tabs.TabPane tab="Security" key="2">
                  <Security />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Preferences" key="3">
                  <Preferences/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Payment Method" key="4">
                <PaymentMethod/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Account;