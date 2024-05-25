import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
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
  profit: {
    color: `${theme.palette.primary.main} !important`,
  },
  loss: {
    color: 'red !important',
  },
}));

const CryptoStats = () => {
  const classes = useStyles();

  return (
    <Box>
      <h3 className={classes.heading}>Buy Crypto</h3>
      <Box className={classes.card}>
        <h4 className={classes.cardHeading}>Hot Cryptos</h4>
        <List>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.profit}>+2.22%</div>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.loss}>+2.22%</div>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.profit}>+2.22%</div>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.profit}>+2.22%</div>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.loss}>+2.22%</div>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={classes.listContainer}>
              <div className={classes.logoContainer}>
                <img src={Inex} />
                <p>INEX</p>
              </div>
              <div>$567.40</div>
              <div className={classes.loss}>+2.22%</div>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default CryptoStats;
