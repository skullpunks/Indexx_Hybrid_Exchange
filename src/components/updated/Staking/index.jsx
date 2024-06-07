import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
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
}));

const Staking = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState('Staking');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <StakingTop />
    </div>
  );
};

export default Staking;
