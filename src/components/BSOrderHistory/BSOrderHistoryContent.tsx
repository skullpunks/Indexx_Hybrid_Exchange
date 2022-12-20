import { Button, Tabs } from 'antd'
import React from 'react'
import BSBuyOrderHistoryTable from './BSBuyOrderHistoryTable';
import BSSellOrderHistoryTable from './BSSellOrderHistoryTable';
import BSConvertOrderHistoryTable from './BSConvertOrderHistoryTable';

const BSOrderHistoryContent = () => {
    return (
        <div className='flex-align-stretch bs_main width-100 large_card position-relative'>
            <h1>Order History</h1>
            <Tabs type='line' defaultActiveKey="1" className="bs_tab_item orange tabs_button">
                <Tabs.TabPane tab="Buy" key="1" >
                    <BSBuyOrderHistoryTable />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Sell" key="2" >
                    <BSSellOrderHistoryTable />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Convert" key="3" >
                    <BSConvertOrderHistoryTable />
                </Tabs.TabPane>
            </Tabs>
            <Button className='disabled_button ant-btn ant-btn-dangerous danger_disabled width_auto margin-r-2x position-absolute reset_button' onClick={() => window.location.reload()}> reset </Button>

        </div>
    )
}

export default BSOrderHistoryContent