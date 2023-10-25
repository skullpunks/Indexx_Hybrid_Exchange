import { Pagination, Table, Tabs } from 'antd';
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { decodeJWT, getUserWallets } from '../../../services/api'
import { Button } from 'antd';

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
  commissionEarned: any;
  commissionPaid: any;
  commissionDue: any;
}
const CommissionTable = () => {
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
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
      dataIndex: 'coinBalance',
      sorter: {
        compare: (a, b) => a.coinBalance - b.coinBalance,
        multiple: 1,
      },
      title: 'Type',
      render: (_, record) => {
        return "Captain Bee";
      },
    },
    {
      title: 'Name',
      dataIndex: 'coinPrice',
      sorter: {
        compare: (a, b) => a.coinPrice - b.coinPrice,
        multiple: 2,
      },
      render: (_, record) => {
        return "Kamal";
      },
    },
    {
      dataIndex: 'coinSymbol',
      sorter: {
        compare: (a, b) => a.coinSymbol.localeCompare(b.coinSymbol),
        multiple: 3,
      },
      title: 'Date',
      render: (_, record) => {
        return getCurrentDate();
      },
    },
    {
      title: 'Rank',
      dataIndex: 'coinBalance', 
      sorter: {
        compare: (a, b) => a.coinBalance - b.coinBalance,
        multiple: 5,
      },
      responsive: ['sm'],
      render: (_, record) => {
        return "Bronze";
      },
    },
    {
      title: 'Commission',
      dataIndex: 'coinBalanceInUSD',
      sorter: {
        compare: (a, b) =>
          a.coinBalance * a.coinPrice - b.coinBalance * b.coinPrice,
        multiple: 4,
      },
      render: (_, record) => "$"+String(record.coinBalance * record.coinPrice),
    },
    {
      title: 'Order Total',
      dataIndex: 'coinBalance',
      render: (_, record) => {
        return "$10.00";
      },
      sorter: {
        compare: (a, b) => a.coinBalance - b.coinBalance,
        multiple: 5,
      },
      responsive: ['sm'],
    },
    
  ];

  const topcolumns: ColumnsType<DataType> = [
    {
      dataIndex: 'commissionEarned',
      title: 'Commission Earned (All Time)',
      align:"center",
      render: (_, record) => "$"+String(record.commissionEarned),
    },
    {
      title: 'Commission Paid (All Time)',
      dataIndex: 'commissionPaid',
      align:"center",
      render: (_, record) => "$"+String(record.commissionPaid),

    },
    {
      dataIndex: 'commissionDue',
      title: 'Commission Due',
      align:"center",
      render: (_, record) => "$"+String(record.commissionDue),
    },
  ];

  const dataS = [
    {
      key: 1,
      commissionEarned: 100.0,
      commissionPaid: 75.0,
      commissionDue: 50.00,
      favourite: false,
      name: "ABCD",
      Price: 50,
      DailyChange: 50,
      DailyHigh: 50,
      DailyLow: 50,
      Volume: 50,
      MarketCap: 500,
      subName: "dfd",
      coinSymbol: "dfsf",
      coinName: "sffsdf",
      coinBalance: 50,
      coinBalanceInUSD: 40,
      coinBalanceInBTC: 10,
      coinPrice: 15,
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
  };
  useEffect(() => {
      setSortedData(filteredWalletData ? filteredWalletData.filter((item: DataType) => !hideZeroBalance || item.coinBalance !== 0) : [])
  }, [filteredWalletData, hideZeroBalance])

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
        <div
          className="font_20x fw-bold pt-3 d-flex justify-content-center" style={{color:"#393939"}}>
        Affiliate Report / Commission Report
        </div>
          <div className="border-b-1x margin-b-2x pt-3">
            {/* <div className='checkbox-container' style={{ textAlign: "right" }}>
                            <Checkbox checked={hideZeroBalance} onChange={handleCheckboxChange}>
                                Hide rows with 0 balance
                            </Checkbox>
                        </div> */}
            <Table
              className="custom_table2"
              columns={topcolumns}
              dataSource={dataS}
              onChange={onChange}
            />
            <Table
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
          </div>
    </div>
  );
};

export default CommissionTable;
