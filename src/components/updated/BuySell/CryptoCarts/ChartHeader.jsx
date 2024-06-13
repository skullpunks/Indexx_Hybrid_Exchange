import React, { useEffect, useState } from 'react';
import { Box, Avatar, AvatarGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import in500 from '../../../../assets/token-icons/IN500_logo.png';
import inxc from '../../../../assets/token-icons/INXC_logo.png';
import iusdp from '../../../../assets/token-icons/IUSDP_logo.png';
import Usd from '../../../../assets/updated/buySell/usd.svg';
import { getCoinPriceByName } from '../../../../services/api';
const useStyles = makeStyles((theme) => ({
  chartHeader: {},
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: '24px',
    fontWeight: '600',
  },
  redText: {
    color: 'red !important',
  },
  greenText: {
    color: theme.palette.primary.main,
  },
}));

const ChartHeader = ({ receiveToken = 'INEX' }) => {
  const classes = useStyles();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    console.log('Selected receiveToken:', receiveToken);
    // Perform necessary operations with receiveToken
  }, [receiveToken]);

  useEffect(() => {
    const fetchPrices = async () => {
      const inexPriceInUSD = await getInexPriceInUSD(receiveToken);
      setPrices(inexPriceInUSD);
    };

    fetchPrices();
  }, [receiveToken]);

  const getImage = (image) => {
    try {
      if (receiveToken === 'INEX') {
        return Inex; // Fallback image if specific token icon is not found
      } else if (receiveToken === 'IN500') {
        return in500; // Fallback image if specific token icon is not found
      } else if (receiveToken === 'INXC') {
        return inxc; // Fallback image if specific token icon is not found
      } else if (receiveToken === 'IUSD+') {
        return iusdp; // Fallback image if specific token icon is not found
      } else {
        return require(`../../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex; // Fallback image if specific token icon is not found
    }
  };

  return (
    <Box className={classes.chartHeader}>
      <Box className={classes.section}>
        <Box className={`${classes.item} pair-info`}>
          <p className={classes.text}>{receiveToken}/USD</p>
        </Box>
        <Box className={`${classes.item} price-info`}>
          <p className={classes.text}>$ {prices}</p>
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box className={`${classes.item} avatar-group`}>
          <AvatarGroup max={2}>
            <Avatar
              alt={`${receiveToken}`}
              src={getImage(receiveToken)}
              style={{ border: 'none' }}
            />
            <Avatar alt="Avatar 2" src={Usd} style={{ border: 'none' }} />
          </AvatarGroup>
        </Box>
        <Box className={`${classes.item} percentage-change`}>
          <p className={`${classes.text} ${classes.greenText}`}>-0.03%</p>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartHeader;

const getInexPriceInUSD = async (receiveToken) => {
  console.log('getcoinprice', receiveToken);
  if (
    receiveToken === null ||
    receiveToken === undefined ||
    receiveToken === ''
  ) {
    const res = await getCoinPriceByName(String('INEX'));
    console.log('res', res.data.results.data);
    return res.data.results.data; // Example price
  } else {
    const res = await getCoinPriceByName(String(receiveToken));
    console.log('res', res.data.results.data);
    return res.data.results.data; // Example price
  }
};
