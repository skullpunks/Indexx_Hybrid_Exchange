import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function SingleSelectPlaceholder() {
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        backgroundColor: `${theme.palette.divider} !important`, // Custom dropdown background color
        color: `${theme.palette.text.primary}`, // Custom dropdown text color
        // bgColor: 'pink',
        '&>*': {
          backgroundColor: `${theme.palette.divider} !important`, // Custom dropdown background color
          color: `${theme.palette.text.primary}`, // Custom dropdown text color
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
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          sx={{
            width: '100%',

            color: `${theme.palette.text.primary} !important`,
            '& .MuiSvgIcon-root': {
              color: `${theme.palette.text.primary} !important`,
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
                <em style={{ color: theme.palette.text.primary }}>Token</em>
              );
            }
            return selected;
          }}
          MenuProps={MenuProps}
          input={<OutlinedInput />}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Token</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
