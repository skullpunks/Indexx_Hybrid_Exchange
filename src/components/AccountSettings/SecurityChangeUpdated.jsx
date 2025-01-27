import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    width: '100%',
    margin: '150px auto',

    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
  },
  logoText: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '32px',
    fontWeight: 600,
    margin: 0,
    textAlign: 'center',
    marginBottom: '15px',
  },

  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  input: {
    '& .MuiInputBase-root': {
      borderRadius: theme.shape.borderRadius,
    },
  },
  button: {
    fontWeight: 600,
  },
}));

const ChangePasswordComponent = () => {
  const classes = useStyles();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Handle password change logic
    console.log('Password changed');
  };

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.Container}>
      <div>
        <h2 className={classes.logoText}>Change Password</h2>
        <p style={{ marginBottom: '35px', fontSize: '10px' }}>
          {' '}
          To keep your account secure, withdrawals are not permitted for{' '}
          <b>24 hours</b> after changing your password.
        </p>
      </div>
      <form className={classes.form} onSubmit={handleChangePassword}>
        <InputField
          className={undefined}
          variant="outlined"
          label="Old Password"
          type={showOldPassword ? 'text' : 'password'}
          required
          fullWidth
          defaultValue={undefined}
          id={undefined}
          startAdornment={undefined}
          endAdornment={
            <InputAdornment position="end">
              <span
                aria-label="toggle password visibility"
                onClick={handleClickShowOldPassword}
                onMouseDown={handleMouseDownOldPassword}
                style={{ cursor: 'pointer' }}
              >
                {showOldPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </InputAdornment>
          }
          style={undefined}
          helperText={undefined}
          error={undefined}
          secondaryLabel={undefined}
          rows={undefined}
          yellowBorders={undefined}
          blueBorders={undefined}
        />
        <div style={{ margin: '1px' }}></div>

        <InputField
          variant="outlined"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          required
          fullWidth
          defaultValue={undefined}
          id={undefined}
          startAdornment={undefined}
          endAdornment={
            <InputAdornment position="end">
              <span
                aria-label="toggle password visibility"
                onClick={handleClickShowNewPassword}
                onMouseDown={handleMouseDownNewPassword}
                style={{ cursor: 'pointer' }}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </InputAdornment>
          }
          style={undefined}
          helperText={undefined}
          error={undefined}
          secondaryLabel={undefined}
          rows={undefined}
          yellowBorders={undefined}
          blueBorders={undefined}
          className={undefined}
        />
        <div style={{ margin: '1px' }}></div>

        <InputField
          className={undefined}
          variant="outlined"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          fullWidth
          defaultValue={undefined}
          id={undefined}
          startAdornment={undefined}
          endAdornment={
            <InputAdornment position="end">
              <span
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                style={{ cursor: 'pointer' }}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </InputAdornment>
          }
          style={undefined}
          helperText={undefined}
          error={undefined}
          secondaryLabel={undefined}
          rows={undefined}
          yellowBorders={undefined}
          blueBorders={undefined}
        />
        <div style={{ margin: '3px' }}></div>
        <GenericButton
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          text={'Update Password'}
          IconComponent={undefined}
          onClick={undefined}
          styles={undefined}
          disabled={undefined}
          loading={undefined}
        />
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
