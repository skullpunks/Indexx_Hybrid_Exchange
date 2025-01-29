import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import whyUseSmartApy from '../../../assets/updated/SmartApy/whyUseSmartApy.svg';
// Create styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    width: '100%',
    margin: '50px auto',
    padding: '20px',
  },
  image: {
    width: '100%',
    margin: 'auto',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  mainText: {
    fontSize: '22px',
    fontWeight: 'normal',
    marginBottom: theme.spacing(1),
    '& span': {
      fontSize: '48px',
      fontWeight: 'bold',
      margin: '10px 0px',
    },
  },
  subText: {
    fontSize: '14px',
    lineHeight: 1.5,
    maxWidth: '600px', // Optional: Limit width of the description text
    width: '100%',
    marginTop: '10px',
    opacity: '.8',
  },
}));

const WhySmartApy = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* Image */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={whyUseSmartApy}
          alt="IndeXX Mascot"
          className={classes.image}
        />
      </div>

      <div style={{ flex: 1, textAlign: 'left' }}>
        <p className={classes.mainText}>
          Why use
          <br />
          <span>indexx IUSD+</span>
          <br />
          for Smart APY
        </p>
        {/* Subtitle */}
        <p className={classes.subText}>
          Indexx IUSD+ is a stablecoin pegged 1:1 to the US Dollar, exclusively
          used on the Indexx platform. It powers your Smart APY investments by
          allowing seamless staking and yield generation. With IUSD+, your funds
          stay secure, maintain their value, and grow effortlessly through
          guaranteed returns. Once your lock-in period ends, you can withdraw
          IUSD+ back to USD or reinvest in other opportunities—all with the same
          value as your initial investment.
        </p>
      </div>
      {/* Title */}
    </Box>
  );
};

export default WhySmartApy;
