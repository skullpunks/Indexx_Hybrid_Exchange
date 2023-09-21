import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Pagination, Table, Tabs } from 'antd'
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { decodeJWT, getUserWallets } from '../../services/api';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

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
    const [hideZeroBalance, setHideZeroBalance] = useState(false);
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        
    };

    
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setHideZeroBalance(e.target.checked);
    };
    

    // const handleCheckboxChange = (e) => {
    //     setHideZeroBalance(e.target.checked);
    // };

    
    const columns: ColumnsType<DataType> = [
        {
            title: 'Asset',
            dataIndex: 'coinSymbol',
            render: (_, record) => {
                return record.coinSymbol + " " + record.coinName;
            },
        },
        // {
        //     title: 'Allocations',
        //     dataIndex: 'coinBalance',
        //     render: (_, record) => {
        //         return Math.floor(record.coinBalance * 10000000) / 100000000;
        //     },
        // },
        {
            title: 'Balance',
            dataIndex: 'coinBalance',
            sorter: {
                compare: (a, b) => a.coinBalanceInUSD - b.coinBalanceInUSD,
                multiple: 3,
            },
        },
        {
            title: 'Available Balance',
            dataIndex: 'coinBalance',
            sorter: {
                compare: (a, b) => parseFloat(a.coinBalanceInBTC) - parseFloat(b.coinBalanceInBTC),
                multiple: 2,
            },
            responsive: ["sm"],
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
            render: (_, record) => {
                return 0;
            },
            sorter: {
                compare: (a, b) => a.coinBalance - b.coinBalance,
                multiple: 1,
            },
            responsive: ["sm"],
        },

    ];

    const [walletData, setWalletData] = useState() as any;
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    // let data: any[] = [{ "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x9a327efba5e175fb240f1b8b9326bdf10d9297b1", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Binance", "coinSymbol": "BNB", "coinDecimals": 18, "coinBalance": 0.10753, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-19T12:39:57.526Z", "coinLastUsedOn": "2022-10-19T12:39:57.526Z", "isCoinActive": true, "_id": "634ff01d03980b5c11c96f74" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x986081cb3253264f57535056b55673d4674038bf", "coinPrivateKey": "", "coinNetwork": "Ethereum", "coinName": "Ethereum", "coinSymbol": "ETH", "coinDecimals": 18, "coinBalance": 0.095925216001389, "coinBalanceInUSD": 123, "coinBalanceInBTC": 0.0065, "coinCreatedOn": "2022-10-19T17:12:33.087Z", "coinLastUsedOn": "2022-10-19T17:12:33.087Z", "isCoinActive": true, "_id": "63503001204238ba708ec2b2" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x43e4d660fa09b82d5c906d87f775eb6cd215ccff", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Indexx500", "coinSymbol": "IN500", "coinDecimals": 18, "coinBalance": 10, "coinBalanceInUSD": 37, "coinBalanceInBTC": 0.0019, "coinCreatedOn": "2022-10-20T01:27:32.295Z", "coinLastUsedOn": "2022-10-20T01:27:32.295Z", "isCoinActive": true, "_id": "6350a40436c8ac9aa13874ad" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "msT58masPu6racd9XFUHCSibfdwDPjZdgc", "coinPrivateKey": "", "coinNetwork": "Bitcoin", "coinName": "Bitcoin", "coinSymbol": "BTC", "coinDecimals": 8, "coinBalance": 0.0015, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-20T09:49:16.127Z", "coinLastUsedOn": "2022-10-20T09:49:16.127Z", "isCoinActive": true, "_id": "6351199c93823abe5ccbca1d" }];


    useEffect(() => {
        // let access_token = String(localStorage.getItem("access_token"));
        // let decoded: any = decodeJWT(access_token);
        // getUserWallets(decoded.email).then((userWallets) => {
        //     //
        //     setWalletData(userWallets.data);
        // });
        getAllUserWallet();
    }, []);

    const getAllUserWallet = async () => {
        let access_token = String(localStorage.getItem("access_token"));
        let decoded: any = decodeJWT(access_token);
        let userWallets = await getUserWallets(decoded.email);
        
        setWalletData(userWallets.data);
        // let usersWallet = userWallets.data;
        // let totalBalInUSD = 0;
        // for (let i = 0; i < usersWallet.length; i++) {
        //     if(usersWallet[i].coinType === "Crypto") {
        //         
        //        let res = await getCoinPriceByName(usersWallet[i]?.coinSymbol);
        //        let price = res.data.results.data;
        //        totalBalInUSD += userWallets[i]?.coinBalance * price;
        //     } else {
        //         totalBalInUSD += parseFloat(userWallets[i]?.coinBalance);
        //     }
        //     setTotalBalanceInUSD(totalBalInUSD)
        // }
    }


    const operations = <Input size="small" className='orange_input' placeholder=" Search" prefix={<SearchOutlined />} />;
 
    
    const filteredWalletData = walletData ? walletData.filter((item: DataType) => !hideZeroBalance || item.coinBalance !== 0) : [];

    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = filteredWalletData && filteredWalletData.slice((current - 1) * pageSize, current * pageSize);
        
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
        <div>
           
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1" className='margin-t-2x orange'>
                <Tabs.TabPane tab="Balance" key="1" className='padding-2x'>
                    <div className='border-b-1x margin-b-2x'>
                    <div className='checkbox-container' style={{textAlign:"right"}}>
                            <Checkbox checked={hideZeroBalance} onChange={handleCheckboxChange}>
                                Hide rows with 0 balance
                            </Checkbox>
                        </div>
                        <Table className='custom_table' columns={columns}dataSource={getData(current, pageSize)} onChange={onChange} />
                        <MyPagination
                    total={filteredWalletData && filteredWalletData.length}
                    current={current}
                    onChange={setCurrent}
                />
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