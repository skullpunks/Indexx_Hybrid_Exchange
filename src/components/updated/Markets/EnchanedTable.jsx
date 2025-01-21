import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Button } from '@mui/material';
import GeneralPopup from '../BuySell/Popup';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  greenText: {
    color: `${theme.palette.success.main} !important`,
  },
  redText: {
    color: `${theme.palette.error.main} !important`,
  },
  hoverRow: {
    '&:hover': {
      backgroundColor: theme.palette.divider,
    },
  },
}));

const getImage = (symbol) => {
  try {
    return require(`../../../assets/token-icons/${symbol}.png`).default;
  } catch (error) {
    return require('../../../assets/updated/buySell/INEX.svg').default;
  }
};

const EnhancedTable = ({
  searchQuery,
  hideAssets,
  marketType,
  data = [],
  isLoading,
}) => {
  const classes = useStyles();
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const filteredRows = useMemo(() => {
    if (Array.isArray(data)) {
      return data
        .filter((row) =>
          row.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 10); // Limit to 10 results
    }
    return [];
  }, [data, searchQuery]);

  const handleRowClick = (Symbol) => {
    const restrictedSymbols = [
      'INEX',
      'WIBS',
      'INXC',
      'INXP',
      'IN500',
      'IUSD+',
      'DaCrazy',
    ];

    if (restrictedSymbols.includes(Symbol)) {
      // Do nothing if the symbol is in the restricted list
      console.log(`No redirect for token: ${Symbol}`);
      setPopupMessage(`Chart for ${Symbol} coming soon!`);
      setShowPopup(true);
      return;
    }

    console.log(`Row clicked: ${Symbol}`);
    window.location.href = `/indexx-exchange/trading-view/${Symbol}`;
  };

  const renderRowForMarketType = (row, index) => {
    const showCoinImage = marketType === 'Crypto'; // Show image only for "Crypto"

    switch (marketType) {
      case 'BTC Market':
      case 'ETH Market':
      case 'BNB Market':
      case 'USDT Market':
        return (
          <TableRow
            key={row.Name}
            className={classes.hoverRow}
            sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
          >
            <TableCell sx={{ borderBottom: 'none !important' }}>
              {showCoinImage ? (
                <div className={classes.avatarCell}>
                  <Avatar alt={row.Name} src={getImage(row.Symbol)} />{' '}
                  {row.Symbol}
                </div>
              ) : (
                `${row.Symbol}/${marketType.split(' ')[0]}`
              )}
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
              {marketType === 'BTC Market'
                ? `${Number(row.BTCPrice).toFixed(7)} BTC`
                : marketType === 'ETH Market'
                ? `${Number(row.ETHPrice).toFixed(7)} ETH`
                : marketType === 'BNB Market'
                ? `${Number(row.BNBPrice).toFixed(7)} BNB`
                : `${Number(row.IUSDPrice).toFixed(7)} USDT`}
            </TableCell>
            <TableCell
              align="right"
              className={row.Change >= 0 ? classes.greenText : classes.redText}
              sx={{ borderBottom: 'none !important' }}
            >
              {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleRowClick(row.Symbol)}
              >
                View Chart
              </Button>
            </TableCell>
          </TableRow>
        );
      case 'All Market':
        return (
          <>
            <TableRow
              key={`${row.Name}-USD`}
              className={classes.hoverRow}
              sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
            >
              <TableCell sx={{ borderBottom: 'none !important' }}>
                {row.Symbol}/USD
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                {Number(row.Price).toFixed(7)} USD
              </TableCell>
              <TableCell
                align="right"
                className={
                  row.Change >= 0 ? classes.greenText : classes.redText
                }
                sx={{ borderBottom: 'none !important' }}
              >
                {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleRowClick(row.Symbol)}
                >
                  View Chart
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={`${row.Name}-BTC`}
              className={classes.hoverRow}
              sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
            >
              <TableCell sx={{ borderBottom: 'none !important' }}>
                {row.Symbol}/BTC
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                {Number(row.BTCPrice).toFixed(7)} BTC
              </TableCell>
              <TableCell
                align="right"
                className={
                  row.Change >= 0 ? classes.greenText : classes.redText
                }
                sx={{ borderBottom: 'none !important' }}
              >
                {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleRowClick(row.Symbol)}
                >
                  View Chart
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={`${row.Name}-ETH`}
              className={classes.hoverRow}
              sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
            >
              <TableCell sx={{ borderBottom: 'none !important' }}>
                {row.Symbol}/ETH
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                {Number(row.ETHPrice).toFixed(7)} ETH
              </TableCell>
              <TableCell
                align="right"
                className={
                  row.Change >= 0 ? classes.greenText : classes.redText
                }
                sx={{ borderBottom: 'none !important' }}
              >
                {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleRowClick(row.Symbol)}
                >
                  View Chart
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={`${row.Name}-BNB`}
              className={classes.hoverRow}
              sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
            >
              <TableCell sx={{ borderBottom: 'none !important' }}>
                {row.Symbol}/BNB
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                {Number(row.BNBPrice).toFixed(7)} BNB
              </TableCell>
              <TableCell
                align="right"
                className={
                  row.Change >= 0 ? classes.greenText : classes.redText
                }
                sx={{ borderBottom: 'none !important' }}
              >
                {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleRowClick(row.Symbol)}
                >
                  View Chart
                </Button>
              </TableCell>
            </TableRow>
          </>
        );
      case 'Crypto':
        return (
          <TableRow
            key={row.Symbol}
            className={classes.hoverRow}
            sx={{ cursor: 'pointer', borderBottom: 'none !important' }}
          >
            <TableCell
              sx={{
                borderBottom: 'none !important',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={row.Symbol}
                src={getImage(row.Symbol)}
                sx={{ marginRight: '8px' }}
              />{' '}
              {/* Add margin to separate the avatar from the symbol */}
              {row.Symbol}
            </TableCell>

            <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
              {Number(row.Price).toFixed(7)} USD
            </TableCell>
            <TableCell
              align="right"
              className={row.Change >= 0 ? classes.greenText : classes.redText}
              sx={{ borderBottom: 'none !important' }}
            >
              {row.Change >= 0 ? `+${row.Change}%` : `${row.Change}%`}
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleRowClick(row.Symbol)}
              >
                View Chart
              </Button>
            </TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage('');
  };
  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none !important' }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                Price
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none !important' }}>
                Change
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => renderRowForMarketType(row))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPopup && (
        <GeneralPopup
          message={popupMessage}
          onClose={handlePopupClose}
          width={popupMessage.length > 100 ? '600px' : '360px'}
        />
      )}
    </Box>
  );
};

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  hideAssets: PropTypes.bool.isRequired,
  marketType: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired, // Now using real data passed as prop
  isLoading: PropTypes.bool.isRequired, // Prop for loader state
};

export default EnhancedTable;
