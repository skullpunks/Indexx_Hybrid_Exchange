
import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
// import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { decodeJWT, marketsData } from "../../services/api";

interface DataType {
    key: React.Key;
    Favourite: boolean;
    name: string;
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
    BTCPrice: any
}
interface Props {
    search: string;
}
const MarketsBTCTable: React.FC<(Props)> = ({ search }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [calledOnce, setCalledOnce] = useState(false);
    const [marketData, setMarketData] = useState() as any;
    const [marketDataFixed, setMarketDataFixed] = useState() as any;
    const pageSize = 10;
    const [current, setCurrent] = useState(1);


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
                console.log(email);
            }
            marketsData().then((data) => {
                const res = data?.data?.filter((x: any) => x.Symbol !== 'BTC')
                console.log(res);
                setMarketData(res);
                setMarketDataFixed(res);
                setCalledOnce(true);
                setLoadings(false);
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
                return record?.Symbol + '/BTC';
            }
        },
        {
            title: 'Pair Price',
            dataIndex: 'BTCPrice',
            sorter: {
                compare: (a, b) => a.BTCPrice
                    - b.BTCPrice,
                multiple: 3,
            },
            render: (_, record) => {
                return Math.floor(record?.BTCPrice * 10000000) / 10000000 + ' BTC';
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
                    {Math.floor(record.Change * 100) / 100} %
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
                return '$ ' + record?.HighPrice;
            },
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
                return '$ ' + record?.LowPrice;
            },
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
    return (
        <div>
            <div className='grey-strip d-flex market_button_strips'>
                <Button className='white-strip' onClick={() => showAll()}>All</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showTopGainers()}>Top Gainers</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showTopLosers()}>Top Losers</Button>
                <Button className='white-strip margin-lr-2x' onClick={() => showAll()}>New Listings</Button>
                <Button className='white-strip d-md-block d-none' onClick={() => showTredning()}>Trending</Button>
                {/* <Button className='white-strip last-item d-md-block d-none'>ID</Button> */}
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

export default MarketsBTCTable
