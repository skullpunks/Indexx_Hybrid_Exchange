import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

import { countries } from 'country-codes-flags-phone-codes';

const BootstrapInput = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'yellowBorders',
})(({ theme, yellowBorders, blueBorders }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&.MuiInputBase-root': {
    borderRadius: 10,
    backgroundColor: 'none',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    paddingRight: '15px',
    transition: theme.transitions.create(['border-color', 'background-color']),
    '&:hover': {
      borderColor: yellowBorders
        ? '#FFB300'
        : blueBorders
        ? '#07A6FC'
        : theme.palette.primary.main,
    },
    '&.Mui-error': {
      borderColor: 'red !important',
    },
    '&.Mui-focused': {
      borderColor: yellowBorders
        ? '#FFB300'
        : blueBorders
        ? '#07A6FC'
        : theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: 'none',
    fontSize: 16,
    minHeight: '26px',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color']),
    '&:-webkit-autofill': {
      boxShadow: `0 0 0 30px ${theme.palette.background.default} inset !important`,
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '&:-webkit-autofill:focus': {
      boxShadow: `0 0 0 30px ${theme.palette.background.default} inset !important`,
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
    '&:-webkit-autofill:hover': {
      boxShadow: `0 0 0 30px ${theme.palette.background.default} inset !important`,
      WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'none',
    '& label': {
      fontSize: '14px',
      fontFamily: 'poppins !important',
      color: `${theme.palette.text.primary} !important`,
    },
    '& label.Mui-focused': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .Mui-focused .MuiInputBase-root': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  inputContainer: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    width: '120px',
    marginRight: theme.spacing(1),
  },
}));

const PhoneInputField = ({
  type,
  label,
  defaultValue,
  id,
  startAdornment,
  endAdornment,
  className,
  style,
  helperText,
  error,
  secondaryLabel,
  rows,
  yellowBorders,
  blueBorders,
  value,
  onChange,
  countryCode,
  setCountryCode,
  ...otherProps
}) => {
  const classes = useStyles();

  // Sort countries by dialCode as an integer
  const sortedCountries = countries.sort((a, b) => {
    return parseInt(a.dialCode, 10) - parseInt(b.dialCode, 10);
  });

  const handleCountryChange = (event) => {
    console.log('Flag', event);
    setCountryCode(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value;

    onChange(newValue);
  };

  return (
    <FormControl variant="standard" className={`${classes.formContainer}`}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <Box className={classes.inputContainer}>
        <Select
          value={countryCode}
          onChange={handleCountryChange}
          input={<BootstrapInput />}
          displayEmpty
          inputProps={{ 'aria-label': 'Country' }}
          className={classes.select}
        >
          <MenuItem value="" disabled></MenuItem>
          {sortedCountries.map((country) => (
            <MenuItem key={country.code} value={country.dialCode}>
              {country.flag}
              {`  ${country.dialCode}`}
            </MenuItem>
          ))}
        </Select>

        <BootstrapInput
          type="text"
          value={value}
          onChange={handlePhoneNumberChange}
          yellowBorders={yellowBorders}
          blueBorders={blueBorders}
          id={id}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          className={className}
          style={style}
          error={error}
          {...otherProps}
        />
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PhoneInputField;
