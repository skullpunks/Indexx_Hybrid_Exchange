import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import SearchComponent from './SearchInput';
import EnhancedTable from './CoinTable';
import cryptosImg from '../../../assets/updated/asset_wallet/crypto-04.png';
import fiatImg from '../../../assets/updated/asset_wallet/fiat-logo.png';

import CoinTableAPY from './CoinTableAPY';
import DemoCoinTable from './DemoCoinTable';
// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: '24px',
    minHeight: '682px',
    [theme.breakpoints.down('md')]: {
      border: 'none !important',
    },
  },
  heading: {
    fontSize: '24px !important',
    fontWeight: `600 !important`,
    color: theme.palette.text.primary,
    marginBottom: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-end',
    // '&>div': { flex: 1 },
    alignItems: 'center',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  },
  leftDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  leftHeading: {
    fontSize: '16px !important',
    fontWeight: `500 !important`,
  },
  underline: {
    width: '16px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    marginTop: '4px',
  },
  rightDiv: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
      flex: 1,
      width: '100%',
      marginTop: '20px',
    },
  },
  searchBar: {
    position: 'absolute',
    right: 0,
    transition: 'width 0.3s',
    width: '0',
    overflow: 'hidden',
    '&:focus-within': {
      width: '150px',
    },
  },
  searchIcon: {
    cursor: 'pointer',
  },
  searchComponent: {
    [theme.breakpoints.down('md')]: {
      order: 1,
    },
  },
  fiatText: {
    fontWeight: 'bold',
    color: '#8BB376',
    fontSize: '20px !important',
  },  
  checkboxLabel: {
    marginLeft: '16px',
    '& .Mui-checked': {
      color: `${theme.palette.text.primary} !important`, // Change checked color to text primary
    },
    [theme.breakpoints.down('md')]: {
      order: 0,
    },
  },
}));

const CoinBreakdown = ({
  selectedValue,
  setupdatePlanMode,
  currentPath = '/wallet/overview',
}) => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAssets, setHideAssets] = useState(true);
  const [currentPlanName, setCurrentPlanName] = useState('');

  const handleSearchIconHover = () => {
    setSearchOpen(true);
  };

  const handleSearchIconLeave = () => {
    setSearchOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setHideAssets(event.target.checked);
  };

  const handlePlanChange = (plan, cryptocurrencies) => {
    setCurrentPlanName(plan);
    setupdatePlanMode(true);
    console.log('Selected Plan: here', plan, cryptocurrencies);
    localStorage.setItem('CurrentPlan', plan);
    localStorage.setItem(
      'CurrentPlanCurrencies',
      JSON.stringify(cryptocurrencies)
    );
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>My Assets</Typography>
      <Box className={classes.row}>
        <Box className={classes.rightDiv}>
          <span className={classes.searchComponent}>
            <SearchComponent
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </span>

          <FormControlLabel
            className={classes.checkboxLabel}
            control={
              <Checkbox checked={hideAssets} onChange={handleCheckboxChange} />
            }
            label="Hide assets <1 USD"
          />
        </Box>
      </Box>
      <Box>
        {selectedValue === 'Smart APY' ? (
          ''
        ) : (
          <Box
            className={classes.leftDiv}
            style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}
          >
            <img
              src={currentPath === '/wallet/fiat' ? fiatImg : cryptosImg}
              alt={currentPath === '/wallet/fiat' ? 'fiatImg' : 'cryptosImg'}
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
            {currentPath === '/wallet/fiat' && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#8BB376 !important',
                  fontSize: '20px',
                }}
              >
                Fiat
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {currentPath === '/wallet/iusd+' ? (
        <CoinTableAPY
          searchQuery={searchQuery}
          hideAssets={hideAssets}
          selectedValue={selectedValue}
          setupdatePlanMode={setupdatePlanMode}
          onPlanChange={handlePlanChange}
        />
      ) : currentPath === '/wallet/demo-smart-crypto' ? (
        <DemoCoinTable
          searchQuery={searchQuery}
          hideAssets={hideAssets}
          selectedValue={selectedValue}
          setupdatePlanMode={setupdatePlanMode}
        />
      ) : (
        <EnhancedTable
          searchQuery={searchQuery}
          hideAssets={hideAssets}
          selectedValue={selectedValue}
          setupdatePlanMode={setupdatePlanMode}
          onPlanChange={handlePlanChange}
        />
      )}
    </Box>
  );
};

export default CoinBreakdown;
