import { Tabs } from 'antd'
import React from 'react'
import BSTransactionHistoryTable from './BSTransactionHistoryTable'

const BSTransactionHistoryContent = () => {
    return (
        <div className='flex-align-stretch bs_main width-100 large_card'>
            <h1>Transaction History</h1>
            <Tabs type='line' defaultActiveKey="1" className="bs_tab_item orange tabs_button">
                <Tabs.TabPane tab="Crypto" key="1" >
                    <BSTransactionHistoryTable />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Fiat" key="2" >
                    <BSTransactionHistoryTable />
                </Tabs.TabPane>
            </Tabs>

        </div>
    )
}

export default BSTransactionHistoryContent