import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarGroup, Button, useTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import ripple from '../../../assets/updated/smartCrypto/ripple.png';
import surge from '../../../assets/updated/smartCrypto/surge.png';
import wave from '../../../assets/updated/smartCrypto/Wave.png';

import bloomingIcon from '../../../assets/updated/smartCrypto/blomming.png';
import rushIcon from '../../../assets/updated/smartCrypto/rush.png';
import bullRunIcon from '../../../assets/updated/smartCrypto/bullrun.png';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { sellPlanSmartCryptoPlan } from '../../../services/api';

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
  redButton: {
    backgroundColor: `red !important`,
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

  contentContainer: {
    padding: '24px',
  },
  buttonContainer: {
    width: '100%',
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
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  flexContainer1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
    gap: '10px',
    '& img': {
      height: '120px',
    },
    '& h2': {
      fontSize: '26px',
      textAlign: 'center',
      margin: 0,
      fontWeight: '600',
    },
  },
  closeBtn: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  planDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
    '& p': {
      fontSize: '20px',
    },
  },
  yellowOutlinedBtn: {
    color: '#FEBA00 !important',
    borderColor: '#FEBA00 !important',
    borderRadius: '10px !important',
    '&:hover': {
      background: 'none !important',
    },
  },
}));

const SellConfirmationPopup = ({
  onClose,
  category,
  packageName,
  confirmSellProcessed,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [userSellPlan, setUserPlanName] = useState('');
  const [userSellPlanManagedBy, setUserPlanNameManagedBy] = useState('');
  const [userSellPlanReformed, setUserPlanNameReformed] = useState('');
  const [isFeeAcknowledged, setIsFeeAcknowledged] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [email, setEmail] = useState('');

  const handleCheckboxChange = (e) => {
    setIsFeeAcknowledged(e.target.checked);
    console.log('e.target.checked0', e.target.checked);
  };

  function extractPlanDetails(inputString) {
    let planName = null;
    let managedBy = null;

    // First attempt: Using the original regex
    const planNameRegex = /^(.*?)\s\$/; // Matches "Smart Crypto Wave" before the "$"
    const managedByRegex = /-\s*(\w+)/; // Matches "Omkar" or "Issa" after the "-"

    const planNameMatch = inputString.match(planNameRegex);
    const managedByMatch = inputString.match(managedByRegex);

    if (planNameMatch) {
      planName = planNameMatch[1].trim();
    }

    if (managedByMatch) {
      managedBy = managedByMatch[1].trim();
    }

    // Fallback if first attempt fails
    if (!planName || !managedBy) {
      const fallbackRegex = /^(.*?)(?:\s\d+\.\d+)?\s*Package-(\w+)/;
      const fallbackMatch = inputString.match(fallbackRegex);

      if (fallbackMatch) {
        planName = fallbackMatch[1].trim();
        managedBy = fallbackMatch[2].trim();
      }
    }

    return { planName, managedBy };
  }

  useEffect(() => {
    let plan = extractPlanDetails(packageName);
    console.log('packageName', packageName);
    let reformedPlan = reformPlanName(plan.planName, plan.managedBy);
    console.log('reformedPlan', reformedPlan);
    setUserPlanNameReformed(reformedPlan);
    setUserPlanName(plan.planName);
    setUserPlanNameManagedBy(plan.managedBy);
  }, [packageName]);

  const reformPlanName = (name, managedBy) => {
    if (!name) return;
    if (name.includes('Surge'))
      return `Smart Crypto x-Blue Surge - ${managedBy}`;
    if (name.includes('Ripple'))
      return `Smart Crypto x-Blue Ripple - ${managedBy}`;
    if (name.includes('Wave')) return `Smart Crypto x-Blue Wave - ${managedBy}`;
    if (name.includes('Blooming'))
      return `Smart Crypto x-Bitcoin Blooming - ${managedBy}`;
    if (name.includes('Rush'))
      return `Smart Crypto x-Bitcoin Rush - ${managedBy}`;
    if (name.includes('Bull-Run'))
      return `Smart Crypto x-Bitcoin Bull-Run - ${managedBy}`;
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmail(email);
  }, []);

  const getPlanImage = (planName) => {
    if (planName.includes('Surge')) return surge;
    if (planName.includes('Wave')) return wave;
    if (planName.includes('Ripple')) return ripple;
    if (planName.includes('Blooming')) return bloomingIcon;
    if (planName.includes('Bull-Run')) return bullRunIcon;
    if (planName.includes('Rush')) return rushIcon;
  };

  const handleSubmitSellPlan = async () => {
    setLoadings(true);

    let sellCurrencies = JSON.parse(localStorage.getItem('SellPlanCurrencies'));
    console.log(sellCurrencies, 'sellCurrencies');

    console.log(
      userSellPlanManagedBy, // Updated field name to match server expectations
      userSellPlanManagedBy, // Updated field name to match server expectations
      sellCurrencies, // Array of cryptocurrency data
      email
    );
    let createSwitch = await sellPlanSmartCryptoPlan(
      userSellPlan, // Updated field name to match server expectations
      userSellPlanManagedBy, // Updated field name to match server expectations
      sellCurrencies, // Array of cryptocurrency data
      email
    );
    setLoadings(false);
    confirmSellProcessed(userSellPlanReformed, userSellPlan);
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
            <div style={{ fontSize: '20px', fontWeight: '600' }}></div>

            <div
              onClick={!loadings ? onClose : undefined} // Prevent function execution
              style={{
                cursor: loadings ? 'not-allowed' : 'pointer',
                padding: '18px',
                pointerEvents: loadings ? 'none' : 'auto', // Disable click events
                opacity: loadings ? 0.5 : 1, // Visual indication
              }}
            >
              <CloseIcon className={classes.closeBtn} />
            </div>
          </div>
          <div className={classes.header}>
            <HelpOutlineIcon style={{ fontSize: '50px', color: '#FEBA00' }} />
            <h2>Are you sure you want to sell?</h2>
          </div>

          <div className={classes.planDetails}>
            <img src={getPlanImage(userSellPlan)} />
            <p>{userSellPlanReformed}</p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '15px',
            }}
          >
            <input
              type="checkbox"
              id="feeAcknowledgment"
              checked={isFeeAcknowledged}
              onChange={handleCheckboxChange}
            />
            <p>
              I confirm considering take some minimum Gas fees or Transaction
              fees for selling this plan.
            </p>
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              text={'Cancel'}
              className={classes.greyButton}
              onClick={onClose}
              disabled={loadings}
            />

            <GenericButton
              text={'Sell Plan'}
              className={
                /Ripple|Wave|Surge/i.test(userSellPlan)
                  ? classes.blueButton
                  : classes.yellowButton
              }
              loading={loadings}
              disabled={!isFeeAcknowledged}
              onClick={handleSubmitSellPlan}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellConfirmationPopup;
