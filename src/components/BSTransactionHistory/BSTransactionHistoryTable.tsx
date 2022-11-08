import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../services/api';

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
    to: string;
    txId: string;
    key: string;
    time: string;
    type: string;
    wallet: string;
    currencyRef: string;
    amount: number;
    destination: string;
    txid: string;
}

const columns: ColumnsType<DataType> = [

    {
        title: "Time Type",
        render: (record) => (
            <React.Fragment>
                {record.modified}
                <br />
                {record.modified}
            </React.Fragment>
        ),
        responsive: ["xs"]
    },
    {
        title: "Amount",
        render: (record) => (
            <React.Fragment>
                {record.amount}

                {record.currencyRef}
            </React.Fragment>
        ),
        responsive: ["xs"]
    },
    {
        title: 'Time',
        dataIndex: 'modified',
        key: 'modified',
        render: text => <span>{text}</span>,
        responsive: ["sm"],
    },
    {
        title: 'Asset',
        dataIndex: 'currencyRef',
        key: 'currencyRef',
        render: text => <span>{text}</span>,
        responsive: ["sm"],
    },
    {
        title: 'Type',
        dataIndex: 'transactionType',
        key: 'transactionType',
        responsive: ["sm"]
    },
    {
        title: 'Deposit Wallet',
        dataIndex: 'walletType',
        key: 'walletType',
        render: text => <span>{text}</span>,
        responsive: ["sm"],
    },
    {
        title: 'Asset',
        key: 'currencyRef',
        dataIndex: 'asset',
        responsive: ["sm"],
    },
    {
        title: 'Amount',
        key: 'amount',
        dataIndex: 'amount',
        responsive: ["sm"],
    },
    {
        title: 'TxID',
        key: 'txId',
        render: (_, record) => (
            <span>
                {record.txId}
                <span>
                    <Tooltip title="Click to copy"><CopyOutlined className='padding-lr-1x hover_icon' /> </Tooltip>
                    <LinkOutlined />
                </span>
            </span>
        ),
        responsive: ["sm"],
    },
    {
        title: 'Destination',
        key: 'to',
        render: (_, record) => (
            <span>
                {record.to}
                <span>
                    <CopyOutlined className='padding-lr-1x' /> <LinkOutlined />
                </span>
            </span>
        ),
        responsive: ["sm"],
    },
];


const BSTransactionHistoryTable: React.FC = () => {
    const [txList, setTxList] = useState() as any;
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const decodedToken: any = decodeJWT(String(token)) as any;
        transactionList(decodedToken?.email).then((res) => {
            setTxList(res.data);
        });
    }, []);

    return (
        <div className='flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x '>
            <div className='d-flex transaction_filters margin-b-3x'>
                <div>
                    <label>Type</label> <br />
                    <Select defaultValue="all" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="deposit">Deposit</Option>
                        <Option value="withdraw">Withdraw</Option>
                        <Option value="reward_withdraw">Reward Withdraw</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Time</label> <br />
                    <Select defaultValue="30" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="7">Past 7 days</Option>
                        <Option value="30">Past 30 days</Option>
                        <Option value="90">Past 90 days</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Asset</label> <br />
                    <Select defaultValue="all" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="IN500">IN500 <span>Indexx 500</span></Option>
                        <Option value="BTC">BTC <span>Bitcoin</span></Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Status</label> <br />
                    <Select defaultValue="completed" onChange={handleChange}>
                        <Option value="all">All</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
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
            <Table columns={columns} dataSource={txList} className="transaction_crypto_history" />
        </div>
    )
}

export default BSTransactionHistoryTable