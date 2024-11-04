import { CopyOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../services/api';
import ShortenText from '../../utils/ShortenText';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import CustomSelectBox from './CustomSelect';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import { useTheme } from '@mui/material';

const { Option } = Select;

interface DataType {
  price: any;
  transactionType: string;
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
  notes?: string;
  balance?: number;
  amountInvested?: number | string;
  rate?: number;
  // Adding balance field
}

const BSTransactionCryptoHistoryTable: React.FC = () => {
  const [selection, setSelection] = useState({
    type: 'all',
    asset: 'all',
    status: 'all',
    time: 'all',
    transactionHash: '',
  });
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  const [txList, setTxList] = useState([]) as any;
  const [txListFilter, setTxListFilter] = useState([]) as any;
  const [, copy] = useCopyToClipboard();
  const [valueInput, setValueInput] = useState('');
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const theme = useTheme();

  const calculateTransactionFees = (
    type: string,
    asset: string,
    amount: number
  ) => {
    if (type === 'Create Gift') {
      return 'N/A';
    } else if (type === 'SEND_CRYPTO' || type === "INVESTMENT" || type === 'PURCHASED_COINS') {
      if (asset === 'INEX' || asset === 'IN500' || asset === 'IUSD+' || asset === 'WIBS' || asset === 'daCrazy') {
        return `${(1)} %`;
      } else {
        return `${(3)} %`;
      }
    }
    return 'N/A';
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Time',
      dataIndex: 'txDate',
      key: 'txDate',
      render: (text) => (
        <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>
      ),
    },
    {
      title: 'Asset',
      dataIndex: 'currencyRef',
      key: 'currencyRef',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (text) => (
        <span>
          {text === 'GIFT_COINS'
            ? 'Gift'
            : text === 'PURCHASED_COINS'
              ? 'Buy'
              : text}
        </span>
      ),
    },
    {
      title: 'Deposit Wallet',
      dataIndex: 'walletType',
      key: 'walletType',
      render: (text) => (
        <span>{text === 'ASSET_WALLET' ? 'Asset Wallet' : text}</span>
      ),
    },
    {
      title: 'Crypto Amount / USD',
      key: 'amount',
      render: (_, record) => (
        <span>
          {record.amount.toLocaleString()} / $
          {record.balance
            ? record.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            : 'N/A'}
        </span>
      ),
    },
    {
      title: 'Investment Crypto Price',
      key: 'amountInvested',
      render: (_, record) => (
        <span>
          ${' '}
          {(record?.rate ?? (Number(record?.amountInvested) / record?.amount))?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}
        </span>
      ),
    },
    {
      title: 'Current Crypto Price',
      key: 'price',
      render: (_, record) => (
        <span>
          ${' '}
          {record?.price?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      title: 'Invested Amount',
      key: 'amountInvested',
      render: (_, record) => (
        <span>
          ${' '}
          {(Number(record?.amountInvested) - (Number(record?.amountInvested) * 3 / 100))?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      title: 'Transaction Fees',
      key: 'transactionFees',
      render: (_, record) => (
        <span>
          {calculateTransactionFees(
            record.transactionType,
            record.currencyRef,
            record.balance ?? 0
          )}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Transaction Hash',
      key: 'txId',
      render: (_, record) => (
        <span>
          {record.txId.length > 20
            ? ShortenText(record.txId, 0, 20) + '...'
            : record.txId}
          <CopyOutlined
            className="float-left padding-lr-5x hover_icon "
            onClick={() => copy(record.txId)}
          />
        </span>
      ),
    },
    {
      title: 'Destination',
      key: 'to',
      render: (_, record) => (
        <span>
          {record.to.length > 20
            ? ShortenText(record.to, 0, 20) + '...'
            : record.to}
          <span style={{ textAlign: 'right' }}>
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.to)}
            />
          </span>
        </span>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      dataIndex: 'notes',
      render: (text) => (text ? <span title={text}>{text}</span> : null),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      const decodedToken: any = decodeJWT(String(token)) as any;

      const res = await transactionList(decodedToken?.email, '');
      const results = res.data;

      const uniqueTypes = new Set();
      const uniqueAssets = new Set();

      const finalArr = results.filter(
        (transaction: any) => !transaction.transactionType?.includes('FIAT')
      );

      finalArr.forEach((transaction: any) => {
        uniqueTypes.add(transaction.transactionType);
        uniqueAssets.add(transaction.currencyRef);
      });

      setTransactionTypes(Array.from(uniqueTypes) as string[]);
      setAssets(Array.from(uniqueAssets) as string[]);


      finalArr.sort((a: any, b: any) => moment(b.txDate).valueOf() - moment(a.txDate).valueOf());
      setTxList(finalArr);
      setTxListFilter(finalArr);
    };

    fetchData();
  }, []);

  const handleChangeTime0 = (el: any) => {
    const value = el.target.value;
    const pastDate = moment().subtract(+value, 'days').format('YYYY-MM-DD');
    if (!isNaN(+value)) {
      setSelection({
        type: selection.type,
        asset: selection.asset,
        status: selection.status,
        time: value,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          moment(pastDate).isSameOrBefore(valueDate) &&
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    } else {
      setSelection({
        type: selection.type,
        asset: selection.asset,
        status: selection.status,
        time: 'all',
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        return (
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    }
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
  const handleChangeStatus0 = (el: any) => {
    const value = el.target.value;
    const pastDate = moment()
      .subtract(+selection.time, 'days')
      .format('YYYY-MM-DD');
    if (value !== 'all') {
      setSelection({
        type: selection.type,
        asset: selection.asset,
        status: value,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          data.status?.toLowerCase() === value?.toLowerCase() &&
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    } else {
      setSelection({
        type: selection.type,
        asset: selection.asset,
        status: 'all',
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    }
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

  const handleChangeType0 = (el: any) => {
    const value = el.target.value;
    console.log(value, 'value');
    const pastDate = moment()
      .subtract(+selection.time, 'days')
      .format('YYYY-MM-DD');
    console.log("pastDate", pastDate)
    if (value !== 'all') {
      setSelection({
        type: value,
        asset: selection.asset,
        status: selection.status,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          data.transactionType?.toLowerCase() === value?.toLowerCase() &&
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    } else {
      setSelection({
        type: 'all',
        asset: selection.asset,
        status: selection.status,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          (!selection.asset ||
            data.currencyRef?.toLowerCase() ===
            selection.asset?.toLowerCase()) &&
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    }
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


  const handleChangeAsset0 = (el: any) => {
    const value = el.target.value;
    const pastDate = moment()
      .subtract(+selection.time, 'days')
      .format('YYYY-MM-DD');
    if (value !== 'all') {
      setSelection({
        type: selection.type,
        asset: value,
        status: selection.status,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          data.currencyRef?.toLowerCase() === value?.toLowerCase() &&
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    } else {
      setSelection({
        type: selection.type,
        asset: 'all',
        status: selection.status,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        return (
          (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
          (!selection.type ||
            data.transactionType?.toLowerCase() ===
            selection.type?.toLowerCase()) &&
          (!selection.status ||
            data.status?.toLowerCase() === selection.status?.toLowerCase()) &&
          (!selection.transactionHash ||
            data.txId
              ?.toLowerCase()
              .includes(selection.transactionHash?.toLowerCase()))
        );
      });
      setTxListFilter(txListFilterData);
    }
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
    const xx =
      txListFilter &&
      txListFilter.slice((current - 1) * pageSize, current * pageSize);
    console.log("xx", xx)
    return xx;
  };

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
        data.transactionType?.toLowerCase() === filterCriteria.type?.toLowerCase();

      const statusMatches =
        filterCriteria.status === 'all' ||
        data.status?.toLowerCase() === filterCriteria.status?.toLowerCase();

      const txHashMatches =
        !filterCriteria.transactionHash ||
        data.txId?.toLowerCase().includes(filterCriteria.transactionHash);

      return assetMatches && timeMatches && typeMatches && statusMatches && txHashMatches;
    });

    // Update the filtered transaction list
    setTxListFilter(filteredData);
  };

  const onChageSearch0 = (e: any) => {
    let val = e.currentTarget.value;
    setValueInput(val);
    setSelection({
      type: selection.type,
      asset: selection.asset,
      status: selection.status,
      time: selection.time,
      transactionHash: val,
    });
    const pastDate = moment()
      .subtract(+selection.time, 'days')
      .format('YYYY-MM-DD');

    const filterDate = txList?.filter((data: any) => {
      let valueDate = moment(data.created).format('YYYY-MM-DD');

      return (
        data.txId?.toLowerCase().includes(val?.toLowerCase()) &&
        (!selection.asset ||
          data.currencyRef?.toLowerCase() === selection.asset?.toLowerCase()) &&
        (!selection.time || moment(pastDate).isSameOrBefore(valueDate)) &&
        (!selection.type ||
          data.transactionType?.toLowerCase() ===
          selection.type?.toLowerCase()) &&
        (!selection.status ||
          data.status?.toLowerCase() === selection.status?.toLowerCase())
      );
    });
    setTxListFilter(filterDate);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex-align-stretch bs_main width-100 margin-t-3x padding-t-2x">
      <div
        className="d-flex transaction_filters margin-b-3x"
        style={{ gap: '10px', flexWrap: 'wrap' }}
      >
        <div className="filter-item">
          <label>Type</label> <br />
          <CustomSelectBox
            // items={[
            //   { name: 'All', value: 'all' },
            //   { name: 'Deposit', value: 'DEPOSIT_CYRPTO' },
            //   { name: 'Withdraw', value: 'WITHDRAW_CRYPTO' },
            //   { name: 'Reward Withdraw', value: 'WITHDRAW_REWARDS' },
            // ]}
            items={transactionTypes.map((type) => ({ name: type, value: type }))}
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
            // ]}
            items={assets.map((type) => ({ name: type, value: type }))}
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

        <div className="filter-item">
          <label>Transaction Hash</label> <br />
          <InputField
            size="large"
            placeholder="Search Transaction hash"
            style={{ height: '55px', marginTop: '0px' }}
            value={selection.transactionHash}
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
        className="custom_table"
        scroll={{ x: '2200px' }}
      />
      <MyPagination
        total={txListFilter && txListFilter.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
};

export default BSTransactionCryptoHistoryTable;
