import { makeStyles } from '@mui/styles';
import React from 'react';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  depositRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '50px auto',
  },
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    height: '580px',
    padding: '40px',
    maxWidth: '540px',
    marginTop: '50px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
  },
}));
const DepositCryptoLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.depositRoot}>
      <Header />
      <div className={classes.Container}>{children}</div>
    </div>
  );
};

export default DepositCryptoLayout;
