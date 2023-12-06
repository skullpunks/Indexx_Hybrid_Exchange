import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Pagination, Table, Tabs } from 'antd'
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react'
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
    coinPrice: any;
    coinStakedBalance: any;
}
const BSWalletTable = () => {
    const [hideZeroBalance, setHideZeroBalance] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setHideZeroBalance(e.target.checked);
    };

    const columns: ColumnsType<DataType> = [
        {
            dataIndex: 'coinSymbol',
            sorter: {
                compare: (a, b) => a.coinSymbol.localeCompare(b.coinSymbol),
                multiple: 1,
            },
            title: 'Asset',
            render: (_, record) => {
                const imageSrc = require(`../../assets/token-icons/${record.coinSymbol}.png`).default;
                return (
                    <>
                        <img src={imageSrc} alt={record.coinSymbol} width={30} height={30} style={{ marginRight: '8px' }} />
                        {record.coinSymbol} {record.coinName}
                    </>
                );
            },
        },
        {
            dataIndex: 'coinBalance',
            sorter: {
                compare: (a, b) => a.coinBalance - b.coinBalance,
                multiple: 2,
            },
            title: 'Balance',
        },
        {
            title: 'Coin Rate in USD',
            dataIndex: 'coinPrice',
            sorter: {
                compare: (a, b) => a.coinPrice - b.coinPrice,
                multiple: 3,
            },
        },
        {
            title: 'Total Value in USD',
            dataIndex: 'coinBalanceInUSD',
            sorter: {
                compare: (a, b) => {
                    const balanceA = a.coinStakedBalance !== undefined ? a.coinStakedBalance : a.coinBalance;
                    const balanceB = b.coinStakedBalance !== undefined ? b.coinStakedBalance : b.coinBalance;
                    return (balanceA * a.coinPrice) - (balanceB * b.coinPrice);
                },
                multiple: 4,
            },
            render: (_, record) => {
                const balance = record.coinStakedBalance !== undefined ? (record.coinStakedBalance + record.coinBalance) : record.coinBalance;
                return balance * record.coinPrice;
            }
        },
        {
            title: 'Staked Balance',
            dataIndex: 'coinStakedBalance',
            render: (_, record) => {
                return record.coinStakedBalance || 0;
            },
            sorter: {
                compare: (a, b) => (a.coinStakedBalance || 0) - (b.coinStakedBalance || 0),
                multiple: 5,
            },
            responsive: ["sm"],
        }

    ];

    const [walletData, setWalletData] = useState<DataType[]>([]);
    const [filteredWalletData, setFilteredWalletData] = useState<DataType[]>([]);
    const [sortedData, setSortedData] = useState<DataType[]>([]);

    const pageSize = 10;
    const [current, setCurrent] = useState(1);


    useEffect(() => {
        const getAllUserWallet = async () => {
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            let userWallets = await getUserWallets(decoded.email);
            const formattedData = userWallets.data.map((item: any) => ({ ...item, key: item._id }));
            setWalletData(formattedData);
        };
        getAllUserWallet();
    }, []);

    useEffect(() => {
        setSortedData(filteredWalletData ? filteredWalletData.filter((item: DataType) => !hideZeroBalance || item.coinBalance !== 0) : [])
    }, [filteredWalletData, hideZeroBalance])

    useEffect(() => {
        const filteredData = walletData.filter(item =>
            item.coinSymbol.toLowerCase().includes(valueInput.toLowerCase()) ||
            item.coinName.toLowerCase().includes(valueInput.toLowerCase())
        );
        const finalData = hideZeroBalance ? filteredData.filter(item => item.coinBalance !== 0) : filteredData;
        setSortedData(finalData);
    }, [walletData, valueInput, hideZeroBalance]);

    useEffect(() => {
        if (valueInput === "") {
            setFilteredWalletData(walletData);
            return
        }
        const temp = walletData.filter(item =>
            item.coinSymbol.toLowerCase().includes(valueInput.toLowerCase()) ||
            item.coinName.toLowerCase().includes(valueInput.toLowerCase())
        );

        setFilteredWalletData(temp);

    }, [valueInput, walletData])


    const onChageSearch = (e: any) => {
        let val = e.currentTarget.value;
        setValueInput(val);
    }

    const operations = <Input size="small" className='orange_input' placeholder=" Search" prefix={<SearchOutlined />} value={valueInput} onChange={onChageSearch} />;

    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = sortedData && sortedData.slice((current - 1) * pageSize, current * pageSize);

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
                        <div className='checkbox-container' style={{ textAlign: "right" }}>
                            <Checkbox checked={hideZeroBalance} onChange={handleCheckboxChange}>
                                Hide rows with 0 balance
                            </Checkbox>
                        </div>
                        <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} />
                        <MyPagination
                            total={sortedData && sortedData.length}
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