
import React from 'react'
import { Button, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

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
}
const MarketsTable = () => {
    const navigate = useNavigate();

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };



    const columns: ColumnsType<DataType> = [
        {
            title: ' ',
            dataIndex: 'favourite',
            render: (_, record) => {
                return (record?.favourite === true) ? <StarOutlined className='font_20x' /> : <StarFilled className='color-warn font_20x' />;
            },
        },
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
                compare: (a, b) => parseFloat(a.DailyChange) - parseFloat(b.DailyChange),
                multiple: 2,
            },
            render: (_, record) => {
                let opts = { danger: false, success: false };
                if (parseFloat(record.DailyChange) > 0) {
                    opts["success"] = true; opts["danger"] = false;
                }
                else {
                    opts["danger"] = true; opts["success"] = false;
                };

                let classNameLabel = (parseFloat(record.DailyChange) > 0) ? "btn-success" : "btn-warn"
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
                <Button type="primary" danger onClick={() => navigate(`/indexx-exchange/trade`)}>
                    Trade
                </Button>
            ),
        },

    ];

    const data: DataType[] = [
        {
            key: '1',
            favourite: false,
            name: 'Indexx Exchange',
            Price: "$10",
            DailyChange: "12.09%",
            DailyHigh: "$10.00",
            DailyLow: "$12.09%",
            Volume: "$100.00M",
            MarketCap: "$100.00B",
        },
        {
            key: '2',
            favourite: false,
            name: 'Index 500',
            Price: "$6",
            DailyChange: "10.09%",
            DailyHigh: "$6.00",
            DailyLow: "$10.00",
            Volume: "$6.00M",
            MarketCap: "$61.00B",
        },
        {
            key: '3',
            favourite: true,
            name: 'Indexx Crypto',
            Price: "$18",
            DailyChange: "-9.09%",
            DailyHigh: "$6.00",
            DailyLow: "$6.00",
            Volume: "$18.00M",
            MarketCap: "$8.00B",
        },
        {
            key: '4',
            favourite: true,
            name: 'Indexx Fortune',
            Price: "$0.019",
            DailyChange: "0.09",
            DailyHigh: "$5.00",
            DailyLow: "$0.019",
            Volume: "$0.009M",
            MarketCap: "$1.019B",
        },
        {
            key: '5',
            favourite: true,
            name: 'Indexx Fortune',
            Price: "$0.019",
            DailyChange: "+2.78%",
            DailyHigh: "$0.09",
            DailyLow: "$0.09",
            Volume: "$0.09M",
            MarketCap: "$2.09B",
        },
        {
            key: '6',
            favourite: false,
            name: 'Indexx Fortune',
            Price: "$0.09",
            DailyChange: "+3.03%",
            DailyHigh: "$1.05",
            DailyLow: "$1.05",
            Volume: "$1.05M",
            MarketCap: "$10.05B",
        },
    ];

    return (
        <div>
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
        </div>
    )
}

export default MarketsTable