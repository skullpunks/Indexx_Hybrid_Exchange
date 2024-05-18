import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import { Link } from 'react-router-dom';
import Check from '../../../../assets/authentication/Check';
const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1280px',
    margin: '50px auto',
    padding: '10px 20px',
  },
  header: {
    height: '80px',
    padding: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      padding: '0px 0px',
    },
  },
  link: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  contentContent: {
    display: 'flex',
  },
  leftEmpty: {
    flexBasis: '20%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightContainer: {
    flexBasis: '80%',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  rightContentContainer: {
    [theme.breakpoints.down('md')]: {},
    maxWidth: '384px',
    '& h3': {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
    },
    '& .infoWindow': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '13px',
      fontWeight: 400,
      background:
        theme.palette.mode === 'light' ? '#EAECEF' : '#163b2f !important',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '25px',
    },
  },
  conditionRoot: {
    margin: '20px 0px',
  },
  conditionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '15px',
    '& p': {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <Link className={classes.link}>&lt; Back </Link>
      </div>
      <div className={classes.contentContent}>
        <div className={classes.leftEmpty}></div>
        <div className={classes.rightContainer}>
          <div className={classes.rightContentContainer}>
            <h3>Reset Password</h3>
            <div className="infoWindow">
              In order to protect your account,withdrawals,payment services will
              be disabled for 24 hours after you change your password
            </div>
            <InputField label={'New Password'} type="password" />

            <div className={classes.conditionRoot}>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    false
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: false
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 8 characters
                </p>
              </div>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    true
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: true
                      ? `${theme.palette.primary.main}`
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 1 number
                </p>
              </div>
              <div className={classes.conditionContainer}>
                <Check
                  fill={
                    false
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary
                  }
                />
                <p
                  style={{
                    color: false
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  At least 1 upper case letter
                </p>
              </div>
            </div>
            <div style={{ margin: '15px' }}></div>
            <InputField label={'Confirm Password'} type="password" />
            <div style={{ margin: '25px 0px' }}></div>
            <GenericButton text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
