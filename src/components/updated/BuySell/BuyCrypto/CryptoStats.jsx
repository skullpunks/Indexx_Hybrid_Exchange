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

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '54px',
    color: `${theme.palette.text.primary} !important`,
    fontWeight: 600,
    [theme.breakpoints.down('md')]: {
      fontSize: '32px', // Adjust the font size for mobile as per your choice
    },
  },
  card: {
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '12px',
    borderRadius: '16px',
    width: '100%',
    height: '320px',
  },
  cardHeading: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '5px',
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
  const [loading, setLoading] = useState(true);

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
        return;
      }

      let data;
      if (tokenType === 'Tokens') data = await hotTokenData();
      else if (tokenType === 'Stock Tokens') data = await hotStockTokenData();
      else if (tokenType === 'ETF Tokens') data = await hotETFTokenData();

      if (data.status === 200) {
        let combinedData;
        if (tokenType === 'Tokens') {
          const importantTokens = ['INEX', 'WIBS', 'DaCrazy', 'BTC', 'ETH'];
          const filteredTokens = importantTokens
            .map((symbol) =>
              data.data.find((crypto) => crypto.Symbol === symbol)
            )
            .filter(Boolean); // Remove any undefined values if the token is not found
          const otherTokens = data.data.filter(
            (crypto) => !importantTokens.includes(crypto.Symbol)
          );
          //const randomOtherToken = sampleSize(otherTokens, 1);
          combinedData = [...filteredTokens];
        } else {
          combinedData = sampleSize(data.data, 5);
        }

        setCryptoData(combinedData);
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
      return price.toFixed(6);
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
            {cryptoData.map((crypto) => (
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
    </Box>
  );
};

export default CryptoStats;
