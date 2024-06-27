import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import SearchComponent from './SearchInput';
import EnhancedTable from './CoinTable';
import Header from './CoinBreakdownHeader';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',

    [theme.breakpoints.down('md')]: {},
  },
  leftDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
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
    display: 'flex',
    justifyContent: 'center',
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

const CoinBreakdown = () => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAssets, setHideAssets] = useState(false);
  const [activeTab, setActiveTab] = useState('Holding');
  // const handleSearchIconHover = () => {
  //   setSearchOpen(true);
  // };

  // const handleSearchIconLeave = () => {
  //   setSearchOpen(false);
  // };

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleCheckboxChange = (event) => {
  //   setHideAssets(event.target.checked);
  // };

  const onTabChange = (name) => setActiveTab(name);
  return (
    <Box className={classes.container}>
      <Typography className={classes.heading}>My Assets</Typography>
      <Box className={classes.row}>
        <Header />
        {/* <Box className={classes.leftDiv} onClick={() => onTabChange('Holding')}>
          <Typography className={classes.leftHeading}>Holding</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === 'Holding' ? 1 : 0 }}
          ></Box>
        </Box>
        <Box className={classes.leftDiv} onClick={() => onTabChange('Hot')}>
          <Typography className={classes.leftHeading}>Hot</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === 'Hot' ? 1 : 0 }}
          ></Box>
        </Box>
        <Box
          className={classes.leftDiv}
          onClick={() => onTabChange('New Listing')}
        >
          <Typography className={classes.leftHeading}>New Listing</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === 'New Listing' ? 1 : 0 }}
          ></Box>
        </Box>
        <Box
          className={classes.leftDiv}
          onClick={() => onTabChange('Favourite')}
        >
          <Typography className={classes.leftHeading}>Favourite</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === 'Favourite' ? 1 : 0 }}
          ></Box>
        </Box>
        <Box
          className={classes.leftDiv}
          onClick={() => onTabChange('Top Gainers')}
        >
          <Typography className={classes.leftHeading}>Top Gainers</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === 'Top Gainers' ? 1 : 0 }}
          ></Box>
        </Box>
        <Box
          className={classes.leftDiv}
          onClick={() => onTabChange('24 Volume')}
        >
          <Typography className={classes.leftHeading}>24 Volume</Typography>
          <Box
            className={classes.underline}
            sx={{ opacity: activeTab === '24 Volume' ? 1 : 0 }}
          ></Box>
        </Box> */}
        {/* <Box className={classes.rightDiv}>
          <span className={classes.searchComponent}>
            <SearchComponent
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </span>

          <FormControlLabel
            className={classes.checkboxLabel}
            control={<Checkbox checked={hideAssets} onChange={handleCheckboxChange} />}
            label="Hide assets <1 USD"
          />
        </Box> */}
      </Box>
      <EnhancedTable searchQuery={searchQuery} hideAssets={hideAssets} />
    </Box>
  );
};

export default CoinBreakdown;
