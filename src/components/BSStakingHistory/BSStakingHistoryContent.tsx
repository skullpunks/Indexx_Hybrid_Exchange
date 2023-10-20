import { Button, Tabs } from 'antd'
import React from 'react'
import BSStakingHistoryTable from './BSStakingHistoryTable'

const BSStakingHistoryContent = () => {
    return (
        <div className='flex-align-stretch bs_main width-100 large_card position-relative'>
            <h1>Staking History</h1>
            <Tabs type='line' defaultActiveKey="1" className="bs_tab_item orange tabs_button">
                <Tabs.TabPane tab="Staking" key="1" >
                    <BSStakingHistoryTable />
                </Tabs.TabPane>
            </Tabs>
            <Button className='disabled_button ant-btn ant-btn-dangerous danger_disabled width_auto margin-r-2x position-absolute reset_button' onClick={() => window.location.reload()}> reset </Button>

        </div>
    )
}

export default BSStakingHistoryContent