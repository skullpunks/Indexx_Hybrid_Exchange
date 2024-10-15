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
import SearchComponent from '../Assets/SearchInput';
import EnhancedTable from './EnchanedTable';
import CustomSelectBox from './CustomSelectBox';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: '24px',
    width: '100%',
  },
  heading: {
    fontSize: '20px !important',
    fontWeight: `500 !important`,
    color: theme.palette.text.primary,
    marginBottom: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
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

const CoinBreakdown = ({ title = 'All' }) => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAssets, setHideAssets] = useState(true);
  const [value, setValue] = useState('Crypto');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box className={classes.container}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography className={classes.heading}>{title}</Typography>
        <div className={classes.selectTypeContainer}>
          <CustomSelectBox
            items={[
              { name: 'Crypto', value: 'Crypto' },
              { name: 'All Market', value: 'All Market' },
              { name: 'USDT Market', value: 'USDT Market' },
              { name: 'BNB Market', value: 'BNB Market' },
              { name: 'BTC Market', value: 'BTC Market' },
              { name: 'ETH Market', value: 'ETH Market' },
            ]}
            value={value}
            onChange={handleChange}
            hasborder
          />
        </div>
      </div>

      <EnhancedTable searchQuery={searchQuery} hideAssets={hideAssets} />
    </Box>
  );
};

export default CoinBreakdown;
