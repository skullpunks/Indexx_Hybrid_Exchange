import { SearchOutlined } from '@ant-design/icons';
import { Input, Table, Tabs } from 'antd'
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React from 'react'
// import { Link } from 'react-router-dom'
import { decodeJWT, getUserWallets } from '../../services/api';

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
    coinSymbol: any;
    coinName: any;
    coinBalance: any;
    coinBalanceInUSD: any;
    coinBalanceInBTC: any;
}
const BSWalletTable = () => {

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };



    const columns: ColumnsType<DataType> = [
        {
            title: 'Asset',
            dataIndex: 'coinSymbol',
            render: (_, record) => {
                return record.coinSymbol + " " + record.coinName;
            },
        },
        {
            title: 'Allocations',
            dataIndex: 'coinBalance',
        },
        {
            title: 'Balance',
            dataIndex: 'coinBalanceInUSD',
            sorter: {
                compare: (a, b) => a.coinBalanceInUSD - b.coinBalanceInUSD,
                multiple: 3,
            },
        },
        {
            title: 'Available Balance',
            dataIndex: 'coinBalanceInBTC',
            sorter: {
                compare: (a, b) => parseFloat(a.coinBalanceInBTC) - parseFloat(b.coinBalanceInBTC),
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
            dataIndex: 'coinBalance',
            sorter: {
                compare: (a, b) => a.coinBalance - b.coinBalance,
                multiple: 1,
            },
        },


    ];

    // const data: DataType[] = [
    //     {
    //         key: '6',
    //         favourite: false,
    //         name: 'USD',
    //         Price: "11.33",
    //         DailyChange: "+3.03%",
    //         DailyHigh: "$1.05",
    //         DailyLow: "91%",
    //         Volume: "$1.05M",
    //         MarketCap: "$10.05B",
    //         subName: "USD Dollar"
    //     },
    //     {
    //         key: '1',
    //         favourite: false,
    //         name: 'INEX',
    //         Price: "0.00005102",
    //         DailyChange: "12.09%",
    //         DailyHigh: "$10.00",
    //         DailyLow: "9%",
    //         Volume: "$100.00M",
    //         MarketCap: "$100.00B",
    //         subName: "Indexx Exchange"
    //     },
    //     {
    //         key: '2',
    //         favourite: false,
    //         name: 'IN500',
    //         Price: "0",
    //         DailyChange: "10.09%",
    //         DailyHigh: "$6.00",
    //         DailyLow: "0%",
    //         Volume: "$6.00M",
    //         MarketCap: "$61.00B",
    //         subName: "Index 500"
    //     },
    //     {
    //         key: '3',
    //         favourite: false,
    //         name: 'BTC',
    //         Price: "0",
    //         DailyChange: "10.09%",
    //         DailyHigh: "$6.00",
    //         DailyLow: "0%",
    //         Volume: "$6.00M",
    //         MarketCap: "$61.00B",
    //         subName: "Bitcoin"
    //     },
    //     {
    //         key: '4',
    //         favourite: true,
    //         name: 'INXC',
    //         Price: "0",
    //         DailyChange: "-9.09%",
    //         DailyHigh: "$6.00",
    //         DailyLow: "0%",
    //         Volume: "$18.00M",
    //         MarketCap: "$8.00B",
    //         subName: "Indexx Crypto"
    //     },
    //     {
    //         key: '5',
    //         favourite: true,
    //         name: 'iUSD+',
    //         Price: "0",
    //         DailyChange: "0.09",
    //         DailyHigh: "$5.00",
    //         DailyLow: "0%",
    //         Volume: "$0.009M",
    //         MarketCap: "$1.019B",
    //         subName: "Indexx USD+"
    //     }

    // ];

    let data: any[] = [{ "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x9a327efba5e175fb240f1b8b9326bdf10d9297b1", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Binance", "coinSymbol": "BNB", "coinDecimals": 18, "coinBalance": 0.10753, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-19T12:39:57.526Z", "coinLastUsedOn": "2022-10-19T12:39:57.526Z", "isCoinActive": true, "_id": "634ff01d03980b5c11c96f74" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x986081cb3253264f57535056b55673d4674038bf", "coinPrivateKey": "", "coinNetwork": "Ethereum", "coinName": "Ethereum", "coinSymbol": "ETH", "coinDecimals": 18, "coinBalance": 0.095925216001389, "coinBalanceInUSD": 123, "coinBalanceInBTC": 0.0065, "coinCreatedOn": "2022-10-19T17:12:33.087Z", "coinLastUsedOn": "2022-10-19T17:12:33.087Z", "isCoinActive": true, "_id": "63503001204238ba708ec2b2" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x43e4d660fa09b82d5c906d87f775eb6cd215ccff", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Indexx500", "coinSymbol": "IN500", "coinDecimals": 18, "coinBalance": 10, "coinBalanceInUSD": 37, "coinBalanceInBTC": 0.0019, "coinCreatedOn": "2022-10-20T01:27:32.295Z", "coinLastUsedOn": "2022-10-20T01:27:32.295Z", "isCoinActive": true, "_id": "6350a40436c8ac9aa13874ad" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "msT58masPu6racd9XFUHCSibfdwDPjZdgc", "coinPrivateKey": "", "coinNetwork": "Bitcoin", "coinName": "Bitcoin", "coinSymbol": "BTC", "coinDecimals": 8, "coinBalance": 0.0015, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-20T09:49:16.127Z", "coinLastUsedOn": "2022-10-20T09:49:16.127Z", "isCoinActive": true, "_id": "6351199c93823abe5ccbca1d" }];
    let totalBalanceInUSD = 0;
    let access_token = String(localStorage.getItem("access_token"));
    let decoded: any = decodeJWT(access_token);
    // onChange =>()= {
    // let userWallets = await getUserWallets(decoded.email);
    // // }
    // useEffect( async() {
    // await getUserWallets(decoded.email);
    // }, []);

    getUserWallets(decoded.email).then((userWallets) => {
        //data = [{ "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x9a327efba5e175fb240f1b8b9326bdf10d9297b1", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Binance", "coinSymbol": "BNB", "coinDecimals": 18, "coinBalance": 0.10753, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-19T12:39:57.526Z", "coinLastUsedOn": "2022-10-19T12:39:57.526Z", "isCoinActive": true, "_id": "634ff01d03980b5c11c96f74" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x986081cb3253264f57535056b55673d4674038bf", "coinPrivateKey": "", "coinNetwork": "Ethereum", "coinName": "Ethereum", "coinSymbol": "ETH", "coinDecimals": 18, "coinBalance": 0.095925216001389, "coinBalanceInUSD": 123, "coinBalanceInBTC": 0.0065, "coinCreatedOn": "2022-10-19T17:12:33.087Z", "coinLastUsedOn": "2022-10-19T17:12:33.087Z", "isCoinActive": true, "_id": "63503001204238ba708ec2b2" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x43e4d660fa09b82d5c906d87f775eb6cd215ccff", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Indexx500", "coinSymbol": "IN500", "coinDecimals": 18, "coinBalance": 10, "coinBalanceInUSD": 37, "coinBalanceInBTC": 0.0019, "coinCreatedOn": "2022-10-20T01:27:32.295Z", "coinLastUsedOn": "2022-10-20T01:27:32.295Z", "isCoinActive": true, "_id": "6350a40436c8ac9aa13874ad" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "msT58masPu6racd9XFUHCSibfdwDPjZdgc", "coinPrivateKey": "", "coinNetwork": "Bitcoin", "coinName": "Bitcoin", "coinSymbol": "BTC", "coinDecimals": 8, "coinBalance": 0.0015, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-20T09:49:16.127Z", "coinLastUsedOn": "2022-10-20T09:49:16.127Z", "isCoinActive": true, "_id": "6351199c93823abe5ccbca1d" }];
        for (let i = 0; i < data.length; i++) {
            totalBalanceInUSD += parseFloat(data[i].coinWalletBalanceInUSD);
        }
        console.log("data", data);
        console.log("totalBalanceInUSD", totalBalanceInUSD);
    })

    const operations = <Input size="small" className='orange_input' placeholder=" Search" prefix={<SearchOutlined />} />;

    return (
        <div>
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1" className='margin-t-2x orange'>
                <Tabs.TabPane tab="Balance" key="1" className='padding-2x'>
                    <div className='border-b-1x margin-b-2x'>
                        <Table className='custom_table' columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Deposits & Withdrawals" key="2" className='padding-2x'>
                    Order History Content
                </Tabs.TabPane> */}
            </Tabs>

        </div>
    )
}

export default BSWalletTable