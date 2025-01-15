import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Box } from '@mui/material';
import cryptoTreasuryLogo from '../../../assets/updated/SmartApy/cryptoTreasuryLogo.svg';
import smartApyImage from '../../../assets/updated/SmartApy/smartApyLogo.svg';
import smartCryptoImage from '../../../assets/updated/smartCrypto/smartCryptoLogo.png';
import IconicHeader from '../shared/IconicHeader';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    marginTop: '100px',
  },
  headerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  headImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    fontSize: '50px',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  text: {
    fontWeight: '300',
    maxWidth: '500px',
    margin: 'auto',
    marginBottom: '100px',
    textAlign: 'center',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '1000px',
    width: '100%',
    margin: 'auto',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Stacks vertically on small screens
    },
  },
  card: {
    flex: 1,
    maxWidth: '400px',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    '& h3': {
      fontSize: '40px',
      fontStyle: 'italic',
      marginBottom: '10px',
    },
    '& p': {
      marginBottom: '20px',
      fontWeight: '300',
    },
  },
  icon: {
    marginBottom: '10px',
  },
  button: {
    marginTop: '10px',
    color: '#00ff7f',
    maxWidth: '250px',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      background: 'none !important',
      color: '#00ff7f',
    },
  },
}));

const CryptoTreasury = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <Box className={classes.headerRoot}>
        <Box className={classes.headImageContainer}>
          <img
            src={cryptoTreasuryLogo}
            alt=""
            style={{ width: '90%', maxWidth: '110px' }}
          />
          <p className={classes.heading}>Crypto Treasury</p>
        </Box>
        <Box>
          <p className={classes.text}>
            Drives long-term crypto value through secure holdings, innovative
            products, and sustainable growth.
          </p>
        </Box>
      </Box>

      <Box className={classes.contentRow}>
        <Box className={classes.card}>
          <img
            src={smartApyImage}
            alt="Smart APY"
            className={classes.icon}
            height="100"
          />
          <h3>Smart APY</h3>
          <p>Maximize your rewards by investing your IUSD+</p>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => navigate('/smart-apy')}
          >
            Learn more
          </Button>
        </Box>
        <Box className={classes.card}>
          <img
            src={smartCryptoImage}
            alt="Smart Crypto"
            className={classes.icon}
            height="100"
          />
          <h3>Smart Crypto</h3>
          <p>Maximize your rewards by investing your IUSD+</p>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => navigate('/smart-crypto')}
          >
            Learn more
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoTreasury;
