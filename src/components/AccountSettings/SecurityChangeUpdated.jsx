import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import { InputAdornment } from '@mui/material';
import {
  decodeJWT,
  changePassword,
  loginWithToken,
  getCaptainBeeByEmail,
} from '../../services/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import OpenNotification from '../OpenNotification/OpenNotification';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    if (defaultSignInToken) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    }
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.access_token, 'res.data.access_token');
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        if (resObj?.userType === 'CaptainBee') {
          let resObj2 = await getCaptainBeeByEmail(String(resObj?.email));
          console.log(resObj2);
          let username = resObj2?.data.Username;
          localStorage.setItem('username', username);
        }
        searchParams.delete('signInToken');
        setSearchParams(searchParams);
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Check if old and new passwords are the same
    if (oldPassword === newPassword) {
      setPasswordError('Old password and new password cannot be the same.');
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setMatchError('New passwords do not match.');
      return;
    }

    setPasswordError('');
    setMatchError('');
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access_token');
      const decoded = decodeJWT(accessToken); // Decode user info from token
      const response = await changePassword(
        decoded.email,
        newPassword,
        oldPassword
      );

      if (response.status === 200) {
        OpenNotification('success', 'Password changed successfully!');
      } else {
        OpenNotification('error', response.data || 'Error changing password.');
      }
    } catch (error) {
      OpenNotification('error', 'Failed to change password.');
    } finally {
      setLoading(false);
    }
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

  // Check if all fields are filled to enable the button
  const isButtonDisabled =
    !oldPassword || !newPassword || !confirmPassword || loading;

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
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
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
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setPasswordError(''); // Reset error on input change
          }}
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
        {passwordError && (
          <Typography className={classes.errorText}>{passwordError}</Typography>
        )}
        <InputField
          className={undefined}
          variant="outlined"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setMatchError(''); // Reset error on input change
          }}
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
        {matchError && (
          <Typography className={classes.errorText}>{matchError}</Typography>
        )}
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
          disabled={isButtonDisabled}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
