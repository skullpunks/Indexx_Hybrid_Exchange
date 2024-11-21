import { CopyOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Pagination, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../../../../services/api';
import useCopyToClipboard from '../../../../../utils/useCopyToClipboard';
import ShortenText from '../../../../../utils/ShortenText';
import moment from 'moment';
import { useTheme } from '@mui/material';
import InputField from '../../../../updated/shared/TextField';
import CustomSelectBox from './CustomSelectBox';

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

interface BeeWalletTableProps {
  BeeEmail: string;
}

const BeeTransactionHistoryTable: React.FC<BeeWalletTableProps> = ({
  BeeEmail,
}) => {
  const [selection, setSelection] = useState({
    type: 'all',
    asset: 'all',
    status: 'all',
    time: 'all',
    transactionHash: '',
  });
  const [txList, setTxList] = useState() as any;
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [txListFilter, setTxListFilter] = useState() as any;
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  const [copiedValue, copy] = useCopyToClipboard();
  const [valueInput, setValueInput] = useState('');
  const theme = useTheme();
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
      title: 'Transaction Hash',
      key: 'txId',
      render: (_, record) => (
        <span>
          {/* {record.txId} */}
          {/* {ShortenText(record.txId, 0, 20) + "..."} */}
          {record.txId.length > 20
            ? ShortenText(record.txId, 0, 20) + '...'
            : record.txId}
          <span>
            <Tooltip title="Click to copy"></Tooltip>
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.txId)}
            />
            {/* <LinkOutlined /> */}
          </span>
        </span>
      ),
      // responsive: ["sm"],
    },
    {
      title: 'Destination',
      key: 'to',
      render: (_, record) => (
        <span>
          {/* {record.to} */}

          {record.to.length > 20
            ? ShortenText(record.to, 0, 20) + '...'
            : record.to}
          <span>
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
    if (BeeEmail !== undefined) {
      transactionList(BeeEmail).then((res) => {
        const results = res.data;
        let finalArr = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].transactionType?.includes('FIAT')) {
            finalArr.push(results[i]);
          } else {
          }
        }
        setTxList(finalArr);
        setTxListFilter(finalArr);
      });
    } else {
      const token = localStorage.getItem('access_token');
      const decodedToken: any = decodeJWT(String(token)) as any;
      transactionList(decodedToken?.email).then((res) => {
        const results = res.data;
        let finalArr = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].transactionType?.includes('FIAT')) {
            finalArr.push(results[i]);
          } else {
          }
        }
        setTxList(finalArr);
        setTxListFilter(finalArr);
      });
    }
  }, []);

  const handleChangeTime0 = (value: string) => {
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
        time: '',
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

  const handleChangeStatus0 = (value: string) => {
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
        status: '',
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

  const handleChangeType0 = (value: string) => {
    const pastDate = moment()
      .subtract(+selection.time, 'days')
      .format('YYYY-MM-DD');

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
        // && data.currencyRef?.toLowerCase() === value?.toLowerCase()
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

      // WITHDRAW_CYRPTO WITHDRAW_CRYPTO
    } else {
      setSelection({
        type: '',
        asset: selection.asset,
        status: selection.status,
        time: selection.time,
        transactionHash: selection.transactionHash,
      });
      const txListFilterData = txList.filter((data: any) => {
        let valueDate = moment(data.created).format('YYYY-MM-DD');
        // && data.currencyRef?.toLowerCase() === value?.toLowerCase()
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

  const handleChangeAsset0 = (value: string) => {
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
        asset: '',
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

  const filterTransactions = (filterCriteria: any) => {
    const filteredData = txList.filter((data: any) => {
      const pastDate =
        filterCriteria.time !== 'all'
          ? moment().subtract(+filterCriteria.time, 'days').format('YYYY-MM-DD')
          : null;
      const valueDate = moment(data.created).format('YYYY-MM-DD');

      // Filter conditions based on the selected criteria
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
        data.txId
          ?.toLowerCase()
          .includes(filterCriteria.transactionHash?.toLowerCase());

      return (
        assetMatches &&
        timeMatches &&
        typeMatches &&
        statusMatches &&
        txHashMatches
      );
    });

    console.log('filteredData', filteredData); // Debugging filtered results
    setTxListFilter(filteredData);
  };

  const handleSearchHashId = (value: string) => {
    const txListFilterData = txList.filter((data: any) => {
      return data.txId?.toLowerCase() === value?.toLowerCase();
    });
    setTxListFilter(txListFilterData);
  };
  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = txList.map((data: any) => ({
        value: data.txId,
        label: `${data.txId}`,
      }));
    }
    setOptions(res);
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

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    const xx =
      txListFilter &&
      txListFilter.slice((current - 1) * pageSize, current * pageSize);

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
    <div className="flex-align-stretch bs_main width-100  margin-t-3x  ">
      <div className="d-flex transaction_filters margin-b-3x">
        <div className="filter-item">
          <label>Type</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Deposit', value: 'DEPOSIT_CYRPTO' },
              { name: 'Withdraw', value: 'WITHDRAW_CRYPTO' },
              { name: 'Reward Withdraw', value: 'WITHDRAW_REWARDS' },
            ]}
            value={selection.type}
            onChange={handleChangeType}
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

              { name: 'USD', value: 'USD' },
            ]}
            value={'all'}
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
            placeholder="Search"
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
        pagination={false}
        columns={columns}
        dataSource={getData(current, pageSize)}
        // className="transaction_crypto_history custom_table"
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

export default BeeTransactionHistoryTable;
