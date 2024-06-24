import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getUserWallets } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import in500 from '../../../assets/token-icons/IN500_logo.png';
import inxc from '../../../assets/token-icons/INXC_logo.png';
import iusdp from '../../../assets/token-icons/IUSDP_logo.png';
import { useNavigate } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'coin',
    numeric: false,
    disablePadding: true,
    label: 'Coin',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'coin_price',
    numeric: true,
    disablePadding: false,
    label: 'Coin Price',
  },
  {
    id: 'todayPNL',
    numeric: true,
    disablePadding: false,
    label: 'Today‘s PnL',
  },
  {
    id: 'staking_balance',
    numeric: true,
    disablePadding: false,
    label: 'Staking Balance',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isMobile } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  if (isMobile) {
    return null; // Don't render the table header on mobile devices
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ borderBottom: 'none !important' }}
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
  isMobile: PropTypes.bool.isRequired,
};

export default function EnhancedTable({ searchQuery, hideAssets }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dense, setDense] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const calculateTodayPNL = (item) => {
    const fixedTokens = ['INEX', 'IUSD+', 'INXC', 'IN500', 'WIBS'];
    if (fixedTokens.includes(item.coinSymbol)) {
      return {
        value: '0.00',
        color: 'green',
      };
    }
    return {
      value: item.coinBalance > 0 ? (Math.random() * 10).toFixed(2) : '0.00',
      color: 'default',
    };
  };

  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else if (image === 'IN500') {
        return in500;
      } else if (image === 'INXC') {
        return inxc;
      } else if (image === 'IUSD+') {
        return iusdp;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let email = String(localStorage.getItem('email'));
        if (email === null || email === undefined || email === '') {
          navigate('/auth/login');
        } else {
          let userWallets = await getUserWallets(email);
          const formattedData = userWallets.data.map((item) => ({
            id: item.coinName,
            coin: item.coinSymbol,
            amount: item.coinBalance,
            coin_price: item?.coinPrice,
            todayPNL:
              item.coinBalance > 0 ? (Math.random() * 10).toFixed(2) : 0,
            coinNetwork: item.coinNetwork,
            staking_balance: item.coinStakedBalance
              ? item.coinStakedBalance
              : 0, 
          }));
          setRows(formattedData);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearchQuery =
        row.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.id.toLowerCase().includes(searchQuery.toLowerCase());
      const passesHideAssets = !hideAssets || row.amount * row.coin_price >= 1;
      return matchesSearchQuery && passesHideAssets;
    });
  }, [rows, searchQuery, hideAssets]);

  const visibleRows = useMemo(
    () => stableSort(filteredRows, getComparator(order, orderBy)),
    [order, orderBy, filteredRows]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table
          sx={{ minWidth: { xs: '100%', sm: 750 } }} // Use minWidth based on screen size
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            isMobile={isMobile}
          />
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  sx={{ borderBottom: 'none !important' }}
                >
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 0,
                      '&:hover': {
                        background: 'transparent !important',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Avatar alt={`${row.coin}`} src={getImage(row?.coin)} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={row.coin}
                      secondary={`ID: ${row.id}`}
                    />
                  </ListItem>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: 'none !important' }}
                >
                  {new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  }).format(row.amount)}
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none !important' }}
                    >
                      {row.coin_price === 0.00021
                        ? row.coin_price.toFixed(5)
                        : row.coin_price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none !important' }}
                    >
                      {row.todayPNL}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none !important' }}
                    >
                      {new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      }).format(row.staking_balance)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  hideAssets: PropTypes.bool.isRequired,
};
