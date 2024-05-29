import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { List, ListItem, ListItemButton } from '@mui/material';
import Inex from '../../../../assets/updated/buySell/INEX.svg';
import { useTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '22px 6px 6px 6px',

    margin: '20px 0px',
    borderRadius: '8px',

    position: 'relative',

    border: `1px solid ${
      theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
    }`,
    fontSize: 16,

    width: '100%',

    transition: theme.transitions.create(['border-color', 'background-color']),
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '&:hover': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  label: {
    fontSize: '18px !important',
    fontFamily: 'poppins !important',
    fontWeight: '600 !important',
  },
  formControl: {
    width: '100%',
  },
  textField: {
    width: '100%',
    color: `${theme.palette.text.primary} !important`,

    '& .MuiOutlinedInput-root': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '24px !important',
      fontWeight: '600 !important',
      '& fieldset': {
        border: 'none',
        color: `${theme.palette.text.primary} !important`,
      },
    },
  },
  menu: {
    width: 'calc(100% - 32px)',
    margin: '5px 16px 0',
    // backgroundColor: "grey",
    boxShadow: 'none',
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
      // Use the system font instead of the default Roboto font.

      '&:focus': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '&:hover': {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      '& fieldset': {
        // borderColor: 'black',
        border: 'none',
      },
    },
  },
  dropDownIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
    },
    '& p': {
      fontSize: '16px',
      marginLeft: '5px',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  dropDownContainer: {
    zIndex: '111',
    height: '224px',
    background: theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
    boxShadow:
      'rgba(0, 0, 0, 0.08) 0px 1px 10px 0px, rgba(0, 0, 0, 0.05) 0px 0px 3px 0px',
    marginTop: '-10px',
    position: 'absolute',
    width: '100%',
    paddingBottom: '10px',
    overflow: 'hidden',
    borderRadius: '16px',
  },
  listContainer: {
    '&.MuiListItemButton-root': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
    },
  },
  logoContainer: {
    display: 'flex',
    gap: '10px',
    '& img': {
      width: '25px',
      height: '25px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

const CustomTextField = ({ placeholder, label }) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        className={classes.container}
        style={{
          border: focused
            ? `1px solid ${theme.palette.primary.main} !important`
            : `1px solid ${
                theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
              } !important`,
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.label} shrink htmlFor="input-field">
            {label}
          </InputLabel>
          <TextField
            id="input-field"
            variant="outlined"
            className={classes.textField}
            placeholder={placeholder}
            type="number"
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div
                    className={classes.dropDownIconContainer}
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpenModal}
                  >
                    <img src={Inex} />
                    <p>INEX</p>
                    <ArrowDropDownIcon />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <div style={{ position: 'relative', width: '100%' }}>
        {isOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.dropDownContainer}>
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <div
                  style={{
                    position: '-webkit-sticky',
                    position: 'sticky',
                    top: 0,
                    background:
                      theme.palette.mode === 'dark' ? '#1E2329' : '#ffff',
                    zIndex: '11111',
                    padding: '10px',
                    border: '1',
                  }}
                >
                  <TextField
                    variant="outlined"
                    className={classes.searchField}
                    placeholder="Search..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <List>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton className={classes.listContainer}>
                      <div className={classes.logoContainer}>
                        <img src={Inex} />
                        <p>INEX</p>
                      </div>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </>
  );
};

export default CustomTextField;
