import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import IconicHeader from '../components/updated/shared/IconicHeader';
import { useTheme } from '@mui/material/styles';

// icons dark
import assetLockDarkIcon from '../assets/updated/support_center/white icons/asset lock.png';
import cryptoDepositDarkIcon from '../assets/updated/support_center/white icons/crypto deposit.png';
import emailDarkIcon from '../assets/updated/support_center/white icons/email icon 001.png';
import googleAuthDarkIcon from '../assets/updated/support_center/white icons/google authenticator.png';
import mobileSecurityDarkIcon from '../assets/updated/support_center/white icons/mobile security.png';
import performanceDarkIcon from '../assets/updated/support_center/white icons/performance.png';
import resetPassDarkIcon from '../assets/updated/support_center/white icons/reset password.png';
import verifyAccDarkIcon from '../assets/updated/support_center/white icons/verify account icon.png';
import viewAllDarkIcon from '../assets/updated/support_center/white icons/view all icon.png';

// icons light
import assetLockLightIcon from '../assets/updated/support_center/Black icons/asset lock.png';
import cryptoDepositLightIcon from '../assets/updated/support_center/Black icons/crypto deposit.png';
import emailLightIcon from '../assets/updated/support_center/Black icons/email icon 001.png';
import googleAuthLightIcon from '../assets/updated/support_center/Black icons/google authenticator.png';
import mobileSecurityLightIcon from '../assets/updated/support_center/Black icons/mobile security.png';
import performanceLightIcon from '../assets/updated/support_center/Black icons/performance.png';
import resetPassLightIcon from '../assets/updated/support_center/Black icons/reset password.png';
import verifyAccLightIcon from '../assets/updated/support_center/Black icons/verify account icon.png';
import viewAllLightIcon from '../assets/updated/support_center/Black icons/view all icon.png';

// icons yellow
import assetLockYellowIcon from '../assets/updated/support_center/Yellow icons/asset lock.png';
import cryptoDepositYellowIcon from '../assets/updated/support_center/Yellow icons/crypto deposit.png';
import emailYellowIcon from '../assets/updated/support_center/Yellow icons/email icon 001.png';
import googleAuthYellowIcon from '../assets/updated/support_center/Yellow icons/google authenticator.png';
import mobileSecurityYellowIcon from '../assets/updated/support_center/Yellow icons/mobile security.png';
import performanceYellowIcon from '../assets/updated/support_center/Yellow icons/performance.png';
import resetPassYellowIcon from '../assets/updated/support_center/Yellow icons/reset password.png';
import verifyAccYellowIcon from '../assets/updated/support_center/Yellow icons/verify account icon.png';
import viewAllYellowIcon from '../assets/updated/support_center/Yellow icons/view all icon.png';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1400px',
    margin: '80px auto',
    padding: '10px 20px',
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginBottom: '30px',
    fontSize: '40px !important',
    fontWeight: '600 !important',
  },
  subheading: {
    marginBottom: '20px',
    fontSize: '24px !important',
    fontWeight: '500 !important',
    color: theme.palette.text.secondary,
  },
  card: {
    padding: '16px',
    height: '150px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s, border-radius 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: '12px',
    },
  },
  icon: {
    maxWidth: '70px',
    maxHeight: '70px',
    marginBottom: '10px',
  },
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

const SupportCenter = () => {
  const [selectedTab, setSelectedTab] = useState('Support');
  const classes = useStyles();
  const theme = useTheme();
  const userType = localStorage.getItem('userType');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const services = [
    {
      title: 'Verify Account',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? verifyAccDarkIcon
            : verifyAccLightIcon
          : verifyAccYellowIcon,
      link: '/verify-account',
    },
    {
      title: 'Reset Password',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? resetPassDarkIcon
            : resetPassLightIcon
          : resetPassYellowIcon,
      link: '/reset-password',
    },
    {
      title: 'Reset Phone Security Verification',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? mobileSecurityDarkIcon
            : mobileSecurityLightIcon
          : mobileSecurityYellowIcon,
      link: '/reset-phone-security',
    },
    {
      title: 'Change Email Address',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? emailDarkIcon
            : emailLightIcon
          : emailYellowIcon,
      link: '/change-email',
    },
    {
      title: 'Reset Google Authenticator',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? googleAuthDarkIcon
            : googleAuthLightIcon
          : googleAuthYellowIcon,
      link: '/reset-google-authenticator',
    },
    {
      title: 'Crypto Deposit Not Credited',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? cryptoDepositDarkIcon
            : cryptoDepositLightIcon
          : cryptoDepositYellowIcon,
      link: '/crypto-deposit-not-credited',
    },
    {
      title: 'Appeal P2P Performance Metrics',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? performanceDarkIcon
            : performanceLightIcon
          : performanceYellowIcon,
      link: '/appeal-p2p-performance',
    },
    {
      title: 'Assets Frozen Due to P2P Dispute',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? assetLockDarkIcon
            : assetLockLightIcon
          : assetLockYellowIcon,
      link: '/assets-frozen',
    },
    {
      title: 'View All Self Service Tools',
      icon:
        userType !== 'common'
          ? theme.palette.mode === 'dark'
            ? viewAllDarkIcon
            : viewAllLightIcon
          : viewAllYellowIcon,
      link: '/self-service-tools',
    },
  ];

  return (
    <Box className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <h1 className={classes.title}>How we can help you?</h1>

      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={6} sm={4} md={2.4} lg={2.4} key={index}>
            <Link to={service.link} style={{ textDecoration: 'none' }}>
              <div className={classes.card}>
                <img
                  src={service.icon}
                  alt={service.title}
                  className={classes.icon}
                />
                <Typography variant="body1" className={classes.linkText}>
                  {service.title}
                </Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SupportCenter;
