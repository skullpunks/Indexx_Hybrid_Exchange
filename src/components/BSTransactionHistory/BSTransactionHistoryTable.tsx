import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
    // destination: string;
    // txid: string;
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
                Invite {record.txid} <span><CopyOutlined /> <LinkOutlined /></span>
            </span>
        ),
    },
    {
        title: 'Destination',
        key: 'destination',
        render: (_, record) => (
            <span>
                Invite {record.destination} <span><CopyOutlined /> <LinkOutlined /></span>
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
        asset: "BNB",
        amount: 0.07,
        destination: '0x56092...19',
        txid: '126092...19',
    },

];

const BSTransactionHistoryTable: React.FC = () => {
    return (
        <div className='flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x'>
            <Table columns={columns} dataSource={data} />;

        </div>
    )
}

export default BSTransactionHistoryTable