import * as React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import previousIcon from '../../../../assets/updated/Icon-prev.svg';
import nextIcon from '../../../../assets/updated/Icon-next.svg';
const columns = [
  { id: 'startDate', label: 'Start Date', minWidth: 190 },
  { id: 'endDate', label: 'End Date', minWidth: 190 },
  { id: 'stakedAmount', label: 'Staked Amount', minWidth: 100 },
  { id: 'rewardAmount', label: 'Reward Amount', minWidth: 100 },
  { id: 'finalAmount', label: 'Final Amount', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'duration', label: 'Duration', minWidth: 100 },
  { id: 'percentage', label: 'Percentage', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

export default function StickyHeadTable({
  data,
  pageSize,
  current,
  setCurrent,
}) {
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setCurrent(newPage);
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(data.length / pageSize);
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
      >
        <Button
          onClick={() => handleChangePage(null, current - 1)}
          disabled={current === 1}
          sx={{
            width: '120px',
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            '&.Mui-disabled': {
              background: 'none !important',
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          <img src={previousIcon} alt="previous icon" /> Previous
        </Button>
        <Pagination
          count={pageCount}
          page={current}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiButtonBase-root': {
              border: 'none',
            },
            '& .Mui-selected': {
              backgroundColor: `${theme.palette.primary.main} !important`,
            },
            '&.MuiPagination-root': {
              position: 'relative',
              background: 'none',
            },
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
            '& .MuiPaginationItem-root': {
              display: 'none',
            },
            '& .MuiPaginationItem-page': {
              display: 'inline-flex',
            },
          }}
        />
        <Button
          onClick={() => handleChangePage(null, current + 1)}
          disabled={current >= pageCount}
          sx={{
            width: '120px',
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            '&.Mui-disabled': {
              background: 'none !important',
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          Next <img src={nextIcon} alt="next icon" />
        </Button>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        '&.MuiPaper-root': {
          background: 'none',
        },
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 450,
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
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              '& .MuiTableCell-head': {
                background: '#174b35',
                borderRadius: '0',
                color: theme.palette.mode === 'light' ? 'white' : '',
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, border: 'none' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice((current - 1) * pageSize, current * pageSize)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {column.id === 'startDate' || column.id === 'endDate'
                          ? moment(value).format('MM/DD/YYYY hh:mm:ss a')
                          : column.id === 'status'
                          ? row.isActive
                            ? 'Active'
                            : 'Inactive'
                          : column.id === 'stakedAmount'
                          ? `${parseFloat(value)?.toFixed(2)} ${row.coin}`
                          : column.id === 'rewardAmount'
                          ? `${parseFloat(value)?.toFixed(2)} ${row.rewardCoin}`
                          : column.id === 'finalAmount'
                          ? row.coin === row.rewardCoin
                            ? `${(row.stakedAmount + row.rewardAmount)?.toFixed(
                                2
                              )} ${row.coin}`
                            : `${row.stakedAmount?.toFixed(2)} ${
                                row.coin
                              } + ${row.rewardAmount?.toFixed(2)} ${
                                row.rewardCoin
                              }`
                          : column.id === 'percentage'
                          ? `${value * 100}%`
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderPagination()}
    </Paper>
  );
}
