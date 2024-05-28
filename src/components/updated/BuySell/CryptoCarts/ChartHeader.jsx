import React from 'react';
import { Box, Avatar, AvatarGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import Usd from '../../../../assets/updated/buySell/usd.svg';
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

const ChartHeader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.chartHeader}>
      <Box className={classes.section}>
        <Box className={`${classes.item} pair-info`}>
          <p className={classes.text}>INEX/USD</p>
        </Box>
        <Box className={`${classes.item} price-info`}>
          <p className={classes.text}>$ 0.9994105</p>
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box className={`${classes.item} avatar-group`}>
          <AvatarGroup max={2}>
            <Avatar alt="Avatar 1" src={Inex} />
            <Avatar alt="Avatar 2" src={Usd} />
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
