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
import { useLocation } from 'react-router-dom';
import smbanner from '../../../../assets/updated/buySell/Small Banner.svg';
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
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
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
}) => {
  console.log('defaultReceiveToken in customField', defaultReceiveToken);
  const initialToken = fixedToken || {
    title: defaultReceiveToken ? defaultReceiveToken?.title : 'INEX',
    image: defaultReceiveToken ? defaultReceiveToken?.image : 'INEX',
  };
  console.log('initialToken', initialToken);
  const classes = useStyles({
    cryptoSymbol: initialToken.title,
  });
  const location = useLocation();
  const [selectedToken, setSelectedToken] = useState(initialToken);
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
    getPricesData(selectedToken.title);
  }, [selectedToken]);

  const handleTokenSelect = (token) => {
    console.log('I am here', token, disableDropdown);
    if (!disableDropdown) {
      getPricesData(token.title);
      setSelectedToken(token);
      onSelectToken(token);
    }
    setIsOpen(false);
  };

  // const handleAmountChange = async (e) => {
  //   const amount = e.target.value;
  //   setUserAmount(amount);
  //   if (onAmountChange) {
  //     onAmountChange(amount);
  //   }
  // };

  const handleAmountChange = async (e) => {
    const amount = e.target.value;
    setUserAmount(amount);

    if (onAmountChange) {
      onAmountChange(amount);
    }
  };

  const calculateReceiveAmount = (amount, rate) => {
    const receiveAmount = type === 'buy' ? amount / rate : amount * rate;
    return receiveAmount.toFixed(2);
  };

  const getPricesData = async (currency) => {
    console.log('usd', currency);
    const res = await getCoinPriceByName(String(currency));
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
      if (path.includes('etf-tokens')) {
        defaultToken = { title: 'ALCRYP', image: 'ALCRYP' };
      } else if (path.includes('stock-token')) {
        defaultToken = { title: 'AMZN', image: 'AMZN' };
      } else {
        defaultToken = { title: 'INEX', image: 'INEX' };
      }

      setSelectedToken(fixedToken || defaultToken);
      console.log('defaultReceiveToken', defaultReceiveToken);
      onSelectToken(fixedToken || defaultToken);
      //debugger;
      // if (defaultReceiveToken) {
      //   setSelectedToken(fixedToken || defaultReceiveToken);
      //   onSelectToken(defaultReceiveToken); // Call the callback with selected token
      // } else if (tokenType === 'Tokens') {
      //   const allFilteredTokens = await tokens.filter(
      //     (x) => x.commonToken && !x.isStock && !x.isETF
      //   );
      //   setSelectedToken(fixedToken || allFilteredTokens[0]);
      //   onSelectToken(allFilteredTokens[0]);
      // } else if (tokenType === 'Stock Tokens') {
      //   const allFilteredTokens = await tokens.filter((x) => x.isStock);
      //   setSelectedToken(fixedToken || allFilteredTokens[0]);
      //   onSelectToken(allFilteredTokens[0]);
      // } else if (tokenType === 'ETF Tokens') {
      //   const allFilteredTokens = await tokens.filter((x) => x.isETF);
      //   setSelectedToken(fixedToken || allFilteredTokens[0]);
      //   onSelectToken(allFilteredTokens[0]);
      // }
    }
    updatedDefaultToken();
  }, [tokenType, defaultReceiveToken, location.pathname]);

  // useEffect(() => {
  //   const path = location.pathname.toLowerCase();
  //   let defaultToken;
  //   if (path.includes('etf-tokens')) {
  //     defaultToken = { title: 'ALCRYP', image: 'ALCRYP' };
  //   } else if (path.includes('stock-token')) {
  //     defaultToken = { title: 'AMZN', image: 'AMZN' };
  //   } else {
  //     defaultToken = { title: 'INEX', image: 'INEX' };
  //   }

  //   const isFixedTokenChanged = JSON.stringify(fixedTokenRef.current) !== JSON.stringify(fixedToken);

  //   if (isFixedTokenChanged) {
  //     fixedTokenRef.current = fixedToken;
  //     setSelectedToken(fixedToken || defaultToken);
  //     onSelectToken(fixedToken || defaultToken);
  //   } else {
  //     setSelectedToken(defaultToken);
  //     onSelectToken(defaultToken);
  //   }
  // }, [location.pathname, fixedToken, onSelectToken]);

  return (
    <>
      <Box
        className={classes.container}
        style={{
          border: focused
            ? `1px solid ${theme.palette.primary.main} !important`
            : `1px solid ${
                theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
              } !important`,
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
          />
        </FormControl>
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
                    placeholder="Search..."
                    value={searchTerm}
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
            src={smbanner}
            style={{ marginBottom: loggedIn ? '-20px' : '-40px' }}
          />
        )}
      </div>
    </>
  );
};

export default CustomTextField;
