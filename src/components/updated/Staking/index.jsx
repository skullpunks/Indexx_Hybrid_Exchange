import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import GenericButton from '../shared/Button';
import IconicHeader from '../shared/IconicHeader';
import StakingBottom from './StakingBottom';
import StakingTop from './StakingTop';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '0px',
    paddingTop: '50px',

    margin: '50px auto 50px auto', // Center the container
    position: 'relative', // Center the container
  },
  subscribeWrapper: {
    margin: '70px 0px',
    padding: '50px 20px',
    background: theme.palette.mode === 'dark' ? 'black' : theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontSize: '36px',
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      [theme.breakpoints.down('md')]: {
        fontSize: '24px',
      },
    },
  },
}));

const Staking = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState('Staking');
  const [refresh, setRefresh] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  return (
    <>
      <div className={classes.container}>
        <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
        <StakingTop onStakeSuccess={handleRefresh} />
        <StakingBottom refresh={refresh} />
      </div>
    </>
  );
};

export default Staking;
