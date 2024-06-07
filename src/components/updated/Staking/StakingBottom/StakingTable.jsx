import { makeStyles } from '@mui/styles';
import React from 'react';
import SingleSelectPlaceholder from '../CustomSelect';
import StickyHeadTable from './WebViewTable';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
    padding: '25px 20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      background: 'none',
      alignItems: 'flex-start',
      padding: '25px 0px',
    },
    marginTop: '50px',
  },
  headerText: {
    fontSize: '40px',
    color: theme.palette.text.primary,
    fontWeight: '500',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    },
  },
  selectContainer: {
    flex: 1,
    display: 'flex',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  tableContainer: {
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
  },
}));
const StakingTable = () => {
  const classes = useStyles();
  return (
    <div style={{ padding: '20px' }}>
      <div className={classes.headerContainer}>
        <div className={classes.headerText}>Rewards and Transactions</div>
        <div className={classes.selectContainer}>
          <SingleSelectPlaceholder />
          <SingleSelectPlaceholder />
          <SingleSelectPlaceholder />
          <SingleSelectPlaceholder />
        </div>
      </div>
      <div className={classes.tableContainer}>
        <StickyHeadTable />
      </div>
    </div>
  );
};

export default StakingTable;
