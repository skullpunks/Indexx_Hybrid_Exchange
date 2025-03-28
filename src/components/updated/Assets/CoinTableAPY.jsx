import React, { useState, useEffect } from 'react';
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
import { Paper, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import CustomSelectBox from './CustomSelectBox';
import {
  smartAPY,
  reinvestSmartAPY,
  withdrawSmartAPY,
  decodeJWT,
} from '../../../services/api';
import iusdp from '../../../assets/token-icons/IUSDP_logo.png';
import SuccessfullWithdrawPopup from '../SmartApy/SuccessfullWithdrawPopup';
import SmartApyWithdrawPopup from '../SmartApy/SmartApyWithdrawPopup';
import smartApyLogo from '../../../assets/updated/SmartApy/smartApyLogo.svg';

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
    minWidth: 150,
  },
  {
    id: 'stakedAmount',
    numeric: true,
    disablePadding: false,
    label: 'Staked Amount',
    minWidth: 190,
  },
  {
    id: 'lockupPeriod',
    numeric: false,
    disablePadding: false,
    label: 'Lock-up Period',
    minWidth: 200,
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
    minWidth: 220,
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
    minWidth: 120,
  },
];

export default function CoinTableAPY({ refresh }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('coin');
  const [txList, setTxList] = useState([]);
  const [loadingRow, setLoadingRow] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token));
    smartAPY(decodedToken?.email).then((res) => {
      const results = res.data;
      const reversedResults = [...results].reverse();
      setTxList(reversedResults);
    });
  }, [refresh]);

  const getImage = (image) => {
    try {
      if (image === 'IUSD+') {
        return iusdp;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return iusdp;
    }
  };

  const confirmWithdraw = (email, smartApyId) => {
    setWithdrawPopup(false);
    setLoadingRow(smartApyId);
    withdrawSmartAPY(email, smartApyId).then((response) => {
      if (response.status === 200) {
        setSuccessPopup(true);
        setTxList((prev) =>
          prev.filter((item) => item.smartApyId !== smartApyId)
        );
      } else {
        alert('Withdrawal failed: ' + response.message);
      }
      setLoadingRow(null);
    });
  };

  const handleWithdraw = (email, smartApyId) => {
    setSelectedWithdraw({ email, smartApyId });
    setWithdrawPopup(true);
  };

  const handleReinvest = (email, smartApyId) => {
    setLoadingRow(smartApyId);
    reinvestSmartAPY(email, smartApyId).then((response) => {
      if (response.status === 200) {
        setTxList((prev) =>
          prev.map((item) =>
            item.smartApyId === smartApyId
              ? { ...item, reinvested: true }
              : item
          )
        );
      } else {
        alert('Reinvestment failed: ' + response.message);
      }
      setLoadingRow(null);
    });
  };

  const handleChange = (event, row) => {
    const value = event.target.value;
    if (value === 'Withdraw') {
      handleWithdraw(row.email, row.smartApyId);
    } else if (value === 'Reinvest') {
      const daysBeforeEndDate = Math.floor(
        (new Date(row.endDate) - new Date()) / (1000 * 60 * 60 * 24)
      );
      if (daysBeforeEndDate >= 1 && daysBeforeEndDate <= 7) {
        handleReinvest(row.email, row.smartApyId);
      } else {
        alert(
          'Reinvestment is allowed only between 1 to 7 days before maturity date'
        );
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Smart APY Header - Always shown */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <img
          src={smartApyLogo}
          alt="Smart APY Logo"
          style={{ maxHeight: '50px', width: 'auto', objectFit: 'contain' }}
        />
        <Box
          sx={{
            fontSize: '22px',
            color: 'white',
            fontWeight: 600,
            marginTop: '8px',
            fontStyle: 'italic',
          }}
        >
          Smart APY
        </Box>
      </Box>

      {/* No Assets Message - Only shown when empty */}
      {txList.length === 0 && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TableContainer
            component={Paper}
            sx={{
              background: 'none',
              boxShadow: 'none',
              width: 'auto',
            }}
          >
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={headCells.length}
                    sx={{
                      textAlign: 'center',
                      border: 'none',
                      padding: '40px 16px',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    No Smart APY assets available
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Table - Only shown when there are records */}
      {txList.length > 0 && (
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
              display: 'none !important',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? '#484f59 !important'
                  : '#a0a6af !important',
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
                display: 'none !important',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? '#484f59 !important'
                    : '#a0a6af !important',
              },
            }}
          >
            <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sx={{ minWidth: headCell.minWidth }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() =>
                          setOrder(order === 'asc' ? 'desc' : 'asc')
                        }
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {txList.map((row) => {
                  const daysBeforeEndDate = Math.floor(
                    (new Date(row.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                  );
                  const isReinvestEnabled =
                    daysBeforeEndDate >= 1 && daysBeforeEndDate <= 7;
                  return (
                    <TableRow key={row.smartApyId}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        sx={{ border: 'none !important' }}
                      >
                        <img
                          src={getImage(row?.coin)}
                          style={{ width: '20px', height: '20px' }}
                        />{' '}
                        {row.coin}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {new Date(row.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {new Date(row.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {row.stakedAmount}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {row.duration}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {(row.percentage * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {row.finalAmount}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        {daysBeforeEndDate}
                      </TableCell>
                      <TableCell sx={{ border: 'none !important' }}>
                        <CustomSelectBox
                          items={[
                            { name: 'Select Action', value: 'Select Action' },
                            {
                              name: 'Withdraw',
                              value: 'Withdraw',
                              disabled: !row.isActive,
                            },
                            {
                              name: 'Reinvest',
                              value: 'Reinvest',
                              disabled: !(
                                daysBeforeEndDate >= 1 && daysBeforeEndDate <= 7
                              ),
                            },
                          ]}
                          value={'Select Action'}
                          onChange={(event) => handleChange(event, row)}
                          hasborder
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {successPopup && (
        <SuccessfullWithdrawPopup onClose={() => setSuccessPopup(false)} />
      )}
      {withdrawPopup && (
        <SmartApyWithdrawPopup
          onClose={() => setWithdrawPopup(false)}
          onConfirm={() =>
            confirmWithdraw(selectedWithdraw.email, selectedWithdraw.smartApyId)
          }
        />
      )}
    </Box>
  );
}

CoinTableAPY.propTypes = {
  refresh: PropTypes.any,
};
