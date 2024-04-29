import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Pagination, Table, Tabs } from 'antd';
import { TableProps } from 'antd/es/table';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
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
  coinNetwork: any;
  type: 'Crypto' | 'Stock' | 'ETF' | 'Fiat';
}
const BSWalletTable = () => {
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [hideZeroStakedBalance, setHideZeroStakedBalance] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setHideZeroBalance(e.target.checked);
  };

  const etfs = ['ALCRYP', 'CRYC10', 'EQSTK', 'INDXXF', 'TOB'];

  const stocks = [
    'AMZN',
    'APPL',
    'BCM',
    'GOOGL',
    'META',
    'MSFT',
    'NVDA',
    'PEP',
  ];

  const cryptocurrencies = [
    'IN500',
    'INEX',
    'IUSD+',
    'INXC',
    'BNB',
    'BTC',
    'DAI',
    'DOGE',
    'DOT',
    'ETH',
    'LINK',
    'LTC',
    'MATIC',
    'TRX',
    'USDC',
    'USDT',
    'XRP',
    'WIBS',
    'ETH',
  ];
  const handleStakedCheckboxChange = (e: CheckboxChangeEvent) => {
    setHideZeroStakedBalance(e.target.checked);
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
        const imageSrc =
          record.coinSymbol === 'INEX' && record.coinNetwork === 'Polygon'
            ? require(`../../assets/token-icons/INEX-POLYGON.png`).default
            : require(`../../assets/token-icons/${record.coinSymbol}.png`)
                .default;
        return (
          <>
            <img
              src={imageSrc}
              alt={record.coinSymbol}
              width={
                ['INEX', 'IN500', 'INXC', 'IUSD'].some((str) =>
                  record.coinSymbol.includes(str)
                )
                  ? '52'
                  : '40'
              }
              style={{ marginRight: '8px' }}
            />
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
      render: (_, record) => record.coinBalance?.toLocaleString(),
    },
    {
      title: 'Coin Rate in USD',
      dataIndex: 'coinPrice',
      sorter: {
        compare: (a, b) => a.coinPrice - b.coinPrice,
        multiple: 4,
      },
      render: (_, record) => {
        // Check if the price is exactly 0.00021
        if (record.coinPrice === 0.00021) {
          return record.coinPrice.toFixed(5); // Fix to 5 decimal places
        } else {
          return record.coinPrice.toFixed(2); // Fix to 2 decimal places for all other values
        }
      },
    },
    {
      title: 'Total Value in USD',
      dataIndex: 'coinBalanceInUSD',
      sorter: (a, b) => a.coinBalanceInUSD - b.coinBalanceInUSD,
      render: (_, record) =>
        record.type === 'Fiat'
          ? `$${record.coinBalance.toFixed(2)}`
          : `$${(record.coinBalance * record.coinPrice).toFixed(2)}`,
    },
    {
      title: 'Total Staking Value in USD',
      dataIndex: 'coinBalanceInUSD',
      sorter: (a, b) => a.coinBalanceInUSD - b.coinBalanceInUSD,
      render: (_, record) =>
        `$${(record.coinStakedBalance * record.coinPrice).toFixed(2)}`,
    },
    {
      title: 'Staked Balance',
      dataIndex: 'coinStakedBalance',
      render: (_, record) => {
        return record.coinStakedBalance?.toLocaleString() || 0;
      },
      sorter: {
        compare: (a, b) =>
          (a.coinStakedBalance || 0) - (b.coinStakedBalance || 0),
        multiple: 5,
      },
      // responsive: ["sm"],
    },
  ];

  const [walletData, setWalletData] = useState<DataType[]>([]);
  const [filteredWalletData, setFilteredWalletData] = useState<DataType[]>([]);
  const [sortedData, setSortedData] = useState<DataType[]>([]);
  const [sortedCryptoData, setSortedCryptoData] = useState<DataType[]>([]);
  const [sortedStockData, setSortedStockData] = useState<DataType[]>([]);
  const [sortedEtfData, setSortedEtfData] = useState<DataType[]>([]);
  const [sortedFiatData, setSortedFiatData] = useState<DataType[]>([]);

  const pageSize = 10;

  useEffect(() => {
    const getAllUserWallet = async () => {
      let access_token = String(localStorage.getItem('access_token'));
      let decoded: any = decodeJWT(access_token);
      let userWallets = await getUserWallets(decoded.email);
      const formattedData = userWallets.data.map((item: any) => ({
        ...item,
        key: item._id,
        type:
          item.coinType === 'Fiat'
            ? 'Fiat'
            : cryptocurrencies.includes(item.coinSymbol)
            ? 'Crypto'
            : stocks.includes(item.coinSymbol)
            ? 'Stock'
            : etfs.includes(item.coinSymbol)
            ? 'ETF'
            : 'Unknown',
      }));
      setWalletData(formattedData);
    };
    getAllUserWallet();
  }, []);

  useEffect(() => {
    setSortedData(
      filteredWalletData
        ? filteredWalletData.filter(
            (item: DataType) =>
              (hideZeroBalance || item.coinBalance !== 0) &&
              (hideZeroStakedBalance ||
                (item.coinStakedBalance !== undefined &&
                  item.coinStakedBalance !== 0))
          )
        : []
    );
  }, [filteredWalletData, hideZeroBalance, hideZeroStakedBalance]);

  useEffect(() => {
    let filteredData = walletData;
    if (valueInput) {
      filteredData = walletData.filter(
        (item) =>
          item.coinSymbol.toLowerCase().includes(valueInput.toLowerCase()) ||
          item.coinName.toLowerCase().includes(valueInput.toLowerCase())
      );
    }
    if (!hideZeroBalance) {
      filteredData = filteredData.filter((item) => item.coinBalance !== 0);
    }
    if (!hideZeroStakedBalance) {
      filteredData = filteredData.filter(
        (item) =>
          item.coinStakedBalance !== undefined && item.coinStakedBalance !== 0
      );
    }
    const finalData = !hideZeroBalance
      ? filteredData.filter((item) => item.coinBalance !== 0)
      : filteredData;
    // setSortedData(finalData);

    const finalFilteredData = !hideZeroStakedBalance
      ? finalData.filter(
          (item) =>
            item.coinStakedBalance !== undefined && item.coinStakedBalance !== 0
        )
      : finalData;

    setSortedData(finalFilteredData);

    const cryptoData = filteredData.filter((item) =>
      cryptocurrencies.includes(item.coinSymbol)
    );
    const stockData = filteredData.filter((item) =>
      stocks.includes(item.coinSymbol)
    );
    const etfData = filteredData.filter((item) =>
      etfs.includes(item.coinSymbol)
    );
    const fiatData = filteredData.filter((item) => item.type === 'Fiat');

    setSortedFiatData(fiatData);
    setSortedCryptoData(cryptoData);
    setSortedStockData(stockData);
    setSortedEtfData(etfData);
  }, [walletData, valueInput, hideZeroBalance, hideZeroStakedBalance]);

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

  const onChageSearch = (e: any) => {
    let val = e.currentTarget.value;
    setValueInput(val);
  };

  const renderTableSection = (data: any, heading: any) => {
    if (data.length === 0) return null;

    return (
      <>
        <h3 className="font_40x fw-bold mt-5 d-flex justify-content-center">
          {heading}
        </h3>
        <Table
          className="custom_table"
          columns={columns}
          dataSource={data}
          pagination={false} // Handle pagination separately if needed
          onChange={onChange}
          scroll={{ x: true }}
          style={{ maxWidth: '94vw' }}
        />
      </>
    );
  };

  const operations = (
    <Input
      size="small"
      className="orange_input"
      placeholder=" Search"
      prefix={<SearchOutlined />}
      value={valueInput}
      onChange={onChageSearch}
    />
  );

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
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        className="margin-t-2x orange"
      >
        <Tabs.TabPane tab="Cryptocurrencies" key="1" className="padding-2x">
          <div className="border-b-1x margin-b-2x">
            <div className="checkbox-container" style={{ textAlign: 'right' }}>
              <Checkbox
                checked={hideZeroBalance}
                onChange={handleCheckboxChange}
              >
                Show rows with 0 balance
              </Checkbox>
              <Checkbox
                checked={hideZeroStakedBalance}
                onChange={handleStakedCheckboxChange}
              >
                Show rows with 0 Staked balance
              </Checkbox>
            </div>
            {/* <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} /> */}
            {/* Render Cryptocurrencies Section */}
            {renderTableSection(sortedCryptoData, 'Cryptocurrencies')}
            {/* <br /> */}
            {/* Render Stocks Section */}
            {/* {renderTableSection(sortedStockData, "Stock Tokens")} */}

            {/* <br /> */}
            {/* Render ETFs Section */}
            {/* {renderTableSection(sortedEtfData, "ETF Tokens")} */}

            {/* <br /> */}
            {/* {renderTableSection(sortedFiatData, "Fiat Currencies")} */}
            {/* <MyPagination
                        <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} 
                        scroll={{x:true}}
                        style={{maxWidth:"94vw"}}  
                        />
                        <MyPagination
                            total={sortedData && sortedData.length}
                            current={current}
                            onChange={setCurrent}
                        /> */}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Stocks" key="2" className="padding-2x">
          <div className="border-b-1x margin-b-2x">
            <div className="checkbox-container" style={{ textAlign: 'right' }}>
              <Checkbox
                checked={hideZeroBalance}
                onChange={handleCheckboxChange}
              >
                Show rows with 0 balance
              </Checkbox>
              <Checkbox
                checked={hideZeroStakedBalance}
                onChange={handleStakedCheckboxChange}
              >
                Show rows with 0 Staked balance
              </Checkbox>
            </div>
            {/* <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} /> */}
            {/* Render Cryptocurrencies Section */}
            {/* {renderTableSection(sortedCryptoData, "Cryptocurrencies")} */}
            <br />
            {/* Render Stocks Section */}
            {renderTableSection(sortedStockData, 'Stock Tokens')}

            {/* <br /> */}
            {/* Render ETFs Section */}
            {/* {renderTableSection(sortedEtfData, "ETF Tokens")} */}

            {/* <br /> */}
            {/* {renderTableSection(sortedFiatData, "Fiat Currencies")} */}
            {/* <MyPagination
                        <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} 
                        scroll={{x:true}}
                        style={{maxWidth:"94vw"}}  
                        />
                        <MyPagination
                            total={sortedData && sortedData.length}
                            current={current}
                            onChange={setCurrent}
                        /> */}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="ETFs" key="3" className="padding-2x">
          <div className="border-b-1x margin-b-2x">
            <div className="checkbox-container" style={{ textAlign: 'right' }}>
              <Checkbox
                checked={hideZeroBalance}
                onChange={handleCheckboxChange}
              >
                Show rows with 0 balance
              </Checkbox>
              <Checkbox
                checked={hideZeroStakedBalance}
                onChange={handleStakedCheckboxChange}
              >
                Show rows with 0 Staked balance
              </Checkbox>
            </div>
            {/* <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} /> */}
            {/* Render Cryptocurrencies Section */}
            {/* {renderTableSection(sortedCryptoData, "Cryptocurrencies")} */}
            {/* <br /> */}
            {/* Render Stocks Section */}
            {/* {renderTableSection(sortedStockData, "Stock Tokens")} */}

            {/* <br /> */}
            {/* Render ETFs Section */}
            {renderTableSection(sortedEtfData, 'ETF Tokens')}

            {/* <br /> */}
            {/* {renderTableSection(sortedFiatData, "Fiat Currencies")} */}
            {/* <MyPagination
                        <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} 
                        scroll={{x:true}}
                        style={{maxWidth:"94vw"}}  
                        />
                        <MyPagination
                            total={sortedData && sortedData.length}
                            current={current}
                            onChange={setCurrent}
                        /> */}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Fiat" key="4" className="padding-2x">
          <div className="border-b-1x margin-b-2x">
            <div className="checkbox-container" style={{ textAlign: 'right' }}>
              <Checkbox
                checked={hideZeroBalance}
                onChange={handleCheckboxChange}
              >
                Show rows with 0 balance
              </Checkbox>
              <Checkbox
                checked={hideZeroStakedBalance}
                onChange={handleStakedCheckboxChange}
              >
                Show rows with 0 Staked balance
              </Checkbox>
            </div>
            {/* <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} /> */}
            {/* Render Cryptocurrencies Section */}
            {/* {renderTableSection(sortedCryptoData, "Cryptocurrencies")} */}
            {/* <br /> */}
            {/* Render Stocks Section */}
            {/* {renderTableSection(sortedStockData, "Stock Tokens")} */}

            {/* <br /> */}
            {/* Render ETFs Section */}
            {/* {renderTableSection(sortedEtfData, "ETF Tokens")} */}

            {/* <br /> */}
            {renderTableSection(sortedFiatData, 'Fiat Currencies')}
            {/* <MyPagination
                        <Table className='custom_table' columns={columns} dataSource={getData(current, pageSize)} onChange={onChange} 
                        scroll={{x:true}}
                        style={{maxWidth:"94vw"}}  
                        />
                        <MyPagination
                            total={sortedData && sortedData.length}
                            current={current}
                            onChange={setCurrent}
                        /> */}
          </div>
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Deposits & Withdrawals" key="2" className='padding-2x'>
                    Order History Content
                </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
};

export default BSWalletTable;
