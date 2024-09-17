import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { InputAdornment, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { List, ListItem, ListItemButton } from '@mui/material';
import tokens from '../../../utils/Tokens.json';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
    },
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '600px',
      width: '100%',
      height: '500px',
      [theme.breakpoints.down('sm')]: {
        height: '100vh',
      },
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  dropDownContent: {
    height: '100%',
    display: 'flex',
    padding: '10px 0px',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#484f59 !important' // Darker color for dark mode
          : '#a0a6af !important', // Darker color for light mode
    },
  },
  listContainer: {
    '&.MuiListItemButton-root': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
    },
  },
  searchField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: '42px',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
      } !important`,
      fontSize: 16,
      borderRadius: '12px',
      color: `${theme.palette.text.primary} !important`,
      width: '100%',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
      ]),
      '&:focus': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '&:hover': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
  dropDownContainer: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    display: 'flex',
    gap: '10px',
    '& img': {
      width: '30px',
      height: '30px',
    },
    '& p': {
      fontSize: '16px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

const CoinsPopup = ({ onClose, onTokenSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const classes = useStyles();
  const filterTokens = () => {
    return tokens.filter((token) => {
      return token.commonToken && !token.isStock && !token.isETF;
    });
  };
  const getImage = (image) => {
    console.log('my image', image);
    try {
      return require(`../../../assets/token-icons/${image}.png`).default;
    } catch (error) {
      return Inex; // Fallback image if specific token icon is not found
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTokenSelect = (token) => {
    onTokenSelect(token); // Pass the selected token to the parent component
    onClose(); // Close the popup
  };

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.dropDownContent}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '16px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: '600' }}>
              Select Currency
            </div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                color={theme.palette.text.secondary}
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>
          <div
            style={{
              background: theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
              zIndex: '11111',
              padding: '10px',
              margin: 0,
            }}
          >
            <TextField
              variant="outlined"
              className={classes.searchField}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <List
            sx={{
              height: '100%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '7px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? '#5f6673 !important'
                    : '#b7bdc6 !important',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                display: 'none !important', // Hide the scrollbar track
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? '#484f59 !important' // Darker color for dark mode
                    : '#a0a6af !important', // Darker color for light mode
              },
            }}
          >
            {filterTokens()
              .filter((token) =>
                token.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((token) => (
                <ListItem key={token.title} disablePadding>
                  <ListItemButton
                    className={classes.listContainer}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className={classes.logoContainer}>
                      <img src={getImage(token.image)} alt={token.title} />
                      <p>{token.title}</p>
                    </div>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default CoinsPopup;
