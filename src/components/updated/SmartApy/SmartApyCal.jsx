import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconicHeader from '../shared/IconicHeader';
import SmartApyTop from './SmartApyCalTop';
import StakingBottom from '../Staking/StakingBottom';
import RewardTransactionTable from './RewardTransactionTable';

// Create styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1380px',
    width: '100%',
    padding: '20px',
    margin: '100px auto',
  },
}));
const SmartApyCal = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('Smart APY');
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box className={classes.root}>
      {/* Heading */}
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <SmartApyTop />
      <RewardTransactionTable refresh={false} />
    </Box>
  );
};

export default SmartApyCal;
