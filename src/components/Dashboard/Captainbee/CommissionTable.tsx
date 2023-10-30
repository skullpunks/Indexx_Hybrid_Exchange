import { Pagination, Table, Tabs } from 'antd';
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { commissionList, decodeJWT, getUserWallets } from '../../../services/api'
import { Button } from 'antd';

interface DataType {
  beeType: string;
  captainBeeEmail: string;
  created: Date;
  rank: string;  // We still don't have rank data
  finalCommissionAmountInUSD: number;
  orderAmount: number;
}

type CommissionTableProps = {
  leaderEmail: string;
};


const CommissionTable: React.FC<CommissionTableProps> = ({ leaderEmail }) => {
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => { };

  const handleButtonInvest = (id: any) => { };

  const handleButtonWithdraw = (id: any) => { };

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
      dataIndex: 'beeType',
      title: 'Type',
      sorter: (a, b) => a.beeType.localeCompare(b.beeType),
      render: (_, record) => {
        return record.beeType ? record.beeType : "Captain";
      },
    },
    {
      title: 'Name',
      dataIndex: 'captainBeeEmail',
      sorter: (a, b) => a.captainBeeEmail.localeCompare(b.captainBeeEmail),
      render: (_, record) => {
        return record.captainBeeEmail.split('@')[0];  // Extract name from email
      },
    },
    {
      dataIndex: 'created',
      title: 'Date',
      sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      render: (_, record) => {
        return new Date(record.created).toLocaleDateString();
      },
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      responsive: ['sm'],
      sorter: (a, b) => a.rank.localeCompare(b.rank),
      render: () => {
        return "Bronze";  // Need to adjust based on actual rank data
      },
    },
    {
      title: 'Commission',
      dataIndex: 'finalCommissionAmountInUSD',
      sorter: (a, b) => a.finalCommissionAmountInUSD - b.finalCommissionAmountInUSD,
      render: (_, record) => "$" + parseFloat(String(record.finalCommissionAmountInUSD)).toFixed(2),
    },
    {
      title: 'Order Total',
      dataIndex: 'orderAmount',
      sorter: (a, b) => a.orderAmount - b.orderAmount,
      render: (_, record) => {
        return "$" + parseFloat(String(record.orderAmount)).toFixed(2);
      },
    },
  ];


  interface CommissionDataType {
    _id: string;
    totalCommissionEarned: {
      amountInINEX: number;
      amountInUSD: number;
    };
    totalCommissionToBePaid: {
      amountInINEX: number;
      amountInUSD: number;
    };
    commissionPercentage: number;
    rank: string;
  }


  const topcolumns: ColumnsType<CommissionDataType> = [
    {
      dataIndex: 'totalCommissionEarned',
      title: 'Commission Earned (All Time)',
      align: "center",
      render: (_, record) => "$" + (record.totalCommissionEarned.amountInUSD).toFixed(2),
    },
    {
      dataIndex: 'totalCommissionToBePaid',
      title: 'Commission Due',
      align: "center",
      render: (_, record) => "$" + (record.totalCommissionToBePaid.amountInUSD).toFixed(2),
    },
    {
      dataIndex: 'commissionPaid',
      title: 'Commission Paid (All Time)',
      align: "center",
      render: (_, record) => "$" + (record.totalCommissionEarned.amountInUSD - record.totalCommissionToBePaid.amountInUSD).toFixed(2),
    },
    {
      dataIndex: 'commissionPercentage',
      title: 'Commission Percentage',
      align: "center",
      render: (_, record) => record.commissionPercentage + "%",
    },
  ];


  //    const [walletData, setWalletData] = useState() as any;
  const [walletData, setWalletData] = useState<DataType[]>([]);
  const [sortedData, setSortedData] = useState<DataType[]>([]);
  const [commissionPaidData, setCommissionPaidData] = useState<CommissionDataType[]>([]);
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  // let data: any[] = [{ "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x9a327efba5e175fb240f1b8b9326bdf10d9297b1", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Binance", "coinSymbol": "BNB", "coinDecimals": 18, "coinBalance": 0.10753, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-19T12:39:57.526Z", "coinLastUsedOn": "2022-10-19T12:39:57.526Z", "isCoinActive": true, "_id": "634ff01d03980b5c11c96f74" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x986081cb3253264f57535056b55673d4674038bf", "coinPrivateKey": "", "coinNetwork": "Ethereum", "coinName": "Ethereum", "coinSymbol": "ETH", "coinDecimals": 18, "coinBalance": 0.095925216001389, "coinBalanceInUSD": 123, "coinBalanceInBTC": 0.0065, "coinCreatedOn": "2022-10-19T17:12:33.087Z", "coinLastUsedOn": "2022-10-19T17:12:33.087Z", "isCoinActive": true, "_id": "63503001204238ba708ec2b2" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "0x43e4d660fa09b82d5c906d87f775eb6cd215ccff", "coinPrivateKey": "", "coinNetwork": "Binance Smart Chain", "coinName": "Indexx500", "coinSymbol": "IN500", "coinDecimals": 18, "coinBalance": 10, "coinBalanceInUSD": 37, "coinBalanceInBTC": 0.0019, "coinCreatedOn": "2022-10-20T01:27:32.295Z", "coinLastUsedOn": "2022-10-20T01:27:32.295Z", "isCoinActive": true, "_id": "6350a40436c8ac9aa13874ad" }, { "userId": "63495a547aa72680b1562302", "coinType": "Crypto", "coinWalletAddress": "msT58masPu6racd9XFUHCSibfdwDPjZdgc", "coinPrivateKey": "", "coinNetwork": "Bitcoin", "coinName": "Bitcoin", "coinSymbol": "BTC", "coinDecimals": 8, "coinBalance": 0.0015, "coinBalanceInUSD": 29, "coinBalanceInBTC": 0.0015, "coinCreatedOn": "2022-10-20T09:49:16.127Z", "coinLastUsedOn": "2022-10-20T09:49:16.127Z", "isCoinActive": true, "_id": "6351199c93823abe5ccbca1d" }];

  useEffect(() => {
    getAllUserWallet();
    getCommissionHistory();
  }, []);

  const getAllUserWallet = async () => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);
    let userWallets = await getUserWallets(decoded.email);
    setWalletData(
      userWallets.data.map((item: any) => ({ ...item, key: item._id }))
    );
  };

  const getCommissionHistory = async () => {
    if (leaderEmail === undefined || leaderEmail === null) {
      console.log("leader email is null")
      let access_token = String(localStorage.getItem('access_token'));
      let decoded: any = decodeJWT(access_token);
      let commissionHistory = await commissionList(decoded.email);
      const results = commissionHistory?.data?.getAllCommissionRecordsData;
      const reversedResults = [...results].reverse(); // Create a copy and reverse the order
      setCommissionPaidData(commissionHistory?.data?.commissionPaidAndDueData)
      setSortedData(reversedResults);
    } else {
      console.log("leader email is exists")
      let commissionHistory = await commissionList(leaderEmail);
      const results = commissionHistory?.data?.getAllCommissionRecordsData;
      const reversedResults = [...results].reverse(); // Create a copy and reverse the order
      setCommissionPaidData(commissionHistory?.data?.commissionPaidAndDueData)
      setSortedData(reversedResults);
    }
  }

  // useEffect(() => {
  //   setSortedData(filteredWalletData ? filteredWalletData.filter((item: DataType) => !hideZeroBalance || item.coinBalance !== 0) : [])
  // }, [filteredWalletData, hideZeroBalance])

  // useEffect(() => {
  //   if (valueInput === '') {
  //     setFilteredWalletData(walletData);
  //     return;
  //   }
  //   const temp = walletData.filter(
  //     (item) =>
  //       item.coinSymbol.toLowerCase().includes(valueInput.toLowerCase()) ||
  //       item.coinName.toLowerCase().includes(valueInput.toLowerCase())
  //   );

  //   setFilteredWalletData(temp);
  // }, [valueInput, walletData]);

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
        className="font_20x fw-bold pt-3 d-flex justify-content-center" style={{ color: "#393939" }}>
        Affiliate Report / Commission Report
      </div>
      <div className="border-b-1x margin-b-2x pt-3">
        <Table<CommissionDataType>
          className="custom_table2"
          columns={topcolumns}
          dataSource={commissionPaidData}
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
