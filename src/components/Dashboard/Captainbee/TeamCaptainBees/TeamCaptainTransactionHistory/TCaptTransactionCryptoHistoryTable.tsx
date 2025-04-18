import { CopyOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../../../../services/api';
import ShortenText from '../../../../../utils/ShortenText';
import useCopyToClipboard from '../../../../../utils/useCopyToClipboard';
import CustomSelectBox from './CustomSelect';
import InputField from '../../../../updated/shared/TextField';
import { useTheme } from '@mui/material';
const { Option } = Select;

interface DataType {
  to: string;
  txId: string;
  key: string;
  time: string;
  type: string;
  wallet: string;
  currencyRef: string;
  amount: number;
  destination: string;
  txid: string;
}

type TeamCapTxTableProps = {
  email: string;
};

const TCaptTransactionCryptoHistoryTable: React.FC<TeamCapTxTableProps> = ({
  email,
}) => {
  const theme = useTheme();
  const [selection, setSelection] = useState({
    type: 'all',
    asset: 'all',
    status: 'all',
    time: 'all',
    transactionHash: '',
  });
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  const [txList, setTxList] = useState() as any;
  const [txListFilter, setTxListFilter] = useState() as any;
  const [, copy] = useCopyToClipboard();
  const [valueInput, setValueInput] = useState('');
  const columns: ColumnsType<DataType> = [
    {
      title: 'Time Type',
      render: (record) => (
        <React.Fragment>
          {record.modified}
          <br />
          {record.modified}
        </React.Fragment>
      ),
      // responsive: ["xs"]
    },
    {
      title: 'Amount',
      render: (record) => (
        <React.Fragment>
          {record.amount}

          {record.currencyRef}
        </React.Fragment>
      ),
      // responsive: ["xs"]
    },
    {
      title: 'Time',
      dataIndex: 'modified',
      key: 'modified',
      render: (text) => (
        <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>
      ),
      // responsive: ["sm"],
    },
    {
      title: 'Asset',
      dataIndex: 'currencyRef',
      key: 'currencyRef',
      render: (text) => <span>{text}</span>,
      // responsive: ["sm"],
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      // responsive: ["sm"]
    },
    {
      title: 'Deposit Wallet',
      dataIndex: 'walletType',
      key: 'walletType',
      render: (text) => <span>{text}</span>,
      // responsive: ["sm"],
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      // responsive: ["sm"],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      // responsive: ["sm"],
    },
    {
      title: 'Transaction Hash',
      key: 'txId',
      render: (_, record) => (
        <span>
          {/* {record.txId} */}
          {/* {ShortenText(record.txId, 0, 20) + "..."} */}
          {record.txId.length > 20
            ? ShortenText(record.txId, 0, 20) + '...'
            : record.txId}
          <CopyOutlined
            className="float-left padding-lr-5x hover_icon "
            onClick={() => copy(record.txId)}
          />
        </span>
      ),
      // responsive: ["sm"],
    },
    {
      title: 'Destination',
      key: 'to',
      render: (_, record) => (
        <span>
          <span>
            {/* {record.to} */}
            {/* {ShortenText(record.to, 0, 20) + "..."} */}
            {record.to.length > 20
              ? ShortenText(record.to, 0, 20) + '...'
              : record.to}
          </span>
          <span style={{ textAlign: 'right' }}>
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.to)}
            />
            {/* <LinkOutlined /> */}
          </span>
        </span>
      ),
      // responsive: ["sm"],
    },
  ];

  useEffect(() => {
    if (email) {
      transactionList(email, '').then((res) => {
        const results = res.data;
        let finalArr = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].transactionType?.includes('FIAT')) {
          } else {
            finalArr.push(results[i]);
          }
        }
        setTxList(finalArr);
        setTxListFilter(finalArr);
      });
    } else {
      const token = localStorage.getItem('access_token');
      const decodedToken: any = decodeJWT(String(token)) as any;

      transactionList(decodedToken?.email, '').then((res) => {
        const results = res.data;
        let finalArr = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].transactionType?.includes('FIAT')) {
          } else {
            finalArr.push(results[i]);
          }
        }
        setTxList(finalArr);
        setTxListFilter(finalArr);
      });
    }
  }, []);
  const filterTransactions = (filterCriteria: any) => {
    const filteredData = txList.filter((data: any) => {
      const pastDate =
        filterCriteria.time !== 'all'
          ? moment().subtract(+filterCriteria.time, 'days').format('YYYY-MM-DD')
          : null;
      const valueDate = moment(data.created).format('YYYY-MM-DD');

      const assetMatches =
        filterCriteria.asset === 'all' ||
        data.currencyRef?.toLowerCase() === filterCriteria.asset?.toLowerCase();

      const timeMatches =
        filterCriteria.time === 'all' ||
        (pastDate && moment(pastDate).isSameOrBefore(valueDate));

      const typeMatches =
        filterCriteria.type === 'all' ||
        data.transactionType?.toLowerCase() ===
          filterCriteria.type?.toLowerCase();

      const statusMatches =
        filterCriteria.status === 'all' ||
        data.status?.toLowerCase() === filterCriteria.status?.toLowerCase();

      const txHashMatches =
        !filterCriteria.transactionHash ||
        data.txId?.toLowerCase().includes(filterCriteria.transactionHash);

      return (
        assetMatches &&
        timeMatches &&
        typeMatches &&
        statusMatches &&
        txHashMatches
      );
    });

    // Update the filtered transaction list
    setTxListFilter(filteredData);
  };
  const handleChangeTime = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => ({
      ...prevSelection,
      time: value,
    }));

    // Apply the filter after the type is changed
    filterTransactions({
      ...selection,
      time: value,
    });
  };
  const handleChangeStatus = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => ({
      ...prevSelection,
      status: value,
    }));

    // Apply the filter after the type is changed
    filterTransactions({
      ...selection,
      status: value,
    });
  };
  const handleChangeType = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => ({
      ...prevSelection,
      type: value,
    }));

    // Apply the filter after the type is changed
    filterTransactions({
      ...selection,
      type: value,
    });
  };
  const handleChangeAsset = (el: any) => {
    const value = el.target.value;
    setSelection((prevSelection) => ({
      ...prevSelection,
      asset: value, // Correctly updating the asset field, not type
    }));

    // Apply the filter after the asset is changed
    filterTransactions({
      ...selection,
      asset: value,
    });
  };

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    const xx =
      txListFilter &&
      txListFilter.slice((current - 1) * pageSize, current * pageSize);
    return xx;
  };

  const onChageSearch = (e: any) => {
    const searchValue = e.target.value.toLowerCase();
    setValueInput(searchValue);

    // Update the search in the selection state
    setSelection((prevSelection) => ({
      ...prevSelection,
      transactionHash: searchValue,
    }));

    // Apply the filter after updating the search value
    filterTransactions({
      ...selection,
      transactionHash: searchValue,
    });
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
    <div className="flex-align-stretch bs_main width-100  margin-t-3x ">
      <div
        className="d-flex transaction_filters margin-b-3x"
        style={{ gap: '10px', flexWrap: 'wrap' }}
      >
        <div className="filter-item">
          <label>Type</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Deposit', value: 'DEPOSIT_CYRPTO' },
              { name: 'Withdraw', value: 'WITHDRAW_CRYPTO' },
              { name: 'Reward Withdraw', value: 'WITHDRAW_REWARDS' },
            ]}
            // items={transactionTypes.map((type) => ({
            //   name: type,
            //   value: type,
            // }))}
            value={selection.type}
            onChange={handleChangeType}
            //onChange={(e:any) => handleChangeFilter('type', e.target.value)}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
        </div>
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
        </div>
        <div className="filter-item">
          <label>Asset</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'IN500 Indexx 500', value: 'IN500' },
              { name: 'INXC Indexx Crypto', value: 'INXC' },
              { name: 'INEX Indexx Exchange', value: 'INEX' },
              { name: 'IUSD+ Indexx USD+', value: 'IUSD+' },
              { name: 'INXP Indexx Phoenix', value: 'INXP' },
              { name: 'BNB Binance', value: 'BNB' },
              { name: 'FTT FTX Token', value: 'FTT' },
              { name: 'ETH Ethereum', value: 'ETH' },
              { name: 'BTC Bitcoin', value: 'BTC' },
              { name: 'LTC Litecoin', value: 'LTC' },
            ]}
            value={selection.asset}
            onChange={handleChangeAsset}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
        </div>
        <div className="filter-item">
          <label>Status</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Completed', value: 'Completed' },
              { name: 'Pending', value: 'Pending' },
            ]}
            value={selection.status}
            onChange={handleChangeStatus}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
        </div>
        <div className="filter-item" style={{ transform: 'translateY(-2px)' }}>
          <label style={{ marginBottom: '0px' }}>Transaction Hash</label>
          <InputField
            size="large"
            placeholder="Search"
            style={{
              height: '55px',
              marginTop: '0px',
              border: '1px solid grey',
            }}
            value={selection.transactionHash}
            // onChange={onChangeSearch}
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
            blueBorders={undefined}
          />
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
                type: 'all',
                asset: 'all',
                status: 'all',
                time: 'all',
                transactionHash: '',
              });
              // Reset the filtered transaction list to show all data
              setTxListFilter(txList); // Reset to the full list of transactions
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
        scroll={{ x: true }}
        style={{ maxWidth: '94vw' }}
        className="custom_table"
      />
      <MyPagination
        total={txListFilter && txListFilter.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
};

export default TCaptTransactionCryptoHistoryTable;
