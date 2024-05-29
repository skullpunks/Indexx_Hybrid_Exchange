import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { List, ListItem, ListItemButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import tokens from '../../../../utils/Tokens.json';
import Inex from '../../../../assets/updated/buySell/INEX.svg';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  getAppSettings,
  getCoinPriceByName,
  oneUSDHelper,
} from '../../../../services/api';
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
  menu: {
    width: 'calc(100% - 32px)',
    margin: '5px 16px 0',
    boxShadow: 'none',
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
      width: '25px',
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

let appSettingArr = [];

const CustomTextField = ({
  placeholder,
  label,
  type = 'buy',
  onSelectToken,
  onAmountChange,
  onReceiveAmountChange,
  onPriceChange,
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [userAmount, setUserAmount] = useState(0);
  const [rateData, setRateData] = useState(0);
  const [adminFee, setAdminFees] = useState('');

  const theme = useTheme();

  useEffect(() => {
    // Set default tokens on initial render
    if (type === 'buy') {
      setFromToken({ title: 'USD', image: 'USD' });
      setToToken({ title: 'INEX', image: 'INEX' });
    } else if (type === 'sell') {
      setFromToken({ title: 'INEX', image: 'INEX' });
      setToToken({ title: 'USD', image: 'USD' });
    }
  }, [type]);

  useEffect(() => {
    if (onSelectToken) {
      onSelectToken(type === 'buy' ? fromToken : toToken);
    }
  }, [fromToken, toToken, onSelectToken, type]);
  
  useEffect(() => {
    if (fromToken || toToken) {
      getPricesData(type === 'buy' ? toToken?.title : fromToken?.title);
    }
  }, [fromToken, toToken, type]);

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
    if (label === 'Spend') {
      setFromToken({ title: token.title, image: token.image });
    } else {
      setToToken({ title: token.title, image: token.image });
    }
    setIsOpen(false);
  };

  const handleAmountChange = async (e) => {
    const amount = e.target.value;
    console.log('e', amount, type);
    console.log('toToken', toToken);
    console.log('fromToken', fromToken);
    await getPricesData(type === 'buy' ? toToken?.title : fromToken?.title);
    if (onAmountChange) {
      onAmountChange(amount);
    }
    setUserAmount(amount);

    const receiveAmount = calculateReceiveAmount(amount, rateData);
    console.log('receiveAmount', receiveAmount);
    if (onReceiveAmountChange) {
      onReceiveAmountChange(receiveAmount);
    }
  };

  const calculateReceiveAmount = (amount, rate) => {
    console.log('amount, rate', amount, rate);
    const receiveAmount = type === 'buy' ? amount / rate : amount * rate;
    return receiveAmount.toFixed(2);
  };

  const getPricesData = async (currency) => {
    const res = await getCoinPriceByName(String(currency));
    let priceData = res.data.results.data;
    console.log('priceData', priceData);
    onPriceChange(priceData);
    setRateData(priceData);
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
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="input-field">
            {label}
          </InputLabel>
          <TextField
            id="input-field"
            variant="outlined"
            className={classes.textField}
            placeholder={placeholder}
            type="number"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div
                    className={classes.dropDownIconContainer}
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpenModal}
                  >
                    <img
                      src={getImage(
                        label === 'Spend' ? fromToken?.image : toToken?.image
                      )}
                      alt={
                        label === 'Spend' ? fromToken?.title : toToken?.title
                      }
                    />
                    <p>
                      {label === 'Spend' ? fromToken?.title : toToken?.title}
                    </p>
                    <ArrowDropDownIcon />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <div style={{ position: 'relative', width: '100%' }}>
        {isOpen && (
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
                    background:
                      theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
                    zIndex: '11111',
                    padding: '10px',
                    border: '1',
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
                  {tokens
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
