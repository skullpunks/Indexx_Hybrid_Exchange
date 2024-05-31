import React from 'react';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: 'fit-content', // Adjust to content width
    marginRight: '10px',
  },
  searchIconButton: {
    padding: '10px',
  },
  searchInput: {
    width: '0',
    padding: '10px 10px 10px 40px', // Padding to accommodate the icon
    border: 'none',
    borderRadius: '6px',
    height: '32px',
    backgroundColor: theme.palette.background.default,
    transition: 'width 0.3s ease',
    color: theme.palette.text.primary,
    '&:hover, &:focus': {
      width: '130px', // Expanded width on hover/focus
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
      outline: 'none',
    },
  },
  searchIcon: {
    position: 'absolute',
    left: '10px', // Adjust to align within the input padding
    pointerEvents: 'none', // Ensure it doesn't block input interactions
    color: theme.palette.text.primary,
  },
}));

const SearchComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.searchContainer}>
      <SearchIcon className={classes.searchIcon} />
      <input
        type="search"
        className={classes.searchInput}
        placeholder="Search..."
      />
    </Box>
  );
};

export default SearchComponent;
