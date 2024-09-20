import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  hotETFTokenData,
  hotStockTokenData,
  hotTokenData,
} from '../../../../services/api';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import { sampleSize } from 'lodash';
import visa from '../../../../assets/updated/buySell/visa.png';
import paypal from '../../../../assets/updated/buySell/paypal.png';
import mastercard from '../../../../assets/updated/buySell/mastercard.png';
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '56px',
    marginTop: '-7px',
    lineHeight: '56px',
    color: `${theme.palette.text.primary} !important`,
    fontWeight: 600,
    [theme.breakpoints.down('md')]: {
      fontSize: '32px', // Adjust the font size for mobile as per your choice
    },
  },
  supportedByContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& h4': {
      fontSize: '16px',
      margin: 0,
    },
    '& img': {
      height: '20px',
    },
  },
  card: {
    padding: '12px 0px 12px 0px',
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '16px',
    width: '100%',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Ensure overflow hidden within the card
  },
  cardListRoot: {
    height: '100%',

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
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#484f59 !important' // Darker color for dark mode
          : '#a0a6af !important', // Darker color for light mode
    },
  },
  cardHeading: {
    color: `${theme.palette.text.primary} !important`,
    padding: '0px 12px',
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '5px',
    '& span': {
      cursor: 'pointer',
    },
    '& span:hover': {
      color: theme.palette.primary.main,
    },
  },
  listContainer: {
    '&.MuiListItemButton-root': {
      padding: '10px 18px',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    gap: '10px',
    '& img': {
      width: '30px',
      height: '30px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  price: {
    minWidth: '80px', // Ensure a minimum width to align properly
    textAlign: 'right',
    fontSize: '14px',
    fontWeight: '500',
    color: `${theme.palette.text.primary} !important`,
  },
  change: {
    minWidth: '60px', // Ensure a minimum width to align properly
    textAlign: 'right',
    fontSize: '14px',
    fontWeight: '500',
  },
  profit: {
    color: `${theme.palette.primary.main} !important`,
  },
  loss: {
    color: 'red !important',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Full screen height for the loader
  },
}));

