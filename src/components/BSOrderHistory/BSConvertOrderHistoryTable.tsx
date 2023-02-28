import { Input, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, getUserOrders } from '../../services/api';

const { Option } = Select;

interface DataType {
    key: string;
    time: string;
    status: string;
    paymentType: string;
    amount: string;
    finalAmount: string;
    destination: string;
    exchangeFees: string;
    orderRate: string;
    orderType: string;
    orderId: string;
}


const BSConvertOrderHistoryTable: React.FC = () => {
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [orderList, setOrderList] = useState() as any;
    const [orderListFilter, setOrderTxListFilter] = useState() as any;
    const [isLoading, setLoadings] = useState(true);
    const [valueInput, setValueInput] = useState('');
    const [selection, setSelection] = useState({
        asset: '',
        status: '',
        time: '30',
        orderId: '',
    })
    const tableLoading = {
        spinning: isLoading,
        indicator: <img src={require(`../../assets/arts/loaderIcon.gif`).default} alt="loader" width="50" height="50" />,
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
                    {record.breakdown.inAamount}

                    {record.breakdown.inCurrenyName}
                </React.Fragment>
            ),
            responsive: ["xs"]
        },
        {
            title: "Final Amount",
            render: (record) => (
                <React.Fragment>
                    {record.breakdown.outAmount}

                    {record.breakdown.outCurrencyName}
                </React.Fragment>
            ),
            responsive: ["xs"]
        },
        {
            title: 'Order Date and Time',
            dataIndex: 'created',
            key: 'created',
            render: text => <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>,
            responsive: ["sm"],
        },
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            key: 'orderId',
            render: text => <span>{text}</span>,
            responsive: ["sm"],
        },
        {
            title: 'Order Rate',
            dataIndex: 'orderRate',
            key: 'orderRate',
            render: text => <span>{text.rate} USD</span>,
            responsive: ["sm"]
        },
        {
            title: 'Order Type',
            dataIndex: 'orderType',
            key: 'orderType',
            render: text => <span>{text}</span>,
            responsive: ["sm"],
        },
        {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'breakdown',
            render: text => <span>{text.inAmount} {text.inCurrenyName}</span>,
            responsive: ["sm"],
        },
        {
            title: 'Final Amount',
            key: 'amount',
            dataIndex: 'breakdown',
            render: text => <span>{Math.floor(text.outAmount * 1000) / 1000} {text.outCurrencyName}</span>,
            responsive: ["sm"],
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            responsive: ["sm"],
        },
        {
            title: 'Payment Type',
            key: 'paymentType',
            dataIndex: 'paymentType',
            responsive: ["sm"],
        },
        {
            title: 'Exchange Fees',
            key: 'exchangeFees',
            dataIndex: 'exchangeFees',
            responsive: ["sm"],
        },

    ];


    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const decodedToken: any = decodeJWT(String(token)) as any;
        getUserOrders(decodedToken?.email).then((res) => {
            const results = res.data;
            let finalArr = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].orderType?.includes('Sell') || results[i].orderType?.includes('Buy')) {

                } else {
                    finalArr.push(results[i]);
                }
            }
            setOrderList(finalArr);
            setOrderTxListFilter(finalArr);
            setLoadings(false);
        });
    }, []);

    const handleChangeTime = (value: string) => {
        const pastDate = moment().subtract(+value, "days").format('YYYY-MM-DD')
        if (!isNaN(+value)) {
            setSelection({
                asset: selection.asset,
                status: selection.status,
                time: value,
                orderId: selection.orderId,
            });
            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                return moment(pastDate).isSameOrBefore(valueDate)
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.asset || data.breakdown.outCurrencyName?.toLowerCase() === selection.asset?.toLowerCase())

            })
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                asset: selection.asset,
                status: selection.status,
                time: "",
                orderId: selection.orderId,
            });
            const txListFilterData = orderList.filter((data: any) => {
                return (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.asset || data.breakdown.outCurrencyName?.toLowerCase() === selection.asset?.toLowerCase())

            })
            setOrderTxListFilter(txListFilterData);
        }
    };
    const handleChangeStatus = (value: string) => {
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')

        if (value !== 'all') {
            setSelection({
                asset: selection.asset,
                status: value,
                time: selection.time,
                orderId: selection.orderId,
            });

            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return data.status?.toLowerCase() === value?.toLowerCase()
                    && (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.asset || data.breakdown.outCurrencyName?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))

            })
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                asset: selection.asset,
                status: '',
                time: selection.time,
                orderId: selection.orderId,
            });
            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.asset || data.breakdown.outCurrencyName?.toLowerCase() === selection.asset?.toLowerCase())
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))

                // data.status?.toLowerCase() === value?.toLowerCase() 
            })
            setOrderTxListFilter(txListFilterData)
        }

    };


    const handleChangeAsset = (value: string) => {
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')
        if (value !== 'all') {
            setSelection({
                asset: value,
                status: selection.status,
                time: selection.time,
                orderId: selection.orderId,
            });
            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return data.breakdown.outCurrencyName?.toLowerCase() === value?.toLowerCase()
                    && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))

            })
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setSelection({
                asset: '',
                status: selection.status,
                time: selection.time,
                orderId: selection.orderId,
            });
            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')

                return (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                    && (!selection.orderId || data.orderId?.toLowerCase().includes(selection.orderId?.toLowerCase()))
                    && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))

                // data.status?.toLowerCase() === value?.toLowerCase() 
            })
            setOrderTxListFilter(txListFilterData)
        }

    };

    const onChageSearch = (e: any) => {
        let val = e.currentTarget.value;
        setValueInput(val)
        const pastDate = moment().subtract(+selection.time, "days").format('YYYY-MM-DD')
        setSelection({
            asset: selection.asset,
            status: selection.status,
            time: selection.time,
            orderId: val,
        });
        const filterDate = orderList?.filter((data: any) => {
            let valueDate = moment(data.created).format('YYYY-MM-DD')

            return data.orderId?.toLowerCase().includes(val?.toLowerCase())
                && (!selection.status || data.status?.toLowerCase() === selection.status?.toLowerCase())
                && (!selection.asset || data.breakdown.outCurrencyName?.toLowerCase() === selection.asset?.toLowerCase())
                && (!selection.time || moment(pastDate).isSameOrBefore(valueDate))
        });
        setOrderTxListFilter(filterDate);

    };
    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = orderListFilter && orderListFilter.slice((current - 1) * pageSize, current * pageSize);
        return xx;
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
                        <Option value="BNB">BNB <span>Binance</span></Option>
                        <Option value="INXP">INXP <span>Indexx Phoenix</span></Option>
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
                        <Option value="Quoted">Quoted</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Order Id</label> <br />
                    <Input size="large" placeholder="Search Order Id" style={{ height: "55px" }} value={valueInput} onChange={onChageSearch} maxLength={50} />
                </div>
            </div>
            <Table columns={columns} pagination={false} dataSource={getData(current, pageSize)} className="transaction_crypto_history" loading={tableLoading} />
            <MyPagination
                total={orderListFilter && orderListFilter.length}
                current={current}
                onChange={setCurrent}
            />
        </div>
    )
}

export default BSConvertOrderHistoryTable