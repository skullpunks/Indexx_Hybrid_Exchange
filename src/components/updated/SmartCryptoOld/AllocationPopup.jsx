import React from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import DonutChart from './DonutChart';
import coinImg from '../../../assets/updated/smartCrypto/coinimg.png';
import Inex from '../../../assets/updated/buySell/INEX.svg';

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
    backgroundColor: ' rgba(0, 0, 0, .1)',
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
      maxWidth: '460px',
      width: '100%',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
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
  },
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  coinRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0px',
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
}));

const AllocationPopup = ({
  onClose,
  category,
  allocationData,
  onStartPopup,
}) => {
  const theme = useTheme();

  const classes = useStyles();

  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };
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
            <div style={{ fontSize: '20px', fontWeight: '600' }}>
              Portfolio Allocation
            </div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
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
          <DonutChart portfolioData={allocationData || []} />
          <div className={classes.coinRoot}>
            {allocationData?.cryptocurrencies?.map((crypto) => (
              <div key={crypto._id} className={classes.coinWrapper}>
                <div className={classes.imgContainer}>
                  <img src={getImage(crypto.token)} alt={crypto.name} />
                  <p>{crypto.name}</p>
                </div>
                <span className={classes.percentageText}>
                  {crypto.percentage}%
                </span>
              </div>
            ))}
          </div>
          <div className={classes.btnContainer}>
            <GenericButton
              className={classes.greyButton}
              text="Cancel"
              onClick={onClose}
            />
            <GenericButton
              text="Start plan"
              className={
                category === 'x-Blue'
                  ? classes.blueButton
                  : classes.yellowButton
              }
              onClick={() => {
                onClose();
                onStartPopup(allocationData);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationPopup;
