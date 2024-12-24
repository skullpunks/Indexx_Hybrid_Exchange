import { Pagination, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { decodeJWT, getAllGiftCards } from '../../../services/api';

const ShoppingHistoryTable = () => {
  const [giftCards, setGiftCards] = useState([]);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchGiftCard() {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeJWT(String(token));
      let res = await getAllGiftCards(decodedToken?.email);
      // Sort the data in reverse order by dateOfGeneration (latest first)
      const sortedData = res.data.sort(
        (a, b) => new Date(b.dateOfGeneration) - new Date(a.dateOfGeneration)
      );

      setGiftCards(sortedData);
    }
    fetchGiftCard();
  }, []);

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
      render: (text) => <span>${text.toFixed(2)}</span>,
    },
    {
      title: "Receiver's Email",
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 100,
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Selected Payment For Gift',
      dataIndex: 'walletType',
      key: 'walletType',
      width: 200,
      render: (text) => (
        <span>{text === 'Asset Wallet' ? 'Asset Wallet' : text}</span>
      ),
    },
  ];

  const dataSource = giftCards.map((giftCard, index) => ({
    key: index + 1,
    txDate: giftCard.dateOfGeneration,
    currencyRef: giftCard.amount,
    transactionType: giftCard.assignedToUser,
    walletType: giftCard.paymentMethodUsed,
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
