import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Inex from '../../../assets/updated/buySell/INEX.svg'; // Fallback image

export default function CustomSelectBox({
  items,
  type,
  onChange,
  value,
  isCurrency,
  hasborder,
  onCurrencyChange,
  isGiftCard,
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
              ? '#484f59 !important' // Darker color for dark mode
              : '#a0a6af !important', // Darker color for light mode
        },
        '& .Mui-selected': {
          background: 'none !important',
        },
      },
    },
  };

  const getImage = (image) => {
    try {
      return require(`../../../assets/token-icons/${image}.png`).default;
    } catch (error) {
      return Inex; // Fallback image if specific token icon is not found
    }
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
            backgroundColor: 'none !important',
            color: `${theme.palette.text.primary} !important`,
            '&:focus': {
              backgroundColor: 'none !important',
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
          const selectedItem = items.find((item) =>
            isCurrency ? item.address === value : item.value === value
          );
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {selectedItem?.img && (
                <img
                  src={selectedItem?.img}
                  alt={selectedItem?.name}
                  style={{ width: '24px', height: '24px', marginRight: '10px' }}
                />
              )}
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
        {isGiftCard
          ? items?.map((card) => (
              <MenuItem
                key={card.voucher}
                value={card.voucher}
                disabled={card.isUsed || card.assignedToUser}
              >
                {`${card.voucher} - ${card.amount} ${card.type}`}
              </MenuItem>
            ))
          : !isCurrency
          ? items?.map(({ name, value, img }) => (
              <MenuItem key={name} value={value}>
                {img && (
                  <img
                    src={img}
                    alt={name}
                    style={{
                      width: '24px',
                      height: '24px',
                      marginRight: '10px',
                    }}
                  />
                )}
                {name}
              </MenuItem>
            ))
          : items?.map(({ title, address, image }) => (
              <MenuItem key={title} value={address}>
                {type === 'Coin' && (
                  <img
                    src={getImage(image)}
                    alt={title}
                    style={{
                      width: '24px',
                      height: '24px',
                      marginRight: '10px',
                    }}
                  />
                )}
                {title}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}
