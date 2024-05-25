import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import inex from '../../../../assets/updated/buySell/INEX-sm.svg';
import usd from '../../../../assets/updated/buySell/usd.svg';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    borderRadius: '16px',
    margin: '50px 0px',
  },
  heading: {
    fontSize: '40px',

    color: `${theme.palette.text.primary} !important`,
    fontWeight: 600,
    textAlign: 'left',
  },
  subHeading: {
    fontSize: '16px',
    color: `${theme.palette.text.secondary} !important`,
    marginTop: '8px',
    textAlign: 'left',
  },
  gridContainer: {
    display: 'grid',
    gridGap: '16px',
    marginTop: '24px',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    },
  },
  gridItem: {
    padding: '24px',
    // backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    // boxShadow: theme.shadows[1],
  },
  coinInfo: {
    '& h4': {
      fontSize: '16px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
    '& p': {
      fontSize: '16px',
      fontWeight: '400',
    },
  },
}));

const PopularConversion = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <h2 className={classes.heading}>Popular INEX Conversions</h2>
      <h3 className={classes.subHeading}>
        A selection of other popular currency conversions of INEX to various
        fiat currencies.
      </h3>
      <Box className={classes.gridContainer}>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
        <Box className={classes.gridItem}>
          <div className={classes.coinInfo}>
            <h4>INEX to USD</h4>
            <p>1 INEX = 3.0 USD</p>
          </div>
          <div>
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={inex} />
              <Avatar alt="Travis Howard" src={usd} />
            </AvatarGroup>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularConversion;
