import React, { useState } from 'react';
import IconicHeader from '../shared/IconicHeader';
import { makeStyles } from '@mui/styles';
import SmartCryptoTabs from './IconicHeader';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import GenericButton from '../shared/Button';

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
  cardContainer: {
    border:
      theme.palette.mode === 'dark'
        ? '1px solid rgb(71, 77, 87)'
        : `1px solid ${theme.palette.divider}`,
    width: '32.7%',
    background: theme.palette.mode === 'dark' ? theme.palette.divider : '#fff',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    margin: '0px',
    minWidth: 0,
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: '500',
      color: theme.palette.text.primary,
      margin: '0px 0px 16px',
    },
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  assetContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  assetsText: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    margin: '0px 0px 5px',
  },
  imgGroup: {},
  buttonContaienr: {
    display: 'flex',
    gap: '10px',
  },
  greyButton: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgb(71, 77, 87) !important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  yellowButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },
}));

const SmartCrypto = () => {
  const [selectedTab, setSelectedTab] = useState('Smart Crypto');
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
          <SmartCryptoTabs />
        </div>

        <div className={classes.descriptionWrapper}>
          <div>
            {/* <img src={}/> */}
            <h4>Ripple Plan</h4>
          </div>

          <p>
            Diversify your crypto holding by minimizing risk while maximizing
            exposure.
          </p>
        </div>

        <div className={classes.cardWrapper}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((curr) => (
            <div className={classes.cardContainer}>
              <h3>Shiny Tokens in Meme</h3>

              <div className={classes.flexContainer}>
                <div className={classes.assetContainer}>
                  {' '}
                  <p className={classes.assetsText}>Assets</p>
                  <div className={classes.imgGroup}>
                    <AvatarGroup
                      max={4}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          fontSize: 14,
                        },
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </div>
                </div>
                <div className={classes.transactionContainer}>
                  <p className={classes.assetsText}> No. of Transactions</p>
                  <p>
                    {' '}
                    <span className={classes.count}>1</span> L30D
                  </p>
                </div>
              </div>
              <div className={classes.buttonContaienr}>
                <GenericButton
                  text={'View Allocation'}
                  className={classes.greyButton}
                />
                <GenericButton
                  text={'Create a plan'}
                  className={classes.yellowButton}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCrypto;
