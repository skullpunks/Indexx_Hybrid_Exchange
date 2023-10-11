import { Button, Tabs } from 'antd'
import React from 'react'
import TCaptTransactionHistoryTable from './TCaptTransactionHistoryTable'
import TCaptTransactionCryptoHistoryTable from './TCaptTransactionCryptoHistoryTable'

const TCaptTransactionHistoryContent = () => {
    return (
        <div className='flex-align-stretch bs_main width-100 not_so_large_card position-relative'>
            <h1 className='font_15x mb-2 mt-1'>Transaction History</h1>
            <Tabs type='line' defaultActiveKey="1" className="bs_tab_item orange tabs_button font_15x">
                <Tabs.TabPane tab="Crypto" key="1" >
                    <TCaptTransactionCryptoHistoryTable />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Fiat" key="2" >
                    <TCaptTransactionHistoryTable />
                </Tabs.TabPane>
            </Tabs>
            <Button className='disabled_button ant-btn ant-btn-dangerous danger_disabled width_auto margin-r-2x position-absolute reset_button' onClick={() => window.location.reload()}> reset </Button>

        </div>
    )
}

export default TCaptTransactionHistoryContent