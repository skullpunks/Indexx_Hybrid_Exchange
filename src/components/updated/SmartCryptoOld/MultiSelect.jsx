import { useState, useRef, isValidElement, useEffect } from 'react';
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
import Inex from '../../../assets/updated/buySell/INEX.svg';

function PopperReplacement(props) {
  const { children, ...restProps } = props;
  return <Box {...restProps}>{isValidElement(children) ? children : null}</Box>;
}

export function NewMultiSelect({
  values = [],
  onChange,
  allTokens,
  selectedTokens = [],
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const [options, setOptions] = useState([]);
  const openMenu = (event) => {
    setAnchorEl(event?.currentTarget);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  console.log("selectedTokens", selectedTokens)
  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };

  const closeMenu = (e, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown')
      setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (allTokens && allTokens.length > 0) {
      const generatedOptions = allTokens.map((token) => ({
        img: getImage(token.image), // Use getImage to dynamically load images
        name: token.title,
        fullName: token.subTitle,
      }));
      setOptions(generatedOptions);
    }
  }, [allTokens]);

  const handleSelectionChange = (event, token) => {
    console.log('event', event)
    console.log('token', token)
    const isSelected = selectedTokens.some(
      (selected) => selected.name === token.name
    );
    const updatedTokens = isSelected
      ? selectedTokens.filter((selected) => selected.name !== token.name)
      : [...selectedTokens, token];
    console.log('Updated Tokens:', updatedTokens);
    onChange(updatedTokens);
  };
  
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
              options={options}
              value={values}
              onChange={handleSelectionChange}
              noOptionsText="No Results Found"
              ListboxComponent={MenuList}
              renderOption={(props, option) => {
                const isSelected = selectedTokens.some(
                  (selected) => selected.name === option.name
                );
              
                return (
                  <ListItem
                    {...props}
                    key={option.name}
                    sx={{
                      fontSize: '14px', // Smaller font size for dropdown
                      padding: '4px 0px', // Adjust padding
                      '&.MuiListItem-root': {
                        padding: '7px 0px',
                      },
                      textTransform: 'uppercase',
                    }}
                    onClick={(e) => handleSelectionChange(e, option)} // Ensure correct selection behavior
                  >
                    <Checkbox
                      style={{
                        marginRight: '10px',
                        padding: '0px', // Smaller checkbox size
                      }}
                      checked={isSelected} // Use the determined value
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={option.img}
                        style={{ width: '20px', marginRight: '7px' }}
                        alt={`${option.name} icon`}
                      />
                      {option.name}
                    </div>
                  </ListItem>
                );
              }}
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
