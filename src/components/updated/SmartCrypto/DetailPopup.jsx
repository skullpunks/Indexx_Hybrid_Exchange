import React from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';
import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import { useNavigate } from 'react-router-dom';
import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .7)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '560px',
      width: '100%',
      marginTop: '50px',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
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
    maxWidth: '80%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  blueButton: {
    maxWidth: '80%',
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  coinRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '70vh',
    overflowY: 'auto',
    gap: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0px',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  coinWrapper: {
    width: '47%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imgContainer: {
    display: 'flex',
    gap: '6px',
    '& img': {
      width: '22px',
      height: '22px',
    },
    '& p': {
      fontSize: '14px',
    },
  },
  percentageText: {
    fontSize: '14px',
  },
  planName: {
    display: 'flex',
    padding: '18px',
    marginTop: '-20px',
    flexDirection: 'column',
    '& p': {
      textAlign: 'center',
    },
  },
  flexContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      height: '70px',
    },
    '& span': {
      fontSize: '24px',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  planCardContainer: {
    width: '100%',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  planCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.divider,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '20px',
    gap: '15px',
    '& img': {
      height: '200px',
      width: '200px',
      margin: 'auto',
    },
    '& h4': {
      marginTop: '-10px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    '& p': {
      marginBottom: '40px',
    },
  },
}));

const DetailPopup = ({ onClose, category }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const xBlueplanDetails = [
    {
      image: ripple,
      name: 'Ripple',
      description: 'Designed for stability and stable returns',
      path: '/smart-crypto/plan-detail/ripple',
    },
    {
      image: surge,
      name: 'Surge',
      description: 'Moderate volatility, consistent returns.',
      path: '/smart-crypto/plan-detail/surge',
    },
    {
      image: wave,
      name: 'Wave',
      description: ' High volatility, high rewards.',
      path: '/smart-crypto/plan-detail/wave',
    },
  ];

  const xBitcoinplanDetails = [
    {
      image: bloomingIcon,
      name: 'Blooming',
      description: 'Optimized for low volatility and steady performance.',
      path: '/smart-crypto/plan-detail/blooming',
    },
    {
      image: rushIcon,
      name: 'Rush',
      description: 'Moderate volatility, consistent returns',
      path: '/smart-crypto/plan-detail/rush',
    },
    {
      image: bullRunIcon,
      name: 'Bull-Run',
      description: 'High volatility, high potential returns.',
      path: '/smart-crypto/plan-detail/bull-run',
    },
  ];

  const planDetails =
    category === 'x-Blue' ? xBlueplanDetails : xBitcoinplanDetails;
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          {/* <img src={passwordChanged} height="100px" /> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: '600' }}></div>

            <div
              onClick={onClose}
              style={{ cursor: 'pointer', padding: '18px' }}
            >
              <CloseIcon
                color={theme.palette.text.secondary}
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>
          <div className={classes.coinRoot}>
            <div className={classes.planName}>
              <div className={classes.flexContainer}>
                <img src={category === 'x-Blue' ? xBlueIcon : xBitcoinIcon} />
                <span>{category === 'x-Blue' ? 'x-Blue' : 'x-Bitcoin'}</span>
              </div>
              <p>
                With over 80% altcoins and less than 20% Bitcoin, this offers a
                diverse range of cryptocurrencies for your investment, allowing
                you to stay in tune with the heartbeat of the crypto industry.
              </p>
            </div>

            <div className={classes.planCardContainer}>
              {planDetails.map((curr) => (
                <div className={classes.planCardRoot}>
                  <img src={curr.image} />
                  <h4>{curr.name}</h4>
                  <p>{curr.description}</p>
                  <GenericButton
                    text="View Package"
                    className={
                      category === 'x-Blue'
                        ? classes.blueButton
                        : classes.yellowButton
                    }
                    onClick={() => {
                      navigate(curr.path);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPopup;
