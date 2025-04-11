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
import {
  baseURL,
  decodeJWT,
  getUserWallets,
  smartAPY,
} from '../../../services/api';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import in500 from '../../../assets/token-icons/IN500_logo.png';
import inxc from '../../../assets/token-icons/INXC_logo.png';
import iusdp from '../../../assets/token-icons/IUSDP_logo.png';
import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';
import bullrun from '../../../assets/updated/smartCrypto/bullrun.png';
import cryptosImg from '../../../assets/updated/asset_wallet/crypto-04.png';
import blooming from '../../../assets/updated/smartCrypto/blomming.png';
import rush from '../../../assets/updated/smartCrypto/rush.png';
import xBitcoin from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button, Paper, Typography } from '@mui/material';
import SellConfirmationPopup from './SellConfirmationPopup';
import { useTheme } from '@mui/material/styles';
import CongratulationsPopup from './Congratulations';
import SellCongratulations from './SellCongratulations';
import smartCryptoIcon from '../../../assets/updated/asset_wallet/smartCryptoAssetWallet.svg';
import xBlueIcon from '../../../assets/updated/asset_wallet/x-blueAssetWallet.svg';
import xBitcoinIcon from '../../../assets/updated/asset_wallet/x-bitcoinAssetWallet.svg';
import ContactAccountManagerPopup from './ContactPopup';
import cryptoTreasuryImg from '../../../assets/updated/asset_wallet/crypto-treasury.png';
import fiatImg from '../../../assets/updated/asset_wallet/fiat-logo.png';
import smartApyLogo from '../../../assets/updated/SmartApy/smartApyLogo.svg';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  greenText: {
    color: `${theme.palette.success.main} !important`,
  },
  redText: {
    color: `${theme.palette.error.main} !important`,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  orderFirstOnTab: {
    [theme.breakpoints.down('md')]: {
      order: '-1',
    },
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
    label: 'Coin Price in USD',
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

export default function EnhancedTable({
  searchQuery,
  hideAssets,
  selectedValue,
  setupdatePlanMode,
  onPlanChange,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dense, setDense] = useState(false);
  const [sellConfirmationPopup, setSellConfirmationPopup] = useState(false);
  const [contactPopup, setContactPopup] = useState(false);
  const [type, setType] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [userType, setUserType] = useState('Indexx Exchange');
  const [userSellPlanReformed, setUserPlanNameReformed] = useState('');
  const [userSellPlan, setUserPlanName] = useState('');
  const [CongratulationsPopup, setCongratulationsPopup] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]); // Track expanded categories
  const [isTotalAmount, setIsTotalAmount] = useState(false);
  const [smartApyData, setSmartApyData] = useState([]);
  console.log('onPlanChange', onPlanChange);
  useEffect(() => {
    const user = localStorage.getItem('userType');
    if (user) {
      setUserType(user);
    }
  }, []);
  const [expandedLogos, setExpandedLogos] = useState({
    crypto: false,
    smartCrypto: false,
    fiat: false,
  });
  const [planName, setPlanName] = useState('');
  const preferredOrder = ['INEX', 'INXC', 'IN500', 'DaCrazy', 'IUSD+', 'WIBS'];
  const [smartCryptoCoins, setSmartCryptoCoins] = useState([]);
  const [userEmail, setUserEmail] = useState('');
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

  const fetchSmartAPY = async () => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token));
    const res = await smartAPY(decodedToken?.email);
    setSmartApyData([...res.data].reverse());
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
        setUserEmail(email);
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
          let coin = item.coinSymbol;
          // Default percentage values for preferred coins
          const coinPercentageMap = {
            INEX: 8.33,
            INXC: 1.05,
            IN500: 2.83,
            'IUSD+': 1.0,
            WIBS: 1.58,
            Dacrazy: 1.25,
            daCrazy: 1.25,
            DaCrazy: 1.25,
          };

          // Check if the coin is one of the preferred ones
          if (coinPercentageMap[coin]) {
            // For preferred coins with no previous price (null or zero), directly use the default percentage
            todayPNL = {
              value: (
                (item?.coinStakedBalance > 0
                  ? item?.coinStakedBalance
                  : item?.coinBalance) * coinPrice
              ).toFixed(2),
              percentage: coinPercentageMap[coin].toFixed(2),
              isPositive: coinPercentageMap[coin] >= 0, // Default positive as it's predefined
            };
          } else if (
            coinBalance > 0 &&
            !isNaN(coinPrice) &&
            !isNaN(coinPrevPrice) &&
            coinPrevPrice !== 0
          ) {
            // Calculate PNL for other coins if valid coinPrevPrice exists
            const pnlValue = coinBalance * (coinPrice - coinPrevPrice);
            const pnlPercentage =
              ((coinPrice - coinPrevPrice) / coinPrevPrice) * 100;

            todayPNL = {
              value: pnlValue.toFixed(2),
              percentage: pnlPercentage.toFixed(2),
              isPositive: pnlValue >= 0,
            };
          } else {
            // If no valid PNL, set it to null
            todayPNL = null;
          }
          //Check if the notes start with the desired phrases
          const hasSmartCryptoNote =
            item.notes.startsWith('Smart Crypto Surge') ||
            item.notes.startsWith('Smart Crypto Ripple') ||
            item.notes.startsWith('Smart Crypto Wave') ||
            item.notes.startsWith('xBitcoin Blooming') ||
            item.notes.startsWith('xBitcoin Federal Reserve') ||
            item.notes.startsWith('xBitcoin Rush') ||
            item.notes.startsWith('xBitcoin Bitcoin') ||
            item.notes.startsWith('xBBitcoin Bitcoin2') ||
            item.notes.startsWith('xBBitcoin Bull-Run-2') ||
            item.notes.startsWith('xBBitcoin Bull-Run-3') ||
            item.notes.startsWith('xBitcoin Bull-Run');

          // if (hasSmartCryptoNote) {
          //   smartCryptoCoins.push(item); // Push to the smartCryptoCoins array
          // }

          // Filter and update smartCryptoCoins state
          const newSmartCryptoCoins = userWallets.data.filter(
            (item) =>
              item.notes.startsWith('Smart Crypto Surge') ||
              item.notes.startsWith('Smart Crypto Ripple') ||
              item.notes.startsWith('Smart Crypto Wave') ||
              item.notes.startsWith('xBitcoin Blooming') ||
              item.notes.startsWith('xBitcoin Federal Reserve') ||
              item.notes.startsWith('xBitcoin Rush') ||
              item.notes.startsWith('xBitcoin Bitcoin') ||
              item.notes.startsWith('xBBitcoin Bitcoin2') ||
              item.notes.startsWith('xBBitcoin Bull-Run-2') ||
              item.notes.startsWith('xBBitcoin Bull-Run-3') ||
              item.notes.startsWith('xBitcoin Bull-Run')
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
            amountInvested: item?.amountInvested ? item?.amountInvested : 0,
          };
        });

        // Ensure unique rows by coin name (id)

        const uniqueFormattedData = formattedData.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
        if (
          !email === 'dpar4fam@hotmail.com' ||
          !email === 'fowlertrucking14@yahoo.com'
        )
          setRows(uniqueFormattedData);
        else setRows(formattedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchSmartAPY();
  }, [navigate]);

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
    const rowsWithPriority = sortedRows.map((row) => {
      // Inject sold coin balances for donpanchos4me@gmail.com
      if (userEmail === 'donpanchos4me@gmail.com') {
        const soldBalances = {
          BTC: 0.1682002461,
          SOL: 8.747821792,
          ETH: 0.5441778415,
          LINK: 40.10608826,
          DOT: 95.36857271,
          BNB: 1.245786036,
          XRP: 454.2118918,
        };
        const overrideAmount = soldBalances[row.coin];
        if (overrideAmount) {
          row.amount = overrideAmount;
        }
      }
      return {
        ...row,
        priority: preferredOrder.includes(row.coin)
          ? preferredOrder.indexOf(row.coin)
          : preferredOrder.length,
      };
    });

    // Sort by priority first, then by the selected order and orderBy
    const sortedByPriority = stableSort(
      rowsWithPriority,
      (a, b) => a.priority - b.priority || getComparator(order, orderBy)(a, b)
    );

    const finalRows = sortedByPriority.filter((row) => {
      const matchesSearchQuery =
        row.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.id.toLowerCase().includes(searchQuery.toLowerCase());
      console.log('matchesSearchQuery', row);
      if (!hideAssets && row.amount > 0) return matchesSearchQuery;

      const passesHideAssets =
        row.amount * row.coin_price >= 1 ||
        row.staking_balance > 0 ||
        (row.coin === 'USD' && row.amount > 0);
      return matchesSearchQuery && passesHideAssets;
    });

    console.log('finalRows', finalRows);
    console.log('smartCryptoCoins', smartCryptoCoins);
    // Additional filters based on `selectedValue`
    if (selectedValue === 'Fiat' || selectedValue === 'Fiat / Cash') {
      return finalRows.filter((row) => row.coin === 'USD');
    } else if (
      selectedValue === 'IUSD+' ||
      selectedValue === 'Smart APY' ||
      selectedValue === 'SmartAPY'
    ) {
      return finalRows.filter(
        (row) => row.coin === 'IUSD+' || row.coin === 'iUSD+'
      );
    } else if (selectedValue === 'Cryptos') {
      return finalRows.filter((row) => {
        const isSmartCryptoNote =
          row.notes.includes('Smart Crypto Surge') ||
          row.notes.includes('Smart Crypto Ripple') ||
          row.notes.includes('Smart Crypto Wave') ||
          row.notes.includes('xBitcoin Blooming') ||
          row.notes.includes('xBitcoin Federal Reserve') ||
          row.notes.includes('xBitcoin Rush') ||
          row.notes.includes('xBitcoin Bitcoin') ||
          row.notes.includes('xBBitcoin Bitcoin2') ||
          row.notes.includes('xBBitcoin Bull-Run-2') ||
          row.notes.includes('xBBitcoin Bull-Run-3') ||
          row.notes.includes('xBitcoin Bull-Run');
        return !isSmartCryptoNote && row.coin !== 'USD';
      });
    } else if (selectedValue === 'Smart Crypto') {
      return finalRows.filter((row) => {
        const isSmartCryptoNote =
          row.notes.includes('Smart Crypto Surge') ||
          row.notes.includes('Smart Crypto Ripple') ||
          row.notes.includes('Smart Crypto Wave') ||
          row.notes.includes('xBitcoin Blooming') ||
          row.notes.includes('xBitcoin Federal Reserve') ||
          row.notes.includes('xBitcoin Rush') ||
          row.notes.includes('xBitcoin Bitcoin') ||
          row.notes.includes('xBBitcoin Bitcoin2') ||
          row.notes.includes('xBBitcoin Bull-Run-2') ||
          row.notes.includes('xBBitcoin Bull-Run-3') ||
          row.notes.includes('xBitcoin Bull-Run');
        return isSmartCryptoNote; // Include only rows with Smart Crypto notes
      });
    } else {
      // Default case for Overview or other values
      return finalRows;
      //.filter((row) => row.coin !== 'USD');
    }
  }, [
    sortedRows,
    searchQuery,
    hideAssets,
    order,
    orderBy,
    preferredOrder,
    selectedValue,
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

  const applySelectedValue = (organizedRows, selectedValue) => {
    if (['Fiat', 'IUSD+', 'Crypto'].includes(selectedValue)) {
      // Use only the "Other Coins" category
      const otherCoinsCategory = organizedRows.find(
        (category) => category.category === 'Other Coins'
      );

      if (!otherCoinsCategory) return []; // Return empty if no "Other Coins" category exists

      const filteredRows = otherCoinsCategory.rows.filter((row) => {
        if (selectedValue === 'Fiat') return row.coin === 'USD';
        if (selectedValue === 'IUSD+')
          return row.coin === 'IUSD+' || row.coin === 'iUSD+';
        return true; // Include all rows for "Crypto"
      });

      return filteredRows.length > 0
        ? [{ category: 'Other Coins', rows: filteredRows }]
        : [];
    } else if (['Smart Crypto'].includes(selectedValue)) {
      // Exclude the "Other Coins" category
      return organizedRows.filter(
        (category) => category.category !== 'Other Coins'
      );
    } else {
      return organizedRows;
    }
  };

  const groupedRows = (rows) => {
    const categories = {};

    // Helper function to determine all applicable categories for a row
    const getCategories = (notes) => {
      let email = String(localStorage.getItem('email'));
      const applicableCategories = [];

      if (notes.startsWith('xBitcoin Blooming'))
        applicableCategories.push('Smart Crypto x-Bitcoin Blooming');
      if (notes.startsWith('xBitcoin Federal Reserve'))
        applicableCategories.push('Smart Crypto x-Bitcoin Federal Reserve');
      if (notes.startsWith('xBitcoin Rush'))
        applicableCategories.push('Smart Crypto x-Bitcoin Rush');
      if (notes.startsWith('xBitcoin Bull-Run'))
        if (email === 'fowlertrucking14@yahoo.com') {
          applicableCategories.push(
            'Smart Crypto x-Bitcoin Bull-Run($10,000 Investment + $10,000 Commission)'
          );
        } else {
          applicableCategories.push('Smart Crypto x-Bitcoin Bull-Run');
        }
      if (notes.startsWith('xBBitcoin Bull-Run-2'))
        applicableCategories.push('Smart Crypto x-Bitcoin Bull-Run-2');
      if (notes.startsWith('xBBitcoin Bull-Run-3'))
        applicableCategories.push('Smart Crypto x-Bitcoin Bull-Run-3');
      if (notes.startsWith('xBBitcoin Bitcoin-Commission'))
        applicableCategories.push('Smart Crypto x-Bitcoin Bitcoin-Commission');
      if (notes.startsWith('xBitcoin Bitcoin'))
        applicableCategories.push('Smart Crypto x-Bitcoin Bitcoin');
      if (notes.startsWith('xBBitcoin Bitcoin2'))
        applicableCategories.push('Smart Crypto x-Bitcoin Bitcoin-2');
      if (notes.includes('Wave'))
        applicableCategories.push('Smart Crypto x-Blue Wave');
      if (notes.includes('Surge'))
        applicableCategories.push('Smart Crypto x-Blue Surge');
      if (notes.includes('Ripple'))
        applicableCategories.push('Smart Crypto x-Blue Ripple');
      if (applicableCategories.length === 0)
        applicableCategories.push('Other Coins');
      return applicableCategories;
    };

    // Iterate over the rows to categorize them
    rows.forEach((row) => {
      const applicableCategories = getCategories(row.notes || ''); // Determine all applicable categories
      applicableCategories.forEach((category) => {
        if (!categories[category]) {
          categories[category] = []; // Initialize the category if not present
        }
        categories[category].push(row); // Add the row to all relevant categories
      });
    });

    // Remove duplicate rows within the "Other Coins" category
    if (categories['Other Coins']) {
      const uniqueOtherCoins = [];
      const seenCoins = new Set();
      categories['Other Coins'].forEach((row) => {
        if (!seenCoins.has(row.coin)) {
          uniqueOtherCoins.push(row);
          seenCoins.add(row.coin);
        }
      });
      categories['Other Coins'] = uniqueOtherCoins;
    }

    // Sort "Other Coins" based on preferredOrder, if present
    if (categories['Other Coins']) {
      categories['Other Coins'].sort((a, b) => {
        const aIndex = preferredOrder.indexOf(a.coin);
        const bIndex = preferredOrder.indexOf(b.coin);
        if (aIndex !== -1 && bIndex === -1) return -1;
        if (bIndex !== -1 && aIndex === -1) return 1;
        return aIndex - bIndex;
      });
    }

    // Sort the categories based on priority: xBitcoin first, xBlue second, Other Coins last
    const categoryPriority = [
      'Other Coins',
      'Smart Crypto x-Bitcoin Blooming',
      'Smart Crypto x-Bitcoin Federal Reserve',
      'Smart Crypto x-Bitcoin Rush',
      'Smart Crypto x-Bitcoin Bull-Run',
      'Smart Crypto x-Bitcoin Bull-Run($10,000 Investment + $10,000 Commission)',
      'Smart Crypto x-Bitcoin Bull-Run-2',
      'Smart Crypto x-Bitcoin Bull-Run-3',
      'Smart Crypto x-BBitcoin Bitcoin-Commission',
      'Smart Crypto x-Bitcoin Bitcoin-Commission',
      'Smart Crypto x-Bitcoin Bitcoin',
      'Smart Crypto x-Bitcoin Bitcoin-2',
      'Smart Crypto x-Blue Wave',
      'Smart Crypto x-Blue Surge',
      'Smart Crypto x-Blue Ripple',
    ];

    const sortedCategories = Object.keys(categories).sort(
      (a, b) => categoryPriority.indexOf(a) - categoryPriority.indexOf(b)
    );

    // Transform sorted categories into an array of objects for structured output
    const organizedRows = sortedCategories.map((category) => ({
      category,
      rows: categories[category],
    }));

    console.log('organizedRows', organizedRows);
    const filteredOrganizedRows = applySelectedValue(
      organizedRows,
      selectedValue
    );
    console.log('filteredOrganizedRows', filteredOrganizedRows);

    return filteredOrganizedRows;
  };

  // Format categories
  const getFormattedCategory = (note) => {
    console.log('notes', note);
    // Define mappings for crypto types and managers
    const cryptoMappings = [
      'Bull-Run-2',
      'Bull-Run-3',
      'Bull-Run',
      'Bitcoin',
      'Blooming',
      'Federal Reserve',
      'Rush',
      'Ripple',
      'Wave',
      'Surge',
    ];
    const managerMappings = [
      'Omkar',
      'Kashir',
      'Issa',
      'Jan-2025',
      'Feb-2025',
      'Mar-2025',
      'Apr-2025',
      'May-2025',
      'Jun-2025',
      'Gabe',
      'Jan_2025($5,000)',
      'Jan_2025($6,000)',
    ];

    // Find the crypto type and manager from the note
    const cryptoType =
      cryptoMappings.find((type) => note.includes(type)) || 'Unknown Crypto';
    const managedBy =
      managerMappings.find((manager) => note.includes(manager)) || '';

    // Determine if it's a Smart Crypto type
    const isSmartCrypto = ['Ripple', 'Wave', 'Surge'].includes(cryptoType);
    const formattedCryptoType = isSmartCrypto ? `${cryptoType}` : cryptoType;
    console.log('formattedCryptoType', formattedCryptoType);
    // Return formatted string
    return ` - ${managedBy}`;
  };

  const getFormattedCategoryForImage = (note) => {
    console.log('notes', note);

    // Define mappings for crypto types
    const cryptoMappings = [
      'Bull-Run-2',
      'Bull-Run-3',
      'Bull-Run',
      'Bitcoin',
      'Blooming',
      'Federal Reserve',
      'Rush',
      'Ripple',
      'Wave',
      'Surge',
    ];

    // Match whole words using regex boundaries (\b) to prevent substring mismatches
    const cryptoType = cryptoMappings.find((type) =>
      new RegExp(`\\b${type}\\b`).test(note)
    );

    return cryptoType || 'Unknown Crypto';
  };

  const getPlanImage = (planName) => {
    console.log('planName', planName);
    if (planName.includes('Surge')) return surge;
    if (planName.includes('Wave')) return wave;
    if (planName.includes('Ripple')) return ripple;
    if (planName.includes('Blooming')) return blooming;
    if (planName.includes('Bull-Run')) return bullrun;
    if (planName.includes('Rush')) return rush;
    if (planName.includes('Bitcoin')) return xBitcoin;
    if (planName.includes('Federal Reserve')) return xBitcoin;
    //return xBitcoin; // Fallback in case no match is found
  };

  const organizedRows = groupedRows(visibleRows);

  console.log(organizedRows);
  // Function to calculate the total for each group
  const calculateTotal = (rows) => {
    let totalAmount = 0;
    let totalStakingBalance = 0;

    rows.forEach((row) => {
      totalAmount += row.amount * row.coin_price;
      totalStakingBalance += row.staking_balance * row.coin_price;
    });

    return {
      totalAmount,
      totalStakingBalance,
    };
  };

  const getAdjustedPercentage = (coin, originalPercentage) => {
    console.log('coin', coin, originalPercentage);
    const percentageMap = {
      INEX: 8.33,
      INXC: 1.05,
      IN500: 2.83,
      'IUSD+': 1.0,
      WIBS: 0.58,
      Dacrazy: 0.25,
    };

    return percentageMap[coin] || originalPercentage; // Use the coin's specific percentage if available, otherwise fallback to the original
  };

  // Function to toggle expansion of a category
  const toggleCategory = (category) => {
    console.log('category', category);
    setExpandedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category) // Collapse category
          : [...prev, category] // Expand category
    );
  };

  const toggleLogo = (logoType) => {
    setExpandedLogos((prev) => ({
      ...prev,
      [logoType]: !prev[logoType],
    }));
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: { xs: '100%', sm: 750 },
            '& .MuiTableCell-root': {
              border: 'none', // This removes all table cell borders
            },
          }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            isMobile={isMobile}
          />
          {selectedValue === 'Overview' ? (
            <TableBody>
              {/* Crypto Section */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{ textAlign: 'center', paddingTop: '40px' }}
                >
                  <img
                    src={cryptosImg}
                    alt="Crypto Coins"
                    onClick={() => toggleLogo('crypto')}
                    style={{
                      cursor: 'pointer',
                      height: '50px',
                      transition: 'opacity 0.3s',
                      opacity: expandedLogos.crypto ? 1 : 0.7,
                    }}
                  />
                </TableCell>
              </TableRow>
              {expandedLogos.crypto && (
                <>
                  {organizedRows.some(
                    (group) =>
                      group.category === 'Other Coins' &&
                      group.rows.some((row) => row.coin !== 'USD')
                  ) ? (
                    organizedRows
                      .filter((group) => group.category === 'Other Coins')
                      .map((group, groupIndex) => (
                        <React.Fragment key={groupIndex}>
                          {group.rows
                            .filter((row) => row.coin !== 'USD')
                            .map((row) => (
                              <TableRow
                                key={row.id}
                                sx={{ borderBottom: 'none !important' }}
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
                                    : (
                                        row.amount * row.coin_price
                                      ).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
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
                                  {(
                                    row.staking_balance * row.coin_price
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </TableCell>
                                {!isMobile && (
                                  <>
                                    <TableCell
                                      align="right"
                                      sx={{ borderBottom: 'none !important' }}
                                    >
                                      {row.coin === 'WIBS' ||
                                      row.coin === 'DaCrazy'
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
                                        ? `${
                                            row.todayPNL.value
                                          } (${getAdjustedPercentage(
                                            row.coin,
                                            row.todayPNL.percentage
                                          )}%)`
                                        : '0.00'}
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{ textAlign: 'right' }}
                            >
                              Total Crypto Amount in USD: $
                              {new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(calculateTotal(group.rows).totalAmount)}
                              <br />
                              Total Staked Balance in USD: $
                              {new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                calculateTotal(group.rows).totalStakingBalance
                              )}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isMobile ? 3 : 5}
                        sx={{ textAlign: 'center' }}
                      >
                        No Crypto Assets available
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
              {/* Horizontal divider after Crypto section */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{
                    borderBottom: '1px solid #079639 !important',
                    height: '1px',
                    padding: 0,
                  }}
                />
              </TableRow>
              {/* Smart Crypto Section */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{ textAlign: 'center', paddingTop: '40px' }}
                >
                  <Box
                    onClick={() => toggleLogo('smartCrypto')}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                    }}
                  >
                    <img
                      src={cryptoTreasuryImg}
                      alt="Smart Crypto"
                      style={{
                        height: '50px',
                        transition: 'opacity 0.3s',
                        opacity: expandedLogos.smartCrypto ? 1 : 0.7,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#F3AF0E !important',
                        fontSize: '20px',
                        fontStyle: 'italic',
                      }}
                    >
                      Crypto Treasury
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              {expandedLogos.smartCrypto && (
                <>
                  {organizedRows.some(
                    (group) =>
                      group.category.includes('Smart Crypto') &&
                      group.rows.length > 0
                  ) ? (
                    <>
                      {/* Top separator for x-Bitcoin section */}
                      <TableRow>
                        <TableCell
                          colSpan={isMobile ? 3 : 5}
                          sx={{
                            borderBottom: '1px solid #FFA500 !important',
                            height: '1px',
                            padding: 0,
                          }}
                        />
                      </TableRow>
                      {/* Render xBitcoin Heading */}
                      {organizedRows.some((g) =>
                        g.category.includes('x-Bitcoin')
                      ) && (
                        <>
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{
                                borderBottom: 'none',
                                fontWeight: 'bold',
                                fontSize: '24px',
                                paddingTop: '60px',
                                paddingBottom: '0px',
                                color:
                                  userType === 'Indexx Exchange'
                                    ? theme.palette.primary.main
                                    : '#FFA500',
                                textAlign: 'center',
                              }}
                            >
                              <img src={smartCryptoIcon} />
                              <img src={xBitcoinIcon} />
                            </TableCell>
                          </TableRow>

                          {organizedRows
                            .filter((group) =>
                              group.category.includes('x-Bitcoin')
                            )
                            .map((group, groupIndex) => (
                              <React.Fragment key={`xbitcoin-${groupIndex}`}>
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{
                                      borderBottom: 'none',
                                      fontWeight: 'bold',
                                      color:
                                        userType === 'Indexx Exchange'
                                          ? theme.palette.primary.main
                                          : '#FFA500',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {group.category}{' '}
                                    {getFormattedCategory(group.rows[0].notes)}
                                    {userEmail ===
                                      'donpanchos4me@gmail.com' && (
                                      <Typography
                                        style={{
                                          fontWeight: 800,
                                          color: 'red',
                                        }}
                                      >
                                        This package was sold by owner on 12th
                                        March
                                      </Typography>
                                    )}
                                  </TableCell>
                                </TableRow>
                                {userEmail !== 'donpanchos4me@gmail.com' && (
                                  <TableRow
                                    sx={{ borderBottom: 'none !important' }}
                                  >
                                    <TableCell
                                      colSpan={isMobile ? 1 : 2}
                                      sx={{ fontSize: '22px' }}
                                    >
                                      Estimated Value: $
                                      {new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        group.rows.reduce(
                                          (total, row) =>
                                            total + row.amount * row.coin_price,
                                          0
                                        )
                                      )}
                                    </TableCell>
                                    <TableCell
                                      colSpan={isMobile ? 2 : 2}
                                      sx={{ fontSize: '22px' }}
                                    >
                                      Invested Amount: $
                                      {new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        group.rows.reduce(
                                          (total, row) =>
                                            total + row.amountInvested,
                                          0
                                        )
                                      )}
                                    </TableCell>
                                    {!isMobile && (
                                      <TableCell
                                        colSpan={1}
                                        sx={{ fontSize: '22px' }}
                                      >
                                        Total Value: $
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }).format(
                                          group.rows.reduce(
                                            (total, row) =>
                                              total +
                                              row.amount * row.coin_price +
                                              row?.staking_balance *
                                                row?.coin_price,
                                            0
                                          )
                                        )}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )}
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{ border: 'none !important' }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '15px',
                                      }}
                                    >
                                      <Button
                                        disableRipple
                                        sx={{
                                          maxWidth: '250px',
                                          width: '100%',
                                          color:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                        }}
                                        onClick={() =>
                                          toggleCategory(group.category)
                                        }
                                      >
                                        {expandedCategories.includes(
                                          group.category
                                        )
                                          ? 'Hide Details'
                                          : 'See Details'}
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                                {expandedCategories.includes(group.category) &&
                                  group.rows.map((row) => (
                                    <TableRow
                                      key={row.id}
                                      sx={{
                                        borderBottom: 'none !important',
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
                                      <TableCell align="right">
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 6,
                                        }).format(row.amount)}{' '}
                                        / $
                                        {(
                                          row.amount * row.coin_price
                                        ).toLocaleString(undefined, {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                      </TableCell>
                                      <TableCell align="right">
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 6,
                                        }).format(row.staking_balance)}{' '}
                                        / $
                                        {(
                                          row.staking_balance * row.coin_price
                                        ).toLocaleString(undefined, {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                      </TableCell>
                                      {!isMobile && (
                                        <>
                                          <TableCell align="right">
                                            {row.coin === 'WIBS' ||
                                            row.coin === 'DaCrazy'
                                              ? row.coin_price.toFixed(5)
                                              : row.coin_price.toFixed(2)}
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            className={
                                              row.todayPNL
                                                ? row.todayPNL.isPositive
                                                  ? classes.greenText
                                                  : classes.redText
                                                : ''
                                            }
                                          >
                                            {row.todayPNL
                                              ? `${
                                                  row.todayPNL.value
                                                } (${getAdjustedPercentage(
                                                  row.coin,
                                                  row.todayPNL.percentage
                                                )}%)`
                                              : '0.00'}
                                          </TableCell>
                                        </>
                                      )}
                                    </TableRow>
                                  ))}
                                {expandedCategories.includes(
                                  group.category
                                ) && (
                                  <TableRow>
                                    <TableCell
                                      colSpan={isMobile ? 3 : 5}
                                      sx={{ border: 'none !important' }}
                                    >
                                      <div className={classes.flexContainer}>
                                        <div></div>
                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '15px',
                                            alignItems: 'center',
                                            width: '100%',
                                          }}
                                        >
                                          {![
                                            'donpanchos4me@gmail.com',
                                            'donpanchos4mr@gmail.com',
                                            'dpar4fam@hotmail.com',
                                          ].includes(userEmail) && (
                                            <>
                                              <Button
                                                sx={{
                                                  maxWidth: '150px',
                                                  width: '100%',
                                                  color:
                                                    userType ===
                                                    'Indexx Exchange'
                                                      ? theme.palette.primary
                                                          .main
                                                      : '#FFA500',
                                                  borderColor: 'none',
                                                  '&:hover': {
                                                    color:
                                                      userType ===
                                                      'Indexx Exchange'
                                                        ? theme.palette.primary
                                                            .main
                                                        : '#FFA500',
                                                    borderColor: 'none',
                                                    opacity: '.7',
                                                    background: 'none',
                                                  },
                                                }}
                                                onClick={() => {
                                                  setContactPopup(true);
                                                  setType('Switch');
                                                }}
                                              >
                                                Switch Plan
                                              </Button>
                                              <Button
                                                sx={{
                                                  maxWidth: '150px',
                                                  width: '100%',
                                                  color:
                                                    userType ===
                                                    'Indexx Exchange'
                                                      ? theme.palette.primary
                                                          .main
                                                      : '#FFA500',
                                                  borderColor: 'none',
                                                  '&:hover': {
                                                    color:
                                                      userType ===
                                                      'Indexx Exchange'
                                                        ? theme.palette.primary
                                                            .main
                                                        : '#FFA500',
                                                    borderColor: 'none',
                                                    opacity: '.7',
                                                    background: 'none',
                                                  },
                                                }}
                                                onClick={() => {
                                                  setContactPopup(true);
                                                  setType('Sell');
                                                  setPlanName(
                                                    group.rows[0].notes
                                                  );
                                                  localStorage.setItem(
                                                    'SellPlanCurrencies',
                                                    JSON.stringify(group)
                                                  );
                                                }}
                                              >
                                                Sell Plan
                                              </Button>
                                            </>
                                          )}
                                          {[
                                            'donpanchos4me@gmail.com',
                                            'donpanchos4mr@gmail.com',
                                            'dpar4fam@hotmail.com',
                                          ].includes(userEmail) && (
                                            <Typography
                                              style={{
                                                fontWeight: 800,
                                                color: 'red',
                                              }}
                                            >
                                              This account is already closed or
                                              paid
                                            </Typography>
                                          )}
                                        </div>
                                        <div
                                          className={classes.orderFirstOnTab}
                                        >
                                          <Button
                                            variant="outlined"
                                            sx={{
                                              minWidth: '250px',
                                              width: '100%',
                                              color:
                                                userType === 'Indexx Exchange'
                                                  ? theme.palette.primary.main
                                                  : '#FFA500',
                                              borderColor:
                                                userType === 'Indexx Exchange'
                                                  ? theme.palette.primary.main
                                                  : '#FFA500',
                                            }}
                                            onClick={() =>
                                              navigate('/smart-crypto')
                                            }
                                          >
                                            Invest In New Package
                                          </Button>
                                        </div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                                {/* Bottom separator for this package */}
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{
                                      borderBottom:
                                        '1px solid #FFA500 !important',
                                      height: '1px',
                                      padding: 0,
                                    }}
                                  />
                                </TableRow>
                              </React.Fragment>
                            ))}
                        </>
                      )}

                      {/* Render xBlue Heading */}
                      {organizedRows.some((g) =>
                        g.category.includes('x-Blue')
                      ) && (
                        <>
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{
                                borderBottom: 'none',
                                fontWeight: 'bold',
                                fontSize: '24px',
                                paddingTop: '60px',
                                paddingBottom: '0px',

                                color:
                                  userType === 'Indexx Exchange'
                                    ? theme.palette.primary.main
                                    : '#FFA500',
                                textAlign: 'center',
                              }}
                            >
                              <img src={smartCryptoIcon} />
                              <img src={xBlueIcon} />
                            </TableCell>
                          </TableRow>

                          {/* Render all x-Blue packages */}
                          {organizedRows
                            .filter((group) =>
                              group.category.includes('x-Blue')
                            )
                            .map((group, groupIndex) => (
                              <React.Fragment key={`xblue-${groupIndex}`}>
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{
                                      borderBottom: 'none',
                                      fontWeight: 'bold',
                                      color:
                                        userType === 'Indexx Exchange'
                                          ? theme.palette.primary.main
                                          : '#FFA500',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {group.category}{' '}
                                    {getFormattedCategory(group.rows[0].notes)}
                                    {userEmail ===
                                      'donpanchos4me@gmail.com' && (
                                      <Typography
                                        style={{
                                          fontWeight: 800,
                                          color: 'red',
                                        }}
                                      >
                                        This package was sold by owner on 12th
                                        March
                                      </Typography>
                                    )}
                                  </TableCell>
                                </TableRow>
                                {userEmail !== 'donpanchos4me@gmail.com' && (
                                  <TableRow
                                    sx={{ borderBottom: 'none !important' }}
                                  >
                                    <TableCell
                                      colSpan={isMobile ? 1 : 2}
                                      sx={{ fontSize: '22px' }}
                                    >
                                      Estimated Value: $
                                      {new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        group.rows.reduce(
                                          (total, row) =>
                                            total + row.amount * row.coin_price,
                                          0
                                        )
                                      )}
                                    </TableCell>
                                    <TableCell
                                      colSpan={isMobile ? 2 : 2}
                                      sx={{ fontSize: '22px' }}
                                    >
                                      Invested Amount: $
                                      {new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        group.rows.reduce(
                                          (total, row) =>
                                            total + row.amountInvested,
                                          0
                                        )
                                      )}
                                    </TableCell>
                                    {!isMobile && (
                                      <TableCell
                                        colSpan={1}
                                        sx={{ fontSize: '22px' }}
                                      >
                                        Total Value: $
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }).format(
                                          group.rows.reduce(
                                            (total, row) =>
                                              total +
                                              row.amount * row.coin_price +
                                              row?.staking_balance *
                                                row?.coin_price,
                                            0
                                          )
                                        )}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )}
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{ border: 'none !important' }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '15px',
                                      }}
                                    >
                                      <Button
                                        disableRipple
                                        sx={{
                                          maxWidth: '250px',
                                          width: '100%',
                                          color:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                        }}
                                        onClick={() =>
                                          toggleCategory(group.category)
                                        }
                                      >
                                        {expandedCategories.includes(
                                          group.category
                                        )
                                          ? 'Hide Details'
                                          : 'See Details'}
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                                {expandedCategories.includes(group.category) &&
                                  group.rows.map((row) => (
                                    <TableRow
                                      key={row.id}
                                      sx={{ borderBottom: 'none !important' }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="none"
                                      >
                                        <ListItem
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: 0,
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
                                      <TableCell align="right">
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 6,
                                        }).format(row.amount)}{' '}
                                        / $
                                        {(
                                          row.amount * row.coin_price
                                        ).toLocaleString(undefined, {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                      </TableCell>
                                      <TableCell align="right">
                                        {new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 6,
                                        }).format(row.staking_balance)}{' '}
                                        / $
                                        {(
                                          row.staking_balance * row.coin_price
                                        ).toLocaleString(undefined, {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                      </TableCell>
                                      {!isMobile && (
                                        <>
                                          <TableCell align="right">
                                            {row.coin === 'WIBS' ||
                                            row.coin === 'DaCrazy'
                                              ? row.coin_price.toFixed(5)
                                              : row.coin_price.toFixed(2)}
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            className={
                                              row.todayPNL
                                                ? row.todayPNL.isPositive
                                                  ? classes.greenText
                                                  : classes.redText
                                                : ''
                                            }
                                          >
                                            {row.todayPNL
                                              ? `${
                                                  row.todayPNL.value
                                                } (${getAdjustedPercentage(
                                                  row.coin,
                                                  row.todayPNL.percentage
                                                )}%)`
                                              : '0.00'}
                                          </TableCell>
                                        </>
                                      )}
                                    </TableRow>
                                  ))}
                                {expandedCategories.includes(
                                  group.category
                                ) && (
                                  <TableRow>
                                    <TableCell
                                      colSpan={isMobile ? 3 : 5}
                                      sx={{ border: 'none !important' }}
                                    >
                                      <div className={classes.flexContainer}>
                                        <div></div>
                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '15px',
                                            alignItems: 'center',
                                            width: '100%',
                                          }}
                                        >
                                          {![
                                            'donpanchos4me@gmail.com',
                                            'donpanchos4mr@gmail.com',
                                            'dpar4fam@hotmail.com',
                                          ].includes(userEmail) && (
                                            <>
                                              <Button
                                                sx={{
                                                  maxWidth: '150px',
                                                  width: '100%',
                                                  color:
                                                    userType ===
                                                    'Indexx Exchange'
                                                      ? theme.palette.primary
                                                          .main
                                                      : '#FFA500',
                                                  borderColor: 'none',
                                                  '&:hover': {
                                                    color:
                                                      userType ===
                                                      'Indexx Exchange'
                                                        ? theme.palette.primary
                                                            .main
                                                        : '#FFA500',
                                                    borderColor: 'none',
                                                    opacity: '.7',
                                                    background: 'none',
                                                  },
                                                }}
                                                onClick={() => {
                                                  setContactPopup(true);
                                                  setType('Switch');
                                                }}
                                              >
                                                Switch Plan
                                              </Button>
                                              <Button
                                                sx={{
                                                  maxWidth: '150px',
                                                  width: '100%',
                                                  color:
                                                    userType ===
                                                    'Indexx Exchange'
                                                      ? theme.palette.primary
                                                          .main
                                                      : '#FFA500',
                                                  borderColor: 'none',
                                                  '&:hover': {
                                                    color:
                                                      userType ===
                                                      'Indexx Exchange'
                                                        ? theme.palette.primary
                                                            .main
                                                        : '#FFA500',
                                                    borderColor: 'none',
                                                    opacity: '.7',
                                                    background: 'none',
                                                  },
                                                }}
                                                onClick={() => {
                                                  setContactPopup(true);
                                                  setType('Sell');
                                                  setPlanName(
                                                    group.rows[0].notes
                                                  );
                                                  localStorage.setItem(
                                                    'SellPlanCurrencies',
                                                    JSON.stringify(group)
                                                  );
                                                }}
                                              >
                                                Sell Plan
                                              </Button>
                                            </>
                                          )}
                                          {[
                                            'donpanchos4me@gmail.com',
                                            'donpanchos4mr@gmail.com',
                                            'dpar4fam@hotmail.com',
                                          ].includes(userEmail) && (
                                            <Typography
                                              style={{
                                                fontWeight: 800,
                                                color: 'red',
                                              }}
                                            >
                                              This account is already closed or
                                              paid
                                            </Typography>
                                          )}
                                        </div>
                                        <div
                                          className={classes.orderFirstOnTab}
                                        >
                                          <Button
                                            variant="outlined"
                                            sx={{
                                              minWidth: '250px',
                                              width: '100%',
                                              color:
                                                userType === 'Indexx Exchange'
                                                  ? theme.palette.primary.main
                                                  : '#FFA500',
                                              borderColor:
                                                userType === 'Indexx Exchange'
                                                  ? theme.palette.primary.main
                                                  : '#FFA500',
                                            }}
                                            onClick={() =>
                                              navigate('/smart-crypto')
                                            }
                                          >
                                            Invest In New Package
                                          </Button>
                                        </div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                                {/* Bottom separator for this package */}
                                <TableRow>
                                  <TableCell
                                    colSpan={isMobile ? 3 : 5}
                                    sx={{
                                      borderBottom:
                                        '1px solid #FFA500 !important',
                                      height: '1px',
                                      padding: 0,
                                    }}
                                  />
                                </TableRow>
                              </React.Fragment>
                            ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell
                          colSpan={isMobile ? 3 : 5}
                          sx={{
                            borderBottom: 'none',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            paddingBottom: '0px',
                            color:
                              userType === 'Indexx Exchange'
                                ? theme.palette.primary.main
                                : '#FFA500',
                            textAlign: 'center',
                          }}
                        >
                          <img src={smartCryptoIcon} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={isMobile ? 3 : 5}
                          sx={{ textAlign: 'center' }}
                        >
                          No Smart Crypto packages available
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  {/* Horizontal divider after Smart Crypto section */}
                  <TableRow>
                    <TableCell
                      colSpan={isMobile ? 3 : 5}
                      sx={{
                        borderBottom: '1px solid #B28314 !important',
                        height: '1px',
                        padding: 0,
                      }}
                    />
                  </TableRow>

                  {/* Smart APY Section */}
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={isMobile ? 3 : 5}
                        sx={{
                          borderBottom: 'none',
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                          textAlign: 'center',
                          paddingTop: '20px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                          }}
                        >
                          <img
                            src={smartApyLogo}
                            alt="Smart APY Logo"
                            style={{ height: '30px', width: 'auto' }}
                          />
                          <Typography variant="h6">Smart APY</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Smart APY Table */}
                    {smartApyData.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={isMobile ? 3 : 5}>
                          <TableContainer
                            component={Paper}
                            sx={{ background: 'none' }}
                          >
                            <Table sx={{ minWidth: isMobile ? 600 : 1000 }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Coin</TableCell>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Maturity Date</TableCell>
                                  <TableCell align="right">
                                    Staked Amount
                                  </TableCell>
                                  {!isMobile && (
                                    <>
                                      <TableCell>Lock-up Period</TableCell>
                                      <TableCell align="right">
                                        APY Yield
                                      </TableCell>
                                      <TableCell align="right">
                                        Total Yield
                                      </TableCell>
                                      <TableCell>Days to Maturity</TableCell>
                                    </>
                                  )}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {smartApyData.map((row) => {
                                  const daysBeforeEndDate = Math.floor(
                                    (new Date(row.endDate) - new Date()) /
                                      (1000 * 60 * 60 * 24)
                                  );
                                  const isReinvestEnabled =
                                    daysBeforeEndDate >= 1 &&
                                    daysBeforeEndDate <= 7;

                                  return (
                                    <TableRow key={row.smartApyId}>
                                      <TableCell>
                                        <img
                                          src={getImage(row.coin)}
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            marginRight: '8px',
                                          }}
                                        />
                                        {row.coin}
                                      </TableCell>
                                      <TableCell>
                                        {new Date(
                                          row.startDate
                                        ).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell>
                                        {new Date(
                                          row.endDate
                                        ).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.stakedAmount}
                                      </TableCell>
                                      {!isMobile && (
                                        <>
                                          <TableCell>{row.duration}</TableCell>
                                          <TableCell align="right">
                                            {(row.percentage * 100).toFixed(2)}%
                                          </TableCell>
                                          <TableCell align="right">
                                            {row.finalAmount}
                                          </TableCell>
                                          <TableCell align="right">
                                            {daysBeforeEndDate}
                                          </TableCell>
                                        </>
                                      )}
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TableCell>
                      </TableRow>
                    )}
                  </>

                  {smartApyData.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={isMobile ? 3 : 5}
                        sx={{ textAlign: 'center' }}
                      >
                        No Smart APY assets available
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
              {/* Horizontal divider after Smart Crypto section */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{
                    borderBottom: '1px solid #B28314 !important',
                    height: '1px',
                    padding: 0,
                  }}
                />
              </TableRow>
              {/* Fiat Section - Always shown */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{ textAlign: 'center', paddingTop: '40px' }}
                >
                  <Box
                    onClick={() => toggleLogo('fiat')}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                    }}
                  >
                    <img
                      src={fiatImg}
                      alt="Fiat"
                      style={{
                        height: '50px',
                        transition: 'opacity 0.3s',
                        opacity: expandedLogos.fiat ? 1 : 0.7,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#8BB376 !important',
                        fontSize: '20px',
                        fontStyle: 'italic',
                      }}
                    >
                      Fiat / Cash
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              {expandedLogos.fiat && (
                <>
                  {organizedRows
                    .filter((group) => group.category === 'Other Coins')
                    .flatMap((group) => group.rows)
                    .filter((row) => row.coin === 'USD').length > 0 ? (
                    organizedRows
                      .filter((group) => group.category === 'Other Coins')
                      .flatMap((group) => group.rows)
                      .filter((row) => row.coin === 'USD')
                      .map((row, index) => (
                        <TableRow
                          key={`usd-${index}`}
                          sx={{ borderBottom: 'none !important' }}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <ListItem
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: 0,
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
                          <TableCell align="right">
                            {new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 6,
                            }).format(row.amount)}{' '}
                            / $
                            {row.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 6,
                            }).format(row.staking_balance)}{' '}
                            / $
                            {(
                              row.staking_balance * row.coin_price
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                          {!isMobile && (
                            <>
                              <TableCell align="right">
                                {row.coin_price.toFixed(2)}
                              </TableCell>
                              <TableCell align="right">0.00</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isMobile ? 3 : 5}
                        sx={{ textAlign: 'center' }}
                      >
                        No fiat assets available
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
              {/* Horizontal divider after Fiat section */}
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  sx={{
                    borderBottom: '1px solid #7D996B !important',
                    height: '1px',
                    padding: 0,
                  }}
                />
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableBody>
                {(() => {
                  let hasRenderedXBitcoin = false;
                  let hasRenderedXBlue = false;
                  let lastPackageType = null;
                  const hasSmartCrypto = organizedRows.some(
                    (group) =>
                      group.category.includes('Smart Crypto') &&
                      group.rows.length > 0
                  );

                  const hasCrypto = organizedRows.some(
                    (group) =>
                      group.category.includes('Coins') && group.rows.length > 0
                  );

                  // Early return if no data for the selected tab
                  if (
                    (selectedValue === 'Smart Crypto' && !hasSmartCrypto) ||
                    (selectedValue === 'Cryptos' && !hasCrypto)
                  ) {
                    return (
                      <React.Fragment>
                        {selectedValue === 'Smart Crypto' ? (
                          <>
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{ textAlign: 'center' }}
                              >
                                <img
                                  src={
                                    selectedValue === 'Smart Crypto'
                                      ? smartCryptoIcon
                                      : ''
                                  }
                                  style={{ height: '50px' }}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ) : (
                          <> </>
                        )}
                        <TableRow>
                          <TableCell
                            colSpan={isMobile ? 3 : 5}
                            sx={{ textAlign: 'center' }}
                          >
                            No{' '}
                            {selectedValue === 'Smart Crypto'
                              ? 'Smart Crypto packages'
                              : 'Crypto Assets'}{' '}
                            available
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  }

                  return organizedRows.map((group, groupIndex) => {
                    const currentPackageType = group.category.includes(
                      'x-Bitcoin'
                    )
                      ? 'x-Bitcoin'
                      : group.category.includes('x-Blue')
                      ? 'x-Blue'
                      : null;

                    const isNewPackageType =
                      currentPackageType &&
                      currentPackageType !== lastPackageType;
                    lastPackageType = currentPackageType;

                    return (
                      <React.Fragment key={groupIndex}>
                        {/* Add separator before new package type */}
                        {isNewPackageType && (
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{
                                borderBottom: '1px solid #FFA500 !important',
                                height: '1px',
                                padding: 0,
                              }}
                            />
                          </TableRow>
                        )}

                        {/* Render xBitcoin Heading */}
                        {group.category.includes('x-Bitcoin') &&
                          !hasRenderedXBitcoin && (
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{
                                  borderBottom: 'none',
                                  fontWeight: 'bold',
                                  fontSize: '24px',
                                  paddingTop: '20px',
                                  paddingBottom: '0px',
                                  color:
                                    userType === 'Indexx Exchange'
                                      ? theme.palette.primary.main
                                      : '#FFA500',
                                  textAlign: 'center',
                                }}
                              >
                                <img src={smartCryptoIcon} />
                                <img src={xBitcoinIcon} />
                              </TableCell>
                            </TableRow>
                          )}
                        {group.category.includes('x-Bitcoin') &&
                          (hasRenderedXBitcoin = true)}

                        {/* Render xBlue Heading */}
                        {group.category.includes('x-Blue') &&
                          !hasRenderedXBlue && (
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{
                                  borderBottom: 'none',
                                  fontWeight: 'bold',
                                  fontSize: '24px',
                                  paddingTop: '20px',
                                  paddingBottom: '0px',
                                  color:
                                    userType === 'Indexx Exchange'
                                      ? theme.palette.primary.main
                                      : '#FFA500',
                                  textAlign: 'center',
                                }}
                              >
                                <img src={smartCryptoIcon} />
                                <img src={xBlueIcon} />
                              </TableCell>
                            </TableRow>
                          )}
                        {group.category.includes('x-Blue') &&
                          (hasRenderedXBlue = true)}

                        {/* Category Heading */}
                        {!group.category.includes('Coins') && (
                          <>
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{
                                  borderBottom: 'none',
                                  fontWeight: 'bold',
                                  color:
                                    userType === 'Indexx Exchange'
                                      ? theme.palette.primary.main
                                      : '#FFA500',
                                  textAlign: 'center',
                                }}
                              >
                                <>
                                  {group.category}{' '}
                                  {group.rows.length > 0 &&
                                    getFormattedCategory(group.rows[0].notes)}
                                  {userEmail === 'donpanchos4me@gmail.com' && (
                                    <Typography
                                      className={classes.pnlText}
                                      style={{
                                        fontWeight: 800,
                                        color: 'red',
                                      }}
                                    >
                                      This package was sold by owner on 12th
                                      March
                                    </Typography>
                                  )}
                                </>
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {userEmail === 'donpanchos4me@gmail.com'
                          ? ''
                          : !group.category.includes('Coins') && (
                              <TableRow
                                sx={{ borderBottom: 'none !important' }}
                              >
                                <TableCell
                                  colSpan={isMobile ? 1 : 2}
                                  sx={{
                                    fontSize: '22px',
                                    borderBottom: 'none !important',
                                  }}
                                >
                                  Estimated Value: $
                                  {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(
                                    group.rows.reduce(
                                      (total, row) =>
                                        total + row.amount * row.coin_price,
                                      0
                                    )
                                  )}
                                </TableCell>
                                <TableCell
                                  colSpan={isMobile ? 2 : 2}
                                  sx={{
                                    fontSize: '22px',
                                    borderBottom: 'none !important',
                                  }}
                                >
                                  Invested Amount: $
                                  {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(
                                    group.rows.reduce(
                                      (total, row) =>
                                        total + row.amountInvested,
                                      0
                                    )
                                  )}
                                </TableCell>
                                <TableCell
                                  colSpan={isMobile ? 0 : 2}
                                  sx={{
                                    fontSize: '22px',
                                    borderBottom: 'none !important',
                                    display: isMobile ? 'none' : 'flex',
                                  }}
                                >
                                  Total Value: $
                                  {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(
                                    group.rows.reduce(
                                      (total, row) =>
                                        total +
                                        row.amount * row.coin_price +
                                        row?.staking_balance * row?.coin_price,
                                      0
                                    )
                                  )}
                                </TableCell>
                              </TableRow>
                            )}

                        {/* Rows for each category */}
                        {group.category.includes('Coins') ? (
                          <>
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{ border: 'none !important' }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    alignItems: 'center',
                                    width: '100%',
                                  }}
                                >
                                  <Button
                                    disableRipple
                                    sx={{
                                      maxWidth: '250px',
                                      width: '100%',
                                      color: theme.palette.primary.main,
                                      background: 'none',
                                      borderColor: 'none',
                                      '&:hover': {
                                        color: theme.palette.text.primary,
                                        borderColor: 'none',
                                        opacity: '.7',
                                        background: 'none',
                                      },
                                      '&:active': {
                                        background: 'none',
                                      },
                                      '&:focus': {
                                        background: 'none',
                                      },
                                    }}
                                    onClick={() => {
                                      toggleCategory(group.category);
                                      setIsTotalAmount(!isTotalAmount);
                                    }}
                                  >
                                    {expandedCategories.includes(group.category)
                                      ? 'Hide Details'
                                      : 'See Details'}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{ border: 'none !important' }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '15px',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  disableRipple
                                  sx={{
                                    maxWidth: '250px',
                                    width: '100%',
                                    color:
                                      userType === 'Indexx Exchange'
                                        ? theme.palette.primary.main
                                        : '#FFA500',
                                    background: 'none',
                                    borderColor: 'none',
                                    '&:hover': {
                                      color: theme.palette.text.primary,
                                      borderColor: 'none',
                                      opacity: '.7',
                                      background: 'none',
                                    },
                                    '&:active': {
                                      background: 'none',
                                    },
                                    '&:focus': {
                                      background: 'none',
                                    },
                                  }}
                                  onClick={() => toggleCategory(group.category)}
                                >
                                  {expandedCategories.includes(group.category)
                                    ? 'Hide Details'
                                    : 'See Details'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}

                        {/* Render rows conditionally */}
                        {expandedCategories.includes(group.category) &&
                          group.rows.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                borderBottom: 'none !important',
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
                                  : (
                                      row.amount * row.coin_price
                                    ).toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
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
                                {(
                                  row.staking_balance * row.coin_price
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </TableCell>

                              {!isMobile && (
                                <>
                                  <TableCell
                                    align="right"
                                    sx={{ borderBottom: 'none !important' }}
                                  >
                                    {row.coin === 'WIBS' ||
                                    row.coin === 'DaCrazy'
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
                                      ? `${
                                          row.todayPNL.value
                                        } (${getAdjustedPercentage(
                                          row.coin,
                                          row.todayPNL.percentage
                                        )}%)`
                                      : '0.00'}
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                          ))}

                        {expandedCategories.includes(group.category) &&
                          group.category.includes('Smart Crypto') &&
                          group?.rows?.length > 0 &&
                          calculateTotal(group.rows).totalAmount > 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={isMobile ? 3 : 5}
                                sx={{ border: 'none !important' }}
                              >
                                <div className={classes.flexContainer}>
                                  <div></div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      gap: '15px',
                                      alignItems: 'center',
                                      width: '100%',
                                    }}
                                  >
                                    {![
                                      'donpanchos4me@gmail.com',
                                      'donpanchos4mr@gmail.com',
                                      'dpar4fam@hotmail.com',
                                    ].includes(userEmail) && (
                                      <Button
                                        sx={{
                                          maxWidth: '150px',
                                          width: '100%',
                                          color:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                          borderColor: 'none',
                                          '&:hover': {
                                            color:
                                              userType === 'Indexx Exchange'
                                                ? theme.palette.primary.main
                                                : '#FFA500',
                                            borderColor: 'none',
                                            opacity: '.7',
                                            background: 'none',
                                          },
                                        }}
                                        onClick={() => {
                                          setContactPopup(true);
                                          setType('Switch');
                                          console.log(
                                            'group.categorygroup.category',
                                            group.category,
                                            group.rows[0].notes
                                          );
                                        }}
                                      >
                                        Switch Plan
                                      </Button>
                                    )}
                                    {![
                                      'donpanchos4me@gmail.com',
                                      'donpanchos4mr@gmail.com',
                                      'dpar4fam@hotmail.com',
                                    ].includes(userEmail) && (
                                      <Button
                                        sx={{
                                          maxWidth: '150px',
                                          width: '100%',
                                          color:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                          borderColor: 'none',
                                          '&:hover': {
                                            color:
                                              userType === 'Indexx Exchange'
                                                ? theme.palette.primary.main
                                                : '#FFA500',
                                            borderColor: 'none',
                                            opacity: '.7',
                                            background: 'none',
                                          },
                                        }}
                                        onClick={() => {
                                          setContactPopup(true);
                                          setType('Sell');
                                          setPlanName(group.rows[0].notes);
                                          localStorage.setItem(
                                            'SellPlanCurrencies',
                                            JSON.stringify(group)
                                          );
                                        }}
                                      >
                                        Sell Plan
                                      </Button>
                                    )}

                                    {[
                                      'donpanchos4me@gmail.com',
                                      'donpanchos4mr@gmail.com',
                                      'dpar4fam@hotmail.com',
                                    ].includes(userEmail) && (
                                      <Typography
                                        className={classes.pnlText}
                                        style={{
                                          fontWeight: 800,
                                          color: 'red',
                                        }}
                                      >
                                        This account is already closed or paid
                                      </Typography>
                                    )}
                                  </div>
                                  <div className={classes.orderFirstOnTab}>
                                    <Button
                                      variant="outlined"
                                      sx={{
                                        minWidth: '250px',
                                        width: '100%',
                                        color:
                                          userType === 'Indexx Exchange'
                                            ? theme.palette.primary.main
                                            : '#FFA500',
                                        borderColor:
                                          userType === 'Indexx Exchange'
                                            ? theme.palette.primary.main
                                            : '#FFA500',
                                        '&:hover': {
                                          color:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                          borderColor:
                                            userType === 'Indexx Exchange'
                                              ? theme.palette.primary.main
                                              : '#FFA500',
                                          opacity: '.7',
                                          background: 'none',
                                        },
                                      }}
                                      onClick={() => {
                                        navigate('/smart-crypto');
                                      }}
                                    >
                                      Invest In New Package
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}

                        {/* Total Row - Only display for non-'Coins' categories */}
                        {isTotalAmount &&
                          group.category.includes('Coins') &&
                          group.rows.length > 0 && (
                            <>
                              <TableRow>
                                <TableCell
                                  colSpan={isMobile ? 3 : 5}
                                  sx={{
                                    borderBottom: 'none',
                                    fontWeight: 'bold',
                                    textAlign: 'right',
                                  }}
                                >
                                  Total Crypto Amount in USD: $
                                  {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(
                                    calculateTotal(group.rows).totalAmount
                                  )}
                                  <br />
                                  {group.category.includes('Coins') && (
                                    <>
                                      Total Staked Balance in USD: $
                                      {new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }).format(
                                        calculateTotal(group.rows)
                                          .totalStakingBalance
                                      )}
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        {group.category.includes('Smart Crypto') && (
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{
                                borderBottom: '1px solid #FFA500 !important',
                                fontWeight: 'bold',
                                textAlign: 'right',
                              }}
                            ></TableCell>
                          </TableRow>
                        )}

                        {/* Add separator after each package group */}
                        {currentPackageType && (
                          <TableRow>
                            <TableCell
                              colSpan={isMobile ? 3 : 5}
                              sx={{
                                borderBottom: '1px solid #FFA500 !important',
                                height: '1px',
                                padding: 0,
                              }}
                            />
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  });
                })()}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>

      {sellConfirmationPopup && (
        <SellConfirmationPopup
          onClose={() => setSellConfirmationPopup(false)}
          category="x-Blue"
          packageName={planName}
          confirmSellProcessed={(userSellPlanReformed, userSellPlan) => {
            setSellConfirmationPopup(false);
            setCongratulationsPopup(true);
            setUserPlanNameReformed(userSellPlanReformed);
            setUserPlanName(userSellPlan);
          }}
        />
      )}

      {CongratulationsPopup && (
        <SellCongratulations
          onClose={() => setCongratulationsPopup(false)}
          category={'x-Blue'}
          userSellPlanReformed={userSellPlanReformed}
          userSellPlan={userSellPlan}
        />
      )}

      {contactPopup && (
        <ContactAccountManagerPopup
          onClose={() => setContactPopup(false)}
          type={type}
        />
      )}
    </Box>
  );
}

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  hideAssets: PropTypes.bool.isRequired,
};
