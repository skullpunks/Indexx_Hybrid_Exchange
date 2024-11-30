import { useState, useRef, isValidElement } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Popover,
  ListItem,
  MenuList,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import coinImg from '../../../assets/updated/smartCrypto/coinimg.png';

const OPTIONS = [
  { img: coinImg, name: 'BTC' },
  { img: coinImg, name: 'ADA' },
  { img: coinImg, name: 'DOT' },
  { img: coinImg, name: 'NEAR' },
  { img: coinImg, name: 'POL' },
  { img: coinImg, name: 'BTC' },
  { img: coinImg, name: 'ADA' },
  { img: coinImg, name: 'DOT' },
  { img: coinImg, name: 'NEAR' },
  { img: coinImg, name: 'POL' },
];

function PopperReplacement(props) {
  const { children, ...restProps } = props;
  return <Box {...restProps}>{isValidElement(children) ? children : null}</Box>;
}

export function NewMultiSelect({ values = [], onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const openMenu = (event) => {
    setAnchorEl(event?.currentTarget);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const closeMenu = (e, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown')
      setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Button
          sx={{
            padding: '0px',
            margin: '0px',
            width: '130px',
            color: '#FEBA00',
            display: 'flex',
            flexDirection: 'column',
            background: 'none',
            '&:focus': {
              background: 'none',
            },
            '&:hover': {
              background: 'transparent',
            },
          }}
          disableRipple
          onClick={openMenu}
        >
          Select Coins
          <Box
            sx={{
              background: '#FEBA00',
              height: '1px',
              width: '100px',
            }}
          ></Box>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={closeMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              marginLeft: '-80px', // Adjust the value as needed
            },
          }}
          sx={{
            '& .MuiPaper-root': {
              background: 'none',
              boxShadow: 'none',
              padding: 0,
            },
            '& .MuiList-root': {
              height: '300px',
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
                    ? '#5f6673 !important'
                    : '#b7bdc6 !important', // Keep the same color on hover
              },
            },
          }}
        >
          <Box
            sx={{
              padding: '7px',
              minWidth: '200px', // Adjusted to match button width
              maxWidth: '230px',
              fontSize: '12px', // Font size adjustment
              background: theme.palette.divider,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            }}
          >
            <Autocomplete
              inputValue={searchValue}
              style={{ width: '100%' }}
              open={true}
              multiple
              clearOnBlur={false}
              disableCloseOnSelect={true}
              disableClearable
              autoHighlight={false}
              popupIcon={null}
              options={OPTIONS}
              value={values}
              onChange={(event, newValues) => {
                event.preventDefault();
                onChange(newValues);
              }}
              noOptionsText="No Results Found"
              ListboxComponent={MenuList}
              renderOption={(props, option, { selected }) => (
                <ListItem
                  {...props}
                  key={option}
                  sx={{
                    fontSize: '14px', // Smaller font size for dropdown
                    padding: '4px 0px', // Adjust padding
                    '&.MuiListItem-root': {
                      padding: '7px 0px',
                    },
                    textTransform: 'uppercase',
                  }}
                >
                  <Checkbox
                    style={{
                      marginRight: '10px',
                      padding: '0px', // Smaller checkbox size
                      // Reduce checkbox size
                    }}
                    checked={selected}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={option.img}
                      style={{ width: '20px', marginRight: '7px' }}
                    />
                    {option.name}
                  </div>
                </ListItem>
              )}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setAnchorEl(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Coins"
                  inputRef={inputRef}
                  onBlur={() => {
                    setAnchorEl(null);
                    return params.inputProps.onBlur;
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace') {
                      event.stopPropagation();
                    }
                  }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      fontSize: '12px', // Adjust font size
                      padding: '5px', // Adjust padding
                      border: 'none',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${theme.palette.text.secondary}`,
                      },
                    },
                  }}
                />
              )}
              PopperComponent={PopperReplacement}
            />
          </Box>
        </Popover>
      </Box>
    </>
  );
}
