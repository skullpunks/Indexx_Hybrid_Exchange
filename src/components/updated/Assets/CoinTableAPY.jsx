import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Paper } from '@mui/material';
import { useTheme } from '@mui/styles';
import CustomSelectBox from './CustomSelectBox';
import Inex from '../../../assets/updated/buySell/INEX.svg';

const headCells = [
  {
    id: 'coin',
    numeric: false,
    disablePadding: true,
    label: 'Coin',
    minWidth: 100,
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    minWidth: 120,
  },
  {
    id: 'maturityDate',
    numeric: false,
    disablePadding: false,
    label: 'Maturity Date',
    minWidth: 150, // Wider to accommodate the longer heading
  },
  {
    id: 'stakedAmount',
    numeric: true,
    disablePadding: false,
    label: 'Staked Amount',
    minWidth: 190, // Wider to accommodate the longer heading
  },
  {
    id: 'lockupPeriod',
    numeric: false,
    disablePadding: false,
    label: 'Lock-up Period',
    minWidth: 200, // Wider to accommodate the longer heading
  },
  {
    id: 'divident',
    numeric: false,
    disablePadding: false,
    label: 'Divident 5%',
    minWidth: 180,
  },
  {
    id: 'APYYield',
    numeric: false,
    disablePadding: false,
    label: 'APY Yield',
    minWidth: 120,
  },
  {
    id: 'totalYield',
    numeric: false,
    disablePadding: false,
    label: 'Total Yield',
    minWidth: 180,
  },
  {
    id: 'daystoMaturity',
    numeric: false,
    disablePadding: false,
    label: 'Days to Maturity',
    minWidth: 220, // Wider to accommodate the longer heading
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
    minWidth: 120,
  },
];

const dummyData = [
  {
    id: 1,
    coin: 'INEX',
    date: '2023-10-01',
    maturityDate: '2024-10-01',
    stakedAmount: 1000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '10%',
    totalYield: '$100',
    daystoMaturity: 365,
  },
  {
    id: 2,
    coin: 'INXC',
    date: '2023-09-15',
    maturityDate: '2024-09-15',
    stakedAmount: 500,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '8%',
    totalYield: '$40',
    daystoMaturity: 300,
  },
  {
    id: 3,
    coin: 'IN500',
    date: '2023-08-20',
    maturityDate: '2024-08-20',
    stakedAmount: 2000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '12%',
    totalYield: '$240',
    daystoMaturity: 250,
  },
  {
    id: 4,
    coin: 'INEX',
    date: '2023-10-01',
    maturityDate: '2024-10-01',
    stakedAmount: 1000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '10%',
    totalYield: '$100',
    daystoMaturity: 365,
  },
  {
    id: 5,
    coin: 'INXC',
    date: '2023-09-15',
    maturityDate: '2024-09-15',
    stakedAmount: 500,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '8%',
    totalYield: '$40',
    daystoMaturity: 300,
  },
  {
    id: 6,
    coin: 'IN500',
    date: '2023-08-20',
    maturityDate: '2024-08-20',
    stakedAmount: 2000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '12%',
    totalYield: '$240',
    daystoMaturity: 250,
  },
  {
    id: 7,
    coin: 'INEX',
    date: '2023-10-01',
    maturityDate: '2024-10-01',
    stakedAmount: 1000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '10%',
    totalYield: '$100',
    daystoMaturity: 365,
  },
  {
    id: 8,
    coin: 'INXC',
    date: '2023-09-15',
    maturityDate: '2024-09-15',
    stakedAmount: 500,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '8%',
    totalYield: '$40',
    daystoMaturity: 300,
  },
  {
    id: 9,
    coin: 'IN500',
    date: '2023-08-20',
    maturityDate: '2024-08-20',
    stakedAmount: 2000,
    lockupPeriod: '1 Year',
    divident: '5%',
    APYYield: '12%',
    totalYield: '$240',
    daystoMaturity: 250,
  },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.minWidth, border: 'none !important' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function CoinTableAPY() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('coin');
  const [actionValues, setActionValues] = useState({});
  const [value, setValue] = useState('Select Action');
  const theme = useTheme();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleActionChange = (event, id) => {
    setActionValues({ ...actionValues, [id]: event.target.value });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          '&.MuiPaper-root': {
            background: 'none',
          },
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? '#5f6673 !important'
                : '#b7bdc6 !important',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            display: 'none !important', // Hide the scrollbar track
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? '#484f59 !important' // Darker color for dark mode
                : '#a0a6af !important', // Darker color for light mode
          },
        }}
      >
        <TableContainer
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? '#5f6673 !important'
                  : '#b7bdc6 !important',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              display: 'none !important', // Hide the scrollbar track
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? '#484f59 !important' // Darker color for dark mode
                  : '#a0a6af !important', // Darker color for light mode
            },
          }}
        >
          <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{ border: 'none !important' }}
                  >
                    <img src={Inex} /> {row.coin}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.maturityDate}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.stakedAmount}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.lockupPeriod}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.divident}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.APYYield}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.totalYield}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    {row.daystoMaturity}
                  </TableCell>
                  <TableCell sx={{ border: 'none !important' }}>
                    <CustomSelectBox
                      items={[
                        { name: 'Select Action', value: 'Select Action' },
                        { name: 'Withdraw', value: 'Withdraw' },
                        {
                          name: 'Reinvest',
                          value: 'Reinvest',
                        },
                      ]}
                      value={value}
                      onChange={handleChange}
                      hasborder
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

CoinTableAPY.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  hideAssets: PropTypes.bool.isRequired,
};