const CryptoStats = ({ tokenType, onTokenSelect }) => {
  const classes = useStyles();
  const [cryptoData, setCryptoData] = useState([]);
  const [othercryptoData, setOtherCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMoreOpen, setMoreOpen] = useState(false);
  const randomSelect = (array, num) => {
    const result = new Array(num);
    let len = array.length;
    const taken = new Array(len);
    if (num > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (num--) {
      const x = Math.floor(Math.random() * len);
      result[num] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  const handleMore = () => {
    setMoreOpen(!isMoreOpen);
  };
  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(`cryptosData_${tokenType}`);
      const cacheTimestamp = localStorage.getItem(
        `cryptosDataTimestamp_${tokenType}`
      );
      const oneHour = 3600000;

      if (
        cachedData &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < oneHour
      ) {
        setCryptoData(JSON.parse(cachedData));
        setLoading(false);
        // return;
      }

      let data;
      if (tokenType === 'Tokens') data = await hotTokenData();
      else if (tokenType === 'Stock Tokens') data = await hotStockTokenData();
      else if (tokenType === 'ETF Tokens') data = await hotETFTokenData();

      if (data.status === 200) {
        let combinedData;
        let otherTokens;
        if (tokenType === 'Tokens') {
          const importantTokens = ['INEX', 'WIBS', 'DaCrazy', 'BTC', 'ETH'];
          const filteredTokens = importantTokens
            ?.map((symbol) =>
              data.data.find((crypto) => crypto.Symbol === symbol)
            )
            .filter(Boolean); // Remove any undefined values if the token is not found
          otherTokens = data.data.filter(
            (crypto) => !importantTokens.includes(crypto.Symbol)
          );
          console.log(otherTokens, data.data, 'img-console');
          //const randomOtherToken = sampleSize(otherTokens, 1);
          combinedData = [...filteredTokens];
        } else {
          combinedData = sampleSize(data.data, 5);
        }

        setCryptoData(combinedData);
        setOtherCryptoData(otherTokens);
        localStorage.setItem(
          `cryptosData_${tokenType}`,
          JSON.stringify(combinedData)
        );
        localStorage.setItem(
          `cryptosDataTimestamp_${tokenType}`,
          Date.now().toString()
        );
      } else {
        console.error('Error fetching crypto data:', data);
      }
      setLoading(false);
    };

    fetchCryptoData();
  }, [tokenType]);

  const formatPrice = (price) => {
    if (price >= 1) {
      return price.toFixed(2);
    } else if (price >= 0.01) {
      return price.toFixed(4);
    } else {
      return price.toFixed(5);
    }
  };

  const getImage = (symbol) => {
    try {
      return require(`../../../../assets/token-icons/${symbol}.png`).default;
    } catch (error) {
      return Inex;
    }
  };

  return (
    <Box>
      <h3 className={classes.heading}>
        Buy{' '}
        {tokenType === 'Tokens'
          ? 'Crypto'
          : tokenType === 'Stock Tokens'
          ? 'Stock Tokens'
          : 'ETF Tokens'}
      </h3>
      <div className={classes.supportedByContainer}>
        <h4>Supported</h4>
        <img src={visa} alt="" />
        <img src={mastercard} alt="" />
        <img src={paypal} alt="" />
      </div>
      <Box className={classes.card}>
        <h4 className={classes.cardHeading}>
          Hot{' '}
          {tokenType === 'Tokens'
            ? 'Crypto'
            : tokenType === 'Stock Tokens'
            ? 'Stock Tokens'
            : 'ETF Tokens'}
        </h4>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <List>
            {cryptoData?.map((crypto) => (
              <ListItem key={crypto.Symbol} disablePadding>
                <ListItemButton
                  className={classes.listContainer}
                  onClick={() => onTokenSelect(crypto)}
                >
                  <div className={classes.logoContainer}>
                    <img src={getImage(crypto.Symbol)} alt={crypto.Name} />
                    <Typography>{crypto.Symbol}</Typography>
                  </div>
                  <div style={{ alignSelf: 'flex-end' }}>
                    <Typography className={classes.price}>
                      ${formatPrice(Number(crypto.Price))}
                    </Typography>
                  </div>
                  <Typography
                    className={`${classes.change} ${
                      Number(crypto.Change) >= 0 ? classes.profit : classes.loss
                    }`}
                  >
                    {Number(crypto.Change) >= 0 ? '+' : ''}
                    {Number(crypto.Change).toFixed(2)}%
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      {/* More */}{' '}
      {tokenType === 'Tokens' && (
        <>
          <h4
            className={classes.cardHeading}
            style={{ margin: '20px 0px -25px 0px', textAlign: 'left' }}
            onClick={handleMore}
          >
            <span>{isMoreOpen ? ' See Less' : 'See More'}</span>
          </h4>
          {isMoreOpen && (
            <Box className={classes.card}>
              <h4 className={classes.cardHeading}>
                Other{' '}
                {tokenType === 'Tokens'
                  ? 'Crypto'
                  : tokenType === 'Stock Tokens'
                  ? 'Stock Tokens'
                  : 'ETF Tokens'}
              </h4>
              {loading ? (
                <div className={classes.loader}>
                  <CircularProgress />
                </div>
              ) : (
                <List
                  style={{
                    height: '100%',
                    overflow: 'auto',
                  }}
                  className={classes.cardListRoot}
                >
                  {othercryptoData?.map((crypto) => (
                    <ListItem key={crypto.Symbol} disablePadding>
                      <ListItemButton
                        className={classes.listContainer}
                        onClick={() => onTokenSelect(crypto)}
                      >
                        <div className={classes.logoContainer}>
                          <img
                            src={getImage(crypto.Symbol)}
                            alt={crypto.Name}
                          />
                          <Typography>{crypto.Symbol}</Typography>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                          <Typography className={classes.price}>
                            ${formatPrice(Number(crypto.Price))}
                          </Typography>
                        </div>
                        <Typography
                          className={`${classes.change} ${
                            Number(crypto.Change) >= 0
                              ? classes.profit
                              : classes.loss
                          }`}
                        >
                          {Number(crypto.Change) >= 0 ? '+' : ''}
                          {Number(crypto.Change).toFixed(2)}%
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CryptoStats;
