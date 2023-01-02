
import { Button, Pagination, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { marketsData,decodeJWT } from "../../services/api";

interface DataType {
    key: React.Key;
    Favourite: boolean;
    Name: string;
    Price: any;
    Change: any;
    DailyChange: any;
    DailyHigh: any;
    DailyLow: any;
    Volume: any;
    MarketCap: any;
    HighPrice: any;
    LowPrice: any;
    Symbol: any;
}
interface Props {
    search: string;
}

const MarketsTable: React.FC<(Props)> = ({ search }) => {
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [calledOnce, setCalledOnce] = useState(false);
    //const [email, setEmail] = useState('');
    const [marketData, setMarketData] = useState() as any;
    const [marketDataFixed, setMarketDataFixed] = useState() as any;

    // const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    //     console.log('params', pagination, filters, sorter, extra);
    // };
    const [isLoading, setLoadings] = useState(true);

    const tableLoading = {
        spinning: isLoading,
        indicator: <img src={require(`../../assets/arts/loaderIcon.gif`).default} alt="loader" width="38" height="38" />,
    }
    useEffect(() => {
        if (!calledOnce) {
            let access_token = String(localStorage?.getItem("access_token"));
            if (access_token !== "null" || access_token !== undefined) {
                let decoded: any = decodeJWT(access_token);
                console.log(decoded.email);
                setEmail(decoded.email);
            }
            marketsData().then((data) => {
                setMarketData(data.data);
                setMarketDataFixed(data.data);
                setCalledOnce(true);
                setLoadings(false)
            });
        }
        if (search) {
            const filterDate = marketDataFixed?.filter((data: any) => {
                return data.Symbol?.toLowerCase().includes(search?.toLowerCase()) || data.Price === +search || data.Name?.toLowerCase() === search?.toLowerCase()
            });
            setMarketData(filterDate);
        }
        else {
            setMarketData(marketDataFixed);
        }
    }, [calledOnce, email, marketDataFixed, search]);
    /*
    "Name": "Indexx500",
               "Symbol": "IN500",
               "Price": 3.86,
               "Volume": 209,
               "Change": -0.41,
               "IUSDPrice": 3.898989898989899,
               "MarketCap": "$1.838M",
               "CirculatingSupply": "66.5M",
               "LowPrice": 3.8,
               "HighPrice": 3.88*/

    const columns: ColumnsType<DataType> = [
        // {
        //     title: ' ',
        //     dataIndex: 'Favourite',
        //     render: (_, record) => {
        //         return (record?.Favourite === true) ? <StarOutlined className='color-warn font_20x' /> : <StarFilled className='font_20x' />;
        //     },
        //     responsive: ["sm"],
        // },
        {
            title: 'Pair Name',
            dataIndex: 'Symbol',
            render: (_, record) => {
                return <div>
                    <img src={require(`../../assets/token-icons/${record?.Symbol}.png`).default} alt="coin" width="30" height="30" />
                    <p style={{ marginTop: "-33px", marginLeft: "39px" }}>{record?.Name}</p>
                    <p style={{ marginTop: "-6px", marginLeft: "38px" }}>{record?.Symbol + '/USD'}</p>
                </div>;

            }
        },
        {
            title: 'Pair Price',
            dataIndex: 'Price',
            sorter: {
                compare: (a, b) => a.Price - b.Price,
                multiple: 3,
            },
            render: (_, record) => {
                return Math.floor(record?.Price * 100) / 100 + ' USD';
            },
        },
        {
            title: 'Daily Change',
            dataIndex: 'Change',
            sorter: {
                compare: (a, b) => parseFloat(a.Change) - parseFloat(b.Change),
                multiple: 2,
            },
            render: (_, record) => {
                let opts = { danger: false, success: false };
                if (parseFloat(record.Change) > 0) {
                    opts["success"] = true; opts["danger"] = false;
                }
                else {
                    opts["danger"] = true; opts["success"] = false;
                };

                let classNameLabel = (parseFloat(record.Change) > 0) ? "btn-success" : "btn-warn"
                return <Button type='primary' size="middle" {...opts} className={classNameLabel}>
                    {record.Change}
                </Button>
            },
            responsive: ["sm"],
        },
        {
            title: 'Daily High',
            dataIndex: 'HighPrice',
            sorter: {
                compare: (a, b) => a.HighPrice - b.HighPrice,
                multiple: 1,
            },
            responsive: ["sm"],
            render: (_, record) => {
                return '$ ' + record?.Price;
            }
        },
        {
            title: 'Daily Low',
            dataIndex: 'LowPrice',
            sorter: {
                compare: (a, b) => a.LowPrice - b.LowPrice,
                multiple: 1,
            },
            responsive: ["sm"],
            render: (_, record) => {
                return '$ ' + record?.Price;
            }
        },
        {
            title: 'Volume',
            dataIndex: 'Volume',
            sorter: {
                compare: (a, b) => a.Volume - b.Volume,
                multiple: 1,
            },
            render: (_, record) => {
                return Math.round(record?.Volume * 1000) / 1000;
            },
            responsive: ["sm"],
        },
        {
            title: 'Market Cap',
            dataIndex: 'MarketCap',
            sorter: {
                compare: (a, b) => a.MarketCap - b.MarketCap,
                multiple: 1,
            },
            responsive: ["sm"],
        },
        {
            title: 'Trade',
            dataIndex: 'MarketCap',
            render: (_) => (
                <Button type="primary" danger onClick={() => navigate(`/indexx-exchange/coming-soon?page=Trade`)}>
                    Trade
                </Button>
            ),
        },

    ];

    const showTopGainers = async () => {
        setMarketData(marketDataFixed.filter((x: any) => parseFloat(x.Change) > 0));
    }

    const showTopLosers = async () => {
        setMarketData(marketDataFixed.filter((x: any) => parseFloat(x.Change) < 0));
    }

    const showAll = async () => {
        setMarketData(marketDataFixed);
    }

    const showTredning = async () => {
        setMarketData(marketDataFixed.filter((x: any) => x.Symbol.includes('I')));
    }

    const getData = (current: number, pageSize: number) => {
        // Normally you should get the data from the server
        const xx = marketData && marketData.slice((current - 1) * pageSize, current * pageSize);
        console.log(xx)
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
    // const data: DataType[] = [
    //     {
    //         key: '1',
    //         favourite: false,
    //         name: 'Indexx Exchange',
    //         Price: "$10",
    //         DailyChange: "12.09%",
    //         DailyHigh: "$10.00",
    //         DailyLow: "$12.09%",
    //         Volume: "$100.00M",
    //         MarketCap: "$100.00B",
    //     },
    //     {
    //         key: '2',
    //         favourite: false,
    //         name: 'Index 500',
    //         Price: "$6",
    //         DailyChange: "10.09%",
    //         DailyHigh: "$6.00",
    //         DailyLow: "$10.00",
    //         Volume: "$6.00M",
    //         MarketCap: "$61.00B",
    //     },
    //     {
    //         key: '3',
    //         favourite: true,
    //         name: 'Indexx Crypto',
    //         Price: "$18",
    //         DailyChange: "-9.09%",
    //         DailyHigh: "$6.00",
    //         DailyLow: "$6.00",
    //         Volume: "$18.00M",
    //         MarketCap: "$8.00B",
    //     },
    //     {
    //         key: '4',
    //         favourite: true,
    //         name: 'Indexx Fortune',
    //         Price: "$0.019",
    //         DailyChange: "0.09",
    //         DailyHigh: "$5.00",
    //         DailyLow: "$0.019",
    //         Volume: "$0.009M",
    //         MarketCap: "$1.019B",
    //     },
    //     {
    //         key: '5',
    //         favourite: true,
    //         name: 'Indexx Fortune',
    //         Price: "$0.019",
    //         DailyChange: "+2.78%",
    //         DailyHigh: "$0.09",
    //         DailyLow: "$0.09",
    //         Volume: "$0.09M",
    //         MarketCap: "$2.09B",
    //     },
    //     {
    //         key: '6',
    //         favourite: false,
    //         name: 'Indexx Fortune',
    //         Price: "$0.09",
    //         DailyChange: "+3.03%",
    //         DailyHigh: "$1.05",
    //         DailyLow: "$1.05",
    //         Volume: "$1.05M",
    //         MarketCap: "$10.05B",
    //     },
    // ];

    return (
        <div>

            <div className='grey-strip d-flex'>
            <Button className='white-strip' onClick={() => showAll()}>All</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showTopGainers()}>Top Gainers</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showTopLosers()}>Top Losers</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showAll()}>New Listings</Button>
                <Button className='white-strip d-md-block d-none' onClick={() => showTredning()}>Trending</Button>
            </div>
            <div className='tab-body-container'>
            <Table pagination={false} columns={columns} dataSource={getData(current, pageSize)} loading={tableLoading} />
                <MyPagination
                    total={marketData && marketData.length}
                    current={current}
                    onChange={setCurrent}
                />
            </div>
        </div>
    )
}

export default MarketsTable