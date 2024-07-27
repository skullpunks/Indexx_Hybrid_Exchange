import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingleSelectPlaceholder({
  items,
  type,
  onTokenSelect,
}) {
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      sx: {
        borderRadius: '8px',
        marginTop: '4px',
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        backgroundColor: `${theme.palette.divider} !important`, // Custom dropdown background color
        color: `${theme.palette.text.primary}`, // Custom dropdown text color
        '&>*': {
          backgroundColor: `${theme.palette.divider} !important`, // Custom dropdown background color
          color: `${theme.palette.text.primary}`, // Custom dropdown text color
        },
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
        '& .Mui-selected': {
          background: 'none !important',
        },
      },
    },
  };
  const [personName, setPersonName] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    onTokenSelect(value);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        displayEmpty
        value={personName}
        onChange={handleChange}
        sx={{
          width: '100%',
          borderRadius: '8px',
          color: `${theme.palette.text.primary} !important`,
          '& .MuiSvgIcon-root': {
            color: `${theme.palette.text.primary} !important`,
            borderRadius: '8px',
          },
          '& > * ': {
            border: 'none !important',
            color: `${theme.palette.text.primary} !important`,
            borderRadius: '0',
          },
          '& .MuiSelect-outlined': {
            border: 'none',
            borderRadius: '0',
            backgroundColor: theme.palette.divider,
            color: `${theme.palette.text.primary} !important`,
            '&:focus': {
              backgroundColor: theme.palette.divider,
              color: `${theme.palette.text.primary} !important`,
            },
          },
        }}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <em style={{ color: theme.palette.text.primary }}>{type}</em>
            );
          }
          return selected;
        }}
        MenuProps={MenuProps}
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>{type}</em>
        </MenuItem>
        {type === 'Type' || type === 'Coin' || type === 'Status'
          ? items?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'none !important',
                  },
                }}
              >
                {name}
              </MenuItem>
            ))
          : items?.map((name) => (
              <MenuItem
                key={name?.title}
                value={name?.title}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'none !important',
                  },
                }}
              >
                {name?.title}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}
