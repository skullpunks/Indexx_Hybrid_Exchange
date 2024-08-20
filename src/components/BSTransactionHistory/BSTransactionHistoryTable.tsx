import { CopyOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Pagination, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { decodeJWT, transactionList } from '../../services/api';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import ShortenText from '../../utils/ShortenText';
import moment from 'moment';
import CustomSelectBox from './CustomSelect';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import { useTheme } from '@mui/material';

const { Option } = Select;
interface DataType {
  to: string;
  txId: string;
  key: string;
  time: string;
  type: string;
  benificaryAddress: string;
  wallet: string;
  currencyRef: string;
  status: string;
  amount: number;
  destination: string;
  txid: string;
  notes?: string;
}

const BSTransactionHistoryTable: React.FC = () => {
  const [selection, setSelection] = useState({
    type: '',
    asset: '',
    status: '',
    time: '30',
    transactionHash: '',
  });
  const [txList, setTxList] = useState() as any;
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const theme = useTheme();
  const [txListFilter, setTxListFilter] = useState() as any;
  const pageSize = 10;
  const [current, setCurrent] = useState(1);
  const [copiedValue, copy] = useCopyToClipboard();

  const formatBeneficiaryAddress0 = (address: string) => {
    try {
      const parsedAddress = JSON.parse(address);
      const formattedAddress = (
        <>
          <div>
            <strong>Name:</strong> {parsedAddress.beneficiaryName || 'NA'}
          </div>
          <div>
            <strong>Account No:</strong> {parsedAddress.accountNumber || 'NA'}
          </div>
          <div>
            <strong>Bank: </strong>
            {parsedAddress.bankName || 'NA'}
          </div>
          <div>
            <strong>SWIFT:</strong> {parsedAddress.swiftCode || 'NA'}
          </div>
          <div>
            <strong>Routing Number: </strong>
            {parsedAddress.routingNumber || 'NA'}
          </div>
          <div>
            <strong>Address: </strong>
            {`${parsedAddress.addressLine1 || 'NA'}, ${
              parsedAddress.city || 'NA'
            }, ${parsedAddress.state || 'NA'}, ${
              parsedAddress.country || 'NA'
            }, ZIP: ${parsedAddress.zipCode || 'NA'}`}
          </div>
        </>
      );

      return formattedAddress;
    } catch (e) {
      return <div>No Beneficiary Details</div>;
    }
  };

  const formatBeneficiaryAddress = (address: string) => {
    try {
      const parsedAddress = JSON.parse(address);

      const formattedAddress = Object.keys(parsedAddress).map((key) => (
        <div key={key}>
          <strong>
            {key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}
            :
          </strong>{' '}
          {parsedAddress[key] || 'NA'}
        </div>
      ));

      return <>{formattedAddress}</>;
    } catch (e) {
      return <div>No Beneficiary Details</div>;
    }
  };

  const columns: ColumnsType<DataType> = [
    // {
    //     title: "Time Type",
    //     render: (record) => (
    //         <React.Fragment>
    //             {record.modified}
    //             <br />
    //             {record.modified}
    //         </React.Fragment>
    //     ),
    //     responsive: ["xs"]
    // },
    // {
    //     title: "Amount",
    //     render: (record) => (
    //         <React.Fragment>
    //             {record.amount}

    //             {record.currencyRef}
    //         </React.Fragment>
    //     ),
    //     // responsive: ["xs"]
    // },
    {
      title: 'Time',
      dataIndex: 'txDate',
      key: 'txDate',
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
      title: 'Beneficiary Details',
      key: 'benificaryAddress',
      render: (_, record) => (
        <span>{formatBeneficiaryAddress(record.benificaryAddress)}</span>
      ),
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
      render: (_, record) => {
        const isJsonObject = (str: any) => {
          try {
            const json = JSON.parse(str);
            return json && typeof json === 'object';
          } catch (e) {
            return false;
          }
        };
        const formatText = (text: any) => {
          return text.length > 20 ? ShortenText(text, 0, 20) + '...' : text;
        };
        console.log(isJsonObject(record.to));
        const displayContent = isJsonObject(record.to) ? (
          <span>{formatBeneficiaryAddress(record.to)}</span>
        ) : (
          <span>{formatText(record.to)}</span>
        );

        return (
          <span>
            {displayContent}
            <span>
              <CopyOutlined
                className="padding-lr-1x hover_icon"
                onClick={() => copy(record.to)}
              />
            </span>
          </span>
        );
      },
      // responsive: ["sm"],
    },
    {
      title: 'Notes',
      key: 'notes',
      dataIndex: 'notes',
      render: (text) =>
        text ? (
          <span title={text}>
            {text.length > 25 ? `${text.slice(0, 25)}...` : text}
          </span>
        ) : null,
    },
  ];

  useEffect(() => {
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
      // Sort transactions by time in descending order
      finalArr.sort(
        (a, b) => moment(b.txDate).valueOf() - moment(a.txDate).valueOf()
      );
      setTxList(finalArr);
      setTxListFilter(finalArr);
    });
  }, []);

  const handleChangeTime = (value: string) => {
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
        let valueDate = moment(data.txDate).format('YYYY-MM-DD');
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
  const handleChangeStatus = (value: string) => {
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
  const handleChangeType = (value: string) => {
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
  const handleChangeAsset = (value: string) => {
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
    <div className="flex-align-stretch bs_main width-100  margin-t-3x padding-t-2x ">
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
            value={'all'}
            onChange={handleChangeType}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
          {/* <Select defaultValue="all" onChange={handleChangeType}>
            <Option value="all">All</Option>
            <Option value="DEPOSIT_FIAT">Deposit</Option>
            <Option value="WITHDRAW_FIAT">Withdraw</Option>
          </Select> */}
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
            value={'30'}
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
          {/* <Select defaultValue="all" onChange={handleChangeAsset}>
            <Option value="all">All</Option>
            <Option value="USD">USD</Option>
          </Select> */}
        </div>
        <div className="filter-item">
          <label>Status</label> <br />
          <CustomSelectBox
            items={[
              { name: 'All', value: 'all' },
              { name: 'Completed', value: 'Completed' },
              { name: 'Pending', value: 'Pending' },
            ]}
            value={'all'}
            onChange={handleChangeStatus}
            hasborder
            type={undefined}
            isCurrency={undefined}
            onCurrencyChange={undefined}
          />
          {/* <Select defaultValue="all" onChange={handleChangeStatus}>
            <Option value="all">All</Option>
            <Option value="completed">Completed</Option>
            <Option value="pending">Pending</Option>
          </Select> */}
        </div>
        <div className="filter-item">
          <label>Transaction Hash</label> <br />
          <InputField
            size="large"
            placeholder="Search Transaction hash"
            style={{ height: '55px', marginTop: '0px' }}
            value={''}
            onChange={() => {}}
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
          />
          {/* <AutoComplete
            onSearch={handleSearch}
            placeholder="Search transaction id"
            onSelect={handleSearchHashId}
            options={options}
            allowClear={true}
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
          >
            Reset
          </Button>
        </div>
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={getData(current, pageSize)}
        // className="transaction_crypto_history"
        className="custom_table"
        scroll={{ x: true }}
        style={{ maxWidth: '94vw' }}
      />
      <MyPagination
        total={txListFilter && txListFilter.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
};

export default BSTransactionHistoryTable;
