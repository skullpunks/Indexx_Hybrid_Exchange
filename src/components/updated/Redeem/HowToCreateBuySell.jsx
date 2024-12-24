import React, { useState } from 'react';
import IconicHeader from '../shared/RedeemIconicHeader';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '100px',
  },
  heading: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '120px',
    marginTop: '150px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  iframeContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1440px',
    paddingBottom: '56.25%', // Aspect ratio 16:9
    height: 0,
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
}));

const HowToCreateBuySell = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState('How to Create, Buy & Sell');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <h1 className={classes.heading}>
        How to Create Buy and Sell Gift Cards, Birthday Cards, and Seasonal
        Cards
      </h1>
      <div className={classes.iframeContainer}>
        <iframe
          className={classes.iframe}
          src="https://www.youtube.com/embed/2zZ9CHbVx74?si=xymxk3Fj5O_1jv8B"
          title="How to Create Buy-Sell Cards"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HowToCreateBuySell;
