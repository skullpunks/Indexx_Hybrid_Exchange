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
  onCurrencyChange,
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

  const [selectedCurrency, setSelectedCurrency] = React.useState(
    !isCurrency
      ? items?.find((el) => el.value === value)?.name
      : items?.find((el) => el.address === value)?.title
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selected = !isCurrency
      ? items?.find((el) => el.value === value)?.name
      : items?.find((el) => el.address === value)?.title;

    setSelectedCurrency(selected);
    if (type === 'Coin') onCurrencyChange(value);
    else if (type === 'Gift Card') console.log('value', value);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        displayEmpty
        value={value}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
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
            border: '1px solid grey',
            backgroundColor: 'none',
            color: `${theme.palette.text.primary} !important`,
            '&:focus': {
              border: '1px solid grey',
              backgroundColor: 'none',
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
          const selectedItem = items.find((item) =>
            isCurrency ? item.address === value : item.value === value
          );
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {selected}
            </div>
          );
        }}
        MenuProps={MenuProps}
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>{type}</em>
        </MenuItem>
        {items?.map(({ name, value }) => (
          <MenuItem key={name} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
