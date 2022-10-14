import { SearchOutlined } from '@ant-design/icons';
import { Input, Table, Tabs } from 'antd'
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React from 'react'
// import { Link } from 'react-router-dom'

interface DataType {
    key: React.Key;
    favourite: boolean;
    name: string;
    Price: any;
    DailyChange: any;
    DailyHigh: any;
    DailyLow: any;
    Volume: any;
    MarketCap: any;
    subName: any;
}
const BSWalletTable = () => {

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };



    const columns: ColumnsType<DataType> = [
        {
            title: 'Asset',
            dataIndex: 'favourite',
            render: (_, record) => {
                return record.name + " " + record.subName;
            },
        },
        {
            title: 'Allocations',
            dataIndex: 'DailyLow',
        },
        {
            title: 'Balance',
            dataIndex: 'Price',
            sorter: {
                compare: (a, b) => a.Price - b.Price,
                multiple: 3,
            },
        },
        {
            title: 'Available Balance',
            dataIndex: 'DailyChange',
            sorter: {
                compare: (a, b) => parseFloat(a.DailyChange) - parseFloat(b.DailyChange),
                multiple: 2,
            }
            // render: (_, record) => {
            //     let opts = { danger: false, success: false };
            //     if (parseFloat(record.DailyChange) > 0) {
            //         opts["success"] = true; opts["danger"] = false;
            //     }
            //     else {
            //         opts["danger"] = true; opts["success"] = false;
            //     };

            //     let classNameLabel = (parseFloat(record.DailyChange) > 0) ? "btn-success" : "btn-warn"
            //     return <Button type='primary' size="middle" {...opts} className={classNameLabel}>
            //         {record.DailyChange}
            //     </Button>
            // },
        },
        {
            title: 'Unavailable Balance',
            dataIndex: 'DailyHigh',
            sorter: {
                compare: (a, b) => a.DailyHigh - b.DailyHigh,
                multiple: 1,
            },
        },


    ];

    const data: DataType[] = [
        {
            key: '6',
            favourite: false,
            name: 'USD',
            Price: "11.33",
            DailyChange: "+3.03%",
            DailyHigh: "$1.05",
            DailyLow: "91%",
            Volume: "$1.05M",
            MarketCap: "$10.05B",
            subName: "USD Dollar"
        },
        {
            key: '1',
            favourite: false,
            name: 'INEX',
            Price: "0.00005102",
            DailyChange: "12.09%",
            DailyHigh: "$10.00",
            DailyLow: "9%",
            Volume: "$100.00M",
            MarketCap: "$100.00B",
            subName: "Indexx Exchange"
        },
        {
            key: '2',
            favourite: false,
            name: 'IN500',
            Price: "0",
            DailyChange: "10.09%",
            DailyHigh: "$6.00",
            DailyLow: "0%",
            Volume: "$6.00M",
            MarketCap: "$61.00B",
            subName: "Index 500"
        },
        {
            key: '3',
            favourite: true,
            name: 'Indexx Crypto',
            Price: "0",
            DailyChange: "-9.09%",
            DailyHigh: "$6.00",
            DailyLow: "0%",
            Volume: "$18.00M",
            MarketCap: "$8.00B",
            subName: "USD Dollar"
        },
        {
            key: '4',
            favourite: true,
            name: 'iUSD+',
            Price: "0",
            DailyChange: "0.09",
            DailyHigh: "$5.00",
            DailyLow: "0%",
            Volume: "$0.009M",
            MarketCap: "$1.019B",
            subName: "Indexx USD+"
        }

    ];


    const operations = <Input size="small" className='orange_input' placeholder=" Search" prefix={<SearchOutlined />} />;

    return (
        <div>
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1" className='margin-t-2x orange'>
                <Tabs.TabPane tab="Balance" key="1" className='padding-2x'>
                    <div className='border-b-1x margin-b-2x'>
                        <Table className='custom_table' columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Deposits & Withdrawals" key="2" className='padding-2x'>
                    Order History Content
                </Tabs.TabPane>
            </Tabs>

        </div>
    )
}

export default BSWalletTable