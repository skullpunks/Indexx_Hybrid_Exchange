import { Pagination, Table, Tabs, theme } from 'antd';
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { decodeJWT, getUserWallets } from '../../services/api';
import { Button } from 'antd';
import BSStakingHistoryTable from '../BSStakingHistory/BSStakingHistoryTable';
import { useTheme } from '@mui/material';

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
}

interface HistoryProps {
  refresh: boolean;
}

const StakingTable: React.FC<HistoryProps> = ({ refresh }) => {
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const theme = useTheme();
  const [valueInput, setValueInput] = useState('');
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};

  const handleButtonInvest = (id: any) => {};

  const handleButtonWithdraw = (id: any) => {};

  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // const getCurrentDate = (): string => {
  //   return new Date().toLocaleString('en-US', options);
  // };

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const getCurrentDate = (): string => {
    return new Date().toLocaleDateString('en-US', dateOptions);
  };
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'coinSymbol',
      sorter: {
        compare: (a, b) => a.coinSymbol.localeCompare(b.coinSymbol),
        multiple: 1,
      },
      title: 'Date deposited',
      render: (_, record) => {
        return getCurrentDate();
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
      title: 'Duration',
      dataIndex: 'coinPrice',
      sorter: {
        compare: (a, b) => a.coinPrice - b.coinPrice,
        multiple: 3,
      },
      render: (_, record) => {
        return getCurrentDate();
      },
    },
    {
      title: 'Reward',
      dataIndex: 'coinBalanceInUSD',
      sorter: {
        compare: (a, b) =>
          a.coinBalance * a.coinPrice - b.coinBalance * b.coinPrice,
        multiple: 4,
      },
      render: (_, record) => record.coinBalance * record.coinPrice,
    },
    {
      title: 'Total',
      dataIndex: 'coinBalance',
      render: (_, record) => {
        return 0;
      },
      sorter: {
        compare: (a, b) => a.coinBalance - b.coinBalance,
        multiple: 5,
      },
      responsive: ['sm'],
    },
    {
      title: 'Remarks',
      dataIndex: 'coinBalanceInUSD',
      render: (_, record) => (
        <>
          <div
            className="d-flex flex-direction-row"
            style={{ marginTop: '8px', gap: 4 }}
          >
            <Button
              className="staking-btn"
              onClick={() => handleButtonInvest(record)}
            >
              Invest
            </Button>
            <Button
              className="staking-btn"
              onClick={() => handleButtonWithdraw(record)}
            >
              Withdraw
            </Button>
          </div>
        </>
      ),
    },
  ];

  //    const [walletData, setWalletData] = useState() as any;
  const [walletData, setWalletData] = useState<DataType[]>([]);
  const [filteredWalletData, setFilteredWalletData] = useState<DataType[]>([]);
  const [sortedData, setSortedData] = useState<DataType[]>([]);

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
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);
    let userWallets = await getUserWallets(decoded.email);
    setWalletData(
      userWallets.data.map((item: any) => ({ ...item, key: item._id }))
    );

    //setWalletData(userWallets.data);
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
  };
  useEffect(() => {
    setSortedData(
      filteredWalletData
        ? filteredWalletData.filter(
            (item: DataType) => !hideZeroBalance || item.coinBalance !== 0
          )
        : []
    );
  }, [filteredWalletData, hideZeroBalance]);

  useEffect(() => {
    if (valueInput === '') {
      setFilteredWalletData(walletData);
      return;
    }
    const temp = walletData.filter(
      (item) =>
        item.coinSymbol.toLowerCase().includes(valueInput.toLowerCase()) ||
        item.coinName.toLowerCase().includes(valueInput.toLowerCase())
    );

    setFilteredWalletData(temp);
  }, [valueInput, walletData]);

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    const xx =
      sortedData &&
      sortedData.slice((current - 1) * pageSize, current * pageSize);

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
          padding: '5px',
          textAlign: 'center',
        }}
      />
    );
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" className="margin-t-2x orange">
        <Tabs.TabPane
          tab="Rewards and Transactions"
          key="1"
          className="padding-2x font_30x"
          style={{ color: theme.palette.text.primary }}
        >
          {/* <div className="border-b-1x margin-b-2x"> */}
          {/* <div className='checkbox-container' style={{ textAlign: "right" }}>
                            <Checkbox checked={hideZeroBalance} onChange={handleCheckboxChange}>
                                Hide rows with 0 balance
                            </Checkbox>
                        </div> */}
          {/* <Table
              className="custom_table"
              columns={columns}
              dataSource={getData(current, pageSize)}
              onChange={onChange}
            />
            <MyPagination
              total={sortedData && sortedData.length}
              current={current}
              onChange={setCurrent}
            />
          </div> */}
          <BSStakingHistoryTable refresh={refresh} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default StakingTable;
