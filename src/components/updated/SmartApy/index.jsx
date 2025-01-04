import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import smartApyImage from '../../../assets/updated/SmartApy/smartApyImage.png';
import iusdLogo from '../../../assets/updated/SmartApy/iusdLogo.svg';
import IconicHeader from '../shared/IconicHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';
import DepositPopup from './DepositPopup';
import RenewPopup from './RenewPopup';
import SuccessfullDepositPopup from './SuccessfullDepositPopup';
import SuccessfullRenewPopup from './SuccessfullRenewPopup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '100px auto',
  },
  container: {
    display: 'flex',
    maxWidth: '1380px',
    padding: '20px',
    width: '100%',
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    '&>div': {
      flex: 1,
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  iusdcontainer: {
    background: theme.palette.divider,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '1380px',
    width: '100%',
    margin: '50px auto',
    padding: '120px 20px',
    gap: '50px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '& h2': {
      fontSize: '62px',
      fontWeight: 'bold',
    },
    '&>p': {
      fontSize: '18px',
      marginBottom: '30px',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  outlineBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.main} !important`,
    '&:hover': {
      background: 'none !important',
      border: `1px solid ${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.main} !important`,
      opacity: '.7',
    },
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    '& img': {
      height: '40px',
    },
  },
  investPlanContainer: {
    padding: '50px 20px',
    maxWidth: '1380px',
    width: '100%',
    margin: 'auto',
    '& h2': {
      fontSize: '52px',
      fontWeight: 'bold',
      marginBottom: '40px',
    },
  },
  table: {
    '& .MuiTableCell-root': {
      border: 'none',
      padding: '10px',
      fontSize: '18px', // Font size for table rows
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      fontSize: '20px', // Font size for table header
      fontWeight: 'bold', // Optional: Make header bold
    },
  },
}));

const SmartAPY = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('Smart APY');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const rows = [
    { duration: '3 months', growth: '9%', action: 'Deposit' },
    { duration: '6 months', growth: '12%', action: 'Deposit' },
    { duration: '12 months', growth: '20%', action: 'Deposit' },
  ];

  return (
    <div className={classes.root}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <div className={classes.container}>
        {/* First child */}
        <div className={classes.textSection}>
          <h2>Make your money, Make money.</h2>
          <p>
            Indexx Bank: Your gateway to modern financial solutions. Secure,
            innovative, and designed for growth—bank smarter with Indexx.
          </p>
          <div className={classes.buttonGroup}>
            <GenericButton text={'Dashboard'} />
            <GenericButton text={'Deposit'} className={classes.outlineBtn} />
          </div>
        </div>

        {/* Second child */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            transform: 'translateY(130px)',
          }}
        >
          <img
            src={smartApyImage}
            alt="Smart APY Visual"
            className={classes.image}
          />
        </div>
      </div>

      <div className={classes.iusdcontainer}>
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: '40%',
            }}
          >
            <img
              src={iusdLogo}
              alt="Smart APY Visual"
              className={classes.image}
            />
          </div>

          <div className={classes.textSection} style={{ flex: '60%' }}>
            <h2>indexx IUSD+</h2>
            <p>
              indexx USD+ stablecoin can be instantly minted and redeemed to
              USDT 1:1. Simply replace USDT with USD+ stablecoin and start
              getting passive yield where it didn’t exist before.
            </p>
            <div className={classes.flexContainer}>
              <img src={iusdLogo} alt="IUSD Logo" />
              <p>1 IUSD+ ≈ 1 USD</p>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.investPlanContainer}>
        <h2>Investment Plan</h2>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ background: 'none' }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Deposit Duration</TableCell>
                <TableCell>Growth</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.growth}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      {row.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <SuccessfullRenewPopup /> */}
      {/* <SuccessfullDepositPopup /> */}
      {/* <RenewPopup /> */}
      {/* <DepositPopup /> */}
    </div>
  );
};

export default SmartAPY;
