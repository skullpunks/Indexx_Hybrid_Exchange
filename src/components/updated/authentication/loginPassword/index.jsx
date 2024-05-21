import React from 'react';

import { makeStyles } from '@mui/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../assets/authentication/lightMode_logo.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
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

const LoginPassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values: ', values);
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

      <h3 className={classes.loginText}>Enter your password</h3>
      <div style={{ margin: '15px auto' }}>
        <InputField
          label={'Password'}
          type={showPassword ? 'text' : 'password'}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.errors.password}
          // style={{
          //   borderRadius: 10,
          //   position: 'relative',
          //   backgroundColor: 'none',
          //   border: '1px solid red',
          //   borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
          //   fontSize: 16,
          //   minHeight: '26px',
          //   width: '100%',
          //   padding: '10px 12px',
          //   transition: theme.transitions.create([
          //     'border-color',
          //     'background-color',
          //   ]),
          //   // Use the system font instead of the default Roboto font.

          //   '&:focus': {
          //     borderColor: theme.palette.primary.main,
          //   },
          //   '&:hover': {
          //     borderColor: theme.palette.primary.main,
          //   },

          //   '& .MuiInputBase-input': {
          //     borderRadius: 0,
          //     position: 'relative',
          //     backgroundColor: 'none',
          //     border: 'none !important',
          //     fontSize: 16,
          //     minHeight: '26px',
          //     width: '100%',
          //     padding: '10px 12px',
          //     transition: theme.transitions.create([
          //       'border-color',
          //       'background-color',
          //     ]),
          //     // Use the system font instead of the default Roboto font.
          //   },
          // }}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       aria-label="toggle password visibility"
          //       onClick={handleClickShowPassword}
          //       onMouseDown={handleMouseDownPassword}
          //       edge="end"
          //     >
          //       {showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
        />
      </div>

      <GenericButton text={'Next'} />

      <div style={{ margin: '10px auto' }}></div>

      <GenericButton text={'Forgot password?'} className={classes.createLink} />
    </div>
  );
};

export default LoginPassword;
