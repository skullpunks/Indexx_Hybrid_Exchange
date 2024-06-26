import React from 'react';

import { makeStyles } from '@mui/styles';
import InputField from '../../../shared/TextField';
import GenericButton from '../../../shared/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../../assets/authentication/lightMode_logo.svg';

import googleLogo from '../../../../../assets/authentication/logogoogle.svg';
import appleLogo from '../../../../../assets/authentication/ios.svg';
import iosDark from '../../../../../assets/authentication/ios-dark.svg';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signupAPI } from '../../../../../services/api';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '30px',
    },
  },
  socialButton: {
    background: 'none !important',
    border: `1px solid ${theme.palette.divider} !important`,
    margin: '10px 0px !important',
    color: `${theme.palette.text.primary} !important`,
  },
  loginText: {
    fontSize: '32px',
    fontWeight: 600,
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
  },
  logoText: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  createLink: {
    color: `${theme.palette.primary.main} !important`,
    background: `${theme.palette.background.default} !important`,
  },
}));

const SelectRole = ({ email, password, referralId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loadings, setLoadings] = React.useState(false);
  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values, email, password, '', referralId);
      // Handle form submission
      const res = await signupAPI(email, password, '', referralId);

      if (res.status === 200) {
        setLoadings(false);
        alert('Successfully registered');
        window.dispatchEvent(new Event('storage'));
        //navigate('email-auth');
      } else {
        setLoadings(false);
        alert(res.data);
      }
    },
  });
  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Select a role</h3>
      <h4>Your account has been created successfully. Set it up now</h4>
      <div style={{ margin: '0px auto 15px auto' }}>
        <FormControl sx={{ width: '100%' }}>
          <FormHelperText
            sx={{
              margin: 0,
              padding: 0,
              marginBottom: '10px',
              fontFamily: 'poppins',
              fontSize: '14px',
            }}
          >
            Role
          </FormHelperText>
          <Select
            displayEmpty
            inputProps={{ 'aria-label': 'Select Role' }}
            sx={{
              border: `2px solid ${theme.palette.primary.main} !important`,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Normal User</MenuItem>
            <MenuItem value={20}>Captain Bee</MenuItem>
            <MenuItem value={30}>Honey Bee</MenuItem>
          </Select>
        </FormControl>
      </div>

      <GenericButton
        text={'Next'}
        onClick={formik.handleSubmit}
        loading={loadings}
      />
      <div style={{ margin: '10px auto' }}></div>
    </div>
  );
};

export default SelectRole;
