import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};


const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

interface DataType {
    key: string;
    time: string;
    type: string;
    wallet: string;
    asset: string;
    amount: number;
    destination: string;
    txid: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: text => <span>{text}</span>,
    },

    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Deposit Wallet',
        dataIndex: 'wallet',
        key: 'wallet',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Asset',
        key: 'asset',
        dataIndex: 'asset'
    },
    {
        title: 'Amount',
        key: 'amount',
        dataIndex: 'amount'
    },
    {
        title: 'TxID',
        key: 'txid',
        render: (_, record) => (
            <span>
                {record.txid}
                <span>
                    <Tooltip title="Click to copy"><CopyOutlined className='padding-lr-1x hover_icon' /> </Tooltip>
                    <LinkOutlined />
                </span>
            </span>
        ),
    },
    {
        title: 'Destination',
        key: 'destination',
        render: (_, record) => (
            <span>
                {record.destination}
                <span>
                    <CopyOutlined className='padding-lr-1x' /> <LinkOutlined />
                </span>
            </span>
        ),
    },
];


const data: DataType[] = [
    {
        key: '1',
        time: '2022-10-10',
        type: "Deposit",
        wallet: "Spot Wallet",
        asset: "BNB",
        amount: 0.07,
        destination: '0x56092...19',
        txid: '126092...19',
    },

    {
        key: '2',
        time: '2022-10-12',
        type: "Deposit",
        wallet: "Spot Wallet",
        asset: "IN500",
        amount: 0.07,
        destination: '0x56092...19',
        txid: '126092...19',
    },

];

const BSTransactionHistoryTable: React.FC = () => {
    return (
        <div className='flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x'>
            <div className='d-flex transaction_filters margin-b-3x'>
                <div>
                    <label>Type</label> <br />
                    <Select defaultValue="all" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="deposit">Deposit</Option>
                        <Option value="withdraw">Withdraw</Option>
                    </Select>
                </div>
                <div>
                    <label>Time</label> <br />
                    <Select defaultValue="30" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="7">Past 7 days</Option>
                        <Option value="30">Past 30 days</Option>
                        <Option value="90">Past 90 days</Option>
                    </Select>
                </div>
                <div>
                    <label>Asset</label> <br />
                    <Select defaultValue="all" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="IN500">IN500 <span>Index 500</span></Option>
                        <Option value="BTC">BTC <span>Bitcoin</span></Option>
                    </Select>
                </div>
                <div>
                    <label>Status</label> <br />
                    <Select defaultValue="completed" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </div>
                <div>
                    <label>TxID</label> <br />
                    <Select
                        showSearch
                        placeholder="Search transaction id"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        <Option value="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c">0x56092...19</Option>
                        <Option value="0x7325E062EA31E7b977fbEBBcC45De30c3e894988">0x7325E...88</Option>

                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default BSTransactionHistoryTable