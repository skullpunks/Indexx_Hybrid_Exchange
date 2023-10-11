import { CopyOutlined } from '@ant-design/icons';
import { AutoComplete, Pagination, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../../../../services/api';
import useCopyToClipboard from '../../../../../utils/useCopyToClipboard';
import ShortenText from '../../../../../utils/ShortenText';
import moment from 'moment';

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


const TCaptTransactionHistoryTable: React.FC = () => {
    const [selection, setSelection] = useState({
        type: '',
        asset: '',
        status: '',
        time: '30',
        transactionHash: '',
    })
    const [txList, setTxList] = useState() as any;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [txListFilter, setTxListFilter] = useState() as any;
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [copiedValue, copy] = useCopyToClipboard();
    
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
            title: 'Transaction Hash',
            key: 'txId',
            render: (_, record) => (
                <span>
                    {/* {record.txId} */}
                    {/* {ShortenText(record.txId, 0, 20) + "..."} */}
                    {(record.txId.length > 20) ? ShortenText(record.txId, 0, 20) + "..." : record.txId}
                    <span>
                        <Tooltip title="Click to copy">
                        </Tooltip>
                        <CopyOutlined className='padding-lr-1x hover_icon' onClick={() => copy(record.txId)} />
                        {/* <LinkOutlined /> */}
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
                    {/* {record.to} */}

                    {(record.to.length > 20) ? ShortenText(record.to, 0, 20) + "..." : record.to}
                    <span>
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
        transactionList(decodedToken?.email).then((res) => {
            
            const results = res.data;
            let finalArr = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].transactionType?.includes('FIAT')) {
                    
                    finalArr.push(results[i]);
                } else {
                    
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
            const txListFilterData = txList.filter((data: any) => {
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
                
                return (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
                    && (!selection.type || data.transactionType?.toLowerCase() === selection.type?.toLowerCase())
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.transactionHash || data.txId?.toLowerCase().includes(selection.transactionHash?.toLowerCase()));
            })
            setTxListFilter(txListFilterData);
        }
    };


    const handleSearchHashId = (value: string) => {
        const txListFilterData = txList.filter((data: any) => {
            return data.txId?.toLowerCase() === value?.toLowerCase()
        })
        setTxListFilter(txListFilterData);
    };
    const handleSearch = (value: string) => {
        let res: { value: string; label: string }[] = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = txList.map((data: any) => ({
                value: data.txId,
                label: `${data.txId}`,
            }));
        }
        setOptions(res);
    };
    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = txListFilter && txListFilter.slice((current - 1) * pageSize, current * pageSize);
        
        return xx
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
        <div className='flex-align-stretch bs_main width-100  margin-t-3x  '>
            <div className='d-flex transaction_filters margin-b-3x'>
                <div>
                    <label>Type</label> <br />
                    <Select defaultValue="all" onChange={handleChangeType}>
                        <Option value="all">All</Option>
                        <Option value="DEPOSIT_FIAT">Deposit</Option>
                        <Option value="WITHDRAW_FIAT">Withdraw</Option>
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
                        <Option value="USD">USD</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Status</label> <br />
                    <Select defaultValue="all" onChange={handleChangeStatus}>
                        <Option value="all">All</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Transaction Hash</label> <br />
                    <AutoComplete
                        onSearch={handleSearch}
                        placeholder="Search transaction id"
                        onSelect={handleSearchHashId}
                        options={options}
                        allowClear={true}
                        style={{fontSize:"15px", width:"100%"}}
                    />
                </div>
            </div>
            <Table pagination={false} columns={columns} dataSource={getData(current, pageSize)} className="transaction_crypto_history" />
            <MyPagination
                total={txListFilter && txListFilter.length}
                current={current}
                onChange={setCurrent}
            />
        </div>
    )
}

export default TCaptTransactionHistoryTable