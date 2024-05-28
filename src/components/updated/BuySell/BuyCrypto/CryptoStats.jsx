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
import { hotTokenData } from '../../../../services/api';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import { sampleSize } from 'lodash';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '56px',
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
    height: '100vh', // Full screen height for the loader
  },
}));

const CryptoStats = () => {
  const classes = useStyles();
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const data = await hotTokenData();
      if (data.status === 200) {
        const randomData = sampleSize(data.data, 10);
        setCryptoData(randomData);
      } else {
        console.error('Error fetching crypto data:', data);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchCryptoData();
  }, []);

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
      return Inex; // Fallback image if specific token icon is not found
    }
  };

  return (
    <Box>
      <h3 className={classes.heading}>Buy Crypto</h3>
      <Box className={classes.card}>
        <h4 className={classes.cardHeading}>Hot Cryptos</h4>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <List>
            {cryptoData.map((crypto) => (
              <ListItem key={crypto.Symbol} disablePadding>
                <ListItemButton className={classes.listContainer}>
                  <div className={classes.logoContainer}>
                    <img src={getImage(crypto.Symbol)} alt={crypto.Name} />
                    <Typography>{crypto.Symbol}</Typography>
                  </div>
                  <div>
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
