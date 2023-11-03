import React from 'react';
// import Footer from '../Footer/Footer';
import './TradeChart.css';
import TradeScreenChart from "../../assets/arts/TradeScreenChart.svg";
import { Radio, Tabs, Input, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';


interface DataType {
    key: React.Key;
    name: number;
    age: number;
    address: number;


}
interface DataType1 {
    name1: number;
    age1: number;
    address1: number;


}

const TradeChart = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Price(USD)',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Amout(BTC)',
            dataIndex: 'age',
            width: 150,
        },
        {
            title: 'Time',
            dataIndex: 'address',
        },
    ];
    const columnsTop: ColumnsType<DataType1> = [
        {
            title: 'Price(USD)',
            dataIndex: 'name1',
            width: 150,
        },
        {
            title: 'Amout(BTC)',
            dataIndex: 'age1',
            width: 150,
        },
        {
            title: 'Total',
            dataIndex: 'address1',
        },
    ];
    const data: DataType[] = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            name: 19.994,
            age: 0.0017,
            address: 5,
        });
    }
    const dataTop: DataType1[] = [];
    for (let i = 0; i < 4; i++) {
        dataTop.push({

            name1: 1999.994,
            age1: 0.0017,
            address1: 1234,
        });
    }
    return (
        <div>

            <div className='scan-container scan-container-trade'>
                <div className="width-100">
                    <div className='scan-container-trade-header flex-align-center d-flex'>
                        <div>
                            BTC/USD
                        </div>
                        <div className='padding-lr-2x'>
                            <div>19,500.84</div>
                            <div>$19,500.84</div>
                        </div>
                        <div>
                            <div>24 Change</div>
                            <div>-486.94-2.44%</div>
                        </div>
                        <div className='padding-lr-2x'>
                            <div>24 High</div>
                            <div>20,067.05</div>
                        </div>
                        <div>
                            <div>24 Low</div>
                            <div>19,321.49</div>
                        </div>
                        <div className='padding-lr-2x'>
                            <div>24 Volume</div>
                            <div>164,137,581.42 USD</div>
                        </div>
                    </div>
                    <div className='d-flex margin-t-2x'>
                        <div className="main-left d-flex">
                            <div>
                                <img src={TradeScreenChart} alt="TradeScreenChart" />
                                <Tabs defaultActiveKey="1" className='margin-t-2x border-1x padding-lr-2x login_tabs orange'>
                                    <Tabs.TabPane tab="Open Orders (0)" key="1">
                                        <Link to="" className="text_link padding-r-1x">Log In</Link> or<Link to="" className="text_link padding-l-1x">Register</Link>  Now to trade
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Order History" key="2">
                                        Order History Content
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Trade History" key="3">
                                        Trade History Content
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Funds" key="4">
                                        Funds  Content
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                            <div className='padding-lr-2x trade_content'>
                                <Table columns={columnsTop} dataSource={dataTop} />
                                <Table columns={columns} dataSource={data} className="margin-t-2x" />
                            </div>
                        </div>
                        <div className="main-right card">
                            <h1 className='margin-t-1_5x margin-l-2x'>Place Holder</h1>
                            <Radio.Group defaultValue="a" buttonStyle="solid" className=' margin-lr-2x margin-t-2x trade_radio'>
                                <Radio.Button value="a">Buy</Radio.Button>
                                <Radio.Button value="b">Sell</Radio.Button>

                            </Radio.Group>
                            <Tabs defaultActiveKey="1" className='trade_tabs'>
                                <Tabs.TabPane tab="Limit" key="1">
                                    <div className='padding-lr-2x'>
                                        <Input suffix="USD" placeholder='Price' className='margin-t-2x' />
                                        <Input suffix="BTC" placeholder='Amount' className='margin-t-2x' />
                                        <div className='bs-footer-action margin-t-3x text-center'>
                                            <button className='margin-b-2x'>
                                                Rigister Now
                                            </button>
                                            <br />


                                        </div>
                                        <Link to="" className="text_link padding-r-1x margin-t-1x d-block text-center">Log In</Link>
                                        <Tabs defaultActiveKey="1">
                                            <Tabs.TabPane tab="Asset" key="1">
                                                <div className='d-flex margin-t-2x'>
                                                    <Button type="primary" className='margin-r-2x'>primary</Button>
                                                    <Button>secondary</Button>
                                                </div>
                                            </Tabs.TabPane>

                                        </Tabs>
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Market" key="2">
                                    Content of Tab Pane 2
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Stop-limit" key="3">
                                    Content of Tab Pane 3
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>

                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default TradeChart;