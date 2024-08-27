import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import GenericButton from '../updated/shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import hiveLogo from '../../assets/updated/hive logo HD.png';
import captainBee from '../../assets/updated/captainbee.svg';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '580px',
    margin: '70px auto',
    padding: '10px 20px',
  },
  heading: {
    fontSize: '24px',
    color: theme.palette.text.primary,
    marginBottom: '20px',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '16px',
    color: theme.palette.text.secondary,
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  logoContainer: {
    textAlign: 'center',
    flex: 1,
  },
  logo: {
    height: '50px',
    marginBottom: '10px',
  },
  customButton: {
    backgroundColor: '#FFB300 !important',
    '&:hover': {
      opacity: 0.7,
    },
  },
}));

const CaptainBeeBridge = ({ handleCaptainBee }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div className={classes.Container}>
      <h1 className={classes.heading}>
        Becoming a captain bee means Guiding/Investing and Earning from your
        members.
      </h1>
      <p className={classes.paragraph}>
        If you want to learn more, check the Hive website below.
      </p>
      <div className={classes.buttonContainer}>
        <div className={classes.logoContainer}>
          <img src={hiveLogo} alt="Logo 1" className={classes.logo} />
          <GenericButton
            text="Learn More"
            onClick={() => navigate('https://hive.indexx.ai/')}
            className={classes.customButton}
          />
        </div>
        <div className={classes.logoContainer}>
          <img src={captainBee} alt="Logo 2" className={classes.logo} />
          <GenericButton
            text="Become a Captain Bee"
            onClick={handleCaptainBee}
            className={classes.customButton}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainBeeBridge;
