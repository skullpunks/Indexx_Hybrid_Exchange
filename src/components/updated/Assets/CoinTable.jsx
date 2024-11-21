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
import { baseURL, decodeJWT, getUserWallets } from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import in500 from '../../../assets/token-icons/IN500_logo.png';
import inxc from '../../../assets/token-icons/INXC_logo.png';
import iusdp from '../../../assets/token-icons/IUSDP_logo.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  greenText: {
    color: `${theme.palette.success.main} !important`,
  },
  redText: {
    color: `${theme.palette.error.main} !important`,
  },
}));

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
    label: 'Crypto Amount/ USD',
  },
  {
    id: 'staking_balance',
    numeric: true,
    disablePadding: false,
    label: 'Staked Balance/ USD',
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
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dense, setDense] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const preferredOrder = [
    'INEX',
    'INXC',
    'IN500',
    'DaCrazy',
    'IUSD+',
    'WIBS',
    'BTC',
  ];
  const [smartCryptoCoins, setSmartCryptoCoins] = useState([]);

  const calculateTodayPNL = (item) => {
    const fixedTokens = ['INEX', 'IUSD+', 'INXC', 'IN500', 'WIBS', 'DaCrazy'];
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

        if (!email) {
          const signInToken = searchParams.get('signInToken');
          if (signInToken) {
            const decodedToken = await decodeJWT(signInToken);
            email = decodedToken.email;
          } else {
            window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
            return;
          }
        }

        const userWallets = await getUserWallets(email);
        const formattedData = userWallets.data.map((item) => {
          const coinBalance = Number(item.coinBalance);
          const coinPrice = Number(item.coinPrice);
          const coinPrevPrice = Number(item.coinPrevPrice);
          let todayPNL = null;

          if (
            coinBalance > 0 &&
            !isNaN(coinPrice) &&
            !isNaN(coinPrevPrice) &&
            coinPrevPrice !== 0
          ) {
            const pnlValue = coinBalance * (coinPrice - coinPrevPrice);
            const pnlPercentage =
              ((coinPrice - coinPrevPrice) / coinPrevPrice) * 100;
            todayPNL = {
              value: pnlValue.toFixed(2),
              percentage: pnlPercentage.toFixed(2),
              isPositive: pnlValue >= 0,
            };
          }

          //Check if the notes start with the desired phrases
          const hasSmartCryptoNote =
            item.notes.startsWith('Smart Crypto Surge') ||
            item.notes.startsWith('Smart Crypto Ripple') ||
            item.notes.startsWith('Smart Crypto Wave');

          // if (hasSmartCryptoNote) {
          //   smartCryptoCoins.push(item); // Push to the smartCryptoCoins array
          // }

          // Filter and update smartCryptoCoins state
          const newSmartCryptoCoins = userWallets.data.filter(
            (item) =>
              item.notes.startsWith('Smart Crypto Surge') ||
              item.notes.startsWith('Smart Crypto Ripple') ||
              item.notes.startsWith('Smart Crypto Wave')
          );
          setSmartCryptoCoins(newSmartCryptoCoins);
          return {
            id: item.coinName,
            coin: item.coinSymbol,
            amount: item.coinBalance,
            staking_balance: item.coinStakedBalance
              ? item.coinStakedBalance
              : 0,
            coin_price: item?.coinPrice,
            todayPNL: todayPNL,
            coinNetwork: item.coinNetwork,
            hasSmartCryptoNote: hasSmartCryptoNote, // Store flag for smart crypto
            notes: item.notes ? item.notes : '',
          };
        });

        // Ensure unique rows by coin name (id)
        const uniqueFormattedData = formattedData.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );

        setRows(uniqueFormattedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleRequestSort0 = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    const smartCryptoRows = rows.filter((row) => row.hasSmartCryptoNote); // Filter rows with smart crypto notes
    const otherRows = rows.filter((row) => !row.hasSmartCryptoNote); // Filter other rows
    const sortedSmartCryptoRows = stableSort(
      smartCryptoRows,
      getComparator(order, orderBy)
    );
    const sortedOtherRows = stableSort(
      otherRows,
      getComparator(order, orderBy)
    );

    return [...sortedSmartCryptoRows, ...sortedOtherRows]; // Combine the sorted rows
  }, [rows, order, orderBy]);

  const filteredRows = useMemo(() => {
    // Add a priority rank to each row based on the preferred order array
    const rowsWithPriority = sortedRows.map((row) => ({
      ...row,
      priority: preferredOrder.includes(row.coin)
        ? preferredOrder.indexOf(row.coin)
        : preferredOrder.length,
    }));

    // Sort by priority first, then by the selected order and orderBy
    const sortedByPriority = stableSort(
      rowsWithPriority,
      (a, b) => a.priority - b.priority || getComparator(order, orderBy)(a, b)
    );

    // If BTC is part of smartCryptoCoins, add it twice
    const finalRows = sortedByPriority.filter((row) => {
      const matchesSearchQuery =
        row.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (!hideAssets) return matchesSearchQuery;

      const passesHideAssets = row.amount > 0 || row.staking_balance > 0;
      return matchesSearchQuery && passesHideAssets;
    });
    console.log('finalRows, ', finalRows);
    console.log(smartCryptoCoins);
    console.log(smartCryptoCoins.some((coin) => coin.coinSymbol === 'BTC'));

    // Add BTC twice if it is in smartCryptoCoins
    if (smartCryptoCoins.some((coin) => coin.coinSymbol === 'BTC')) {
      console.log('');
      const btcRow = finalRows.find((row) => row.coin === 'BTC');
      console.log('btcRow', btcRow);
      if (btcRow) {
        // Duplicate BTC row in the final list
        finalRows.push(btcRow);
      }
    }

    return finalRows;
  }, [
    sortedRows,
    searchQuery,
    hideAssets,
    order,
    orderBy,
    preferredOrder,
    smartCryptoCoins,
  ]);

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

  // Find the first and last smart crypto coin rows based on the `smartCryptoCoins` list
  const firstSmartCryptoRowIndex = visibleRows.findIndex(
    (row) => row.hasSmartCryptoNote
  );
  console.log('firstSmartCryptoRowIndex', firstSmartCryptoRowIndex);
  const lastSmartCryptoRowIndex = visibleRows
    .slice()
    .reverse()
    .findIndex((row) => row.hasSmartCryptoNote);

  const lastSmartCryptoIndexAdjusted =
    lastSmartCryptoRowIndex === -1
      ? -1
      : visibleRows.length - 1 - lastSmartCryptoRowIndex;

  console.log('visibleRows', visibleRows);
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
            {visibleRows?.map((row, index) => {
              // Apply orange line between the first and last smart crypto rows
              const isHighlighted =
                (index === firstSmartCryptoRowIndex  ||
                  index === lastSmartCryptoIndexAdjusted) &&
                row.hasSmartCryptoNote;
              return (
                <>
                  {/* Add text row after the firstSmartCryptoRowIndex */}
                  {index === firstSmartCryptoRowIndex + 1 &&
                    row.hasSmartCryptoNote && (
                      <TableRow>
                        <TableCell
                          colSpan={isMobile ? 3 : 5} // Adjust colspan based on the number of columns
                          sx={{
                            borderBottom: 'none',
                            fontWeight: 'bold',
                            color: 'orange',
                            textAlign: 'center',
                          }}
                        >
                          {/* Dynamically render text based on notes */}
                          {(() => {
                            // Extract the manager's name and type from the notes
                            const notes = row.notes || '';
                            let managerCode = '';
                            let cryptoType = '';

                            if (notes.includes('Omkar')) {
                              managerCode = '001';
                            } else if (notes.includes('Kashir')) {
                              managerCode = '003';
                            } else if (notes.includes('Issa')) {
                              managerCode = '002';
                            }

                            if (notes.includes('Ripple')) {
                              cryptoType = 'Ripple';
                            } else if (notes.includes('Wave')) {
                              cryptoType = 'Wave';
                            } else if (notes.includes('Surge')) {
                              cryptoType = 'Surge';
                            }

                            // Combine the dynamic parts into the final string
                            return `Smart Crypto ${cryptoType} ${managerCode}`;
                          })()}
                        </TableCell>
                      </TableRow>
                    )}

                  <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      borderBottom: 'none !important',
                      ...(isHighlighted && {
                        borderBottom: '1px solid orange', // Apply orange line
                      }),
                    }}
                  >
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
                            <Avatar
                              alt={`${row.coin}`}
                              src={getImage(row?.coin)}
                            />
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
                      }).format(row.amount)}{' '}
                      / $
                      {row.coin === 'USD'
                        ? row.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : (row.amount * row.coin_price).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none !important' }}
                    >
                      {new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      }).format(row.staking_balance)}{' '}
                      / $
                      {(row.staking_balance * row.coin_price).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </TableCell>

                    {!isMobile && (
                      <>
                        <TableCell
                          align="right"
                          sx={{ borderBottom: 'none !important' }}
                        >
                          {row.coin === 'WIBS' || row.coin === 'DaCrazy'
                            ? row.coin_price.toFixed(5)
                            : row.coin_price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ borderBottom: 'none !important' }}
                          className={
                            row.todayPNL
                              ? row.todayPNL.isPositive
                                ? classes.greenText
                                : classes.redText
                              : ''
                          }
                        >
                          {row.todayPNL
                            ? `${row.todayPNL.value} (${row.todayPNL.percentage}%)`
                            : '0.00'}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </>
              );
            })}
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
