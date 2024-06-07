import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const columns = [
  { id: 'startDate', label: 'Start Date', minWidth: 170 },
  { id: 'endDate', label: 'End Date', minWidth: 170 },
  { id: 'stakedAmount', label: 'Staked Amount', minWidth: 100 },
  { id: 'rewardAmount', label: 'Reward Amount', minWidth: 100 },
  { id: 'finalAmount', label: 'Final Amount', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'duration', label: 'Duration', minWidth: 100 },
  { id: 'percentage', label: 'Percentage', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

function createData(
  startDate,
  endDate,
  stakedAmount,
  rewardAmount,
  finalAmount,
  type,
  duration,
  percentage,
  status
) {
  return {
    startDate,
    endDate,
    stakedAmount,
    rewardAmount,
    finalAmount,
    type,
    duration,
    percentage,
    status,
  };
}

const rows = [
  createData(
    '2023-01-01',
    '2023-06-01',
    1000,
    60,
    1060,
    'Fixed',
    '6 Months',
    '6%',
    'Completed'
  ),
  createData(
    '2023-02-01',
    '2023-08-01',
    2000,
    180,
    2180,
    'Flexible',
    '6 Months',
    '9%',
    'Completed'
  ),
  createData(
    '2023-03-01',
    '2023-12-01',
    1500,
    225,
    1725,
    'Fixed',
    '9 Months',
    '15%',
    'In Progress'
  ),
  createData(
    '2023-04-01',
    '2023-10-01',
    3000,
    180,
    3180,
    'Flexible',
    '6 Months',
    '6%',
    'Completed'
  ),
  createData(
    '2023-05-01',
    '2024-05-01',
    2500,
    375,
    2875,
    'Fixed',
    '12 Months',
    '15%',
    'In Progress'
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10; // Set a fixed number of rows per page
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(rows.length / rowsPerPage);
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
      >
        <Button
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span>
          {page + 1} of {pageCount}
        </span>
        <Button
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page >= pageCount - 1}
        >
          Next
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
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              '& .MuiTableCell-head': {
                background: '#174b35',
                borderRadius: '0',
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, border: 'none' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {renderPagination()}
    </Paper>
  );
}
