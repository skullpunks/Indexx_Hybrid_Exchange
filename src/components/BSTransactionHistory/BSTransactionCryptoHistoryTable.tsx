import { CopyOutlined } from '@ant-design/icons';
import { Input, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../services/api';
import ShortenText from '../../utils/ShortenText';
import useCopyToClipboard from '../../utils/useCopyToClipboard';

const { Option } = Select;

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


const BSTransactionCryptoHistoryTable: React.FC = () => {
    const [selection, setSelection] = useState({
        type: '',
        asset: '',
        status: '',
        time: '30',
        transactionHash: '',
    })
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [txList, setTxList] = useState() as any;
    const [txListFilter, setTxListFilter] = useState() as any;
    const [, copy] = useCopyToClipboard();
    const [valueInput, setValueInput] = useState('');
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
            render: text => <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>,
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
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount',
            responsive: ["sm"],
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            responsive: ["sm"],
        },
        {
            title: 'Transaction Hash',
            key: 'txId',
            render: (_, record) => (
                <span>
                    {/* {record.txId} */}
                    {/* {ShortenText(record.txId, 0, 20) + "..."} */}
                    {(record.txId.length > 20) ? ShortenText(record.txId, 0, 20) + "..." : record.txId}
                    <CopyOutlined className='float-left padding-lr-5x hover_icon ' onClick={() => copy(record.txId)} />
                </span>

            ),
            responsive: ["sm"],
        },
        {
            title: 'Destination',
            key: 'to',
            render: (_, record) => (
                <span>
                    <span>
                        {/* {record.to} */}
                        {/* {ShortenText(record.to, 0, 20) + "..."} */}
                        {(record.to.length > 20) ? ShortenText(record.to, 0, 20) + "..." : record.to}

                    </span>
                    <span style={{ textAlign: 'right' }}>
                        <CopyOutlined className='padding-lr-1x hover_icon' onClick={() => copy(record.to)} />
                        {/* <LinkOutlined /> */}
                    </span>
                </span>
            ),
            responsive: ["sm"],
        },
    ];


    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const decodedToken: any = decodeJWT(String(token)) as any;

        transactionList(decodedToken?.email, '').then((res) => {
            const results = res.data;
            let finalArr = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].transactionType?.includes('FIAT')) {
                } else {
                    finalArr.push(results[i]);
                }
            }
            setTxList(finalArr);
            setTxListFilter(finalArr);
        });
    }, []);

    const handleChangeTime = (value: string) => {

        const pastDate = moment().subtract(+value, "days").format('YYYY-MM-DD')
        if (!isNaN(+value)) {
            setSelection({
                type: selection.type,
                asset: selection.asset,
                status: selection.status,
                time: value,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                return moment(pastDate).isSameOrBefore(valueDate)
                    && (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                type: selection.type,
                asset: selection.asset,
                status: selection.status,
                time: '',
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                return (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }

    };
    const handleChangeStatus = (value: string) => {
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')

        if (value !== 'all') {
            setSelection({
                type: selection.type,
                asset: selection.asset,
                status: value,
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return data.status?.toLowerCase() === value?.toLowerCase()
                    && (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));

            })
            setTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                type: selection.type,
                asset: selection.asset,
                status: '',
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));

            })
            setTxListFilter(txListFilterData);
        }
    };
    console.log(selection);
    const handleChangeType = (value: string) => {
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')

        if (value !== 'all') {
            setSelection({
                type: value,
                asset: selection.asset,
                status: selection.status,
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            console.log(value);
            console.log("List,", txList)
            const txListFilterData = txList.filter((data: any) => {
                console.log(data);
                console.log(data.transactionType);
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                // && data.currencyRef?.toLowerCase() === value?.toLowerCase()
                return data.transactionType?.toLowerCase() === value?.toLowerCase()
                    && (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));

            })
            setTxListFilter(txListFilterData);

            // WITHDRAW_CYRPTO WITHDRAW_CRYPTO
        }

        else {
            setSelection({
                type: '',
                asset: selection.asset,
                status: selection.status,
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                console.log(data);
                console.log(data.transactionType);
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                // && data.currencyRef?.toLowerCase() === value?.toLowerCase()
                return (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }
    };
    const handleChangeAsset = (value: string) => {
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')
        if (value !== 'all') {
            setSelection({
                type: selection.type,
                asset: value,
                status: selection.status,
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                console.log(data);
                return data.currencyRef?.toLowerCase() === value?.toLowerCase()
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                type: selection.type,
                asset: '',
                status: selection.status,
                time: selection.time,
                transactionHash: selection.transactionHash,
            });
            const txListFilterData = txList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                console.log("N: ", data);
                return (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }
    };


    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = txListFilter && txListFilter.slice((current - 1) * pageSize, current * pageSize);
        return xx
    };

    const onChageSearch = (e: any) => {
        let val = e.currentTarget.value;
        setValueInput(val)
        setSelection({
            type: selection.type,
            asset: selection.asset,
            status: selection.status,
            time: selection.time,
            transactionHash: val,
        });
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')

        const filterDate = txList?.filter((data: any) => {
            let valueDate = moment(data.created).format('YYYY-MM-DD')

            return data.txId?.toLowerCase().includes(val?.toLowerCase())
                && (!selection.asset || data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase())
                && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
        });
        setTxListFilter(filterDate);
    };
    const MyPagination = ({ total, onChange, current }: any) => {
        return (
            <Pagination
                onChange={onChange}
                total={total}
                current={current}
                pageSize={pageSize}
                responsive={true}
                style={{
                    padding: '5px', textAlign: 'center'
                }}
            />
        );
    };
    return (
        <div className='flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x '>
            <div className='d-flex transaction_filters margin-b-3x'>
                <div>
                    <label>Type</label> <br />
                    <Select defaultValue="all" onChange={handleChangeType}>
                        <Option value="all">All</Option>
                        <Option value="DEPOSIT_CYRPTO">Deposit</Option>
                        <Option value="WITHDRAW_CRYPTO">Withdraw</Option>
                        <Option value="WITHDRAW_REWARDS">Reward Withdraw</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Time</label> <br />
                    <Select defaultValue="30" onChange={handleChangeTime}>
                        <Option value="all">All</Option>
                        <Option value="7">Past 7 days</Option>
                        <Option value="30">Past 30 days</Option>
                        <Option value="90">Past 90 days</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Asset</label> <br />
                    <Select defaultValue="all" onChange={handleChangeAsset}>
                        <Option value="all">All</Option>
                        <Option value="IN500">IN500 <span>Indexx 500</span></Option>
                        <Option value="INXC">INXC <span>Indexx Crypto</span></Option>
                        <Option value="INEX">INEX <span>Indexx Exchange</span></Option>
                        <Option value="IUSD+">IUSD+ <span>Indexx USD+</span></Option>
                        <Option value="INXP">INXP <span>Indexx Phoenix</span></Option>
                        <Option value="BNB">BNB <span>Binance</span></Option>
                        <Option value="FTT">FTT <span>FTX Token</span></Option>
                        <Option value="ETH">ETH <span>Ethereum</span></Option>
                        <Option value="BTC">BTC <span>Bitcoin</span></Option>
                        <Option value="LTC">LTC <span>Litecoin</span></Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Status</label> <br />
                    <Select defaultValue="all" onChange={handleChangeStatus}>
                        <Option value="all">All</Option>
                        <Option value="Completed">Completed</Option>
                        {/* ask */}
                        <Option value="Pending">Pending</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Transaction Hash</label> <br />
                    <Input size="large" placeholder="Search Transaction hash" style={{ height: "55px" }} value={valueInput} onChange={onChageSearch} maxLength={50} />
                </div>
            </div>
            <Table columns={columns} pagination={false} dataSource={getData(current, pageSize)} className="transaction_crypto_history" />
            <MyPagination
                total={txListFilter && txListFilter.length}
                current={current}
                onChange={setCurrent}
            />
        </div>
    )
}

export default BSTransactionCryptoHistoryTable