import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, useTheme } from '@mui/material';
import ss1 from '../../../assets/updated/SmartApy/ss1.svg';
import ss2 from '../../../assets/updated/SmartApy/ss2.svg';

import step2aLightMode from '../../../assets/updated/SmartApy/step2aLightMode.svg';
import step2aDarkMode from '../../../assets/updated/SmartApy/step2aDarkMode.svg';

import step2bDarkMode from '../../../assets/updated/SmartApy/step2bDarkMode.svg';
import step2bLightMode from '../../../assets/updated/SmartApy/step2bLightMode.svg';

import step3aDarkMode from '../../../assets/updated/SmartApy/step3aDarkMode.svg';
import step3aLightMode from '../../../assets/updated/SmartApy/step3aLightMode.svg';

import step3bDarkMode from '../../../assets/updated/SmartApy/step3bDarkMode.svg';
import step3bLightMode from '../../../assets/updated/SmartApy/step3bLightMode.svg';

import step4DarkMode from '../../../assets/updated/SmartApy/step4DarkMode.svg';
import step4LightMode from '../../../assets/updated/SmartApy/step4LightMode.svg';

import step5DarkMode from '../../../assets/updated/SmartApy/step5DarkModed.svg';
import step5LightMode from '../../../assets/updated/SmartApy/step5LightMode.svg';

import step6DarkMode from '../../../assets/updated/SmartApy/step6DarkMode.svg';
import step6LightMode from '../../../assets/updated/SmartApy/step6LightMode.svg';

import GenericButton from '../shared/Button';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconicHeader from '../shared/IconicHeader';

// Create styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1380px',
    width: '100%',
    padding: '20px',
    margin: '100px auto 0px auto',
  },
  maxWidthContainer: {
    maxWidth: '980px',
    width: '100%',
    margin: 'auto',
  },
  heading: {
    fontSize: '52px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  step: {
    marginBottom: theme.spacing(6),
    '& img': {
      marginTop: '50px',
      maxWidth: '600px',
      width: '100%',
      height: 'auto',
    },
  },
  stepNumber: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: theme.spacing(1),
    '& span': {
      fontSize: '38px',
    },
  },
  stepImg: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  stepDescription: {
    fontSize: '14px',
    lineHeight: 1.5,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    margin: '20px 0px',
    maxWidth: '600px',
    width: '100%',
  },
  outlineBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.main} !important`,
    '&:hover': {
      background: 'none !important',
      border: `1px solid ${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.main} !important`,
      opacity: '.7',
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
}));

const HowItWorks = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState('Smart APY');
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box className={classes.root}>
      {/* Heading */}
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <Link className={classes.link} to="/smart-apy">
        <ArrowBackIcon /> Smart APY
      </Link>
      <div className={classes.maxWidthContainer}>
        <p className={classes.heading}>How It Works</p>

        {/* Step 1 */}

        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>1.</span> Log in or Register an account
          </p>
          <p className={classes.stepDescription}>
            If you're an Indexx user, log in to your account. New users, please
            register before investing.
          </p>

          <Box className={classes.btnContainer}>
            <GenericButton
              text={'Log in'}
              onClick={() =>
                (window.location.href = 'https://indexx.ai/auth/login')
              }
            />
            <GenericButton
              text={'Register'}
              onClick={() =>
                (window.location.href = 'https://indexx.ai/auth/signup-email')
              }
              className={classes.outlineBtn}
            />
          </Box>
        </Box>

        {/* Step 2 */}

        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>2.</span> SelectLock-in Period and Investment Amount
          </p>
          <p className={classes.stepDescription}>
            Select a lock-in period of 6, 12, or 18 months based on your
            financial goals and the initial investment amount. Then click “Stake
            Now”. A pop-up will appear. Follow the next steps.
          </p>
          <div className={classes.stepImg}>
            <img
              src={
                theme.palette.mode === 'dark' ? step2aDarkMode : step2aLightMode
              }
              alt="step2a"
            />
          </div>

          <p className={classes.stepDescription}>Click “Confirm and Stake”</p>

          <div className={classes.stepImg}>
            <img
              src={
                theme.palette.mode === 'dark' ? step2bDarkMode : step2bLightMode
              }
              alt="step2b"
            />
          </div>
        </Box>

        {/* Step 3 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>3.</span> Confirm your investment by paying through your
            preferred payment option.
          </p>
          <p className={classes.stepDescription} s>
            To proceed with staking your investment, you need to confirm your
            action. You will be redirect to the payment option you choose. Once
            the lock-in period is complete, your yield will be available in
            IUSD+.
          </p>

          <Box className={classes.step}>
            <p className={classes.stepDescription} s>
              a. Click the green button to proceed
            </p>
            <div className={classes.stepImg}>
              <img
                src={
                  theme.palette.mode === 'dark'
                    ? step3aDarkMode
                    : step3aLightMode
                }
                alt="step3a"
              />
            </div>

            <p className={classes.stepDescription} s>
              b. Click the green button to proceed
            </p>

            <div className={classes.stepImg}>
              <img
                src={
                  theme.palette.mode === 'dark'
                    ? step3bDarkMode
                    : step3bLightMode
                }
                alt="step3b"
              />
            </div>
          </Box>
        </Box>
        {/* Step 4 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>4.</span> Successful Staking Acknowledgment
          </p>

          <p className={classes.stepDescription}>
            Once the payment process goes through, your funds are converted to
            IUSD+ and are now earning guaranteed returns.
          </p>
          <div className={classes.stepImg}>
            <img
              src={
                theme.palette.mode === 'dark' ? step4DarkMode : step4LightMode
              }
              alt="step4"
            />
          </div>
        </Box>

        {/* Step 5 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>5.</span> View Staking Dashboard
          </p>

          <p className={classes.stepDescription}>
            On your dashboard inside the Asset Wallet, you will see the Staking
            Overview.
          </p>
          <div className={classes.stepImg}>
            <img
              src={
                theme.palette.mode === 'dark' ? step5DarkMode : step5LightMode
              }
              alt="step5"
            />
          </div>
        </Box>

        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            <span>6.</span> Asset Wallet
          </p>

          <p className={classes.stepDescription}>
            Your dashboard shows your Smart APY investment.
          </p>
          <div className={classes.stepImg}>
            <img
              src={
                theme.palette.mode === 'dark' ? step6DarkMode : step6LightMode
              }
              alt="step6"
            />
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default HowItWorks;
