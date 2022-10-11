import React from 'react';
import './Markets.css';
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
// import type { ColumnsType, TableProps } from 'antd/es/table';
import MarketsTable from './MarketsTable';
import Footer from '../Footer/Footer';



const Markets = () => {


  return (
    <div>
      <div className='scan-container market-container'>
        <h1>Cryptocurrency prices, charts, and trends</h1>

        <br />
        <div className='search-input-container'>
          <Input size="large" placeholder=" Search" prefix={<SearchOutlined />} />
        </div>
        <div className='tabs-container border'>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={<StarFilled className='padding-l-1x' />} key="0">
              <MarketsTable />

            </Tabs.TabPane>

            <Tabs.TabPane tab="Prices " key="1">
              <MarketsTable />

            </Tabs.TabPane>
            <Tabs.TabPane tab="USD" key="2">
              <MarketsTable />

            </Tabs.TabPane>
            <Tabs.TabPane tab="BTC Pairs" key="3">
              <MarketsTable />
            </Tabs.TabPane>
          </Tabs>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Markets;