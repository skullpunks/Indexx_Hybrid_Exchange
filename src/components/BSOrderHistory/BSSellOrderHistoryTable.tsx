import { AutoComplete, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { decodeJWT, getUserOrders } from '../../services/api';
import moment from 'moment';

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


const BSSellOrderHistoryTable: React.FC = () => {
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [orderList, setOrderList] = useState() as any;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [orderListFilter, setOrderTxListFilter] = useState() as any;
    const [isLoading, setLoadings] = useState(true);
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
                if (results[i].orderType?.includes('Buy') || results[i].orderType?.includes('Convert')) {

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
        if (!isNaN(+value)) {
            const pastDate = moment().subtract(+value, "days").format('YYYY-MM-DD')
            const txListFilterData = orderList.filter((data: any) => {
                let valueDate = moment(data.created).format('YYYY-MM-DD')
                return moment(pastDate).isSameOrBefore(valueDate)
            })
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setOrderTxListFilter(orderList)
        }

    };
    const handleChangeStatus = (value: string) => {
        if (value !== 'all') {
            const txListFilterData = orderList.filter((data: any) => {
                return data.status?.toLowerCase() === value?.toLowerCase()
            })
            console.log(txListFilterData);
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setOrderTxListFilter(orderList)
        }
    };

    
    const handleChangeAsset = (value: string) => {
        if (value !== 'all') {
            const txListFilterData = orderList.filter((data: any) => {
                return data.breakdown.outCurrencyName?.toLowerCase() === value?.toLowerCase()
            })
            setOrderTxListFilter(txListFilterData);
        }
        else {
            setOrderTxListFilter(orderList)
        }
    };


    const handleSearchHashId = (value: string) => {
        const txListFilterData = orderList.filter((data: any) => {
            return data.orderId?.toLowerCase() === value?.toLowerCase()
        })
        setOrderTxListFilter(txListFilterData);
    };

    const handleSearch = (value: string) => {
        let res: { value: string; label: string }[] = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = orderList.map((data: any) => ({
                value: data.orderId,
                label: `${data.orderId}`,
            }));
        }
        setOptions(res);
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
                        <Option value="Quoted">Quoted</Option>
                    </Select>
                </div>
                <div className='d-md-block d-none'>
                    <label>Order Id</label> <br />
                    <AutoComplete
                        onSearch={handleSearch}
                        placeholder="Search order id"
                        onSelect={handleSearchHashId}
                        options={options}
                        allowClear={true}
                    />
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

export default BSSellOrderHistoryTable