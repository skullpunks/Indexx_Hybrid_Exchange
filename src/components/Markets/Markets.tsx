import React from 'react';
import './Markets.css';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Input, Tabs, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';


interface DataType {
  key: React.Key;
  name: string;
  Price: number;
  DailyChange: any;
  DailyHigh: any;
  DailyLow: number;
  Volume: number;
  MarketCap: number;
}

const Markets = () => {

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };



  const columns: ColumnsType<DataType> = [
    {
      title: 'Pair Name',
      dataIndex: 'name',
    },
    {
      title: 'Pair Price',
      dataIndex: 'Price',
      sorter: {
        compare: (a, b) => a.Price - b.Price,
        multiple: 3,
      },
    },
    {
      title: 'Daily Change',
      dataIndex: 'DailyChange',
      sorter: {
        compare: (a, b) => a.DailyChange - b.DailyChange,
        multiple: 2,
      },
      render: (_, record) => {
        let opts = {danger: false, success: false};
        if(parseFloat(record.DailyChange) > 0){
          opts["danger"] = true;  opts["success"]=false ;
        } 
        else{ 
          opts["success"]=true;  opts["danger"] = false; 
        };

        let classNameLabel = (parseFloat(record.DailyChange) > 0) ?  "btn-warn" : "btn-success" 
        return <Button type='primary' size="middle" {...opts} className={classNameLabel}>
          {record.DailyChange}
        </Button>
      },
    },
    {
      title: 'Daily High',
      dataIndex: 'DailyHigh',
      sorter: {
        compare: (a, b) => a.DailyHigh - b.DailyHigh,
        multiple: 1,
      },
    },
    {
      title: 'Daily Low',
      dataIndex: 'DailyLow',
      sorter: {
        compare: (a, b) => a.DailyLow - b.DailyLow,
        multiple: 1,
      },
    },
    {
      title: 'Volume',
      dataIndex: 'Volume',
      sorter: {
        compare: (a, b) => a.Volume - b.Volume,
        multiple: 1,
      },
    },
    {
      title: 'Market Cap',
      dataIndex: 'MarketCap',
      sorter: {
        compare: (a, b) => a.MarketCap - b.MarketCap,
        multiple: 1,
      },
    },
    {
      title: 'Trade',
      dataIndex: 'MarketCap',
      render: (_) => (

        <Button type="primary" danger>
          Trade
        </Button>

      ),
    },

  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      Price: 98,
      DailyChange: "-12.09%",
      DailyHigh: 10.00,
      DailyLow: 50,
      Volume: 50,
      MarketCap: 20,
    },
    {
      key: '2',
      name: 'John Brown',
      Price: 98,
      DailyChange: "-10.09%",
      DailyHigh: "$6.00",
      DailyLow: 50,
      Volume: 50,
      MarketCap: 20,
    },
    {
      key: '3',
      name: 'John Brown',
      Price: 98,
      DailyChange: "-9.09%",
      DailyHigh: "$6.00",
      DailyLow: 50,
      Volume: 50,
      MarketCap: 20,
    },
    {
      key: '4',
      name: 'John Brown',
      Price: 98,
      DailyChange: "0.09",
      DailyHigh: "$5.00",
      DailyLow: 50,
      Volume: 50,
      MarketCap: 20,
    },
  ];

  return (
    <div className='scan-container market-container'>
      <h1>Cryptocurrency prices, charts, and trends</h1>
     
      <br />
      <div className='search-input-container'>
        <Input size="large" placeholder="large size" prefix={<AudioOutlined />} />
      </div>
      <div className='tabs-container border'>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Prices " key="1">
            <div className='grey-strip d-flex'>
              <Button className='white-strip '>All</Button>
              <Button className='white-strip margin-lr-2x'>Top Gainerts</Button>
              <Button className='white-strip margin-lr-2x'>Top Losers</Button>
              <Button className='white-strip margin-lr-2x'>New Listings</Button>
              <Button className='white-strip '>Trending</Button>
              <Button className='white-strip last-item'>ID</Button>
            </div>
            
          </Tabs.TabPane>
          <Tabs.TabPane tab="USD" key="2">
          <div className='grey-strip d-flex'>
              <Button className='white-strip '>All</Button>
              <Button className='white-strip margin-lr-2x'>Top Gainerts</Button>
              <Button className='white-strip margin-lr-2x'>Top Losers</Button>
              <Button className='white-strip margin-lr-2x'>New Listings</Button>
              <Button className='white-strip '>Trending</Button>
              <Button className='white-strip last-item'>ID</Button>
            </div>
            
          </Tabs.TabPane>
          <Tabs.TabPane tab="BTC Pairs" key="3">
          <div className='grey-strip d-flex'>
              <Button className='white-strip '>All</Button>
              <Button className='white-strip margin-lr-2x'>Top Gainerts</Button>
              <Button className='white-strip margin-lr-2x'>Top Losers</Button>
              <Button className='white-strip margin-lr-2x'>New Listings</Button>
              <Button className='white-strip '>Trending</Button>
              <Button className='white-strip last-item'>ID</Button>
            </div>
            <div className='tab-body-container'>
              <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Markets;