import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { List, ListItem, ListItemButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import tokens from '../../../../utils/Tokens.json';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getCoinPriceByName } from '../../../../services/api';

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
      borderRadius: '50%',
    },
    '& p': {
      fontSize: '16px',
      marginLeft: '5px',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  dropDownContainer: {
    zIndex: '111',
    height: '224px',
    background: theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
    boxShadow:
      'rgba(0, 0, 0, 0.08) 0px 1px 10px 0px, rgba(0, 0, 0, 0.05) 0px 0px 3px 0px',
    marginTop: '-10px',
    position: 'absolute',
    width: '100%',
    paddingBottom: '10px',
    overflow: 'hidden',
    borderRadius: '16px',
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
      width: ({ cryptoSymbol }) =>
        ['INEX', 'IN500', 'INXC', 'IUSD'].includes(cryptoSymbol)
          ? '40px'
          : '30px',
      height: '25px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
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
}) => {
  const initialToken = fixedToken || { title: 'INEX', image: 'INEX' };
  const [fromToken, setFromToken] = useState(initialToken);
  const classes = useStyles({
    cryptoSymbol: fromToken.title,
  });
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userAmount, setUserAmount] = useState(amount);
  const [rateData, setRateData] = useState(0);

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

  const handleTokenSelect = (token) => {
    if (!disableDropdown) {
      setFromToken(token);
      getPricesData(token.title)
      onSelectToken(token);
    }
    setIsOpen(false);
  };

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

  useEffect(() => {
    console.log("fromToken.title", fromToken.title)
    getPricesData(fromToken.title);
  }, [fromToken.title]);

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
                  <img src={getImage(fromToken?.image)} alt={fromToken?.title} />
                  <p>{fromToken?.title}</p>
                  {!disableDropdown && <ArrowDropDownIcon />}
                </div>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <div style={{ position: 'relative', width: '100%' }}>
        {isOpen && !disableDropdown && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.dropDownContainer}>
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    position: '-webkit-sticky',
                    position: 'sticky',
                    top: 0,
                    background: theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
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
      </div>
    </>
  );
};

export default CustomTextField;
