import { Button, Input, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, getUserOrders } from '../../services/api';
import CustomSelectBox from './CustomSelect';
import InputField from '../updated/shared/TextField';
import { useTheme } from '@mui/material';

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
  orderRate: { rate: number; currency: string };
  orderType: string;
  orderId: string;
}

const BSBuyOrderHistoryTable: React.FC = () => {
  const pageSize = 10;
  const theme = useTheme();
  const [current, setCurrent] = useState(1);
  const [orderList, setOrderList] = useState<DataType[]>([]);
  const [orderListFilter, setOrderTxListFilter] = useState<DataType[]>([]);
  const [isLoading, setLoadings] = useState(true);
  const [valueInput, setValueInput] = useState('');
  const [selection, setSelection] = useState({
    asset: 'all',
    status: 'all',
    time: 'all',
    orderId: '',
  });

  const tableLoading = {
    spinning: isLoading,
    indicator: (
      <img
        src={require(`../../assets/arts/loaderIcon.gif`).default}
        alt="loader"
        width="50"
        height="50"
      />
    ),
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Order Date and Time',
      dataIndex: 'created',
      key: 'created',
      render: (text) => (
        <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>
      ),
    },
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Order Rate',
      dataIndex: 'orderRate',
      key: 'orderRate',
      render: (text) => <span>{text.rate} USD</span>,
      // responsive: ["sm"]
    },
    {
      title: 'Order Type',
      dataIndex: 'orderType',
      key: 'orderType',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'breakdown',
      render: (breakdown) => (
        <span>
          {breakdown.inAmount} {breakdown.inCurrenyName}
        </span>
      ),
    },
    {
      title: 'Crypto Amount / USD',
      key: 'cryptoAmountUSD',
      render: (record) => (
        <span>
          {Math.floor(record.breakdown.outAmount * 1000) / 1000}{' '}
          {record.breakdown.outCurrencyName} / $
          {(
            (Math.floor(record.breakdown.outAmount * 1000) / 1000) *
            (record.orderRate?.rate ?? 0)
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Payment Type',
      key: 'paymentType',
      dataIndex: 'paymentType',
    },
    {
      title: 'Exchange Fees',
      key: 'exchangeFees',
      dataIndex: 'exchangeFees',
      render: (text) => <span>{text} %</span>,
    },
    {
      title: 'Notes',
      key: 'notes',
      dataIndex: 'notes',
      render: (text) => (text ? <span title={text}>{text}</span> : null),
    },
  ];

  const [assets, setAssets] = useState<string[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken: any = decodeJWT(String(token)) as any;

    getUserOrders(decodedToken?.email).then((res) => {
      const results = res.data;
      let finalArr = [];
      const uniqueAssets = new Set();

      for (let i = 0; i < results.length; i++) {
        if (
          results[i].orderType?.includes('Sell') ||
          results[i].orderType?.includes('Convert')
        ) {
        } else {
          finalArr.push(results[i]);
        }
      }

      finalArr.forEach((orders: any) => {
        uniqueAssets.add(orders.breakdown.outCurrencyName);
      });

      setAssets(Array.from(uniqueAssets) as string[]);
      // Sort Orders by time in descending order
      finalArr.sort(
        (a, b) => moment(b.created).valueOf() - moment(a.created).valueOf()
      );
      setOrderList(finalArr);
      setOrderTxListFilter(finalArr);
      setLoadings(false);
    });
  }, []);


  // Unified filter function
  const applyFilters = (updatedSelection: any) => {
    const { asset, status, time, orderId } = updatedSelection;
    const pastDate =
      time !== 'all' ? moment().subtract(+time, 'days').format('YYYY-MM-DD') : null;

    const filteredData = orderList.filter((data: any) => {
      const valueDate = moment(data.created).format('YYYY-MM-DD');

      const assetMatches =
        asset === 'all' || data.breakdown.outCurrencyName?.toLowerCase() === asset.toLowerCase();

      const timeMatches = time === 'all' || moment(pastDate).isSameOrBefore(valueDate);

      const statusMatches = status === 'all' || data.status?.toLowerCase() === status.toLowerCase();

      const orderIdMatches =
        !orderId || data.orderId?.toLowerCase().includes(orderId.toLowerCase());

      return assetMatches && timeMatches && statusMatches && orderIdMatches;
    });

    setOrderTxListFilter(filteredData);
  };

  // Individual filter handlers
  const handleChangeTime = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => {
      const updatedSelection = { ...prevSelection, time: value };
      applyFilters(updatedSelection); // Apply filters after updating selection
      return updatedSelection;
    });
  };

  const handleChangeStatus = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => {
      const updatedSelection = { ...prevSelection, status: value };
      applyFilters(updatedSelection); // Apply filters after updating selection
      return updatedSelection;
    });
  };

  const handleChangeAsset = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => {
      const updatedSelection = { ...prevSelection, asset: value };
      applyFilters(updatedSelection); // Apply filters after updating selection
      return updatedSelection;
    });
  };

  const onChangeSearch = (e: any) => {
    const val = e.currentTarget.value;
    setSelection((prevSelection) => {
      const updatedSelection = { ...prevSelection, orderId: val };
      applyFilters(updatedSelection); // Apply filters after updating selection
      return updatedSelection;
    });
  };

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    const xx =
      orderListFilter &&
      orderListFilter.slice((current - 1) * pageSize, current * pageSize);
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
    <div className="flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x ">
      <div className="d-flex transaction_filters margin-b-3x">
        <div className="filter-item">
          <label>Time</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Past 7 days', value: '7' },
              { name: 'Past 30 days', value: '30' },
              { name: 'Past 90 days', value: '90' },
            ]}
            value={selection.time}
            onChange={handleChangeTime}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
          {/* <Select defaultValue="30" onChange={handleChangeTime}>
            <Option value="all">All</Option>
            <Option value="7">Past 7 days</Option>
            <Option value="30">Past 30 days</Option>
            <Option value="90">Past 90 days</Option>
          </Select> */}
        </div>
        <div className="filter-item">
          <label>Asset</label> <br />
          <CustomSelectBox
            // items={[
            //   { name: 'All', value: 'all' },
            //   { name: 'IN500 Indexx 500', value: 'IN500' },
            //   { name: 'INXC Indexx Crypto', value: 'INXC' },
            //   { name: 'INEX Indexx Exchange', value: 'INEX' },
            //   { name: 'IUSD+ Indexx USD+', value: 'IUSD+' },
            //   { name: 'INXP Indexx Phoenix', value: 'INXP' },
            //   { name: 'BNB Binance', value: 'BNB' },
            //   { name: 'FTT FTX Token', value: 'FTT' },
            //   { name: 'ETH Ethereum', value: 'ETH' },
            //   { name: 'BTC Bitcoin', value: 'BTC' },
            //   { name: 'LTC Litecoin', value: 'LTC' },
            //   { name: 'WIBS Who Is Bitcoin Satoshi', value: 'WIBS' },
            // ]}
            items={assets.map((type) => ({ name: type, value: type }))}
            value={selection.asset}
            onChange={handleChangeAsset}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
          {/* <Select defaultValue="all" onChange={handleChangeAsset}>
            <Option value="all">All</Option>
            <Option value="IN500">
              IN500 <span>Indexx 500</span>
            </Option>
            <Option value="INXC">
              INXC <span>Indexx Crypto</span>
            </Option>
            <Option value="INEX">
              INEX <span>Indexx Exchange</span>
            </Option>
            <Option value="IUSD+">
              IUSD+ <span>Indexx USD+</span>
            </Option>
            <Option value="INXP">
              INXP <span>Indexx Phoenix</span>
            </Option>
            <Option value="BNB">
              BNB <span>Binance</span>
            </Option>
            <Option value="FTT">
              FTT <span>FTX Token</span>
            </Option>
            <Option value="ETH">
              ETH <span>Ethereum</span>
            </Option>
            <Option value="BTC">
              BTC <span>Bitcoin</span>
            </Option>
            <Option value="LTC">
              LTC <span>Litecoin</span>
            </Option>
            <Option value="WIBS">
              WIBS <span>Who Is Bitcoin Satoshi</span>
            </Option>
          </Select> */}
        </div>
        <div className="filter-item">
          <label>Status</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Completed', value: 'Completed' },
              { name: 'Quoted', value: 'Quoted' },
            ]}
            value={selection.status}
            onChange={handleChangeStatus}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
          {/* <Select defaultValue="all" onChange={handleChangeStatus}>
            <Option value="all">All</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Quoted">Quoted</Option>
          </Select> */}
        </div>
        <div className="filter-item">
          <label>Order Id</label> <br />
          <InputField
            size="large"
            placeholder="Search Order Id"
            style={{ height: '55px', marginTop: '0px' }}
            value={selection.orderId}
            onChange={onChangeSearch}
            maxLength={50}
            type={undefined}
            label={undefined}
            defaultValue={undefined}
            id={undefined}
            startAdornment={undefined}
            endAdornment={undefined}
            className={undefined}
            helperText={undefined}
            error={undefined}
            secondaryLabel={undefined}
            rows={undefined}
            yellowBorders={undefined}
          />
          {/* <Input
            size="large"
            placeholder="Search Order Id"
            style={{ height: '55px' }}
            value={valueInput}
            onChange={onChageSearch}
            maxLength={50}
          /> */}
        </div>
        <div className="filter-item">
          <Button
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.palette.text.primary,
              fontSize: '16px',
              width: 'fit-content',
              marginBottom: '10px',
            }}
            onClick={() => {
              setSelection({
                asset: 'all',
                status: 'all',
                time: 'all',
                orderId: '',
              });
              setOrderTxListFilter(orderList);

            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={getData(current, pageSize)}
        className="custom_table"
        loading={tableLoading}
        scroll={{ x: '2200px' }}
      />
      <MyPagination
        total={orderListFilter && orderListFilter.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
};

export default BSBuyOrderHistoryTable;
