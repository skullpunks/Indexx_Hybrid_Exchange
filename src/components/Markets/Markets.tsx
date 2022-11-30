import React, { useCallback, useState } from 'react';
import './Markets.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
// import type { ColumnsType, TableProps } from 'antd/es/table';
import MarketsTable from './MarketsTable';
import Footer from '../Footer/Footer';
import MarketsBTCTable from './MarketsBTCable';
import MarketsIUSDPable from './MarketsIUSDPTable';
import debounce from 'lodash.debounce'
//import MarketsFavTable from './MarketsFavTable';

const Markets = () => {
  const [valueInput, setValueInput] = useState('');
  const [valueSearch, setValueSearch] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(nextValue => setValueSearch(nextValue), 300),
    [], // will be created only once initially
  );
  const onChageSearch = (e: any) => {
    let val = e.currentTarget.value;
    setValueInput(val);
    debouncedSave(val);
  };
  const tabChange = (e: any) => {
    console.log(e)
    setValueInput('');
  }
  return (
    <div>
      <div className='scan-container market-container'>
        <h1>Cryptocurrency prices, charts, and trends</h1>

        <br />
        <div className='search-input-container'>
          <Input size="large" placeholder="Search" value={valueInput} onChange={onChageSearch} maxLength={50} prefix={<SearchOutlined />} />
        </div>
        <div className='tabs-container border'>
          <Tabs defaultActiveKey="2" onChange={tabChange}>
            {/* <Tabs.TabPane tab={<StarFilled className='padding-l-1x d-md-block d-none' />} key="0">
              <MarketsFavTable />

            </Tabs.TabPane> */}

            <Tabs.TabPane tab="Prices " key="1">
              <MarketsTable search={valueSearch} />

            </Tabs.TabPane>
            <Tabs.TabPane tab="USD" key="2">
              <MarketsIUSDPable search={valueSearch} />

            </Tabs.TabPane>
            <Tabs.TabPane tab="BTC Pairs" key="3">
              <MarketsBTCTable search={valueSearch} />
            </Tabs.TabPane>
          </Tabs>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Markets;