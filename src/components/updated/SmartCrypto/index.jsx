import React, { useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
import { makeStyles } from '@mui/styles';
import SmartCryptoTabs from './IconicHeader';
import PortfolioCard from './PortfolioCard';
import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';
const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1248px',
    width: '100%',
    margin: '50px auto',
    padding: '24px',
  },
  contentContainer: {},
  descriptionWrapper: {
    display: 'flex',
    gap: '10px',
    margin: '0px 0px 50px 0px',
    alignItems: 'center',
    '& h4': {
      fontSize: '20px',
      fontWeight: '500',
      color: theme.palette.text.primary,
      margin: 0,
    },
    '& p': {
      fontSize: '14px',
      margin: 0,
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const SmartCrypto = () => {
  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
  const [selectedInnerTab, setSelectedInnerTab] = useState(0);

  const descriptionData = [
    { name: '', description: '', img: '' },
    {
      name: 'Ripple Plan',
      img: ripple,
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
    },
    {
      name: 'Surge Plan',
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
      img: surge,
    },
    {
      name: 'Wave Plan',
      img: wave,
      description:
        'Diversify your crypto holding by minimizing risk while maximizing exposure.',
    },
  ];
  const classes = useStyles();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.Container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={classes.contentContainer}>
        <div>
          <div>
            <h3>Smart Crypto</h3>
          </div>
          <p>#Start growing your assets on Smart Crypto</p>
        </div>

        <div>
          <SmartCryptoTabs
            setSelectedInnerTab={setSelectedInnerTab}
            selectedInnerTab={selectedInnerTab}
          />
        </div>

        <div className={classes.descriptionWrapper}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 0,
              gap: '5px',
            }}
          >
            <img
              style={{ height: '50px' }}
              src={descriptionData[selectedInnerTab].img}
            />
            <h4>{descriptionData[selectedInnerTab].name}</h4>
          </div>

          <p>{descriptionData[selectedInnerTab].description}</p>
        </div>

        <div className={classes.cardWrapper}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((curr) => (
            <PortfolioCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCrypto;
