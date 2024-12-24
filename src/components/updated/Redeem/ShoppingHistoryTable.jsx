import { Pagination, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const ShoppingHistoryTable = () => {
  const pageSize = 10;
  const [current, setCurrent] = useState(1);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'txDate',
      key: 'txDate',
      width: 100,
      render: (text) => (
        <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'currencyRef',
      key: 'currencyRef',
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Receiver's Email",
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Selected Payment For Gift',
      dataIndex: 'walletType',
      key: 'walletType',
      width: 200,
      render: (text) => (
        <span>{text === 'ASSET_WALLET' ? 'Asset Wallet' : text}</span>
      ),
    },
  ];

  const dataSource = Array.from({ length: 20 }, (_, index) => ({
    key: index + 1,
    txDate: moment().subtract(index, 'days').toISOString(),
    currencyRef: `$${(Math.random() * 100).toFixed(2)}`,
    transactionType: `user${index + 1}@example.com`,
    walletType: index % 2 === 0 ? 'ASSET_WALLET' : 'CASH_WALLET',
  }));

  const MyPagination = ({ total, onChange, current }) => {
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

  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = dataSource.slice(startIndex, endIndex);

  return (
    <div className="flex-align-stretch bs_main width-100 margin-t-3x padding-t-2x">
      <Table
        columns={columns}
        pagination={false}
        dataSource={paginatedData}
        className="custom_table"
        scroll={{ x: '1200px' }}
      />
      <MyPagination
        total={dataSource.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
};

export default ShoppingHistoryTable;
