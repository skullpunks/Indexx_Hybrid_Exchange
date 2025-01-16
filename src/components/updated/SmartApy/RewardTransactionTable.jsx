import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import SingleSelectPlaceholder from '../Staking/CustomSelect';
import StickyHeadTable from '../Staking/StakingBottom/WebViewTable';
import { useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
    padding: '25px 20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      background: 'none',
      alignItems: 'flex-start',
      padding: '25px 0px',
    },
    marginTop: '50px',
  },
  headerText: {
    fontSize: '40px',
    color: theme.palette.text.primary,
    fontWeight: '500',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    },
  },
  selectContainer: {
    flex: 1,
    display: 'flex',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  tableContainer: {
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
  },
}));

const RewardTransactionTable = ({ refresh }) => {
  const classes = useStyles();
  const [txList, setTxList] = useState([]);
  const [txListFilter, setTxListFilter] = useState([]);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;

  const [selectedIsActive, setSelectedIsActive] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  // Sample data for table
  const sampleData = [
    { id: 1, coin: 'BTC', type: 'Deposit', isActive: true },
    { id: 2, coin: 'ETH', type: 'Withdraw', isActive: false },
    { id: 3, coin: 'USDT', type: 'Deposit', isActive: true },
    { id: 4, coin: 'BTC', type: 'Withdraw', isActive: false },
    { id: 5, coin: 'ETH', type: 'Deposit', isActive: true },
    { id: 6, coin: 'USDT', type: 'Withdraw', isActive: false },
    { id: 7, coin: 'BTC', type: 'Deposit', isActive: true },
    { id: 8, coin: 'ETH', type: 'Withdraw', isActive: true },
    { id: 9, coin: 'USDT', type: 'Deposit', isActive: false },
    { id: 10, coin: 'BTC', type: 'Withdraw', isActive: true },
  ];

  useEffect(() => {
    // Set sample data as initial table data
    const reversedResults = [...sampleData].reverse();
    setTxList(reversedResults);
    setTxListFilter(reversedResults);
  }, [refresh]);

  useEffect(() => {
    let filteredData = txList;
    if (selectedIsActive) {
      const isActive = selectedIsActive === 'Active';
      filteredData = filteredData.filter((item) => item.isActive === isActive);
    }
    if (selectedType) {
      filteredData = filteredData.filter((item) => item.type === selectedType);
    }
    if (selectedCoin) {
      filteredData = filteredData.filter((item) => item.coin === selectedCoin);
    }
    setTxListFilter(filteredData);
    setCurrent(1); // Reset to the first page whenever filters change
  }, [selectedIsActive, selectedType, selectedCoin, txList]);

  const handleIsActiveSelect = (value) => {
    setSelectedIsActive(value);
  };

  const handleTypeSelect = (value) => {
    setSelectedType(value);
  };

  const handleCoinSelect = (value) => {
    setSelectedCoin(value);
  };

  const uniqueCoins = [...new Set(txList.map((item) => item.coin))];
  const uniqueTypes = [...new Set(txList.map((item) => item.type))];

  return (
    <div style={{ padding: '20px' }}>
      <div className={classes.headerContainer}>
        <div className={classes.headerText}>Rewards and Transactions</div>
        <div className={classes.selectContainer}>
          <SingleSelectPlaceholder
            items={['Active', 'Inactive']}
            type={'Status'}
            onTokenSelect={handleIsActiveSelect}
          />
          <SingleSelectPlaceholder
            items={uniqueTypes}
            type={'Type'}
            onTokenSelect={handleTypeSelect}
          />
          <SingleSelectPlaceholder
            items={uniqueCoins}
            type={'Coin'}
            onTokenSelect={handleCoinSelect}
          />
        </div>
      </div>
      <div className={classes.tableContainer}>
        <StickyHeadTable
          data={txListFilter}
          pageSize={pageSize}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </div>
  );
};

export default RewardTransactionTable;
