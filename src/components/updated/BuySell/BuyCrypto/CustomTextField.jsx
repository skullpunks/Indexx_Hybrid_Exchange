import React, { useEffect, useState, useCallback, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import tokens from '../../../../utils/Tokens.json';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getCoinPriceByName } from '../../../../services/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import smbannerlight from '../../../../assets/updated/buySell/Early fall light.svg';
import smbannerDark from '../../../../assets/updated/buySell/Early fall Dark.svg';

import smbannerDaCrazyLightMode from '../../../../assets/updated/buySell/smBannerDaCrazyLightMode.png';
import smbannerDaCrazyDarkMode from '../../../../assets/updated/buySell/smBannerDaCrazyDarkMode.png';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '22px 6px 6px 6px',
    margin: '20px 0px',
    borderRadius: '8px',
    position: 'relative',
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
    }`,
    fontSize: 16,
    width: '100%',
    transition: theme.transitions.create(['border-color', 'background-color']),
    '&:focus': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '&:hover': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  label: {
    fontSize: '18px !important',
    fontFamily: 'poppins !important',
    fontWeight: '600 !important',
  },
  formControl: {
    width: '100%',
  },
  textField: {
    width: '100%',
    color: `${theme.palette.text.primary} !important`,
    '& .MuiOutlinedInput-root': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '24px !important',
      fontWeight: '600 !important',
      '& fieldset': {
        border: 'none',
        color: `${theme.palette.text.primary} !important`,
      },
    },
  },
  searchField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: '42px',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
      } !important`,
      fontSize: 16,
      borderRadius: '12px',
      color: `${theme.palette.text.primary} !important`,
      width: '100%',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
      ]),
      '&:focus': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '&:hover': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
  dropDownIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '20px',
      height: '20px',
      // borderRadius: '50%',
    },
    '& p': {
      fontSize: '16px',
      marginLeft: '5px',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  availableContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '17px', // Ensure it aligns with input
  },
  availableText: {
    color: theme.palette.text.secondary,
    fontSize: '14px', // Slightly smaller for "Available" text
    lineHeight: '1.5', // Adjust for better readability
  },
  dropDownContainer: {
    zIndex: '111',

    background: theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
    boxShadow:
      'rgba(0, 0, 0, 0.08) 0px 1px 10px 0px, rgba(0, 0, 0, 0.05) 0px 0px 3px 0px',
    marginTop: '-10px',
    position: 'absolute',
    width: '100%',
    paddingBottom: '10px',
    paddingTop: '10px',
    overflow: 'hidden',
    borderRadius: '16px',
  },
  dropDownContent: {
    height: '100%',
    overflowY: 'auto',
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
  },
  listContainer: {
    '&.MuiListItemButton-root': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
    },
  },
  logoContainer: {
    display: 'flex',
    gap: '10px',
    '& img': {
      width: '20px',
      height: '20px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  message: {
    marginTop: '10px',
    color: '#11BE6A',
  },
}));
const getImage = (image) => {
  console.log('my image', image);
  try {
    return require(`../../../../assets/token-icons/${image}.png`).default;
  } catch (error) {
    return Inex; // Fallback image if specific token icon is not found
  }
};
const CustomTextField = ({
  placeholder,
  label,
  type,
  onSelectToken,
  onAmountChange,
  onReceiveAmountChange,
  onPriceChange,
  amount,
  receiveAmount,
  tokenType,
  disableDropdown,
  fixedToken,
  loggedIn,
  defaultReceiveToken,
  balance,
  setTokenPriceLoading,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTokenFromUrl = searchParams.get('buyToken');
  console.log('defaultReceiveToken in customField', defaultReceiveToken);
  // Initialize the token
  const initialToken = fixedToken || {
    title: defaultReceiveToken?.title || defaultTokenFromUrl || 'INEX',
    image: defaultReceiveToken?.image || defaultTokenFromUrl || 'INEX',
  };

  const [selectedToken, setSelectedToken] = useState(initialToken);
  console.log('initialToken', initialToken);
  const classes = useStyles({
    cryptoSymbol: initialToken.title,
  });
  const location = useLocation();
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userAmount, setUserAmount] = useState(amount);
  const [rateData, setRateData] = useState(0);
  const fixedTokenRef = useRef(fixedToken);
  const theme = useTheme();
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleClickAway = () => {
    setIsOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getPricesData(defaultTokenFromUrl);
  }, [defaultTokenFromUrl]);

  useEffect(() => {
    setUserAmount(amount);
  }, [amount]);

  const handleTokenSelect = (token) => {
    console.log('I am here', token, disableDropdown);
    if (!disableDropdown) {
      getPricesData(token.title);
      setSelectedToken(token);
      onSelectToken(token);

      let basePath = '/update/home';
      if (token.isStock) {
        basePath = '/update/home/stock-token';
      } else if (token.isETF) {
        basePath = '/update/home/etf-tokens';
      }

      // Construct the new URL with the buyToken parameter
      let newUrl = `${basePath}?buyToken=${token.title}`;

      if (token.title === 'IUSD+') {
        const encodedTokenTitle = encodeURIComponent(token.title);

        newUrl = `${basePath}?buyToken=${encodedTokenTitle}`;
      }

      navigate(newUrl);
    }
    setIsOpen(false);
  };

  const handleBeforeInput = (e) => {
    const inputChar = e.data; // The character being inserted
    if (inputChar && !/^\d$/.test(inputChar)) {
      e.preventDefault(); // Prevent the character from being inserted
    }
  };

  const handleAmountChange = async (e) => {
    const amount = e.target.value;
    const parsedValue = parseInt(amount, 10);

    // Check if the input contains only digits or is empty
    if (/^\d*$/.test(amount)) {
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setUserAmount(amount);
        if (onAmountChange) {
          onAmountChange(amount);
        }
      } else if (amount === '') {
        setUserAmount('');
      }
    }
  };

  const calculateReceiveAmount = (amount, rate) => {
    const receiveAmount = type === 'buy' ? amount / rate : amount * rate;
    return receiveAmount.toFixed(2);
  };

  const getPricesData = async (currency) => {
    setTokenPriceLoading(true);
    const res = await getCoinPriceByName(String(currency));
    setTokenPriceLoading(false);
    const priceData = res.data.results.data;
    setRateData(priceData);
    if (onPriceChange) {
      onPriceChange({ priceData, currency });
    }
  };

  useEffect(() => {
    if (userAmount && rateData) {
      const receiveAmount = calculateReceiveAmount(userAmount, rateData);
      if (onReceiveAmountChange) {
        onReceiveAmountChange(receiveAmount);
      }
    }
  }, [userAmount, rateData, onReceiveAmountChange]);

  const filterTokens = () => {
    return tokens.filter((token) => {
      if (tokenType === 'Tokens') {
        return token.commonToken && !token.isStock && !token.isETF;
      } else if (tokenType === 'Stock Tokens') {
        return token.isStock;
      } else if (tokenType === 'ETF Tokens') {
        return token.isETF;
      }
      return false;
    });
  };

  useEffect(() => {
    async function updatedDefaultToken() {
      const path = location.pathname.toLowerCase();
      console.log('path is ', path);

      let defaultToken;

      // Prioritize URL parameter
      if (defaultTokenFromUrl) {
        defaultToken = {
          title: defaultTokenFromUrl,
          image: defaultTokenFromUrl,
        };
      } else if (path === '/update/home') {
        defaultToken = { title: 'INEX', image: 'INEX' };
      } else if (path.includes('etf-tokens')) {
        defaultToken = { title: 'ALCRYP', image: 'ALCRYP' };
      } else if (path.includes('stock-token')) {
        defaultToken = { title: 'AMZN', image: 'AMZN' };
      } else if (defaultReceiveToken) {
        // If defaultReceiveToken is available
        defaultToken = defaultReceiveToken;
      } else {
        // Fallback to a hardcoded default token
        defaultToken = { title: 'INEX', image: 'INEX' };
      }

      setSelectedToken(fixedToken || defaultToken);
      onSelectToken(fixedToken || defaultToken); // Call the callback with selected token
    }
    updatedDefaultToken();
  }, [tokenType, defaultReceiveToken, defaultTokenFromUrl]);

  const formatBalance = (balance) => {
    if (!balance) return '0';

    const parsedBalance = parseFloat(balance);

    // Coins that need special treatment for small balances
    const specialCoins = ['BTC', 'BNB', 'ETH', 'LTC'];

    // Check if the balance is very small or one of the special coins
    if (
      parsedBalance < 0.00001 ||
      specialCoins.includes(selectedToken?.title)
    ) {
      // Show up to 6 decimal places for these cases
      return parsedBalance.toFixed(6);
    }

    // Otherwise, show 2 decimal places if balance is greater than or equal to 1
    return parsedBalance >= 1
      ? parsedBalance.toFixed(2)
      : parsedBalance.toFixed(6);
  };
  useEffect(() => {
    console.log(focused, 'focusedValue');
  }, [focused]);

  return (
    <>
      <Box
        className={classes.container}
        sx={{
          border: `1px solid ${
            theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
          }`,
          '&:hover': {
            border: `1px solid ${theme.palette.primary.main} !important`,
          },
          '&:focus-within': {
            border: `1px solid ${theme.palette.primary.main} !important`,
          },
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="input-field">
            {label}
          </InputLabel>
          <TextField
            variant="outlined"
            className={classes.textField}
            placeholder={placeholder}
            type="number"
            value={label === 'Spend' ? userAmount : receiveAmount}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onBeforeInput={handleBeforeInput}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div
                    className={classes.dropDownIconContainer}
                    style={{ cursor: disableDropdown ? 'default' : 'pointer' }}
                    onClick={disableDropdown ? null : handleOpenModal}
                  >
                    <img
                      src={getImage(selectedToken?.image)}
                      alt={selectedToken?.title}
                    />
                    <p>{selectedToken?.title}</p>
                    {!disableDropdown && <ArrowDropDownIcon />}
                  </div>
                </InputAdornment>
              ),
            }}
            autoComplete="off"
          />
        </FormControl>

        {type === 'sell' && label === 'Spend' && (
          <div className={classes.availableContainer}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.availableText}
            >
              Available:{' '}
              {formatBalance(
                balance
                  ?.filter((wallet) => {
                    const note = wallet.notes ? wallet.notes.toLowerCase() : '';
                    return (
                      wallet.coinSymbol === selectedToken?.image &&
                      (!wallet.notes ||
                        note.includes('gift card') ||
                        note.includes('received from'))
                    );
                  })
                  .reduce((sum, wallet) => sum + wallet.coinBalance, 0)
              )}{' '}
              {selectedToken?.title}
            </Typography>
          </div>
        )}
      </Box>
      <div style={{ position: 'relative', width: '100%' }}>
        {isOpen && !disableDropdown && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              className={classes.dropDownContainer}
              style={{ height: loggedIn ? '342px' : '248px' }}
            >
              <div className={classes.dropDownContent}>
                <div
                  style={{
                    position: '-webkit-sticky',
                    position: 'sticky',
                    top: 0,
                    background:
                      theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
                    zIndex: '11111',
                    padding: '10px',
                  }}
                >
                  <TextField
                    variant="outlined"
                    className={classes.searchField}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused': {
                          borderColor: `${theme.palette.primary.main} !important`,
                        },
                        '&:hover': {
                          borderColor: `${theme.palette.primary.main} !important`,
                        },
                      },
                    }}
                    placeholder="Search..."
                    value={searchTerm}
                    autoComplete="off"
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <List>
                  {filterTokens()
                    .filter((token) =>
                      token.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((token) => (
                      <ListItem key={token.title} disablePadding>
                        <ListItemButton
                          className={classes.listContainer}
                          onClick={() => handleTokenSelect(token)}
                        >
                          <div className={classes.logoContainer}>
                            <img
                              src={getImage(token.image)}
                              alt={token.title}
                            />
                            <p>{token.title}</p>
                          </div>
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </div>
            </div>
          </ClickAwayListener>
        )}
        {selectedToken.title === 'WIBS' && type === 'buy' && (
          <img
            src={theme.palette.mode === 'light' ? smbannerlight : smbannerDark}
            style={{
              marginBottom: loggedIn ? '-20px' : '-40px',
              width: '100%',
            }}
          />
        )}
        {selectedToken.title === 'DaCrazy' && type === 'buy' && (
          <img
            src={
              theme.palette.mode === 'dark'
                ? smbannerDaCrazyDarkMode
                : smbannerDaCrazyLightMode
            }
            style={{
              marginBottom: loggedIn ? '-20px' : '-40px',
              width: '100%',
            }}
          />
        )}
      </div>
    </>
  );
};

export default CustomTextField;
