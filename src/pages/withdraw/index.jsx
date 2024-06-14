import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-error': {
      borderColor: 'red !important',
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
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
  select: {
    borderRadius: 10,
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiSelect-select': {
      borderRadius: 10,
      padding: '10px 12px',
    },
  },
}));

const StyledSelect = ({ label, value, onChange, options, ...props }) => {
  const classes = useStyles();
  return (
    <FormControl variant="standard" className={`${classes.formContainer}`}>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        className={classes.select}
        displayEmpty
        input={<BootstrapInput />}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledSelect;
