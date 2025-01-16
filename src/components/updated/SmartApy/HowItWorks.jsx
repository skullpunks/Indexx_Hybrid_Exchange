import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, useTheme } from '@mui/material';
import ss1 from '../../../assets/updated/SmartApy/ss1.svg';
import ss2 from '../../../assets/updated/SmartApy/ss2.svg';

import step1DarkMode from '../../../assets/updated/SmartApy/step1DarkMode.svg';
import step1LightMode from '../../../assets/updated/SmartApy/step1LightMode.svg';

import step31DarkMode from '../../../assets/updated/SmartApy/step31DarkMode.svg';
import step31LightMode from '../../../assets/updated/SmartApy/step31LightMode.svg';

import step32DarkMode from '../../../assets/updated/SmartApy/step32DarkMode.svg';
import step32LightMode from '../../../assets/updated/SmartApy/step32LightMode.svg';

import step5DarkMode from '../../../assets/updated/SmartApy/step5darkMode.svg';
import step5LightMode from '../../../assets/updated/SmartApy/step5LightMode.svg';

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
          <p className={classes.stepNumber}>1. Log in or Register an account</p>
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
          <p className={classes.stepNumber}>2. Buy IUSD+</p>
          <p className={classes.stepDescription}>
            Ensure you have a sufficient balance of IUSD+ before investing.
            Otherwise, purchase tokens on the exchange.
          </p>

          <img
            src={theme.palette.mode === 'dark' ? step1DarkMode : step1LightMode}
            alt="step1"
          />
          <Box className={classes.btnContainer}>
            <GenericButton
              text={'Buy IUSD+'}
              styles={{ width: 'fit-content', margin: 'auto' }}
              onClick={() => navigate('/update/home?buyToken=IUSD%2B')}
            />
          </Box>
        </Box>

        {/* Step 3 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>
            3. Select investment plan and investment tier
          </p>
          <p className={classes.stepDescription} s>
            Select the preferred duration of your investment and the applicable
            APY. This allows you to align your investment with your financial
            goals.
          </p>

          <img
            src={
              theme.palette.mode === 'dark' ? step31DarkMode : step31LightMode
            }
            alt="step3"
          />
          <img
            src={
              theme.palette.mode === 'dark' ? step32DarkMode : step32LightMode
            }
            alt="step3"
          />
        </Box>
        {/* Step 4 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>4. Maturity of the Plan</p>
          <ul>
            <li>
              Once your deposit is made, you will need to wait until the
              investment matures.
            </li>
            <li>
              During this time, your funds will accrue interest based on the
              chosen APY percentage.
            </li>
            <li>
              You can choose to withdraw or reinvest once your investment
              reaches maturity.
            </li>
          </ul>
          <p className={classes.stepDescription}>
            Note: Withdrawing the plan before its maturity will incur a certain
            fee.
          </p>
        </Box>

        {/* Step 5 */}
        <Box className={classes.step}>
          <p className={classes.stepNumber}>5. Assets Monitoring</p>

          <p className={classes.stepDescription}>
            All your assets and their current status are visible in the asset
            wallet, making it easy to track investments, view accrued interest,
            and make informed decisions about reinvesting or withdrawing funds
            as needed.
          </p>
          <img
            src={theme.palette.mode === 'dark' ? step5DarkMode : step5LightMode}
            alt="step3"
          />
        </Box>
      </div>
    </Box>
  );
};

export default HowItWorks;
