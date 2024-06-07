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
    },
    marginTop: '50px',
  },
  headerText: {
    fontSize: '40px',
    color: theme.palette.text.primary,
    fontWeight: '500',
  },
  selectContainer: {
    display: 'flex',
    gap: '10px',
  },
  tableContainer: {
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
  },
}));
const StakingTable = () => {
  const classes = useStyles();
  return (
    <div>
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
