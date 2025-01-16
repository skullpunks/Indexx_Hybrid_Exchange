import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import SmartApyImage from '../../../assets/updated/SmartApy/whySmartApyImage.png';
// Create styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1380px',
    width: '100%',
    margin: '50px auto',
    padding: '20px',
  },
  image: {
    maxWidth: '450px', // Adjust size to fit your needs
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  mainText: {
    fontSize: '18px',
    fontWeight: 'normal',
    marginBottom: theme.spacing(1),
    '& span': {
      fontSize: '38px',
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
          src={SmartApyImage}
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
          Indexx USD+ stablecoin lets you earn passive yield effortlessly.
          Instantly mint and redeem USD+ to USDT at a 1:1 ratio. Replace your
          USDT with USD+ and unlock growth opportunities where none existed
          before!
        </p>
      </div>
      {/* Title */}
    </Box>
  );
};

export default WhySmartApy;
