import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { makeStyles } from '@mui/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },

  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: 'none',
    border: '1px solid red',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    minHeight: '26px',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color']),
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
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
      color: '#A0AAB4',
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

const InputField = ({
  type,
  label,
  defaultValue,
  id,
  startAdornment,
  endAdornment,
  className,
  style,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="standard" className={`${classes.formContainer}`}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <BootstrapInput
        type={type}
        defaultValue={defaultValue}
        id={id}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        className={className}
        style={style}
        {...otherProps}
      />
    </FormControl>
  );
};

export default InputField;
