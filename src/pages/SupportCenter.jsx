import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Dummy icon
import IconicHeader from '../components/updated/shared/IconicHeader';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  //   container: {
  //     padding: '24px',
  //     marginTop: '100px',
  //     maxWidth: '1200px',
  //     margin: '0 auto',
  //     backgroundColor: theme.palette.background.default,
  //     color: theme.palette.text.primary,
  //   },
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
    fontSize: '40px',
    marginBottom: '10px',
  },
}));

const SupportCenter = () => {
  const classes = useStyles();
  const theme = useTheme();

  const services = [
    {
      title: 'Verify Account',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Reset Password',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Reset Phone Security Verification',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Change Email Address',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Reset Google Authenticator',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Crypto Deposit Not Credited',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Appeal P2P Performance Metrics',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'Assets Frozen Due to P2P Dispute',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
    {
      title: 'View All Self Service Tools',
      icon: <HelpOutlineIcon className={classes.icon} />,
    },
  ];

  return (
    <Box className={classes.container}>
      <IconicHeader />
      <h1 className={classes.title}>How we can help you?</h1>
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={6} sm={4} md={2.4} lg={2.4} key={index}>
            <div className={classes.card}>
              {service.icon}
              <Typography variant="body1">{service.title}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SupportCenter;
