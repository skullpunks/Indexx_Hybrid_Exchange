import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CustomSelectBox({
  items,
  type,
  onChange,
  value,
  isCurrency,
  hasborder,
}) {
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      sx: {
        marginTop: '6px',
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

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        displayEmpty
        value={value}
        onChange={onChange}
        sx={{
          width: '100%',
          border: hasborder && `1px solid ${theme.palette.divider} !important`,

          borderRadius: '12px',
          color: `${theme.palette.text.primary} !important`,
          '& .MuiSvgIcon-root': {
            color: `${theme.palette.text.primary} !important`,
          },
          '& > * ': {
            color: `${theme.palette.text.primary} !important`,
            borderRadius: '12px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
          '& .MuiSelect-outlined': {
            borderRadius: '12px',
            backgroundColor: theme.palette.background.default,
            color: `${theme.palette.text.primary} !important`,
            '&:focus': {
              backgroundColor: theme.palette.background.default,
              color: `${theme.palette.text.primary} !important`,
              border: 'none',
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
        {items?.map(({ name, value }) => (
          <MenuItem key={name} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
